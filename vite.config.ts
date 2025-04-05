
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
            supabase: ['@supabase/supabase-js'],
            openai: ['openai'],
            charts: ['recharts'],
          },
        },
      },
      // Reduce chunk size warnings
      chunkSizeWarningLimit: 1000,
      // Enable source map generation for debugging
      sourcemap: mode !== 'production',
      // Enable asset hashing for better caching
      assetsInlineLimit: 4096,
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom'],
      // Exclude large dependencies from optimization to speed up dev server start
      exclude: ['@supabase/supabase-js', 'openai'],
    },
    // Add caching headers to static assets
    preview: {
      headers: {
        'Cache-Control': 'public, max-age=31536000', // 1 year for static assets
      },
    },
  };
});
