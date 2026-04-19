import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Para GitHub Pages: usa el nombre del repositorio
  // Para Cloudflare Pages: cambia a base: "/"
  base: "/",
  build: {
    outDir: "docs",
    emptyOutDir: true,
  },
  plugins: [react()],
})
