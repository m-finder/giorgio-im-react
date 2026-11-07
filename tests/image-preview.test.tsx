import { afterEach, expect, it } from 'vitest'
import { act } from 'react'
import { createIM, type ImAttachment } from '../src'

const friend = { id: 'alice', type: 'friend' as const, username: 'Alice' }
const instances: ReturnType<typeof createIM>[] = []
;(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

function image(name: string): ImAttachment {
  return { kind: 'image', url: `https://example.test/${name}.png`, name: `${name}.png` }
}

async function mount() {
  const target = document.createElement('div')
  document.body.appendChild(target)
  let im!: ReturnType<typeof createIM>
  await act(async () => {
    im = createIM({ target, messageSound: false, init: { user: { id: 'me', username: 'Me' } } })
    im.chat(friend)
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

async function openImage(target: HTMLElement, attachment: ImAttachment) {
  await act(async () => {
    const button = target.querySelector(`img[src="${attachment.url}"]`)?.closest<HTMLButtonElement>('button.gim-image-button')
    if (!button) throw new Error(`Missing image preview button: ${attachment.url}`)
    button.click()
  })
}

async function press(target: HTMLElement, key: string) {
  await act(async () => {
    target.querySelector('.gim-image-viewer')!.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }))
  })
}

function currentImage(target: HTMLElement) {
  return target.querySelector<HTMLImageElement>('.gim-preview-image')?.getAttribute('src')
}

afterEach(async () => {
  await act(async () => { for (const im of instances.splice(0)) im.destroy() })
  document.body.replaceChildren()
})

it('opens the clicked image and navigates safe images across messages in conversation order', async () => {
  const { im, target } = await mount()
  const first = image('first'), second = image('second'), third = image('third')
  await act(async () => {
    im.getMessage({ ...friend, mid: 'one', content: first.name, attachment: first })
    im.getMessage({ ...friend, mid: 'two', content: 'Two more photos', attachments: [second, third, { kind: 'image', url: 'javascript:alert(1)', name: 'unsafe' }] })
  })
  await openImage(target, second)
  expect(target.querySelector('.gim-image-viewer')?.getAttribute('role')).toBe('dialog')
  expect(currentImage(target)).toBe(second.url)
  await click(target, '[aria-label="上一张"]')
  expect(currentImage(target)).toBe(first.url)
  expect(target.querySelector<HTMLButtonElement>('[aria-label="上一张"]')?.disabled).toBe(true)
  await click(target, '[aria-label="下一张"]')
  await click(target, '[aria-label="下一张"]')
  expect(currentImage(target)).toBe(third.url)
  expect(target.querySelector<HTMLButtonElement>('[aria-label="下一张"]')?.disabled).toBe(true)
})

it('previews quoted images and deduplicates an image repeated by the original message', async () => {
  const { im, target } = await mount()
  const first = image('original'), second = image('quoted-only')
  await act(async () => {
    im.getMessage({ ...friend, mid: 'photo', fromid: 'alice', content: first.name, attachment: first })
    im.getMessage({ ...friend, mid: 'reply', content: 'Reply', replyTo: { mid: 'photo', fromid: 'alice', username: 'Alice', content: 'Caption', attachments: [first, second] } })
  })
  await openImage(target, second)
  expect(currentImage(target)).toBe(second.url)
  await click(target, '[aria-label="上一张"]')
  expect(currentImage(target)).toBe(first.url)
  expect(target.querySelector<HTMLButtonElement>('[aria-label="上一张"]')?.disabled).toBe(true)
  await click(target, '[aria-label="下一张"]')
  expect(currentImage(target)).toBe(second.url)
  expect(target.querySelector<HTMLButtonElement>('[aria-label="下一张"]')?.disabled).toBe(true)
})

it('supports keyboard navigation, Escape, the close button and backdrop dismissal', async () => {
  const { im, target } = await mount()
  const first = image('one'), second = image('two')
  await act(async () => { im.getMessage({ ...friend, mid: 'photos', content: '', attachments: [first, second] }) })
  await openImage(target, first)
  expect(document.activeElement).toBe(target.querySelector('.gim-image-viewer'))
  await press(target, 'ArrowRight')
  expect(currentImage(target)).toBe(second.url)
  await press(target, 'ArrowLeft')
  expect(currentImage(target)).toBe(first.url)
  await press(target, 'Escape')
  expect(target.querySelector('.gim-image-viewer')).toBeNull()
  await openImage(target, first)
  await click(target, '[aria-label="关闭图片预览"]')
  expect(target.querySelector('.gim-image-viewer')).toBeNull()
  await openImage(target, first)
  await act(async () => { target.querySelector<HTMLElement>('.gim-image-viewer')!.click() })
  expect(target.querySelector('.gim-image-viewer')).toBeNull()
})

it('keeps a single-image viewer within its conversation and resets it when the chat closes', async () => {
  const { im, target } = await mount()
  const first = image('alice'), second = image('bob')
  const bob = { id: 'bob', type: 'friend' as const, username: 'Bob' }
  await act(async () => {
    im.getMessage({ ...friend, mid: 'alice-photo', content: '', attachment: first })
    im.getMessage({ ...bob, mid: 'bob-photo', content: '', attachment: second })
  })
  await openImage(target, first)
  expect(target.querySelector('[aria-label="上一张"]')).toBeNull()
  expect(target.querySelector('[aria-label="下一张"]')).toBeNull()
  await act(async () => { im.chat(bob) })
  expect(target.querySelector('.gim-image-viewer')).toBeNull()
  await openImage(target, second)
  expect(currentImage(target)).toBe(second.url)
  expect(target.querySelector('[aria-label="下一张"]')).toBeNull()
  await click(target, '[aria-label="收起会话"]')
  expect(target.querySelector('.gim-image-viewer')).toBeNull()
})
