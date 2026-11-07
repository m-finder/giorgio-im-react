import { afterEach, expect, it, vi } from 'vitest'
import { act } from 'react'
import { createIM, type ImOptions } from '../src'

const group = { id: 'team', type: 'group' as const, groupname: 'Team', ownerId: 'owner' }
const friend = { id: 'alice', type: 'friend' as const, username: 'Alice' }
const instances: ReturnType<typeof createIM>[] = []
;(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

async function mount(options: Partial<ImOptions> = {}) {
  const target = document.createElement('div')
  document.body.appendChild(target)
  let im!: ReturnType<typeof createIM>
  await act(async () => {
    im = createIM({ target, messageSound: false, init: { user: { id: 'me', username: 'Me' }, group: [group] }, ...options })
  })
  instances.push(im)
  return { im, target }
}

async function click(target: HTMLElement, selector: string) {
  await act(async () => {
    const button = target.querySelector<HTMLButtonElement>(selector)
    if (!button) throw new Error(`Missing button: ${selector}`)
    button.click()
  })
}

async function tab(target: HTMLElement, label: string) {
  await act(async () => {
    const button = Array.from(target.querySelectorAll<HTMLButtonElement>('.gim-tabs button')).find(button => button.textContent === label)
    if (!button) throw new Error(`Missing tab: ${label}`)
    button.click()
  })
}

async function swipe(target: HTMLElement) {
  const contact = target.querySelector<HTMLElement>('.gim-panel .gim-contact')
  if (!contact) throw new Error('Missing group contact')
  await act(async () => {
    for (const [type, x] of [['pointerdown', 110], ['pointermove', 10], ['pointerup', 10]] as const) {
      const event = new MouseEvent(type, { button: 0, clientX: x, clientY: 10, bubbles: true, cancelable: true })
      Object.defineProperties(event, { pointerId: { value: 7 }, pointerType: { value: 'touch' } })
      ;(type === 'pointerdown' ? contact : window).dispatchEvent(event)
    }
  })
}

afterEach(async () => {
  await act(async () => { for (const im of instances.splice(0)) im.destroy() })
  document.body.replaceChildren()
  localStorage.clear()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

it('keeps muted group messages and unread counts without sound or a global reminder', async () => {
  const play = vi.fn().mockResolvedValue(undefined)
  vi.stubGlobal('Audio', vi.fn(() => ({ play, pause: vi.fn() })))
  const { im, target } = await mount({ messageSound: '/message.mp3', init: { user: { id: 'me', username: 'Me' }, group: [{ ...group, notificationsMuted: true }] } })
  await act(async () => {
    im.getMessage({ ...group, mid: 'one', content: 'First update', fromid: 'other' })
    im.getMessage({ ...group, mid: 'two', content: 'Second update', fromid: 'other' })
  })
  expect({ reminder: target.querySelector('.gim-message-alert'), sounds: play.mock.calls.length, unread: target.querySelector('.gim-launcher-badge')?.textContent })
    .toEqual({ reminder: null, sounds: 0, unread: '2' })
  await act(async () => { im.open() })
  await tab(target, '群组')
  expect(target.querySelector('.gim-panel .gim-unread')?.textContent).toBe('2')
  await act(async () => { im.chat(group) })
  expect(Array.from(target.querySelectorAll('.gim-bubble'), message => message.textContent)).toEqual(['First update', 'Second update'])
  expect(target.querySelector<HTMLTextAreaElement>('textarea')?.disabled).toBe(false)
})

it('alerts for an explicit mention of user ID zero in an open muted background group', async () => {
  const play = vi.fn().mockResolvedValue(undefined)
  vi.stubGlobal('Audio', vi.fn(() => ({ play, pause: vi.fn() })))
  const { im, target } = await mount({ messageSound: '/message.mp3', init: { user: { id: 0, username: 'Me' }, group: [{ ...group, notificationsMuted: true }] } })
  await act(async () => { im.chat(group); im.chat(friend) })
  await act(async () => {
    im.getMessage({ ...group, mid: 'plain', content: '@Me plain text', fromid: 'other' })
    im.getMessage({ ...group, mid: 'other', content: '@Me someone else', fromid: 'other', mentions: [{ id: 'someone-else', username: 'Me', start: 0, end: 3 }] })
  })
  expect({ reminder: target.querySelector('.gim-message-alert'), sounds: play.mock.calls.length }).toEqual({ reminder: null, sounds: 0 })
  const mention = { ...group, mid: 'self', content: '@Me please read', fromid: 'other', mentions: [{ id: '0', username: 'Me', start: 0, end: 3 }] }
  await act(async () => { im.getMessage(mention) })
  expect(target.querySelector('.gim-message-alert-copy small')?.textContent).toContain('Team')
  expect(play).toHaveBeenCalledOnce()
  expect(target.querySelector('.gim-chat-heading strong')?.textContent).toBe('Alice')
  expect(target.querySelectorAll('.gim-tab-dot')).toHaveLength(1)
  await act(async () => { im.getMessage(mention); im.getMessage({ ...mention, mid: 'own', mine: true }) })
  expect(play).toHaveBeenCalledOnce()
})

it('updates mute indicators in groups, recent chats and the multiple-conversation list', async () => {
  const { im, target } = await mount({ init: { user: { id: 'me', username: 'Me' }, group: [{ ...group, notificationsMuted: true }] } })
  await act(async () => { im.open(); im.chat(group); im.chat(friend) })
  await tab(target, '群组')
  expect(target.querySelectorAll('.gim-panel .gim-group-notifications-muted')).toHaveLength(1)
  expect(target.querySelectorAll('.gim-conversation-list .gim-group-notifications-muted')).toHaveLength(1)
  await tab(target, '最近')
  expect(target.querySelectorAll('.gim-panel .gim-group-notifications-muted')).toHaveLength(1)
  await act(async () => { im.setGroupNotificationsMuted('team', false) })
  expect(target.querySelector('.gim-group-notifications-muted')).toBeNull()
  await act(async () => { im.setGroupNotificationsMuted('team', true) })
  expect(target.querySelectorAll('.gim-group-notifications-muted')).toHaveLength(2)
})

it('reveals the mute action by swiping and changes state only after saving succeeds', async () => {
  let finish!: (saved: boolean) => void
  const muteGroupNotifications = vi.fn().mockImplementationOnce(() => new Promise<boolean>(resolve => { finish = resolve })).mockResolvedValue(true)
  const onGroupNotificationsMuted = vi.fn()
  const { im, target } = await mount({ muteGroupNotifications, onGroupNotificationsMuted })
  await act(async () => { im.open() })
  await tab(target, '群组')
  await swipe(target)
  expect(target.querySelector('.gim-group-actions')?.parentElement?.classList.contains('gim-actions-open')).toBe(true)
  expect(target.querySelector('.gim-chat')).toBeNull()
  await click(target, '[aria-label="静音 Team 的消息"]')
  expect(target.querySelector('.gim-group-notifications-muted')).toBeNull()
  expect(target.querySelector<HTMLButtonElement>('[aria-label="静音 Team 的消息"]')?.disabled).toBe(true)
  await act(async () => { finish(false) })
  expect(target.querySelector('[role="alert"]')?.textContent).toContain('修改消息静音设置失败，请重试')
  expect(onGroupNotificationsMuted).not.toHaveBeenCalled()
  await click(target, '[aria-label="静音 Team 的消息"]')
  expect(muteGroupNotifications).toHaveBeenLastCalledWith(expect.objectContaining({ id: 'team', type: 'group' }), true)
  expect(target.querySelector('.gim-group-notifications-muted')).not.toBeNull()
  expect(onGroupNotificationsMuted).toHaveBeenCalledWith(expect.objectContaining({ id: 'team' }), true)
  await swipe(target)
  await click(target, '[aria-label="取消静音 Team 的消息"]')
  expect(muteGroupNotifications).toHaveBeenLastCalledWith(expect.objectContaining({ id: 'team' }), false)
  expect(target.querySelector('.gim-group-notifications-muted')).toBeNull()
  expect(onGroupNotificationsMuted).toHaveBeenCalledTimes(2)
})

it('restores standalone notification preferences from an enabled encrypted backup', async () => {
  const options = { enableLocalStorage: true, encryptionKey: 'notification-test-key' }
  const first = await mount(options)
  await act(async () => { first.im.setGroupNotificationsMuted('team', true) })
  await act(async () => { first.im.destroy() })
  instances.splice(instances.indexOf(first.im), 1)
  const { im, target } = await mount(options)
  await act(async () => { im.open() })
  await tab(target, '群组')
  expect(target.querySelector('.gim-panel .gim-group-notifications-muted')).not.toBeNull()
  await act(async () => { im.getMessage({ ...group, mid: 'after-refresh', fromid: 'other', content: 'Keep silent' }) })
  expect(target.querySelector('.gim-message-alert')).toBeNull()
  expect(target.querySelector('.gim-panel .gim-unread')?.textContent).toBe('1')
})
