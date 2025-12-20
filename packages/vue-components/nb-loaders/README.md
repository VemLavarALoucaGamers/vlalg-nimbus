# nb-loaders
> This component is only for [Vue.js 3+](https://vuejs.org/)

<br />

This lib contains loaders components.

## Installation

```bash
npm install @vlalg-nimbus/nb-loaders

# or

yarn add @vlalg-nimbus/nb-loaders
```

## Usage

```js
// main.js
import { createApp } from 'vue'
import App from './App.vue'

import NbLoadersComponents from '@vlalg-nimbus/nb-loaders'
import "@vlalg-nimbus/nb-loaders/dist/style.css";

const app = createApp(App)
app.use(NbLoadersComponents)
app.mount('#app')
```

## Components list

The components that are part of this lib are:

- <a href="http://nimbus.tec.br/vue-components/nb-loaders/nb-loader" target="_blank">nb-loader</a>
- <a href="http://nimbus.tec.br/vue-components/nb-loaders/nb-indeterminate" target="_blank">nb-indeterminate</a>
- <a href="http://nimbus.tec.br/vue-components/nb-loaders/nb-skeleton" target="_blank">nb-skeleton</a>
- <a href="http://nimbus.tec.br/vue-components/nb-loaders/nb-loading-bar" target="_blank">nb-loading-bar</a>
- <a href="http://nimbus.tec.br/vue-components/nb-loaders/nb-page-scroll-bar" target="_blank">nb-page-scroll-bar</a>

Click on each one above to find out how to use it, properties, events, etc.

## License

[MIT](http://opensource.org/licenses/MIT)
