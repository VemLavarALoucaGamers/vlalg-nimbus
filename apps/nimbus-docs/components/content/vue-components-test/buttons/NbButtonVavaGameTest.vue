<template>
  <ClientOnly>
    <div class="preview">
      <div class="preview__component">
        <NbButtonVavaGame
          nb-id="nb-button-vava-game"
          display="b"
          theme="light"
          light-text-color="#333333"
          light-text-color-hover="#000000"
          light-button-color="#f5f5f5"
          light-button-color-hover="#e0e0e0"
          light-border-color="#333333"
          :border-opacity="0.5"
          :padding-x-border="0.7"
          :padding-y-border="0.7"
          :padding-x-content="1"
          :padding-y-content="1"
          :uppercase="false"
          :disabled="false"
          font-size="1.6em"
          :font-weight="400"
          @clicked="logEvent()"
        >
          <template #content>Default Text</template>
        </NbButtonVavaGame>
        <p class="legend">Look at the console to see the triggered event</p>
      </div>
    </div>
    <template #fallback>
      <div class="preview">
        <div class="preview__component">
          <p>Loading component...</p>
        </div>
      </div>
    </template>
  </ClientOnly>
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
