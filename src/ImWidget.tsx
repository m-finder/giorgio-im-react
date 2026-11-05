import { forwardRef, useEffect, useImperativeHandle, useState, useSyncExternalStore } from 'react'
import { createImModel } from './model'
import { createWidgetStore, type Signal } from './reactivity'
import { render } from './template-render'
import { setRenderContext } from './react-template'
import type { ImOptions, ImWidgetApi } from './types'

export type ImWidgetProps = Omit<ImOptions, 'target'>

/** React component with the same public methods as the standalone widget. */
export const ImWidget = forwardRef<ImWidgetApi, ImWidgetProps>(function ImWidget(options, ref) {
  const [instance] = useState(() => {
    const store = createWidgetStore()
    const props = { ...options }
    const model = createImModel(props, store)
    const references = Object.fromEntries(Object.entries(model.context).filter(([, entry]) =>
      entry && typeof entry === 'object' && 'value' in entry)) as Record<string, Signal<HTMLElement | null>>
    const context = new Proxy(model.context as Record<string, unknown>, {
      get(target, key) {
        if (key === 'refs') return references
        const entry = key in target ? target[key as string] : props[key as keyof ImWidgetProps]
        return entry && typeof entry === 'object' && 'value' in entry ? (entry as Signal<unknown>).value : entry
      },
      set(target, key, value) {
        const entry = target[key as string]
        if (entry && typeof entry === 'object' && 'value' in entry) (entry as Signal<unknown>).value = value
        else target[key as string] = value
        return true
      },
    })
    return { store, model, props, context, cache: [] }
  })
  useSyncExternalStore(instance.store.subscribe, instance.store.getSnapshot, instance.store.getSnapshot)
  useImperativeHandle(ref, () => instance.model.api, [instance])
  useEffect(() => {
    instance.store.mount()
    return () => instance.store.unmount()
  }, [instance])
  useEffect(() => {
    Object.assign(instance.props, options)
    instance.store.refresh()
  }, [instance, options])
  setRenderContext(instance.context)
  return render(instance.context, instance.cache)
})
