<template>
  <ClientOnly>
    <div class="preview">
      <div class="preview__component">
        <NbButtonBack
          nb-id="nb-button-back"
          theme="light"
          light-color="#477e99"
          light-text-color="#77d2ff"
          text="back"
          :disabled="false"
          font-size="1.6em"
          :font-weight="400"
          :tab-index="0"
          :has-tab-index-enter="true"
          :has-tab-index-space="true"
          aria-label="Voltar"
          @clicked="logEvent()"
        />
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

