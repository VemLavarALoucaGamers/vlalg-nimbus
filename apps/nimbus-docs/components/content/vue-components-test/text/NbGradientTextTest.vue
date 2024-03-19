<template>
  <div class="preview">
    <div class="preview__component">
      <NbGradientText
        nb-id="nb-gradient-text"
        :line-height="1"
        bg-first="magenta"
        bg-second="cyan"
        alignment="center"
        padding-bottom="10"
        font-size="4rem"
        :font-weight="900"
      >
        <template #text> i love to<br />drink coffee<br />very much </template>
      </NbGradientText>
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
