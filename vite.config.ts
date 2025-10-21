import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const repoName = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/')[1] : null;

  return {
    plugins: [react()],
    base: mode === 'production' && repoName ? `/${repoName}/` : '/',
    server: {
      port: 3000,
    },
  }
})
