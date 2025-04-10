# nb-theme
> This plugin is only for [Vue.js 3+](https://vuejs.org/)

<br />

This lib contains theme Manager.

## Installation

```bash
npm install @vlalg-nimbus/nb-theme

# or

yarn add @vlalg-nimbus/nb-theme
```

## Usage

```js
// main.js
import { createApp } from 'vue'
import App from './App.vue'

import ThemePlugin from '@vlalg-nimbus/nb-theme'

import './style/style.css';
import "./style/themes.css";

const app = createApp(App)

app.use(ThemePlugin, {
  theme: 'dark',
  dev: true
})

app.mount('#app')
```

## Using with TypeScript

The lib provides automatic typing. Example:

```ts
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import ThemePlugin from '@vlalg-nimbus/nb-theme'
import type { ThemeTextMap, ThemeOptions } from '@vlalg-nimbus/nb-theme'

const texts: ThemeTextMap = {
  light: {
    welcome: 'Bem-vindo',
    goodbye: 'Até logo'
  },
  dark: {
    welcome: 'Welcome',
    goodbye: 'See you'
  }
}
const themeOptions: ThemeOptions = {
  theme: 'dark',
  dev: true,
  texts
}
const app = createApp(App)
app.use(ThemePlugin, themeOptions)
app.mount('#app');


// Component
<script setup lang="ts">
  import { inject } from 'vue'
  import type { ThemePluginContext } from '@vlalg-nimbus/nb-theme'

  const theme = inject('$getTheme') as ThemePluginContext['theme']
  const changeTheme = inject('$changeTheme') as ThemePluginContext['changeTheme']
  const getThemeText = inject('$getThemeText') as ThemePluginContext['getThemeText']
  const getThemeVariableValue = inject('$getThemeVariableValue') as ThemePluginContext['getThemeVariableValue']
</script>

<template>
  <h1>{{ getThemeText('welcome') }}</h1>
  <p>{{ getThemeVariableValue('--bg-color') }}</p>

  <button @click="changeTheme('light')">Light mode</button>
  <button @click="changeTheme('dark')">Dark mode</button>
</template>


// composables/useTheme.ts
import { inject } from 'vue'
import type { ThemePluginContext } from '@vlalg-nimbus/nb-theme'

export const useTheme = (): ThemePluginContext => {
  const changeTheme = inject('$changeTheme') as ThemePluginContext['changeTheme']
  const getTheme = inject('$getTheme') as ThemePluginContext['theme']
  const getThemeText = inject('$getThemeText') as ThemePluginContext['getThemeText']
  const getThemeVariableValue = inject('$getThemeVariableValue') as ThemePluginContext['getThemeVariableValue']

  if (!theme || !changeTheme || !getThemeText || !getThemeVariableValue) {
    throw new Error('[nb-theme] Plugin not properly injected or used outside of Vue app context.')
  }

  return {
    changeTheme,
    getTheme,
    getThemeText,
    getThemeVariableValue
  }
}

// // Use composable
<script setup lang="ts">
  import { useTheme } from '@/composables/useTheme'

  const { getTheme, changeTheme, getThemeText, getThemeVariableValue } = useTheme()
</script>

<template>
  <h1>{{ getThemeText('welcome') }}</h1>
  <p>Background: {{ getThemeVariableValue('--bg-color') }}</p>

  <button @click="changeTheme('light')">Light mode</button>
  <button @click="changeTheme('dark')">Dark mode</button>
</template>

```

## Plugin doc

Click the link below to find out how to use it, properties, events, etc:

- <a href="http://nimbus.tec.br/vue-plugins/nb-theme" target="_blank">nb-theme</a>

## License

[MIT](http://opensource.org/licenses/MIT)
