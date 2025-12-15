import NbButtonsComponents from '@vlalg-nimbus/nb-buttons';
import NbLoadersComponents from '@vlalg-nimbus/nb-loaders';
import NbInputComponents from '@vlalg-nimbus/nb-inputs';
import NbSelectComponents from '@vlalg-nimbus/nb-selects';
import NbPasswordComponents from '@vlalg-nimbus/nb-password';
import NbPaymentsComponents from '@vlalg-nimbus/nb-payments';
import NbSlidesComponents from '@vlalg-nimbus/nb-slides';
import NbTextComponents from '@vlalg-nimbus/nb-text';
import NbTimeComponents from '@vlalg-nimbus/nb-time';

import "@vlalg-nimbus/nb-buttons/dist/style.css";
import "@vlalg-nimbus/nb-loaders/dist/style.css";
import "@vlalg-nimbus/nb-inputs/dist/style.css";
import "@vlalg-nimbus/nb-selects/dist/style.css";
import "@vlalg-nimbus/nb-password/dist/style.css";
import "@vlalg-nimbus/nb-payments/dist/style.css";
import "@vlalg-nimbus/nb-slides/dist/style.css";
import "@vlalg-nimbus/nb-text/dist/style.css";
import "@vlalg-nimbus/nb-time/dist/style.css";

export default defineNuxtPlugin(context => {
  context.vueApp.use(NbButtonsComponents)
  context.vueApp.use(NbLoadersComponents)
  context.vueApp.use(NbInputComponents)
  context.vueApp.use(NbSelectComponents)
  context.vueApp.use(NbPasswordComponents)
  context.vueApp.use(NbPaymentsComponents)
  context.vueApp.use(NbSlidesComponents)
  context.vueApp.use(NbTextComponents)
  context.vueApp.use(NbTimeComponents)
})
