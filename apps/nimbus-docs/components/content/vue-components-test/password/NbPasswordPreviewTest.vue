<template>
  <div class="preview">
    <div class="preview__component">
      <NbPasswordPreview nb-id="nb-password-preview" display="b" type="generate" />
      <p class="legend">Look at the console to see the triggered event</p>
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
