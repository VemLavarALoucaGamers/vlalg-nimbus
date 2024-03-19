import NbButtonsComponents from "@vlalg-nimbus/nb-buttons";
import "@vlalg-nimbus/nb-buttons/dist/style.css";

export default defineNuxtPlugin(context => {
  context.vueApp.use(NbButtonsComponents)
})
