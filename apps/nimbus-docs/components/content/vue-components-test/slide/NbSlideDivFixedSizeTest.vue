<template>
  <div class="preview">
    <div class="preview__component">
      <ClientOnly>
        <NbSlideDivFixedSize
          nb-id="nb-slide"
          display="b"
          slide-type="z-index"
          :slide-interval="10000"
          show-progress-bar
          show-buttons
        >
          <template #slides1>
            <div style="background: gray; height: 100%; font-size: 20px">
              <h2>Slide One</h2>
              <p>Content test</p>
            </div>
          </template>
          <template #slides2>
            <div style="background: green; height: 100%; font-size: 20px">
              <h2>Slide Two</h2>
              <p>Content test</p>
            </div>
          </template>
          <template #slides3>
            <div style="background: green; height: 100%; font-size: 20px">
              <h2>Slide three</h2>
              <p>Content test</p>
            </div>
          </template>
        </NbSlideDivFixedSize>
      </ClientOnly>
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
