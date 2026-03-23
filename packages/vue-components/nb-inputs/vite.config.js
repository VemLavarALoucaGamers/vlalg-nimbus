import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import image from '@rollup/plugin-image';
import path from 'path';
import { fileURLToPath, URL } from 'node:url'

// Plugin para resolver aliases do nb-calendar durante desenvolvimento
const calendarAliasPlugin = () => {
  const calendarSrcPath = path.resolve(__dirname, '../nb-calendar/src')
  
  return {
    name: 'calendar-alias-resolver',
    enforce: 'pre', // Executar antes de outros plugins
    resolveId(id, importer) {
      // Se o import vem de dentro do nb-calendar, resolver os aliases
      if (importer && (importer.includes('nb-calendar') || importer.includes('calendar'))) {
        if (id === '@components/NbCalendar.vue' || id.startsWith('@components/')) {
          const filePath = id.replace('@components/', '')
          const resolved = path.resolve(calendarSrcPath, 'components', filePath)
          return resolved
        }
        if (id.startsWith('@helpers/')) {
          const filePath = id.replace('@helpers/', '')
          return path.resolve(calendarSrcPath, 'helpers', filePath)
        }
        if (id.startsWith('@images/')) {
          const filePath = id.replace('@images/', '')
          return path.resolve(calendarSrcPath, 'images', filePath)
        }
      }
      return null
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/install.js'),
      name: 'NbInputs',
      fileName: 'nb-inputs',
      formats: ['umd', 'es'],
    },
    rollupOptions: {
      // Make sure to externalize deps that shouldn't into your library
      external: ['vue', '@vlalg-nimbus/nb-calendar'],
      output: {
        // Provide global variables to use in the UMD for externalized deps
        globals: {
          vue: 'Vue',
          '@vlalg-nimbus/nb-calendar': 'NbCalendar',
        },
      },
    },
  },
  external: [
    /node_modules/
  ],
  plugins: [
    vue(), // Vue plugin primeiro
    calendarAliasPlugin(), // Plugin customizado para resolver aliases do calendar (antes do nodeResolve)
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
      // Alias para desenvolvimento local do nb-calendar
      {
        find: '@vlalg-nimbus/nb-calendar',
        replacement: path.resolve(__dirname, '../nb-calendar/src/install.js'),
      },
    ],
  },
});
