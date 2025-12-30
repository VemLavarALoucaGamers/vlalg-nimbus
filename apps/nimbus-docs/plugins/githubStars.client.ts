export default defineNuxtPlugin(async () => {
  if (import.meta.client) {
    await import('@vlalg-nimbus/github-stars-button');
  }
});
