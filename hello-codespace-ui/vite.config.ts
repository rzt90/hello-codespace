import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:9527'
    },
    allowedHosts: ['expert-space-funicular-6945r6p7q5962rx47-9527.app.github.dev']
  }
})
