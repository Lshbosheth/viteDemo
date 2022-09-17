import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
export default defineConfig({
  plugins: [
    vue()],
  base: './',
  resolve: {
    // 别名
    alias: {
      '@': resolve(__dirname, 'src'),
      'sty': resolve(__dirname, 'styles'),
      'pkg': resolve(__dirname, 'packages')
    }
  }
})
