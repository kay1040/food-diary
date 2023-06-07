import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
			include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue'],
		}),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      eslintrc: {
        enabled: false, 
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true 
      },
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/mixin.scss";`
      }
    }
  }
})
