# nb-gtm
> This plugin is only for [Vue.js 3+](https://vuejs.org/)

<br />

This lib contains Google Tag Manager.

## Installation

```bash
npm install @vlalg-nimbus/nb-gtm

# or

yarn add @vlalg-nimbus/nb-gtm
```

## Usage

```js
// main.js
import { createApp } from 'vue'
import App from './App.vue'

// Import plugin
import gtmPlugin from '@vlalg-nimbus/nb-gtm'

// Your css files
import './style/style.css';

const app = createApp(App)

// Config plugin
app.use(gtmPlugin, { 
  googleKey: "GTM-XXXXXXXX", // Google Key
  permitedDomains: [], // List of allowed domains (If you have domain limitation)
  dev: true, // Console triggers
})

app.mount('#app')

// Component
<script setup lang="ts">
  import { inject } from 'vue'
  
  const gtagpush = inject('$gtagpush')

  function triggerGtm () => {
    gtagpush({ category: 'test', label: 'button A' }, 'click')
  }
</script>

<template>
  <button @click="triggerGtm">Button A</button>
</template>
```

## Using with TypeScript

The lib provides automatic typing. Example:

```ts
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import gtmPlugin from '@vlalg-nimbus/nb-gtm'
import type { IOptions } from '@vlalg-nimbus/nb-gtm'

const app = createApp(App)

const gtmOptions: IOptions = {
  googleKey: 'GTM-XXXXXXXX',
  permitedDomains: ['http://localhost:3000'],
  dev: true,
}
app.use(gtmPlugin, gtmOptions)

app.mount('#app')


// Component
<script setup lang="ts">
  import { inject } from 'vue'
  import type { GtmPluginContext } from '@vlalg-nimbus/nb-gtm'

  const gtag = inject<GtmPluginContext | null>('$gtag')
  const gtagpush = inject('$gtagpush') as GtmPluginContext['gtagpush']

  function triggerGtm () => {
    gtag?.gtagpush({ category: 'test', label: 'button A' }, 'click')
  }
  function triggerGtmPush () => {
    $gtagpush({ category: 'test', label: 'button B' }, 'click')
  }
</script>

<template>
  <button @click="triggerGtm">Button A</button>
  <button @click="triggerGtmPush">Button B</button>
</template>


// composables/useGtm.ts
import { inject } from 'vue'
import type { DataLayerEvent } from '@vlalg-nimbus/nb-gtm'

export const useGtm = () => {
  const gtag = inject<DataLayerEvent[]>('$gtag', [])
  const gtagpush = inject<(props: Record<string, any>, e?: string) => void>('$gtagpush', () => {})

  return { gtag, gtagpush }
}


// Use composable
<script setup>
  import { useGtm } from '@/composables/useGtm'

  const { gtagpush } = useGtm()

  const send = () => {
    gtagpush({ category: 'test', label: 'button A' }, 'click')
  }
</script>

<template>
  <button @click="send">Button A</button>
</template>
```

## Plugin doc

Click the link below to find out how to use it, properties, events, etc:

- <a href="http://nimbus.tec.br/vue-plugins/nb-gtm" target="_blank">nb-gtm</a>

## License

[MIT](http://opensource.org/licenses/MIT)
