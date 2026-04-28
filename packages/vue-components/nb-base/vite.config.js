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
      name: 'NbNavigation',
      fileName: 'nb-navigation',
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
    vue(), // Vue plugin primeiro
    nodeResolve({
      moduleDirectories: ['node_modules']
    }),
    commonjs(),
    image(),
  ],
  resolve: {
    alias: [
      // Aliases do nb-inputs (com find para evitar conflito)
      {
        find: /^@components$/,
        replacement: path.resolve(__dirname, 'src', 'components'),
      },
      {
        find: /^@components\/(.*)$/,
        replacement: path.resolve(__dirname, 'src', 'components') + '/$1',
      },
      {
        find: /^@helpers$/,
        replacement: path.resolve(__dirname, 'src', 'helpers'),
      },
      {
        find: /^@helpers\/(.*)$/,
        replacement: path.resolve(__dirname, 'src', 'helpers') + '/$1',
      },
      {
        find: /^@images$/,
        replacement: path.resolve(__dirname, 'src', 'images'),
      },
      {
        find: /^@images\/(.*)$/,
        replacement: path.resolve(__dirname, 'src', 'images') + '/$1',
      },
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
      },
    ],
  },
});
