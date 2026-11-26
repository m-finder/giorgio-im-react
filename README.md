# Giorgio IM React

React + TypeScript 即时通讯组件。界面、配置、消息格式、回调和公开方法与 [Giorgio IM Vue 版](https://github.com/m-finder/giorgio-im) 保持一致，使用 React 18.3+ 或 React 19。

[简体中文](README.md) | [English](README.en.md)

## 快速体验包

可从 [Giorgio IM Releases 页面](https://github.com/m-finder/giorgio-im/releases) 下载适合系统的 `im-test-*` 独立程序（Windows 为 `.exe`），运行后按终端提示打开演示页面，无需安装 PHP、Node.js、Composer 或 Redis。体验包的网页界面使用 Vue 版；React 组件请按下方步骤安装。

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
  panelWidth: 360,
  panelHeight: 680,
  onSendMessage(payload) { console.log(payload) },
})

im.chat({ id: 'alice', type: 'friend', username: 'Alice' })
im.open()
// 不再需要时调用 im.destroy()
```

`createIM()` 只在浏览器中调用，自动挂载到 `document.body` 并注入样式。也可以传入 `target` 指定挂载元素。

`panelWidth`、`panelHeight` 设置好友列表主窗口的宽高，单位为像素，默认 `316 × 630`。超出视口时自动缩小；屏幕宽度不超过 `540px` 时保持全屏。`createConnectedIM()` 将它们放在 `widget` 中，组件也可直接传入。

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
- 粘贴或从工具栏选择图片时先在输入区预览，可与文字作为同一条消息发送
- 可累积选择或粘贴多张图片、逐张移除；多图消息使用 `attachments` 数组
- 点击聊天图片或引用缩略图可放大预览，使用按钮或左右方向键切换当前会话已加载的图片，按 Esc 或点击遮罩关闭
- 群聊 @ 成员、私聊和群聊消息引用，支持引用预览与取消
- 群聊列表左滑可静音或取消静音，保留未读条数，@ 自己仍提醒；群聊、最近会话和多会话列表显示静音图标
- 已读回执、输入状态、在线状态、好友拉黑、群管理和多语言
- 默认关闭的 AES-256-GCM 加密本地备份
- `createIM()`、`createConnectedIM()`、`ImWidget` 与 Vue 版导出相同的数据类型和配置类型
- `ImWidgetApi` 包含 `chat`、`getMessage`、`setContacts`、`setUser`、`setTyping`、`setMessageRead`、`setToolbar`、`open`、`close`、`resetWindows`、`setLocale`、好友与群管理方法

内置 `zh-CN` 和 `en`。可以通过 `locales` 扩展语言包，或调用 `im.setLocale('en')`。详见源码中的 `src/types.ts` 和 `src/locales.ts`，字段与 Vue 版一致。

群聊个人通知设置使用 `notificationsMuted`，由 `muteGroupNotifications(group, muted)` 保存，成功后触发 `onGroupNotificationsMuted`；服务端更新可调用 `im.setGroupNotificationsMuted(groupId, muted)`。连接配套后端时自动保存，升级后先运行 `php artisan migrate`；独立使用时可开启 `enableLocalStorage` 保留设置。

群聊 @ 使用 `loadGroupMembers` 或 `setGroupMembers` 提供的成员列表。`mentions` 为 `{ id, username, start, end }[]`（UTF-16 索引），`replyTo` 为 `{ mid, fromid, username, content }`，图片引用另带 `attachment` 或 `attachments`，显示缩略图及文字。连接器发送时只提交引用身份，配套后端升级后需运行 `php artisan migrate`。详见 [Vue 版消息说明](https://github.com/m-finder/giorgio-im#消息)。

私聊和群聊均可引用自己或他人的消息。接收消息和历史消息需提供 `mid`，群聊还需提供发送者 `fromid`。`messageQuote` 默认 `true`；设置 `createIM({ init, messageQuote: false })` 或 `<ImWidget init={init} messageQuote={false} />` 可关闭引用入口并取消尚未发送的引用，已有引用内容仍会显示。

`createConnectedIM` 已内置好友一对一 WebRTC 语音和视频通话，支持接听、拒绝、挂断、静音和计时。视频通话显示双方画面，支持独立开关摄像头。升级后端后运行 `php artisan migrate`，通过 HTTPS 或 localhost 使用摄像头和麦克风，仅在接听来电后申请权限；跨网络可在 `widget.voiceCall.iceServers` 配置 STUN/TURN。独立组件使用 `voiceCall.sendSignal` 与 `receiveCallSignal` 对接信令，视频信令需保留 `type: 'video'`；`onCall` 可覆盖内置通话。

可通过“设置”切换六种配色、四张背景、上传本地背景或恢复默认，选择按账号保存并在刷新后恢复。`skin`、`background` 可设置初始外观，例如 `<ImWidget init={init} skin="green" background="mountains" />`。

设置和通话窗口支持拖动；通话最小化时，语音显示说话人的头像和姓名，视频保留画面。

群聊工具栏支持群语音和视频通话，不设固定人数上限；成员（含发起者）挂断只退出本人，退出后不足两人则结束通话。升级后端后运行 `php artisan migrate`。网状 WebRTC 连接适合小规模群聊。独立使用时，通过 `loadGroupMembers` 或 `setGroupMembers` 提供群成员，并在信令中保留 `groupId`、`participants` 和 `group`。

## 开发

```bash
npm install
npm run dev
npm run typecheck
npm run build
```

`npm run dev` 打开本地演示。`tools/generate.mjs` 从相邻的 Vue 版组件同步核心交互和视图结构，生成 React 使用的模型与渲染函数；发布包运行时只依赖 React，不依赖 Vue。

## 协议

[MIT License](LICENSE)
