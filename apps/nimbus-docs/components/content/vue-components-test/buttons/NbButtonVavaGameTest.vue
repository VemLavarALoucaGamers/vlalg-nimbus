<template>
  <div class="preview">
    <div class="preview__component">
      <NbButtonVavaGame
        nb-id="nb-button-vava-game"
        display="b"
        text-color="#ffffff"
        button-color="#bbbbbb"
        text-color-hover="black"
        button-color-hover="tomato"
        border-color="#ffffff"
        :padding-x-border="0.7"
        :padding-y-border="0.7"
        :padding-x-content="1"
        :padding-y-content="1"
        :uppercase="false"
        :disabled="false"
        font-size="1.6em"
        :font-weight="400"
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
