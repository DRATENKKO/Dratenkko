import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  build: {
    outDir: "docs",
    emptyOutDir: true,
  },
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.minimax.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/anthropic/v1'),
      },
    },
  },
})