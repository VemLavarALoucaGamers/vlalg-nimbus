<template>
  <div class="preview">
    <div class="preview__component">
      <NbButtonNormal
        nb-id="nb-button-normal-one"
        display="b"
        text-color="#ffffff"
        text-hover-color="blue"
        button-color="tomato"
        button-hover-color="green"
        :show-border="true"
        border-color="#ffe54c"
        :border-radius="0.375"
        :has-animation="true"
        :animation-duration="0.3"
        animation-duration-type="s"
        :tab-index="0"
        :has-tab-index-enter="true"
        :has-tab-index-space="true"
        aria-label="Botão normal"
        @clicked="logEvent()"
      >
        <template #content>
          Click me
        </template>
      </NbButtonNormal>
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

