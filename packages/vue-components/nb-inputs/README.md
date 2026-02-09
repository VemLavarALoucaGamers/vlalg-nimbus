# nb-inputs
> This component is only for [Vue.js 3+](https://vuejs.org/)

<br />

This lib contains input components.

## Installation

```bash
npm install @vlalg-nimbus/nb-inputs

# or

yarn add @vlalg-nimbus/nb-inputs
```

## Usage

```js
// main.js
import { createApp } from 'vue'
import App from './App.vue'

import NbInputsComponents from '@vlalg-nimbus/nb-inputs'
import "@vlalg-nimbus/nb-inputs/dist/style.css";

// Import the Calendar component from the npm package to use in the nb-date-picker component
import { Calendar } from '@vlalg-nimbus/nb-calendar';
import "@vlalg-nimbus/nb-calendar/dist/style.css"

const app = createApp(App)
app.use(NbInputsComponents)
app.component('Calendar', Calendar); // Register the Calendar component globally
app.mount('#app')
```

## Components list

The components that are part of this lib are:

- <a href="http://nimbus.tec.br/vue-components/nb-inputs/nb-input-radio" target="_blank">nb-input-radio</a>
- <a href="http://nimbus.tec.br/vue-components/nb-inputs/nb-checkbox" target="_blank">nb-input-checkbox</a>
- <a href="http://nimbus.tec.br/vue-components/nb-inputs/nb-input" target="_blank">nb-input</a>
- <a href="http://nimbus.tec.br/vue-components/nb-inputs/nb-input-chip" target="_blank">nb-input-chip</a>
- <a href="http://nimbus.tec.br/vue-components/nb-inputs/nb-textarea" target="_blank">nb-textarea</a>
- <a href="http://nimbus.tec.br/vue-components/nb-inputs/nb-date-picker" target="_blank">nb-date-picker</a>

Click on each one above to find out how to use it, properties, events, etc.

## License

[MIT](http://opensource.org/licenses/MIT)
