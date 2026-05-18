import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'src/home.html'),
        'blue-diode-laser': resolve(__dirname, 'src/products/blue-diode-laser.html'),
        'ultrasonic-surgery': resolve(__dirname, 'src/products/ultrasonic-surgery.html'),
        'holmium-laser': resolve(__dirname, 'src/products/holmium-laser.html'),
        consumables: resolve(__dirname, 'src/products/consumables.html'),
        about: resolve(__dirname, 'src/about.html'),
        contact: resolve(__dirname, 'src/contact.html'),
      },
    },
  },
})
