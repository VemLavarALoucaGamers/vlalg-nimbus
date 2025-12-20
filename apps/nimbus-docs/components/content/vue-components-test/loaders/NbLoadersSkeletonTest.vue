<template>
  <ClientOnly>
    <div class="preview">
      <div class="preview__component">
        <div
          class="skeleton-container"
          style="width: 300px; height: 20px; border-radius: 6px; position: relative; margin: 0 auto;"
        >
          <NbSkeleton
            nb-id="nb-skeleton-one"
            :show="true"
            background-color="#e2e8f0"
            gradient-direction="90deg"
            gradiente-color="rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0)"
            gradient-animation-duration="1.2s"
          />
        </div>
        <p class="legend">Skeleton loader component</p>
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
