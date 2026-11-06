# Giorgio IM React

A React and TypeScript messaging widget with the same UI, options, callbacks, message formats and public API as [Giorgio IM for Vue](https://github.com/m-finder/giorgio-im). Requires React 18.3+ or React 19.

[简体中文](README.md) | [English](README.en.md)

## Install

The package is published on GitHub Packages. Add this to your project's `.npmrc`:

```ini
@m-finder:registry=https://npm.pkg.github.com
```

Log in with a GitHub classic PAT with `read:packages`, then install:

```bash
npm login --scope=@m-finder --auth-type=legacy --registry=https://npm.pkg.github.com
npm install @m-finder/giorgio-im-react react react-dom
```

## Quick start

```ts
import { createIM, type ImInit } from '@m-finder/giorgio-im-react'

const init: ImInit = {
  user: { id: 'me', username: 'Me' },
  friend: [{ id: 'team', groupname: 'Team', list: [
    { id: 'alice', username: 'Alice', status: 'online' },
  ] }],
  group: [],
}

const im = createIM({
  init,
  onSendMessage(payload) { console.log(payload) },
})
im.chat({ id: 'alice', type: 'friend', username: 'Alice' })
im.open()
// Call im.destroy() when finished.
```

`createIM()` runs in the browser, mounts into `document.body` and injects the widget styles. Pass `target` to select another mount element.

## React component

```tsx
import { useRef } from 'react'
import { ImWidget, type ImInit, type ImWidgetApi } from '@m-finder/giorgio-im-react'

const init: ImInit = { user: { id: 'me', username: 'Me' }, friend: [], group: [] }

function App() {
  const widget = useRef<ImWidgetApi>(null)
  return <ImWidget ref={widget} init={init} locale="en" />
}
```

The component ref exposes the same methods as `createIM()`. Its props match `ImOptions` except that `target` is only used by `createIM()`.

## Laravel and Socket

Both frontends use the same backend and WebSocket protocol:

```ts
import { createConnectedIM } from '@m-finder/giorgio-im-react'

const im = await createConnectedIM({
  apiUrl: '/api/im',
  token: () => accessToken,
  widget: { locale: 'en' },
  onConnectionChange: state => console.log(state),
  onError: (error, operation) => console.error(operation, error),
})
im.open()
```

`createConnectedIM()` handles initial data, tickets, WebSocket events, catch-up synchronisation, reconnection, friends and groups. The server uses the same `/init`, `/socket-ticket`, `/messages`, `/uploads` endpoints and Socket `sync` packet as the Vue version.

## Features

- Contacts, friend categories, groups, recent chats, notifications, draggable windows and customer service mode
- Text, images, files, voice, emoji, streaming AI Markdown replies and configurable toolbar
- Preview pasted or toolbar-selected images in the composer, then send one message with optional text
- Add and remove individual images before sending; messages with multiple images use an `attachments` array
- Read receipts, typing and presence, blocking, group moderation and localisation
- Optional AES-256-GCM encrypted local backup, disabled by default
- The same `ImWidgetApi`, `ImOptions`, message types and callback signatures as the Vue package

Built-in languages are `zh-CN` and `en`. Extend them with `locales` or call `im.setLocale('en')`. See `src/types.ts` and `src/locales.ts` for the complete API.

## Development

```bash
npm install
npm run dev
npm run typecheck
npm test
npm run build
```

`npm run dev` opens the local demo. `tools/generate.mjs` synchronises the model and view with the adjacent Vue component. The published runtime uses React and does not depend on Vue.

## License

[MIT License](LICENSE)
