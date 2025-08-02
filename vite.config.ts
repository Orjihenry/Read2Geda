import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/Read2Geda/",
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  plugins: [react()],
})
