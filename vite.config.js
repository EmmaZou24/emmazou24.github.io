import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/emmazou24.github.io/', // Change this to your repository name, or '/' if using a custom domain
})
