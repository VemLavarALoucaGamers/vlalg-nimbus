import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import image from '@rollup/plugin-image';
import path from 'path';
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/install.js'),
      name: 'NbButtons',
      fileName: 'nb-buttons',
      formats: ['umd', 'es'],
    },
    rollupOptions: {
      // Make sure to externalize deps that shouldn't into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  external: [
    /node_modules/
  ],
  plugins: [
    nodeResolve({
      moduleDirectories: ['node_modules']
    }),
    commonjs(),
    image(),
    vue()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': path.resolve(__dirname, 'src', 'components'),
      '@helpers': path.resolve(__dirname, 'src', 'helpers'),
      '@images': path.resolve(__dirname, 'src', 'images'),
    },
  },
});
