<template>
  <div class="preview">
    <div class="preview__component">
      i love to
      <NbZoomText nb-id="nb-zoom-text">
        drink coffee
      </NbZoomText>
      very much
    </div>
  </div>
</template>

<script setup></script>

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
