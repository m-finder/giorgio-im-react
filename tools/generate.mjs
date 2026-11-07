import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { compile } from '@vue/compiler-dom'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const source = readFileSync(resolve(root, '../giorgio-im/src/ImWidget.vue'), 'utf8')
const script = source.slice(source.indexOf('<script setup lang="ts">') + 24, source.indexOf('</script>'))
const template = source.slice(source.indexOf('<template>') + 10, source.lastIndexOf('</template>'))
const beforeProps = script.slice(0, script.indexOf('const props ='))
  .replace("import { computed, nextTick, onMounted, onUnmounted, reactive, ref, watch } from 'vue'", "import type { createWidgetStore } from './reactivity'")
const body = script.slice(script.indexOf('const { locale,'), script.indexOf('defineExpose('))
  .replace(/const emit = defineEmits<\{[\s\S]*?\}>\(\)\n/, '')
  .replace('useImLocale(props)', 'useImLocale(props, store)')
  .replace('useMessageSound(() => props.messageSound)', 'useMessageSound(() => props.messageSound, store)')
  .replace('useVoiceRecorder()', 'useVoiceRecorder(store)')
  .replace('onMounted(() => {\n  ensureStyles()', 'onMounted(() => {\n  disposed = false\n  ensureStyles()')
const names = [...new Set([...body.matchAll(/^(?:const|let|function|async function)\s+([A-Za-z]\w*)/gm)].map(match => match[1]))]
const extras = ['props', 'locale', 't', 'setLocale', 'errorText', 'timeFormatter', 'voiceState', 'voiceDuration', 'voicePreview', 'voiceFile', 'voiceError', 'startVoice', 'stopVoice', 'cancelVoice', 'defaultAvatar', 'aiAvatar', 'messageParts', 'quoteImages', 'quoteText']
const api = source.match(/defineExpose\(\{([^}]+)\}\)/)?.[1]
if (!api) throw new Error('Missing public API')
const model = `${beforeProps}
export function createImModel(options: ImOptions, store: ReturnType<typeof createWidgetStore>) {
  const props = options
  const { computed, nextTick, onMounted, onUnmounted, reactive, ref, watch } = store
  const emit = (name: string, ...args: unknown[]) => {
    const callback = (props as unknown as Record<string, unknown>)[\`on\${name[0].toUpperCase()}\${name.slice(1)}\`]
    if (typeof callback === 'function') (callback as (...args: unknown[]) => void)(...args)
  }
${body}
  return {
    api: { ${api.trim()} },
    context: { ${[...new Set([...extras, ...names])].join(', ')} },
  }
}
`
writeFileSync(resolve(root, 'src/model.ts'), model)
const compiled = compile(template, { mode: 'module', prefixIdentifiers: true, expressionPlugins: ['typescript'] }).code
  .replace(/from "vue"/, 'from "./react-template"')
writeFileSync(resolve(root, 'src/template-render.ts'), `// @ts-nocheck\n// React elements generated from the matching Giorgio IM view.\n${compiled}`)
