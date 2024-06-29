import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react-swc'
import istanbul from 'vite-plugin-istanbul'

export default defineConfig({
  server: {
    host: true,
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@shadcn': path.resolve(__dirname, './src/shadcn'),
      '@pages': path.resolve(__dirname, './src/pages'),
    },
  },
  plugins: [
    react(),
    istanbul({
      cypress: true,
      requireEnv: false,
    }),
  ],
})
