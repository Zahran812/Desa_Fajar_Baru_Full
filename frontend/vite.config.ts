import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/frontend/",
  plugins: [react()],
  server: {
    allowedHosts: true,
    hmr: { overlay: false },
  },
  build: {
    chunkSizeWarningLimit: 1500,
    target: "es2018",
    cssMinify: true,
    minify: "esbuild",
    sourcemap: false,
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          router: ["react-router-dom"],
          ui: ["lucide-react"],
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          const ext = assetInfo.name?.split(".").pop()?.toLowerCase();
          if (ext && ["png", "jpg", "jpeg", "gif", "svg", "webp", "ico"].includes(ext)) {
            return "assets/img/[name]-[hash][extname]";
          }
          if (ext && ["css"].includes(ext)) {
            return "assets/css/[name]-[hash][extname]";
          }
          if (ext && ["woff", "woff2", "ttf", "eot"].includes(ext)) {
            return "assets/fonts/[name]-[hash][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  esbuild: {
    // drop: process.env.NODE_ENV === 'production' ? ["console", "debugger"] : [], // DISABLED for debugging
    legalComments: "none",
  },
});
