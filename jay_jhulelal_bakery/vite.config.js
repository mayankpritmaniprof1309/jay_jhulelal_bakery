import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(),react()],
  server: {
    port: 5173,     // ← locked port
    strictPort: true, // ← fails instead of switching to another port if busy
  },
})
