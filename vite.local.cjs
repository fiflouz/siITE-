const react = require('@vitejs/plugin-react');
const tailwind = require('tailwindcss');
const { defineConfig } = require('vite');

module.exports = defineConfig({
  cacheDir: '.vite',
  plugins: [react()],
  publicDir: './static',
  base: './',
  css: {
    postcss: { plugins: [tailwind()] },
  },
  server: {
    host: '127.0.0.1',
    port: 5174,
    strictPort: true,
  },
});
