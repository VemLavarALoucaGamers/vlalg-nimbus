# nb-overlays
> This component is only for [Vue.js 3+](https://vuejs.org/)

<br />

This lib contains overlays components.

## Installation

```bash
npm install @vlalg-nimbus/nb-overlays

# or

yarn add @vlalg-nimbus/nb-overlays
```

## Usage

```js
// main.js
import { createApp } from 'vue'
import App from './App.vue'

import NbOverlaysComponents from '@vlalg-nimbus/nb-overlays'
import "@vlalg-nimbus/nb-overlays/dist/style.css";

const app = createApp(App)
app.use(NbOverlaysComponents)
app.mount('#app')
```

## Components list

The components that are part of this lib are:

- <a href="http://nimbus.tec.br/vue-components/nb-overlays/nb-modal" target="_blank">nb-modal</a>
- <a href="http://nimbus.tec.br/vue-components/nb-overlays/nb-sidebar" target="_blank">nb-sidebar</a>

Click on each one above to find out how to use it, properties, events, etc.

## License

[MIT](http://opensource.org/licenses/MIT)
