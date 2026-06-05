import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import react from '@vitejs/plugin-react'
import path from 'path'

const componentsPath = path.resolve(__dirname, '../components/src')
const repoName = 'rebecca-testing'
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true'

export default defineConfig({
  base: isGitHubActions ? `/${repoName}/` : '/',
  plugins: [vue(), react()],
  resolve: {
    alias: {
      // Resolve @pendo/components to the local source
      '@pendo/components': componentsPath,
      // Internal aliases used by the components repo
      '@': componentsPath,
      // Ensure Vue resolves to a single instance
      'vue': path.resolve(__dirname, 'node_modules/vue')
    }
  }
})
