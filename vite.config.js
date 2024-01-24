import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import monacoEditorPlugin from 'vite-plugin-monaco-editor';
import unocss from '@unocss/vite';

const prefix = `monaco-editor/esm/vs`;

export default defineConfig({
  plugins: [
      vue(),
      unocss(),
      monacoEditorPlugin({
          languages: ['json', 'css', 'html', 'editorWorkerService']
      })],
  base: './',
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    jsonWorker: [`${prefix}/language/json/json.worker`],
                    cssWorker: [`${prefix}/language/css/css.worker`],
                    htmlWorker: [`${prefix}/language/html/html.worker`],
                    tsWorker: [`${prefix}/language/typescript/ts.worker`],
                    editorWorker: [`${prefix}/editor/editor.worker`],
                },
            },
        },
    },
  resolve: {
    // 别名
    alias: {
      '@': resolve(__dirname, 'src'),
      'sty': resolve(__dirname, 'styles'),
      'pkg': resolve(__dirname, 'packages')
    }
  }
})
