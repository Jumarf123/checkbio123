import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ezbio/', // Для GitHub Pages: замените на имя вашего репозитория
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
