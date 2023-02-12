import { resolve } from 'path'
import { VitePWA } from 'vite-plugin-pwa'
import styleImport from 'vite-plugin-style-import'
import ViteComponents from 'vite-plugin-components'
import svgLoader from 'vite-svg-loader'

import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

const pwaConfig = {
  manifest: {
    theme_color: '#1e1b26',
    background_color: '#1e1b26',
    display: 'standalone',
    scope: '/',
    start_url: '/',
    name: 'Movieology',
    short_name: 'Movieology',
    description: 'Что посмотреть? Мы знаем и вам расскажем',
    icons: [
      {
        src: 'images/manifest-icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable any'
      },
      {
        src: 'images/manifest-icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable any'
      },
      {
        src: 'images/manifest-icon-512.png',
        sizes: '256x256',
        type: 'image/png'
      },
      {
        src: 'images/manifest-icon-512.png',
        sizes: '384x384',
        type: 'image/png'
      }
    ]
  },
  workbox: {
    // workbox options for generateSW
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, './src') }]
  },
  build: {
    chunkSizeWarningLimit: 600
  },
  plugins: [
    Vue(),
    VitePWA(pwaConfig),
    ViteComponents({
      globalComponentsDeclaration: true
    }),
    svgLoader(),
    styleImport({
      libs: [
        {
          libraryName: 'element-plus',
          esModule: true,
          ensureStyleFile: true,
          resolveStyle: (name) => {
            name = name.slice(3)
            return `element-plus/packages/theme-chalk/src/${name}.scss`
          },
          resolveComponent: (name) => {
            return `element-plus/lib/${name}`
          }
        }
      ]
    })
  ]
})
