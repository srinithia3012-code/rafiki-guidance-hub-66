
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Determine the base path - use "/" for development and Lovable preview
  // For GitHub Pages deployment, use the repository name as base
  const base = mode === 'production' && process.env.GITHUB_ACTIONS === 'true' 
    ? '/rafiki-guidance-hub-66/' 
    : '/';
  
  console.log(`Building with base: ${base} for mode: ${mode}`);
  
  return {
    base,
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
      // Improve build performance
      target: 'es2015',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: false, // Keep console logs for debugging
          drop_debugger: true
        }
      },
      cssMinify: true,
      // Enable code splitting
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            ui: ['@/components/ui'],
          },
        },
      },
      // Reduce chunk size warnings
      chunkSizeWarningLimit: 1000,
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom'],
    },
  };
});
