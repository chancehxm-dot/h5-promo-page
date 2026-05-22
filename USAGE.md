# H5 推广页面使用指南

## 项目位置

```
C:\git-work\old\h5-promo-page
```

## 快速开始

```bash
cd C:\git-work\old\h5-promo-page

# 开发模式
npm run dev

# 生产构建
npm run build

# 预览构建结果
npm run preview
```

## 访问地址

### A 面（默认页面）
直接访问：`http://localhost:5173/`

### B 面（带参数）
访问：`http://localhost:5173/?m=b`

## 功能说明

### A 面 - 仿 App Store 安装页面
- 展示应用图标、名称、开发者信息
- 显示评分、下载量、年龄评级
- 应用截图轮播
- 安装按钮（点击唤起 App Store）
- 数据安全信息
- 更新日志

### B 面 - 二次推广页面
当 URL 包含 `?m=b` 参数时：
1. 首次访问显示 A 面
2. 点击安装按钮后唤起 App Store
3. 用户返回后自动显示 B 面（轮播 banner + 功能介绍）

## 自定义配置

编辑 `src/config/app.config.ts`：

```typescript
export const defaultConfig: AppConfig = {
  // 基本配置
  appName: 'ReadWave',                    // 应用名称
  developer: 'BitVisual Technology Limited', // 开发者
  appIcon: '/icon.png',                   // 应用图标
  favicon: '/favicon_v3.ico',             // 网站 favicon

  // 统计信息
  rating: '4.5',                          // 评分
  downloads: '100K+',                     // 下载量
  ageRating: 'Mature 17+',                // 年龄评级

  // 截图
  screenshots: ['/1.png', '/2.png', '/3.png', '/4.png'],

  // 描述
  description: '应用描述...',
  shortDescription: '简短描述...',
  category: 'Books & Reference',
  updatedDate: 'May 8, 2026',

  // 安装链接（重要：改为实际链接）
  installUrl: 'https://apps.apple.com/app/readwave',

  // B 面配置
  bPageBanners: ['/banner1.png', '/banner2.png', '/banner3.png'],
  bPageTitle: 'Welcome Back!',
  bPageDescription: '继续您的阅读之旅...',
  bPageInstallUrl: 'https://apps.apple.com/app/readwave',
};
```

## 图片资源

将图片放在 `public/` 目录：
- `icon.png` - 应用图标
- `favicon_v3.ico` - 网站图标
- `1.png`, `2.png`, `3.png`, `4.png` - 应用截图
- `banner1.png`, `banner2.png`, `banner3.png` - B 面轮播图

## 部署

```bash
npm run build
# 生成的文件在 dist 目录
# 将 dist 目录上传到服务器即可
```

## 测试流程

1. 访问 `http://localhost:5173/` 查看 A 面
2. 访问 `http://localhost:5173/?m=b` 测试 B 面逻辑
3. 点击安装按钮
4. 模拟从 App Store 返回（刷新页面或重新打开标签页）
5. 应该看到 B 面内容

## 注意事项

1. **installUrl**：必须修改为实际的 App Store 链接
2. **图片路径**：确保所有图片都在 `public/` 目录下
3. **HTTPS**：生产环境建议使用 HTTPS
4. **localStorage**：页面状态保存在 localStorage，清除缓存会重置状态
