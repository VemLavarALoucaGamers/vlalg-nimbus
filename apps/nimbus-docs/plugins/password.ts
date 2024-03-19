import NbPasswordComponents from '@vlalg-nimbus/nb-password'
import "@vlalg-nimbus/nb-password/dist/style.css";

export default defineNuxtPlugin(context => {
  context.vueApp.use(NbPasswordComponents)
})
