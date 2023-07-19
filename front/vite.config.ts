import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080
  },
  watch: {
    ignored: ['!**/node_modules/your-package-name/**'],
  },
  build: {
    emptyOutDir: true,
    outDir : '../back/static',
    pulicDir: '../back/template',
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        index: "./src/main.tsx"
      },
      output: {
          entryFileNames: 'bundle.js',
          assetFileNames: '[name].[ext]',
      }
    },

  }
  
})