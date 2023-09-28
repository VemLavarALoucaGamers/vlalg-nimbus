import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'

import MasterTool from '@vlalg-nimbus/master-tool'
const $masterTool = MasterTool()

const app = createApp(App)

// console.log($masterTool.asyncMapPromise([1], () => {}))

app.provide('$masterTool', $masterTool)

app.mount('#app')
