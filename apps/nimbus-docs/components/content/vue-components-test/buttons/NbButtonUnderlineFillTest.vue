<template>
  <div class="preview">
    <div class="preview__component">
      <NbButtonUnderlineFill
        nb-id="nb-button-underline-fill-one"
        display="b"
        text-color="rgb(0, 105, 255)"
        text-hover-color="#ffffff"
        button-color="rgb(0, 105, 255)"
        button-hover-color="rgb(20, 51, 214)"
        text-align="center"
        :tab-index="0"
        :has-tab-index-enter="true"
        :has-tab-index-space="true"
        aria-label="Botão com preenchimento de underline"
        @clicked="logEvent()"
      >
        <template #content>
          Hover me
        </template>
      </NbButtonUnderlineFill>
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

