<template>
  <div class="preview">
    <div class="preview__component">
      <NbButtonPrevNext
        nb-id="nb-button-prev-next"
        theme="light"
        light-color-primary="#f5f5f5"
        light-color-secondary="#e0e0e0"
        light-text-color="#333333"
        light-text-color-hover="#000000"
        :padding-x="1"
        :padding-y="10"
        :margin-between="2"
        :border-radius="10"
        :disabled="false"
        :show-preview="true"
        :show-next="true"
        :disabled-preview="false"
        :disabled-next="false"
        font-size="1.6em"
        :font-weight="400"
        @clicked="logEvent()"
      >
        <template #prev>← Preview</template>
        <template #next>Next →</template>
      </NbButtonPrevNext>
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
