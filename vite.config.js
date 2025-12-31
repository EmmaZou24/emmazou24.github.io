import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'
import { join } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-404-and-cname',
      closeBundle() {
        // Copy 404.html and CNAME to dist after build
        try {
          copyFileSync(
            join(__dirname, 'public', '404.html'),
            join(__dirname, 'dist', '404.html')
          )
          copyFileSync(
            join(__dirname, 'public', 'CNAME'),
            join(__dirname, 'dist', 'CNAME')
          )
        } catch (err) {
          console.warn('Could not copy files:', err)
        }
      }
    }
  ],
  base: '/', // Root path for username.github.io repositories
})
