import { babel } from '@rollup/plugin-babel';
import eslint from '@rollup/plugin-eslint';
import replace from '@rollup/plugin-replace';
import { uglify } from "rollup-plugin-uglify";
import license from 'rollup-plugin-license';

/*
    Formats tips
    - https://dev.to/iggredible/what-the-heck-are-cjs-amd-umd-and-esm-ikm
    - https://betterprogramming.pub/what-are-cjs-amd-umd-esm-system-and-iife-3633a112db62
*/

const year = new Date().getFullYear()
const globalLibName = 'BeeCssReset'
const isProd = !!(process.env.NODE_ENV === 'production')
const defaultFileName = 'bee-css-reset'
const newFileName = isProd ? `bee-css-reset.min` : defaultFileName
const bannerText = `
  ${globalLibName} v<%= pkg.version %> by Nimbus
	Nimbus Copyright (c) ${year} VLALG and contributors.
`;

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
    license({
      banner: bannerText,
    }),
  ],
};
