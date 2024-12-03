import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        // SVGR options
        icon: true, // Make SVG fit to 1em to behave like font icons
        dimensions: false, // Remove width/height and use viewBox only
        svgo: true, // Enable SVGO optimization
        svgoConfig: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  removeViewBox: false, // Keep viewBox for proper scaling
                  removeTitle: true, // Remove title for cleaner code
                },
              },
            },
            'removeDimensions', // Remove width/height attributes
          ],
        },
      },
      include: '**/*.svg',
    }),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Group SVG icons into a separate chunk
          if (id.includes('/assets/icons/')) {
            return 'icons';
          }
        },
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  esbuild: {
    loader: 'tsx',
    include: /\.[jt]sx?$/,
    exclude: [],
  },
});
