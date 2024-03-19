import NbTextComponents from '@vlalg-nimbus/nb-text'
import "@vlalg-nimbus/nb-text/dist/style.css";

export default defineNuxtPlugin(context => {
  context.vueApp.use(NbTextComponents)
})
