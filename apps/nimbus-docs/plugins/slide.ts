import NbSlidesComponents from '@vlalg-nimbus/nb-slides'
import "@vlalg-nimbus/nb-slides/dist/style.css";

export default defineNuxtPlugin(context => {
  context.vueApp.use(NbSlidesComponents)
})
