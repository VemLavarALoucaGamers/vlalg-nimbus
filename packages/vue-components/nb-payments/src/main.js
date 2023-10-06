import { createApp } from 'vue';
import App from './App.vue';

// import '../../../scss/main.scss';

import MasterTool from './plugin/masterTool'

createApp(App).use(MasterTool).mount('#app');
