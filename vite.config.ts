import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Replace '<REPO_NAME>' with the name of your GitHub repository
  // For example, if your repository is at https://github.com/your-username/my-portfolio,
  // then the base should be '/my-portfolio/'
  base: "/MYPFV2/",
  plugins: [react()],
})
