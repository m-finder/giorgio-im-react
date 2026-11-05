type Source<T> = Signal<T> | (() => T)

export interface Signal<T> { value: T }

/** A small observable store for the widget's imperative API and React view. */
export function createWidgetStore() {
  const listeners = new Set<() => void>()
  const mounts: Array<() => void> = []
  const unmounts: Array<() => void> = []
  const watchers: Array<{ read: () => unknown; callback: (value: never) => void; previous: unknown; previousItems?: unknown[]; deep: boolean; sync: boolean }> = []
  const proxies = new WeakMap<object, object>()
  let version = 0
  let queued = false
  let checking = false

  function read(source: Source<unknown> | Source<unknown>[]): unknown {
    if (Array.isArray(source)) return source.map(item => read(item))
    return typeof source === 'function' ? source() : source.value
  }

  function check(sync: boolean): void {
    if (checking) return
    checking = true
    try {
      for (const watcher of watchers) {
        if (watcher.sync !== sync) continue
        const value = watcher.read()
        const current = watcher.deep ? JSON.stringify(value) : value
        const changed = watcher.deep && Array.isArray(value)
          ? current !== watcher.previous || value.some((item, index) => item !== watcher.previousItems?.[index])
          : Array.isArray(current) && Array.isArray(watcher.previous)
          ? current.length !== watcher.previous.length || current.some((item, index) => item !== (watcher.previous as unknown[])[index])
          : !Object.is(current, watcher.previous)
        if (changed) {
          watcher.previous = current
          if (watcher.deep && Array.isArray(value)) watcher.previousItems = [...value]
          watcher.callback(value as never)
        }
      }
    } finally { checking = false }
  }

  function notify(): void {
    check(true)
    version++
    for (const listener of listeners) listener()
    if (!queued) {
      queued = true
      queueMicrotask(() => {
        queued = false
        check(false)
      })
    }
  }

  function reactive<T extends object>(value: T): T {
    if ((typeof File !== 'undefined' && value instanceof File) ||
      (typeof Blob !== 'undefined' && value instanceof Blob) || value instanceof Date ||
      (typeof Element !== 'undefined' && value instanceof Element)) return value
    const cached = proxies.get(value)
    if (cached) return cached as T
    if (value instanceof Set) {
      const proxy = new Proxy(value, {
        get(target, key) {
          if (key === 'add') return (item: unknown) => { target.add(item); notify(); return proxy }
          if (key === 'delete') return (item: unknown) => { const result = target.delete(item); notify(); return result }
          if (key === 'clear') return () => { target.clear(); notify() }
          const entry = Reflect.get(target, key, target)
          return typeof entry === 'function' ? entry.bind(target) : entry
        },
      })
      proxies.set(value, proxy)
      return proxy as T
    }
    const proxy = new Proxy(value, {
      get(target, key, receiver) {
        const entry = Reflect.get(target, key, receiver)
        return entry && typeof entry === 'object' ? reactive(entry) : entry
      },
      set(target, key, entry, receiver) {
        const changed = !Object.is(Reflect.get(target, key, receiver), entry)
        const result = Reflect.set(target, key, entry, receiver)
        if (changed) notify()
        return result
      },
      deleteProperty(target, key) {
        const existed = Reflect.has(target, key)
        const result = Reflect.deleteProperty(target, key)
        if (existed) notify()
        return result
      },
    })
    proxies.set(value, proxy)
    proxies.set(proxy, proxy)
    return proxy
  }

  function ref<T>(initial: T): Signal<T>
  function ref<T = undefined>(): Signal<T | undefined>
  function ref<T>(initial?: T): Signal<T | undefined> {
    let current = initial as T
    return {
      get value() { return current && typeof current === 'object' ? reactive(current) : current },
      set value(next: T) { if (!Object.is(current, next)) { current = next; notify() } },
    }
  }

  function computed<T>(getter: () => T): Signal<T> {
    return { get value() { return getter() }, set value(_next: T) { throw new Error('Computed value is read-only') } }
  }

  function watch<T>(source: Source<T> | Source<unknown>[], callback: (value: T) => void, options: { deep?: boolean; flush?: 'sync' | 'post' } = {}): void {
    const getter = () => read(source as Source<unknown> | Source<unknown>[])
    const value = getter()
    watchers.push({ read: getter, callback: callback as (value: never) => void,
      previous: options.deep ? JSON.stringify(value) : value,
      previousItems: options.deep && Array.isArray(value) ? [...value] : undefined,
      deep: !!options.deep, sync: options.flush === 'sync' })
  }

  return {
    ref, shallowRef: ref, reactive, computed, watch,
    nextTick: (callback?: () => void) => Promise.resolve().then(callback),
    onMounted: (callback: () => void) => { mounts.push(callback) },
    onUnmounted: (callback: () => void) => { unmounts.push(callback) },
    mount: () => { for (const callback of mounts) callback() },
    unmount: () => { for (const callback of unmounts) callback() },
    subscribe: (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener) } },
    getSnapshot: () => version,
    refresh: notify,
  }
}
