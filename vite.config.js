import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Only VITE_-prefixed vars are exposed to the client; loadEnv with a '' prefix
  // lets the config itself read VITE_BASE_PATH before that filtering happens.
  const env = loadEnv(mode, import.meta.dirname, '')

  return {
    plugins: [react()],
    // Served from the domain root by default. A GitHub Pages *project* site
    // lives under /<repo>/, so `npm run deploy` overrides this with --base.
    base: env.VITE_BASE_PATH || '/',
  }
})
