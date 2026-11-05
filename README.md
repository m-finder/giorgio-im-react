# Giorgio IM React

React + TypeScript 即时通讯组件。界面、配置、消息格式、回调和公开方法与 [Giorgio IM Vue 版](https://github.com/m-finder/giorgio-im) 保持一致，使用 React 18.3+ 或 React 19。

[简体中文](README.md) | [English](README.en.md)

## 安装

组件发布到 GitHub Packages。先在项目 `.npmrc` 中配置：

```ini
@m-finder:registry=https://npm.pkg.github.com
```

使用具有 `read:packages` 权限的 GitHub classic PAT 登录，然后安装：

```bash
npm login --scope=@m-finder --auth-type=legacy --registry=https://npm.pkg.github.com
npm install @m-finder/giorgio-im-react react react-dom
```

## 快速开始

```ts
import { createIM, type ImInit } from '@m-finder/giorgio-im-react'

const init: ImInit = {
  user: { id: 'me', username: '我' },
  friend: [{ id: 'team', groupname: '同事', list: [
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
// 不再需要时调用 im.destroy()
```

`createIM()` 只在浏览器中调用，自动挂载到 `document.body` 并注入样式。也可以传入 `target` 指定挂载元素。

## React 组件

```tsx
import { useRef } from 'react'
import { ImWidget, type ImInit, type ImWidgetApi } from '@m-finder/giorgio-im-react'

const init: ImInit = { user: { id: 'me', username: '我' }, friend: [], group: [] }

function App() {
  const widget = useRef<ImWidgetApi>(null)
  return <ImWidget ref={widget} init={init} locale="zh-CN" />
}
```

组件 `ref` 提供与 `createIM()` 相同的方法。组件属性与 `ImOptions` 一致，`target` 仅供 `createIM()` 使用。

## Laravel + Socket

与 Vue 版使用同一后端、票据协议和 WebSocket 事件：

```ts
import { createConnectedIM } from '@m-finder/giorgio-im-react'

const im = await createConnectedIM({
  apiUrl: '/api/im',
  token: () => accessToken,
  widget: { locale: 'zh-CN' },
  onConnectionChange: state => console.log(state),
  onError: (error, operation) => console.error(operation, error),
})
im.open()
```

`createConnectedIM()` 处理初始化、票据、WebSocket、事件补取、重连、好友和群管理。服务端需要支持 Vue 版相同的 `/init`、`/socket-ticket`、`/messages`、`/uploads` 等 API 及 Socket `sync` 报文。

## 功能与接口

- 联系人、好友分类、群聊、最近会话、通知、拖动窗口和客服模式
- 文本、图片、文件、语音、表情、AI 流式 Markdown 回复及可配置工具栏
- 已读回执、输入状态、在线状态、好友拉黑、群管理和多语言
- 默认关闭的 AES-256-GCM 加密本地备份
- `createIM()`、`createConnectedIM()`、`ImWidget` 与 Vue 版导出相同的数据类型和配置类型
- `ImWidgetApi` 包含 `chat`、`getMessage`、`setContacts`、`setUser`、`setTyping`、`setMessageRead`、`setToolbar`、`open`、`close`、`resetWindows`、`setLocale`、好友与群管理方法

内置 `zh-CN` 和 `en`。可以通过 `locales` 扩展语言包，或调用 `im.setLocale('en')`。详见源码中的 `src/types.ts` 和 `src/locales.ts`，字段与 Vue 版一致。

## 开发

```bash
npm install
npm run dev
npm run typecheck
npm test
npm run build
```

`npm run dev` 打开本地演示。`tools/generate.mjs` 从相邻的 Vue 版组件同步核心交互和视图结构，生成 React 使用的模型与渲染函数；发布包运行时只依赖 React，不依赖 Vue。

## 协议

[MIT License](LICENSE)
