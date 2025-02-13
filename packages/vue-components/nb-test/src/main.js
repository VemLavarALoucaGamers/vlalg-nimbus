import { createApp } from 'vue';
import App from './App.vue';

import ThemePlugin from './plugin/theme';
import './plugin/theme.css';

import './style/style.css';
import './style/theme-change.css';
// import '../../../scss/main.scss';

const app = createApp(App)

app.use(ThemePlugin, {
  theme: 'dark',
  dev: true,
});

app.mount('#app');
