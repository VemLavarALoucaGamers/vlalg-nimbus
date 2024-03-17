<template>
  <div class="preview">
    <div class="preview__component">
      <NbButtonHamburger
        nb-id="nb-button-hamburger"
        display="b"
        color="#bbbbbb"
        color-hover="yellow"
        container-color="white"
        container-color-hover="blue"
        :padding-x="3"
        :padding-y="3"
        :disabled="false"
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
