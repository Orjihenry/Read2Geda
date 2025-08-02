import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/read2geda/",
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  plugins: [react()],
})
