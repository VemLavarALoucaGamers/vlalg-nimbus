export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    import('@vlalg-nimbus/github-stars-button');
  }
});
