import { afterEach, expect, it, vi } from 'vitest'
import { act } from 'react'
import { createIM, type ImOptions } from '../src'

const group = { id: 'team', type: 'group' as const, groupname: 'Team' }
const friend = { id: 'alice', type: 'friend' as const, username: 'Alice' }
const members = [{ id: 'me', username: 'Me' }, friend, { id: 'bob', username: 'Bob' }]
const instances: ReturnType<typeof createIM>[] = []
;(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

async function mount(options: Partial<ImOptions> = {}) {
  const target = document.createElement('div')
  document.body.appendChild(target)
  let im!: ReturnType<typeof createIM>
  const onSendMessage = vi.fn()
  await act(async () => {
    im = createIM({ target, messageSound: false, onSendMessage, loadGroupMembers: () => members,
      init: { user: members[0], group: [group], friend: [{ id: 'friends', groupname: 'Friends', list: [friend] }] }, ...options })
    im.chat(group)
  })
  instances.push(im)
  return { im, target, onSendMessage }
}

async function enterText(target: HTMLElement, value: string) {
  await act(async () => {
    const input = target.querySelector<HTMLTextAreaElement>('textarea')!
    Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value')?.set?.call(input, value)
    input.dispatchEvent(new Event('input', { bubbles: true }))
  })
}

async function key(target: HTMLElement, value: string, options: KeyboardEventInit = {}) {
  await act(async () => { target.querySelector('textarea')!.dispatchEvent(new KeyboardEvent('keydown', { key: value, bubbles: true, cancelable: true, ...options })) })
}

afterEach(async () => {
  await act(async () => { for (const im of instances.splice(0)) im.destroy() })
  document.body.replaceChildren()
  vi.restoreAllMocks()
})

it('selects a group member with Enter and sends its identity with UTF-16 offsets', async () => {
  const { target, onSendMessage } = await mount()
  await enterText(target, '  😀 @ali')
  expect(target.querySelectorAll('.gim-mention-option')).toHaveLength(1)
  await key(target, 'Enter')
  expect(onSendMessage).not.toHaveBeenCalled()
  await enterText(target, '  😀 @Alice hello')
  await key(target, 'Enter')
  expect(onSendMessage).toHaveBeenCalledWith(expect.objectContaining({ content: '😀 @Alice hello', mentions: [{ id: 'alice', username: 'Alice', start: 3, end: 9 }] }))
  expect(target.querySelector('.gim-mention')?.textContent).toBe('@Alice')
})

it('drops a mention when its selected text is edited', async () => {
  const { target, onSendMessage } = await mount()
  await enterText(target, '@Ali')
  await act(async () => { target.querySelector<HTMLButtonElement>('.gim-mention-option')!.click() })
  await enterText(target, '@Alicia hello')
  await key(target, 'Enter')
  expect(onSendMessage.mock.calls[0]?.[0]).not.toHaveProperty('mentions')
})

it('keeps an existing mention when another is inserted before it and sends ranges in order', async () => {
  const { target, onSendMessage } = await mount()
  await enterText(target, '@Ali')
  await key(target, 'Enter')
  await enterText(target, '@Bo @Alice ')
  const input = target.querySelector<HTMLTextAreaElement>('textarea')!
  await act(async () => {
    input.setSelectionRange(3, 3)
    input.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  })
  await key(target, 'Enter')
  await key(target, 'Enter')
  expect(onSendMessage).toHaveBeenCalledWith(expect.objectContaining({ content: '@Bob  @Alice', mentions: [
    { id: 'bob', username: 'Bob', start: 0, end: 4 },
    { id: 'alice', username: 'Alice', start: 6, end: 12 },
  ] }))
})

it.each([group, friend])('quotes a message in a $type chat and clears the preview after sending', async receiver => {
  const { im, target, onSendMessage } = await mount()
  await act(async () => {
    im.chat(receiver)
    im.getMessage({ ...receiver, mid: 'original', fromid: 'alice', username: 'Alice', content: 'Original message' })
  })
  await act(async () => { target.querySelector<HTMLButtonElement>('[aria-label="引用消息"]')!.click() })
  expect(target.querySelector('.gim-reply-preview')?.textContent).toContain('Original message')
  await enterText(target, 'Reply')
  await key(target, 'Enter')
  expect(onSendMessage).toHaveBeenCalledWith(expect.objectContaining({ receiver: expect.objectContaining({ type: receiver.type }), content: 'Reply',
    replyTo: { mid: 'original', fromid: 'alice', username: 'Alice', content: 'Original message' } }))
  expect(target.querySelector('.gim-message-quote')?.textContent).toContain('Original message')
  expect(target.querySelector('.gim-reply-preview')).toBeNull()
})

it.each([
  { receiver: group, content: 'photo.png' },
  { receiver: friend, content: 'https://example.test/photo.png' },
])('quotes an image in a $receiver.type chat without displaying placeholder text', async ({ receiver, content }) => {
  const attachment = { kind: 'image' as const, url: 'https://example.test/photo.png', name: 'photo.png' }
  const { im, target, onSendMessage } = await mount()
  await act(async () => {
    im.chat(receiver)
    im.getMessage({ ...receiver, mid: 'photo', fromid: 'alice', username: 'Alice', content, attachment })
  })
  await act(async () => { target.querySelector<HTMLButtonElement>('[aria-label="引用消息"]')!.click() })
  expect(target.querySelector('.gim-reply-preview img')?.getAttribute('src')).toBe(attachment.url)
  expect(target.querySelector('.gim-reply-preview')?.textContent).not.toContain(content)
  await enterText(target, 'Photo reply')
  await key(target, 'Enter')
  expect(onSendMessage).toHaveBeenCalledWith(expect.objectContaining({ replyTo: expect.objectContaining({ mid: 'photo', attachment }) }))
  expect(target.querySelector('.gim-message-quote img')?.getAttribute('src')).toBe(attachment.url)
  expect(target.querySelector('.gim-message-quote')?.textContent).not.toContain(content)
  await act(async () => { target.querySelector<HTMLButtonElement>('[aria-label="聊天记录"]')!.click() })
  expect(target.querySelector('.gim-history-row .gim-message-quote img')?.getAttribute('src')).toBe(attachment.url)
})

it('preserves image captions and all safe image thumbnails when quoting multiple images', async () => {
  const attachments = [
    { kind: 'image' as const, url: 'https://example.test/first.png', name: 'first.png' },
    { kind: 'image' as const, url: 'https://example.test/second.png', name: 'second.png' },
  ]
  const { im, target, onSendMessage } = await mount()
  await act(async () => { im.getMessage({ ...group, mid: 'photos', fromid: 'alice', username: 'Alice', content: 'Trip photos', attachments }) })
  await act(async () => { target.querySelector<HTMLButtonElement>('[aria-label="引用消息"]')!.click() })
  expect(Array.from(target.querySelectorAll('.gim-reply-preview img'), image => image.getAttribute('src'))).toEqual(attachments.map(image => image.url))
  expect(target.querySelector('.gim-reply-preview')?.textContent).toContain('Trip photos')
  await enterText(target, 'Looks good')
  await key(target, 'Enter')
  expect(onSendMessage).toHaveBeenCalledWith(expect.objectContaining({ replyTo: expect.objectContaining({ attachments, content: 'Trip photos' }) }))
  expect(target.querySelectorAll('.gim-message-quote img')).toHaveLength(2)
  expect(target.querySelector('.gim-message-quote')?.textContent).toContain('Trip photos')
})

it('keeps both the image and caption when quoting a single image message', async () => {
  const attachment = { kind: 'image' as const, url: 'https://example.test/photo.png', name: 'photo.png' }
  const { im, target, onSendMessage } = await mount()
  await act(async () => { im.getMessage({ ...group, mid: 'captioned-photo', fromid: 'alice', username: 'Alice', content: 'The view from our trip', attachment }) })
  await act(async () => { target.querySelector<HTMLButtonElement>('[aria-label="引用消息"]')!.click() })
  expect(target.querySelector('.gim-reply-preview img')?.getAttribute('src')).toBe(attachment.url)
  expect(target.querySelector('.gim-reply-preview')?.textContent).toContain('The view from our trip')
  await enterText(target, 'Great view')
  await key(target, 'Enter')
  expect(onSendMessage).toHaveBeenCalledWith(expect.objectContaining({ replyTo: expect.objectContaining({ content: 'The view from our trip', attachment }) }))
  expect(target.querySelector('.gim-message-quote img')?.getAttribute('src')).toBe(attachment.url)
  expect(target.querySelector('.gim-message-quote')?.textContent).toContain('The view from our trip')
})

it('renders safe quoted images from history and excludes unsafe attachment URLs', async () => {
  const attachments = [
    { kind: 'image' as const, url: 'https://example.test/safe.png', name: 'safe.png' },
    { kind: 'image' as const, url: 'javascript:alert(1)', name: 'unsafe.png' },
  ]
  const { target } = await mount({ loadHistory: () => [{ ...group, mid: 'reply', fromid: 'alice', content: 'Reply',
    replyTo: { mid: 'photo', fromid: 'me', username: 'Me', content: 'Pictures', attachments },
  }] })
  expect(Array.from(target.querySelectorAll('.gim-message-quote img'), image => image.getAttribute('src'))).toEqual(['https://example.test/safe.png'])
  expect(target.querySelector('.gim-message-quote')?.textContent).toContain('Pictures')
})

it('cancels quotes and prevents quote metadata from moving to another conversation', async () => {
  const { im, target, onSendMessage } = await mount()
  await act(async () => { im.getMessage({ ...group, mid: 'original', fromid: 'alice', username: 'Alice', content: 'Original' }) })
  await act(async () => { target.querySelector<HTMLButtonElement>('[aria-label="引用消息"]')!.click() })
  await act(async () => { target.querySelector<HTMLButtonElement>('[aria-label="取消引用"]')!.click() })
  expect(target.querySelector('.gim-reply-preview')).toBeNull()
  await act(async () => { target.querySelector<HTMLButtonElement>('[aria-label="引用消息"]')!.click() })
  await act(async () => { im.chat(friend) })
  await enterText(target, 'Private message')
  await key(target, 'Enter')
  expect(onSendMessage.mock.calls[0]?.[0]).not.toHaveProperty('replyTo')
})

it('renders historical quotes as plain text and highlights mentions of the current user', async () => {
  const { target } = await mount({ loadHistory: () => [{ ...group, mid: 'reply', fromid: 'alice', content: '@Me hello',
    mentions: [{ id: 'me', username: 'Me', start: 0, end: 3 }],
    replyTo: { mid: 'original', fromid: 'me', username: 'Me', content: '<img src=x onerror=alert(1)>' },
  }] })
  expect(target.querySelector('.gim-mention-me')?.textContent).toBe('@Me')
  expect(target.querySelector('.gim-message-quote')?.textContent).toContain('<img src=x onerror=alert(1)>')
  expect(target.querySelector('.gim-message-quote img')).toBeNull()
})

it('does not send or select a mention while an IME composition is active', async () => {
  const { target, onSendMessage } = await mount()
  await enterText(target, '@Ali')
  await key(target, 'Enter', { isComposing: true })
  expect({ content: target.querySelector('textarea')?.value, sends: onSendMessage.mock.calls.length }).toEqual({ content: '@Ali', sends: 0 })
})

it('does not offer group mentions in a private conversation', async () => {
  const { im, target } = await mount()
  await act(async () => { im.chat(friend) })
  await enterText(target, '@Ali')
  expect(target.querySelector('.gim-mention-picker')).toBeNull()
})
