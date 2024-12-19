# nb-test
> This component is only for [Vue.js 3+](https://vuejs.org/)

<br />

This lib contains test components.

## Installation

```bash
npm install @vlalg-nimbus/nb-test

# or

yarn add @vlalg-nimbus/nb-test
```

## Usage

```js
// main.js
import { createApp } from 'vue'
import App from './App.vue'

import NbTestComponents from '@vlalg-nimbus/nb-test'
import "@vlalg-nimbus/nb-test/dist/style.css";

const app = createApp(App)
app.use(NbTestComponents)
app.mount('#app')
```

## Components list

The components that are part of this lib are:

- <a href="http://nimbus.tec.br/vue-components/nb-test/nb-loader" target="_blank">nb-loader</a>

Click on each one above to find out how to use it, properties, events, etc.

## License

[MIT](http://opensource.org/licenses/MIT)
