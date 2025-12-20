<template>
  <ClientOnly>
    <div class="preview">
      <div class="preview__component">
        <NbPageScrollBar
          nb-id="nb-page-scroll-bar-one"
          position="top"
          :height="3"
          :border-radius="0.5"
          :z-index="1000"
        />

        <br />

        <p class="legend" style="color: #fff; font-style: italic">Page scroll bar component - appears automatically when you scroll, appears at the top of the page.</p>
        <p class="legend" style="color: #fff; font-style: italic">Scroll the page to see the progress bar at the top.</p>
        
        <br />
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
    width: 100%;
    margin: 0 auto;

    .preview__content {
      padding: 20px;
      text-align: left;
      max-width: 800px;
      margin: 0 auto;
    }

    .preview__spacer {
      margin: 40px 0;
      padding: 20px;
      background-color: #f5f5f5;
      border-radius: 8px;

      h3 {
        margin-top: 0;
        color: #333;
      }

      p {
        line-height: 1.6;
        color: #666;
      }
    }

    .legend {
      font-size: 0.9em;
      font-weight: 600;
      margin: 0;
      margin-bottom: 10px;
      color: #333;
    }

    .legend-subtitle {
      font-size: 0.8em;
      font-style: italic;
      margin: 0;
      margin-bottom: 30px;
      color: #666;
    }
  }
}
</style>
