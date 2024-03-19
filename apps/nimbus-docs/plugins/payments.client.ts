// @ts-nocheck
import NbPaymentsComponents from '@vlalg-nimbus/nb-payments'
import "@vlalg-nimbus/nb-payments/dist/style.css";

export default defineNuxtPlugin(context => {
  context.vueApp.use(NbPaymentsComponents)
})
