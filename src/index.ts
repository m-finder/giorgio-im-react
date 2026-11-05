import { createElement } from 'react'
import { flushSync } from 'react-dom'
import { createRoot } from 'react-dom/client'
import { ImWidget } from './ImWidget'
import type { ImOptions, ImWidgetApi } from './types'

export { ImWidget }
export type { ImWidgetProps } from './ImWidget'
export { createConnectedIM, ImHttpError } from './connection'
export type { ConnectedIM, ImConnectionOptions, ImConnectionState } from './connection'
export { assertImTransport } from './transport'
export type { ImTransportOptions } from './transport'
export { zhCN, en } from './locales'
export type { ImLocaleKey, ImLocaleMessages, ImLocaleParams, ImLocales } from './locales'
export type {
  ImId, ImChatType, ImUser, ImContact, ImGroupMember, ImFriendGroup, ImInit,
  ImMessage, ImChatNotice, ImReadPayload, ImReadReceipt, ImTypingPayload, ImTypingState,
  ImAttachment, ImSendPayload, ImNotice, ImCreateGroupPayload, ImWidgetApi, ImOptions,
  ImBuiltinTool, ImToolbarState, ImToolbarContext, ImToolbarItem,
  ImCallType, ImCallPayload,
} from './types'

/** Mount a self-contained React IM widget and return its public methods. */
export function createIM(options: ImOptions): ImWidgetApi & { destroy: () => void } {
  if (typeof document === 'undefined') throw new Error('createIM 只能在浏览器中调用')
  const { target = document.body, ...props } = options
  const host = document.createElement('div')
  target.appendChild(host)
  const root = createRoot(host)
  const widget = { current: null as ImWidgetApi | null }
  flushSync(() => root.render(createElement(ImWidget, { ...props, ref: value => { widget.current = value } })))
  if (!widget.current) { root.unmount(); host.remove(); throw new Error('Giorgio IM failed to mount') }
  return { ...widget.current, destroy: () => { root.unmount(); host.remove() } }
}
