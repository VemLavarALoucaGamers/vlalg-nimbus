<template>
  <ClientOnly>
    <div class="preview">
      <div class="preview__component">
        <NbButtonMechanical2
          nb-id="nb-button-mechanical-two"
          display="b"
          theme="light"
          light-text-color="#333333"
          light-button-color="#f5f5f5"
          light-shadow-color="#e0e0e0"
          :padding-x="1"
          :padding-y="0.2"
          :disabled="false"
          :border-radius="0.375"
          font-size="1.6em"
          :font-weight="400"
          @clicked="logEvent()"
        >
          <template #content>Default Text</template>
        </NbButtonMechanical2>
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
