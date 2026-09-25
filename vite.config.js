import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Static SPA build -> dist/  (served by Nginx on EC2)
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 700,
  },
  server: {
    port: 5173,
    host: true,
  },
  preview: {
    port: 4173,
    host: true,
  },
})
