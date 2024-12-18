import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import autoprefixer from 'autoprefixer'
import tailwindcss from "tailwindcss";

export default defineConfig(() => {
  return {
    base: './',
    build: {
      outDir: 'build',
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler' // or "modern"
        }
      },
      postcss: {
        plugins: [
          tailwindcss,
          autoprefixer({}), // add options if needed
        ],
      },
    },
    esbuild: {
      loader: 'jsx',
      include: /src\/.*\.jsx?$/,
      exclude: [],
    },
    optimizeDeps: {
      force: true,
      esbuildOptions: {
        loader: {
          '.js': 'jsx',
        },
      },
    },
    plugins: [
      react(),
    ],
    resolve: {
      alias: [
        {
          find: 'stream', // Add the alias for `stream`
          replacement: 'stream-browserify',
        },
        {
          find: 'src/',
          replacement: `${path.resolve(__dirname, 'src')}/`,
        },
        {
          find: 'shared/',
          replacement: `${path.resolve(__dirname, 'src/shared')}/`,
        },
      ],
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.scss'],
    },
    server: {
      port: 3000,
      historyApiFallback: true, // Ensures clean URL routing
      proxy: {
        // https://vitejs.dev/config/server-options.html
      },
    },
  }
})
