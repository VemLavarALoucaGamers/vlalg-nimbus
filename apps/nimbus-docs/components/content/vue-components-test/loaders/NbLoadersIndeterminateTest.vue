<template>
  <ClientOnly>
    <div class="preview">
      <div class="preview__component">
        <NbIndeterminate
          nb-id="nb-indeterminate-one"
          :show="true"
          background-color="#e2e8f0"
          progress-bar-color="#020617"
          :height="3"
          :border-radius="0.375"
        />
        <p class="legend">Indeterminate loader component</p>
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
// Component is registered globally via plugin
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
