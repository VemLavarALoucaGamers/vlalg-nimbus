<template>
  <div class="preview">
    <div class="preview__component">
      <NbButtonGradientBorderToBackground
        nb-id="nb-button-gradient-border-to-background-one"
        display="b"
        text-color="#ffffff"
        text-hover-color="blue"
        button-color="linear-gradient(120deg,#fa7faa,#ff9691 25%,#ffb287 50%,transparent 55%,transparent)"
        button-hover-color="linear-gradient(11deg, #c83852, #b44092 50%, #6a5fc1)"
        :show-border="true"
        :border-radius="0.375"
        :tab-index="0"
        :has-tab-index-enter="true"
        :has-tab-index-space="true"
        aria-label="Botão com gradiente de borda para fundo"
        @clicked="logEvent()"
      >
        <template #content>
          Hover me
        </template>
      </NbButtonGradientBorderToBackground>
      <p class="legend">Look at the console to see the triggered event</p>
    </div>
  </div>
</template>

<script setup>
const logEvent = () => {
  console.log('clicked');
};
</script>

<style lang="scss" scoped>
.preview {
  width: 100%;
  text-align: center;
  position: relative;
  margin: 40px 0;

  .preview__component {
    display: block;
    position: relative;
    width: 50%;
    margin: 0 auto;

    .legend {
      font-size: 0.8em;
      font-style: italic;
      margin: 0;
      margin-top: 10px;
    }
  }
}
</style>

