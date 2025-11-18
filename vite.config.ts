// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // Proper Node.js core polyfills
      stream: 'stream-browserify',
      crypto: 'crypto-browserify',
      buffer: 'buffer',
      util: 'util',
      process: 'process/browser',
      assert: 'assert',
      http: 'stream-http',
      https: 'https-browserify',
      os: 'os-browserify/browser',
      path: 'path-browserify',
      zlib: 'browserify-zlib',
    },
  },
  define: {
    global: 'globalThis',
    'process.env': process.env,
    'process.browser': true,
  },
  optimizeDeps: {
    include: [
      'buffer',
      'process',
      'util',
      'stream-browserify',
      'crypto-browserify',
    ],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});