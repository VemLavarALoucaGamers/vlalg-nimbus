<template>
  <div class="preview">
    <div class="preview__component">
      <p class="text-test">
        Select "
        <NbHighlightSelectedText nb-id="nb-highlight-selected-text" background-color="tomato" text-color="blue">
          <template #text>this part of the text</template>
        </NbHighlightSelectedText>
        " to see it in another color
      </p>
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
    width: 60%;
    margin: 0 auto;

    .legend {
      font-size: 0.8em;
      font-style: italic;
      margin: 0;
      margin-top: 10px;
    }

    .text-test {
      font-size: 23px !important;
      color: white;
    }
  }
}
</style>
