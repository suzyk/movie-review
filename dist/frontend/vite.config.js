import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  server: {
    open: '/', // Set the default page to load
    proxy: {
      '/api': 'http://localhost:8000', // vite and express talk
    },/*
    watch: {
      usePolling: true,
    },*/
    fs: {
      strict: false, // Allow serving files from outside the root
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        movie: path.resolve(__dirname, 'movie.html'),
        reviews: path.resolve(__dirname, 'reviews.html'),
        search: path.resolve(__dirname, 'search.html')
        // Add more HTML entry points as needed
      }
    }
  }
});