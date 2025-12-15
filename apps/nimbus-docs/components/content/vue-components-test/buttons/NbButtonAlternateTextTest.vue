<template>
  <div class="preview">
    <div class="preview__component">
      <NbButtonAlternateText
        nb-id="nb-button-alternate-text-one"
        display="b"
        theme="light"
        light-text-color="#1e40af"
        light-text-color-hover="#ffffff"
        light-button-color="#dbeafe"
        light-button-color-hover="#bfdbfe"
        light-border-color="#93c5fd"
        :padding-x="1"
        :padding-y="0.4"
        :disabled="false"
        :border-radius="0.375"
        font-size="1.6em"
        :font-weight="200"
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
