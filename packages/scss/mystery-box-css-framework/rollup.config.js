import { babel } from '@rollup/plugin-babel';
import eslint from '@rollup/plugin-eslint';
import replace from '@rollup/plugin-replace';
import { uglify } from "rollup-plugin-uglify";

/*
    Formats tips
    - https://dev.to/iggredible/what-the-heck-are-cjs-amd-umd-and-esm-ikm
    - https://betterprogramming.pub/what-are-cjs-amd-umd-esm-system-and-iife-3633a112db62
*/
const globalLibName = 'MysteryBoxCssFramework'
const isProd = !!(process.env.NODE_ENV === 'production')
const defaultFileName = 'mystery-box-css-framework'
const newFileName = isProd ? `mystery-box-css-framework.min` : defaultFileName

const outputs = [
  {
    file: `dist/${newFileName}.js`,
    format: 'iife',
    name: globalLibName,
    sourcemap: false,
  }
]

export default {
	input: './modules/index.js',
	output: [...outputs],
  plugins: [
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
