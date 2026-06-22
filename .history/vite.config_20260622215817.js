import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      babel: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
        plugins: [],
        babelrc: false,
        configFile: false,
      },
    }),
  ],
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
  },
  server: {
    port: 5173,
    open: true,
  },
});