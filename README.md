# H5 推广页面

基于 React + Vite + TypeScript 构建的 H5 应用推广页面，支持 A/B 面切换和用户行为追踪。

## 功能特性

- **A 面**：仿 iOS App Store 的应用详情页面
- **B 面**：用户点击安装按钮后返回时展示的二次推广页面
- **页面状态监听**：通过多种事件监听用户是否离开并返回页面
- **可配置**：所有内容（logo、标题、描述、截图等）均可通过配置文件修改

## 技术栈

- React 18
- TypeScript
- Vite 5
- CSS Modules

## 项目结构

```
src/
├── components/
│   ├── PageA/           # A 面组件（仿 App Store）
│   │   ├── index.tsx
│   │   └── styles.css
│   └── PageB/           # B 面组件（二次推广）
│       ├── index.tsx
│       └── styles.css
├── config/
│   └── app.config.ts    # 应用配置文件
├── hooks/
│   ├── usePageVisibility.ts   # 页面可见性监听
│   └── useQueryParams.ts      # URL 参数解析
├── App.tsx
├── App.css
├── main.tsx
└── index.css
```

## 使用说明

### A 面（默认页面）

直接访问页面时显示，展示应用详情、截图、安装按钮等。

### B 面（带参数访问）

当 URL 包含 `?m=b` 参数时启用 B 面逻辑：
1. 首次访问显示 A 面
2. 用户点击安装按钮后唤起 App Store
3. 用户从 App Store 返回后自动切换到 B 面（二次推广页面）

### 修改配置

编辑 `src/config/app.config.ts` 文件来自定义页面内容：

```typescript
export const defaultConfig: AppConfig = {
  appName: 'Your App Name',
  developer: 'Your Company',
  appIcon: '/icon.png',
  installUrl: 'https://apps.apple.com/app/your-app',
  // ... 更多配置项
};
```

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 页面状态监听技术

项目使用组合策略来监听用户的页面切换行为：

1. **visibilitychange 事件**：监听标签页切换
2. **focus/blur 事件**：监听窗口焦点变化
3. **pagehide/pageshow 事件**：监听页面显示/隐藏
4. **定时器检测**：点击后启动定时器持续检测用户是否返回

状态保存在 `localStorage` 中，确保刷新页面后仍能正确显示 B 面。

## 部署

构建后的文件在 `dist` 目录，可直接部署到任何静态文件服务器。

```bash
npm run build
# dist 目录中的文件可部署到 Nginx、CDN 等
```

## 注意事项

1. 确保 `public` 目录中包含所有需要的图片资源
2. 修改 `installUrl` 为实际的 App Store 链接
3. B 面的 banner 图片需要在配置中指定路径
4. 建议使用 HTTPS 部署以获得更好的 iOS 兼容性
