
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Only use the subpath for GitHub Pages production deployments
  base: mode === 'production' && process.env.VITE_GITHUB_ACTIONS === 'true' ? "/rafiki-guidance-hub-66/" : "/",
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
    // Output directory
    outDir: 'dist',
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
  // Ensure environment variables have fallbacks for production
  define: {
    // Ensure environment variables have fallbacks
    ...(mode === 'production' && {
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(process.env.VITE_SUPABASE_URL || "https://mhbhyimkykyvuphbefwg.supabase.co"),
      'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(process.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oYmh5aW1reWt5dnVwaGJlZndnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3NjE3MjEsImV4cCI6MjA1NzMzNzcyMX0.q42WQ2LzGfzxch1ghkMOoArCGNo0jxfiqOwY9SQsXnQ"),
      'import.meta.env.VITE_USE_REAL_AI': JSON.stringify(process.env.VITE_USE_REAL_AI || "true"),
      'import.meta.env.BASE_URL': JSON.stringify(process.env.PUBLIC_URL || "/rafiki-guidance-hub-66/"),
    })
  },
  optimizeDeps: {
    // Include dependencies that need optimization
    include: ['react', 'react-dom', 'react-router-dom'],
    // Force optimization even in development
    force: mode === 'production',
  }
}));
