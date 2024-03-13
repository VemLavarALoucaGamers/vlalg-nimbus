<template>
  <div class="preview">
    <div class="preview__component">
      <NbButtonMechanical
        nb-id="nb-button-mechanical-one"
        display="b"
        textColor="#ffffff"
        containerColor="#ffffff"
        buttonColor="#bbbbbb"
        :paddingX="1"
        :paddingY="0.2"
        :disabled="false"
        :borderRadius="0.375"
        :animationSlow="false"
        fontSize="1.6em"
        :fontWeight="400"
        @clicked="logEvent()"
      />

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
