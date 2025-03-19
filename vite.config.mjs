import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import viteImagemin from 'vite-plugin-imagemin';

const isProd = process.env.NODE_ENV === 'production';

const base = process.env.BASE_URL || '/teste-frontend/';

export default defineConfig({
  base,

  server: {
    port: 3000,
    open: true,
    host: '0.0.0.0',
  },

  preview: {
    port: 4173,
    open: true,
    host: '0.0.0.0',
  },

  build: {
    outDir: 'dist',
    minify: 'esbuild',
    target: 'es2018',
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', '@tanstack/react-query'],
        },
      },
    },
  },

  plugins: [
    react(),

    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',

      manifest: {
        name: 'Catálogo de Smartphones',
        short_name: 'SmartCatalog',
        description: 'Catálogo de smartphones com as melhores opções',
        theme_color: '#ffffff',
        background_color: '#f5f5f5',
        display: 'standalone',
        start_url: './',
        icons: [
          {
            src: './icons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: './icons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: './icons/maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      devOptions: {
        enabled: true,
        type: 'module',
      },

      workbox: {
        globDirectory: isProd ? 'dist' : null,
        globPatterns: ['**/*.{html,js,css,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: { maxEntries: 50 },
            },
          },

          {
            urlPattern: /\.(?:js|css)$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'assets',
            },
          },

          {
            urlPattern: /\.json$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-data',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 5,
              },
              networkTimeoutSeconds: 10,
            },
          },

          {
            urlPattern: new RegExp('^https?://.*/(api|products)'),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 5,
              },
              networkTimeoutSeconds: 10,
            },
          },
        ],
        inlineWorkboxRuntime: true,
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
      },
    }),

    viteImagemin({
      gifsicle: { optimizationLevel: 7 },
      optipng: { optimizationLevel: 5 },
      mozjpeg: { quality: 75 },
      pngquant: { quality: [0.7, 0.8], speed: 4 },
      webp: { quality: 75 },
    }),
  ],

  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
    },
  },
});
