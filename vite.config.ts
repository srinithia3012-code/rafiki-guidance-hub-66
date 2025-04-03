import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Target newer browsers for smaller bundle size
    target: 'es2020',
    // Sourcemap in development, none in production
    sourcemap: mode === 'development',
    // Inline small assets
    assetsInlineLimit: 4096,
    // Customize the Rollup output
    rollupOptions: {
      output: {
        // Split chunks based on size threshold
        manualChunks: (id) => {
          // Put React components in a separate chunk
          if (id.includes('node_modules/react') || 
              id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }
          // Shadcn UI components
          if (id.includes('@/components/ui')) {
            return 'ui-components';
          }
          // Third-party deps in another chunk
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          // Everything else uses default chunking
        },
        // Chunk naming
        chunkFileNames: 'assets/[name]-[hash].js',
        // Asset naming
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // Minification settings
    minify: 'esbuild',
    // Optimize dependencies
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  optimizeDeps: {
    // Include dependencies that need optimization
    include: ['react', 'react-dom', 'react-router-dom'],
    // Force optimization even in development
    force: mode === 'production',
  }
}));
