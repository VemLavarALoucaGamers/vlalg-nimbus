import { defaultColors, defineConfig } from 'histoire'
import { HstVue } from '@histoire/plugin-vue'

const libColor = {
  default: '#1AD6FF',
  hover: '#09A0C1'
}

export default defineConfig({
  routerMode: 'hash',
  vite: {
    base: process.env.HISTOIRE_BASE || "/",
  },
	theme: {
		title: 'Nimbus',
    logo: {
      square: '/square.png',
			light: '/light.svg',
			dark: '/dark.svg',
		},
		colors: {
			gray: {
        50: '#fafafa',
        100: '#f4f4f5',
        200: '#e4e4e7',
        300: '#d4d4d8',
        400: '#a1a1aa',
        500: '#71717a',
        600: '#52525b',
        700: '#3f3f46',
        750: '#323238',
        800: '#27272a',
        850: '#1f1f21',
        900: '#18181b',
        950: '#101012',
      },
      primary: {
        50: '#ecfeff',
        100: '#cffafe',
        200: '#a5f3fc',
        300: '#67e8f9',
        400: libColor.default,
        500: libColor.default,
        600: libColor.hover,
        700: libColor.default,
        800: libColor.hover,
        900: libColor.hover,
      }
    },
    logoHref: 'https://nimbus.tec.br/playground',
    defaultColorScheme: 'dark',
    hideColorSchemeSwitch: true,
	},
  plugins: [
    HstVue()
  ],
})
