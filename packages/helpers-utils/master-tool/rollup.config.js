import resolve from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import eslint from '@rollup/plugin-eslint';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import { uglify } from "rollup-plugin-uglify";

/*
    Formats tips
    - https://dev.to/iggredible/what-the-heck-are-cjs-amd-umd-and-esm-ikm
    - https://betterprogramming.pub/what-are-cjs-amd-umd-esm-system-and-iife-3633a112db62
*/
const globalLibName = 'MasterTool'
const isProd = !!(process.env.NODE_ENV === 'production')
const defaultFileName = 'bundle'
const newFileName = isProd ? `bundle.min` : defaultFileName

console.log(process.env.NODE_ENV)

const outputs = [
  {
    file: `dist/${newFileName}.amd.js`,
    format: 'amd',
    sourcemap: false,
  },
  {
    file: `dist/${newFileName}.cjs.js`,
    format: 'cjs',
    sourcemap: false,
  },
  {
    file: `dist/${newFileName}.umd.js`,
    format: 'umd',
    name: globalLibName,
    sourcemap: false,
  },
  {
    file: `dist/${newFileName}.es.js`,
    format: 'es',
    sourcemap: false,
  },
  {
    file: `dist/${newFileName}.iife.js`,
    format: 'iife',
    name: globalLibName,
    sourcemap: false,
  },
  {
    file: `dist/${newFileName}.system.js`,
    format: 'system',
    sourcemap: false,
  }
]

export default {
	input: './modules/index.js',
	output: [...outputs],
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    eslint({
      exclude: ['src/styles/**'],
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
    }),
    replace({
      preventAssignment: true,
      exclude: 'node_modules/**',
      ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    isProd && uglify(),
  ],
};
