import { createApp } from 'vue';
import App from './App.vue';

import ThemePlugin from './plugin/install';
import './style/theme.css';

import './style/style.css';

const app = createApp(App)

app.use(ThemePlugin, {
  theme: 'dark',
  dev: true,
  texts: {
    dark: {
      title: 'Dark mode',
      subtitle: 'You are in dark theme'
    },
    default: {
      title: 'Default mode',
      subtitle: 'You are in default theme'
    },
    test: {
      title: 'Test mode',
      subtitle: 'You are in test theme'
    },
    other: {
      title: 'Other mode',
      subtitle: 'You are in other theme'
    }
  }
});

app.mount('#app');
