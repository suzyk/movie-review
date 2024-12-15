import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  server: {
    open: '/index.html', // Set the default page to load
    watch: {
      usePolling: true,
    },
    fs: {
      strict: false, // Allow serving files from outside the root
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        movieDetail: path.resolve(__dirname, 'movie-detail.html'),
        reviews: path.resolve(__dirname, 'reviews.html'),
        search: path.resolve(__dirname, 'search-result.html')
        // Add more HTML entry points as needed
      }
    }
  }
});