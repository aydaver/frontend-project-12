import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5002,
    proxy: {
      '/api': {
        target: 'http://localhost:5002',
      },
      '/socket.io': {
        target: 'ws://localhost:5002',
        ws: true,
        rewriteWsOrigin: true,
      },
    },
  }
})
