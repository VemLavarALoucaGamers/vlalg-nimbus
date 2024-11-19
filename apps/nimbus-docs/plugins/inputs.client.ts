import NbInputComponents from '@vlalg-nimbus/nb-inputs'
import "@vlalg-nimbus/nb-inputs/dist/style.css";

export default defineNuxtPlugin(context => {
  context.vueApp.use(NbInputComponents)
})
