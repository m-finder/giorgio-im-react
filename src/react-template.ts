import React from 'react'
import type { Signal } from './reactivity'

type RenderContext = Record<string, unknown> & { refs?: Record<string, Signal<HTMLElement | null>> }
type TemplateProps = Record<string, unknown>
type TemplateChild = React.ReactNode

let currentContext: RenderContext
const refCallbacks = new WeakMap<object, Map<string, (element: HTMLElement | null) => void>>()

export function setRenderContext(context: RenderContext): void { currentContext = context }

function normaliseProps(input: TemplateProps | null): TemplateProps {
  if (!input) return {}
  const props: TemplateProps = {}
  for (const [key, value] of Object.entries(input)) {
    if (key === 'class') props.className = value
    else if (key === 'innerHTML') props.dangerouslySetInnerHTML = { __html: value }
    else if (key === 'hidden' || key === 'controls') props[key] = value === '' ? true : value
    else if (key === 'ref' && typeof value === 'string') {
      let callbacks = refCallbacks.get(currentContext)
      if (!callbacks) { callbacks = new Map(); refCallbacks.set(currentContext, callbacks) }
      let callback = callbacks.get(value)
      if (!callback) {
        const context = currentContext
        callback = element => { const reference = context.refs?.[value]; if (reference) reference.value = element }
        callbacks.set(value, callback)
      }
      props.ref = callback
    } else if (key === 'onUpdate:modelValue') props[key] = value
    else if (key.startsWith('on')) {
      const event = key.slice(2).toLowerCase()
      const reactName = ({ pointerdown: 'PointerDown', pointerup: 'PointerUp', pointermove: 'PointerMove',
        pointercancel: 'PointerCancel', contextmenu: 'ContextMenu', keydown: 'KeyDown', keyup: 'KeyUp',
        mousedown: 'MouseDown', mouseup: 'MouseUp', doubleclick: 'DoubleClick' } as Record<string, string>)[event]
      props[`on${reactName ?? key.slice(2)}`] = Array.isArray(value)
        ? (event: Event) => { for (const handler of value) handler(event) }
        : value
    } else if (key === 'inert') props.inert = value ? '' : undefined
    else if (key === 'maxlength') props.maxLength = value
    else if (key === 'tabindex') props.tabIndex = value
    else props[key] = value
  }
  return props
}

export function createElementVNode(type: string, input: TemplateProps | null, children?: TemplateChild): React.ReactElement {
  const props = normaliseProps(input)
  return children === undefined || children === null
    ? React.createElement(type, props)
    : React.createElement(type, props, React.Children.toArray(children))
}
export const createElementBlock = createElementVNode
export const Fragment = React.Fragment
export function openBlock(): void {}
export function createCommentVNode(): null { return null }
export function createTextVNode(value: unknown): string { return String(value ?? '') }
export function toDisplayString(value: unknown): string { return value == null ? '' : typeof value === 'object' ? JSON.stringify(value) : String(value) }

export function normalizeClass(value: unknown): string {
  if (typeof value === 'string') return value
  if (Array.isArray(value)) return value.map(normalizeClass).filter(Boolean).join(' ')
  if (value && typeof value === 'object') return Object.entries(value).filter(([, enabled]) => enabled).map(([name]) => name).join(' ')
  return ''
}
export function normalizeStyle(value: unknown): React.CSSProperties | undefined {
  if (!value) return undefined
  if (Array.isArray(value)) return Object.assign({}, ...value) as React.CSSProperties
  return value as React.CSSProperties
}
export function renderList<T>(source: T[] | Record<string, T> | number, render: (item: T, key: string | number, index?: number) => TemplateChild): TemplateChild[] {
  if (typeof source === 'number') return Array.from({ length: source }, (_, index) => render((index + 1) as T, index))
  if (Array.isArray(source)) return source.map((item, index) => render(item, index))
  return Object.entries(source).map(([key, item], index) => render(item, key, index))
}

export function withKeys<T extends (event: KeyboardEvent) => void>(handler: T, keys: string[]): T {
  return ((event: KeyboardEvent) => {
    const key = event.key.toLowerCase()
    if (keys.some(expected => ({ esc: 'escape' } as Record<string, string>)[expected] === key || expected.toLowerCase() === key)) handler(event)
  }) as T
}
export function withModifiers<T extends (event: Event) => void>(handler: T, modifiers: string[]): T {
  return ((event: Event) => {
    const keyboard = event as KeyboardEvent
    for (const modifier of modifiers) {
      if (modifier === 'self' && event.target !== event.currentTarget) return
      if (modifier === 'ctrl' && !keyboard.ctrlKey) return
      if (modifier === 'shift' && !keyboard.shiftKey) return
      if (modifier === 'alt' && !keyboard.altKey) return
      if (modifier === 'meta' && !keyboard.metaKey) return
      if (modifier === 'exact' && ['ctrl', 'shift', 'alt', 'meta'].some(key => !modifiers.includes(key) && keyboard[`${key}Key` as 'ctrlKey'])) return
      if (modifier === 'stop') event.stopPropagation()
      if (modifier === 'prevent') event.preventDefault()
    }
    handler(event)
  }) as T
}

export const vModelText = Symbol('text')
export const vModelSelect = Symbol('select')
export const vModelCheckbox = Symbol('checkbox')

export function withDirectives(element: React.ReactElement, directives: Array<[symbol, unknown]>): React.ReactElement {
  const props = { ...element.props } as TemplateProps
  const update = props['onUpdate:modelValue'] as ((value: unknown) => void) | undefined
  const originalChange = props.onChange as ((event: React.ChangeEvent<Element>) => void) | undefined
  const originalInput = props.onInput as ((event: React.FormEvent<Element>) => void) | undefined
  delete props['onUpdate:modelValue']
  for (const [directive, value] of directives) {
    if (directive === vModelText) {
      props.value = value ?? ''
      props.onInput = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        update?.(event.currentTarget.value)
        originalInput?.(event)
      }
      props.onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        update?.(event.target.value)
        originalChange?.(event)
      }
    } else if (directive === vModelSelect) {
      props.value = value ?? ''
      props.onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        update?.(event.target.value)
        originalChange?.(event)
      }
    } else if (directive === vModelCheckbox) {
      props.checked = Array.isArray(value) ? value.includes(props.value) : Boolean(value)
      props.onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (Array.isArray(value)) update?.(event.target.checked ? [...value, props.value] : value.filter(item => item !== props.value))
        else update?.(event.target.checked)
        originalChange?.(event)
      }
    }
  }
  if (element.key !== null) props.key = element.key
  const reference = (element as React.ReactElement & { ref?: React.Ref<unknown> }).ref
  if (reference) props.ref = reference
  return element.props.children === undefined
    ? React.createElement(element.type, props)
    : React.createElement(element.type, props, element.props.children)
}
