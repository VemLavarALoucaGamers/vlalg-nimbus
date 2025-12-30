<template>
  <ClientOnly>
    <div class="preview">
      <div class="preview__component">
        <NbImageGallery
          nb-id="image-gallery-test"
          :images="images"
          :initial-image-index="0"
          max-width="500px"
        />
        
        <p class="legend">Image Gallery component with preview modal</p>
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
import { ref } from 'vue'

const images = ref([
  {
    url: 'https://picsum.photos/id/1/500/500',
    alt: 'Mountain landscape'
  },
  {
    url: 'https://picsum.photos/id/2/500/500',
    alt: 'Ocean view'
  },
  {
    url: 'https://picsum.photos/id/3/500/500',
    alt: 'Forest path'
  },
  {
    url: 'https://picsum.photos/id/4/500/500',
    alt: 'Desert dunes'
  },
  {
    url: 'https://picsum.photos/id/5/500/500',
    alt: 'City skyline'
  }
])

// Component is registered globally via plugin
</script>

<style scoped>
.preview {
  padding: 20px;
  background: #2e2e2e;
  border-radius: 8px;
  margin-bottom: 20px;
}

.preview__component {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.legend {
  margin-top: 20px;
  font-size: 14px;
  color: #666;
  text-align: center;
}
</style>
