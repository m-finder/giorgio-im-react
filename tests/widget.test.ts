import { afterEach, describe, expect, it, vi } from 'vitest'
import { act, createElement, createRef, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createIM, ImWidget, type ImInit, type ImWidgetApi } from '../src'

const init: ImInit = {
  user: { id: 'me', username: '我' },
  friend: [{ id: 1, groupname: '好友', list: [{ id: 'alice', username: 'Alice', status: 'online' }] }],
  group: [{ id: 'team', groupname: '团队', members: 3 }],
}
const instances: Array<ReturnType<typeof createIM>> = []
;(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

function mount(options: Partial<Parameters<typeof createIM>[0]> = {}) {
  const target = document.createElement('div')
  document.body.appendChild(target)
  let im!: ReturnType<typeof createIM>
  act(() => { im = createIM({ init, target, messageSound: false, ...options }) })
  instances.push(im)
  return { im, target }
}

afterEach(async () => {
  await act(async () => { for (const im of instances.splice(0)) im.destroy() })
  document.body.replaceChildren()
  vi.restoreAllMocks()
})

describe('React IM widget', () => {
  it('opens contacts and a chat, sends a message and keeps the public API synchronous', async () => {
    const onSendMessage = vi.fn()
    const { im, target } = mount({ onSendMessage })
    await act(async () => { im.open(); im.chat({ id: 'alice', type: 'friend', username: 'Alice' }) })
    expect(target.querySelector('.gim-panel')).not.toBeNull()
    expect(target.querySelector('.gim-chat')).not.toBeNull()
    const input = target.querySelector<HTMLTextAreaElement>('textarea')!
    await act(async () => {
      Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value')?.set?.call(input, '你好')
      input.dispatchEvent(new Event('input', { bubbles: true }))
    })
    await act(async () => { target.querySelector<HTMLButtonElement>('.gim-composer-footer button')!.click() })
    expect(onSendMessage).toHaveBeenCalledWith(expect.objectContaining({ content: '你好', receiver: expect.objectContaining({ id: 'alice' }) }))
    expect(target.querySelector('.gim-bubble')?.textContent).toBe('你好')
  })

  it('counts unread messages and clears them when their chat opens', async () => {
    const { im, target } = mount()
    await act(async () => { im.getMessage({ id: 'alice', type: 'friend', content: '在吗？' }) })
    expect(target.querySelector('.gim-launcher-badge')?.textContent).toBe('1')
    await act(async () => { im.chat({ id: 'alice', type: 'friend', username: 'Alice' }) })
    expect(target.querySelector('.gim-launcher-badge')).toBeNull()
    expect(target.querySelector('.gim-bubble')?.textContent).toBe('在吗？')
  })

  it('uses the same profile callbacks and edited profile when sending', async () => {
    const onUsername = vi.fn()
    const onSign = vi.fn()
    const onSendMessage = vi.fn()
    const { im, target } = mount({ onUsername, onSign, onSendMessage })
    await act(async () => { im.open() })
    const name = target.querySelector<HTMLInputElement>('.gim-profile-name')!
    const sign = target.querySelector<HTMLInputElement>('[aria-label="个性签名"]')!
    await act(async () => {
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set?.call(name, '新昵称')
      name.dispatchEvent(new Event('input', { bubbles: true }))
      name.focus(); name.blur()
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set?.call(sign, '新签名')
      sign.dispatchEvent(new Event('input', { bubbles: true }))
      sign.focus(); sign.blur()
    })
    expect(onUsername).toHaveBeenCalledWith('新昵称')
    expect(onSign).toHaveBeenCalledWith('新签名')
    await act(async () => { im.chat({ id: 'alice', type: 'friend', username: 'Alice' }) })
    const input = target.querySelector<HTMLTextAreaElement>('textarea')!
    await act(async () => {
      Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value')?.set?.call(input, '你好')
      input.dispatchEvent(new Event('input', { bubbles: true }))
      target.querySelector<HTMLButtonElement>('.gim-composer-footer button')!.click()
    })
    expect(onSendMessage).toHaveBeenCalledWith(expect.objectContaining({ user: expect.objectContaining({ username: '新昵称', sign: '新签名' }) }))
  })

  it('renders AI streaming and markdown using the same message API', async () => {
    const { im, target } = mount()
    await act(async () => { im.chat({ id: 'ai', type: 'ai', username: 'AI' }) })
    await act(async () => { im.getMessage({ id: 'ai', type: 'ai', mid: 'reply', content: '**你好**', finished: false }) })
    expect(target.querySelector('.gim-ai-progress')).not.toBeNull()
    await act(async () => { im.getMessage({ id: 'ai', type: 'ai', mid: 'reply', content: '**你好**，世界', finished: true }) })
    expect(target.querySelector('.gim-ai-progress')).toBeNull()
    expect(target.querySelector('.gim-markdown strong')?.textContent).toBe('你好')
  })

  it('keeps toolbar overrides and group moderation rules', async () => {
    const { im, target } = mount({ toolbar: [{ id: 'quick', label: '快捷回复', text: '快' }] })
    await act(async () => { im.chat({ id: 'team', type: 'group', groupname: '团队', ownerId: 'other' }) })
    expect(target.querySelector('[aria-label="快捷回复"]')).not.toBeNull()
    await act(async () => { im.setGroupMute('team', true) })
    expect(target.querySelector<HTMLButtonElement>('[aria-label="快捷回复"]')?.disabled).toBe(true)
    expect(target.querySelector<HTMLButtonElement>('[aria-label="聊天记录"]')?.disabled).toBe(false)
  })

  it('switches language without resetting the conversation', async () => {
    const { im, target } = mount()
    await act(async () => { im.chat({ id: 'alice', type: 'friend', username: 'Alice' }); im.setLocale('en') })
    expect(target.querySelector<HTMLTextAreaElement>('textarea')?.getAttribute('aria-label')).toBe('Message')
    expect(target.querySelector('.gim-chat-heading strong')?.textContent).toBe('Alice')
  })

  it('supports StrictMode and updates profile props without edit callbacks', async () => {
    const target = document.createElement('div')
    document.body.appendChild(target)
    const root = createRoot(target)
    const ref = createRef<ImWidgetApi>()
    const onUsername = vi.fn()
    await act(async () => { root.render(createElement(StrictMode, null, createElement(ImWidget, { ref, init, onUsername }))) })
    await act(async () => { ref.current?.open() })
    await act(async () => { root.render(createElement(StrictMode, null, createElement(ImWidget, {
      ref, init: { ...init, user: { ...init.user, username: '服务端昵称' } }, onUsername,
    }))) })
    expect(target.querySelector<HTMLInputElement>('.gim-profile-name')?.value).toBe('服务端昵称')
    expect(onUsername).not.toHaveBeenCalled()
    await act(async () => { root.unmount() })
  })

  it('restores encrypted message history after remounting', async () => {
    localStorage.clear()
    const target = document.createElement('div')
    document.body.appendChild(target)
    let first!: ReturnType<typeof createIM>
    await act(async () => { first = createIM({ init, target, enableLocalStorage: true, encryptionKey: 'test-key', messageSound: false }) })
    await act(async () => {
      first.chat({ id: 'alice', type: 'friend', username: 'Alice' })
      first.getMessage({ id: 'alice', type: 'friend', content: '持久化消息', mid: 'saved' })
      window.dispatchEvent(new Event('pagehide'))
      first.destroy()
    })
    let second!: ReturnType<typeof createIM>
    await act(async () => { second = createIM({ init, target, enableLocalStorage: true, encryptionKey: 'test-key', messageSound: false }) })
    instances.push(second)
    expect(target.querySelector('.gim-bubble')?.textContent).toBe('持久化消息')
    localStorage.clear()
  })
})
