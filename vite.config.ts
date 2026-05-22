import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // 生产环境优化
    minify: 'terser',
    terserOptions: {
      compress: {
        // 移除 console
        drop_console: true,
        drop_debugger: true,
        // 移除无用的代码
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        // 死代码消除
        dead_code: true,
        // 移除无法访问的代码
        conditionals: true,
        // 移除重复的键
        evaluate: true,
      },
      format: {
        // 移除注释
        comments: false,
      },
      // 混淆变量名
      mangle: {
        safari10: true,
        // 不保留函数名
        keep_fnames: false,
        // 更深入的混淆
        toplevel: true,
        // 混淆属性名
        properties: false,
      },
    },
    // 代码分割
    rollupOptions: {
      output: {
        manualChunks: undefined,
        // 文件名哈希
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // 禁用源码映射（保护源码）
    sourcemap: false,
    // chunk 大小警告阈值
    chunkSizeWarningLimit: 1000,
    // CSS 代码拆分
    cssCodeSplit: true,
    // CSS 压缩
    cssMinify: true,
  },
})
