import { createApp } from 'vue';
import App from './App.vue';

import gtmPlugin from './plugin/install';

import './style/style.css';

const app = createApp(App)

app.use(gtmPlugin, { 
  googleKey: "GTM-XXXXXXXX",
  permitedDomains: [],
  dev: true
});

app.mount('#app');
