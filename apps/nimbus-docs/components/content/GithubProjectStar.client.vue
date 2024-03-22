<template>
  <div class="wrapper">
    Support leaving a
    <a
      class="github-button github-star-button"
      href="https://github.com/VemLavarALoucaGamers/vlalg-nimbus"
      data-size="large"
      data-show-count="true"
      aria-label="Star VemLavarALoucaGamers/vlalg-nimbus on GitHub"
    >
      Star
    </a>
  </div>
</template>

<script setup>
onBeforeMount(() => {
  insertScript();
});

const insertScript = () => {
  const script = document.createElement('script');

  script.src = 'https://buttons.github.io/buttons.js';
  script.async = true;
  script.defer = true;

  document.body.appendChild(script);
};
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative !important;

  :deep(span) {
    position: absolute;
    margin-left: 8px;
  }
}
</style>
