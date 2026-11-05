import type { createWidgetStore } from './reactivity'
import messageSound from './assets/message.mp3?inline'

/** Play a short incoming-message tone, tolerating browser autoplay restrictions. */
export function useMessageSound(setting: () => boolean | string | undefined, store: ReturnType<typeof createWidgetStore>) {
  const { onUnmounted } = store
  let audio: HTMLAudioElement | undefined
  let lastPlayedAt = -Infinity
  let disposed = false
  const minimumInterval = 500

  store.onMounted(() => { disposed = false })

  onUnmounted(() => {
    disposed = true
    audio?.pause()
  })

  return async (): Promise<void> => {
    const sound = setting() ?? true
    if (disposed || !sound || Date.now() - lastPlayedAt < minimumInterval) return
    lastPlayedAt = Date.now()
    try {
      audio?.pause()
      audio = new Audio(typeof sound === 'string' ? sound : messageSound)
      await audio.play()
    } catch { /* Autoplay restrictions or audio failures must not interrupt messaging. */ }
  }
}
