import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import image from '@rollup/plugin-image';
import path from 'path';
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: false,
    lib: {
      entry: path.resolve(__dirname, 'src/plugin/index.ts'),
      name: 'NbGtm',
      fileName: 'nb-gtm',
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
    vue(),
    dts({
      tsConfigFilePath: './tsconfig.json', // isso garante que ele use o seu tsconfig corretamente
      outDir: 'dist',
      // se quiser remover arquivos que não têm tipos exportáveis:
      skipDiagnostics: false,
      cleanVueFileName: true,
      staticImport: true,
      insertTypesEntry: true, // Gera um `index.d.ts` na raiz apontando para o entry
      copyDtsFiles: true,     // Copia os arquivos `.d.ts` para o dist
      sourceMap: false
    }),
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
