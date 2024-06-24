import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Портът по подразбиране е 3000, но можете да го промените
  },
  build: {
    outDir: 'build', // Папката, където ще бъде генериран продукционният билд
  },
});
