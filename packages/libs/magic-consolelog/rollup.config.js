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
export default {
	input: './modules/index.js',
	output: [
    {
      file: 'dist/bundle.amd.js',
      format: 'amd',
      sourcemap: false,
    },
    {
      file: 'dist/bundle.cjs.js',
      format: 'cjs',
      sourcemap: false,
    },
    {
      file: 'dist/bundle.umd.js',
      format: 'umd',
      name: 'example',
      sourcemap: false,
    },
    {
      file: 'dist/bundle.es.js',
      format: 'es',
      sourcemap: false,
    },
    {
      file: 'dist/bundle.iife.js',
      format: 'iife',
      name: 'example',
      sourcemap: false,
    },
    {
      file: 'dist/bundle.system.js',
      format: 'system',
      sourcemap: false,
    },
  ],
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
    }),,
    process.env.NODE_ENV === 'production' && uglify(),
  ],
};
