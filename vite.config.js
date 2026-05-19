import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    tailwindcss(),
    ViteImageOptimizer({
      png: {
        quality: 80,
        compressionLevel: 9,
      },
      webp: {
        quality: 80,
      },
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        'blue-diode-laser': resolve(__dirname, 'products/blue-diode-laser.html'),
        'ultrasonic-surgery': resolve(__dirname, 'products/ultrasonic-surgery.html'),
        'holmium-laser': resolve(__dirname, 'products/holmium-laser.html'),
        consumables: resolve(__dirname, 'products/consumables.html'),
        about: resolve(__dirname, 'about.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
    },
  },
})
