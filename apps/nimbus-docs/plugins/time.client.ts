import NbTimeComponents from '@vlalg-nimbus/nb-time'
import "@vlalg-nimbus/nb-time/dist/style.css";

export default defineNuxtPlugin(context => {
  context.vueApp.use(NbTimeComponents)
})
