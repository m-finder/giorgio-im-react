import { defineConfig } from 'vitest/config'
import dts from 'vite-plugin-dts'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [dts({ include: ['src'], insertTypesEntry: true })],
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: 'GiorgioIMReact',
      fileName: format => `giorgio-im-react.${format === 'es' ? 'js' : 'umd.cjs'}`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react-dom/client', 'react/jsx-runtime'],
      output: { globals: { react: 'React', 'react-dom': 'ReactDOM', 'react-dom/client': 'ReactDOM', 'react/jsx-runtime': 'React' } },
    },
  },
  test: { environment: 'jsdom' },
})
