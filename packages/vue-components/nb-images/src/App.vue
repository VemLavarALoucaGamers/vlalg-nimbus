<template>
  <div class="container-fluid test-page">
    <div class="row">
      <div class="col-md-10 col-md-offset-1 test-page__title">
        <h2>Test page</h2>
        <p class="test-page__component-name"><strong>Component:</strong> NbImagePreview</p>
        <p class="test-page__warning">Warning: Look at the console to see the click event</p>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12 col-md-10 col-md-offset-1 test-page__content" style="margin-bottom: 50px; overflow: hidden">
        <select v-model="btType">
          <option
            v-for="(option, index) in optionsLoaders"
            :key="index"
            :value="option"
          >{{ option }}</option>
        </select>
      </div>
    </div>

    <div v-if="btType === 'image-preview'" class="row">
      <div class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
        style="margin-top: 50px; margin-bottom: 50px; height: 5000px; overflow: hidden;">
        <h4 class="test-page__content-tile">NbImagePreview</h4> <br/>

        <div style="width: 100%; overflow: hidden;">
          <NbImagePreview
            nb-id="image-preview1"
            :images="images"
            :initial-image-index="6"
            max-width="500px"
          />asdas
          
          
          <NbImagePreview
            nb-id="image-preview1"
            :images="images"
            :initial-image-index="6"
            gallery-layout="horizontal"
            max-width="500px"
            zoom-button-bg-type="blur"
            zoom-button-bg-blur="10"
            zoom-button-type="zoom"
          >
            <template #preview-controls="{
              previewRotateLeft,
              previewRotateRight,
              previewZoomIn,
              previewZoomOut,
              previewClose,
              previewFirst,
              previewPrevious,
              previewNext,
              previewLast,
              previewInfos
            }">
              <div @click="previewRotateLeft()">↺</div>
              <div @click="previewRotateRight()">↻</div>
              <div @click="previewZoomIn()">+</div>
              <div @click="previewZoomOut()">-</div>
              <div @click="previewClose()">x</div>
              <div @click="previewFirst()"><<</div>
              <div @click="previewPrevious()">‹</div>
              <div @click="previewNext()">></div>
              <div @click="previewLast()">>></div>
              <div class="preview-infos">{{ previewInfos.currentIndex }} / {{ previewInfos.totalImages }}</div>
            </template>
          </NbImagePreview>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue'

const NbImagePreview = defineAsyncComponent(() => import('@components/NbImagePreview.vue'))

const btType = ref('image-preview')
const optionsLoaders = ref([
  'image-preview',
])
const imgW = ref(550)
const imgH = ref(550)
const images = ref([
  {
    url: `https://picsum.photos/id/1/${imgW.value}/${imgH.value}`,
    alt: 'Image 1'
  },
  {
    url: `https://picsum.photos/id/2/${imgW.value}/${imgH.value}`,
    alt: 'Image 2'
  },
  {
    url: `https://picsum.photos/id/3/${imgW.value}/${imgH.value}`,
    alt: 'Image 3'
  },
  {
    url: `https://picsum.photos/id/4/${imgW.value}/${imgH.value}`,
    alt: 'Image 4'
  },
  {
    url: `https://picsum.photos/id/5/${imgW.value}/${imgH.value}`,
    alt: 'Image 5'
  },
  {
    url: `https://picsum.photos/id/6/${imgW.value}/${imgH.value}`,
    alt: 'Image 6'
  },
  {
    url: `https://picsum.photos/id/7/${imgW.value}/${imgH.value}`,
    alt: 'Image 7'
  },
  {
    url: `https://picsum.photos/id/8/${imgW.value}/${imgH.value}`,
    alt: 'Image 8'
  },
])
</script>

<style lang="scss" scoped>
@import '@vlalg-nimbus/bee-css-reset/dist/bee-css-reset.min.css';
@import '@vlalg-nimbus/chameleon-grid-layout/dist/chameleon-grid-layout.min.css';

:global(body) {
  background-color: #181818;
  color: rgba(235, 235, 235, 0.64);
}

.test-page {
  .test-page__title {
    font-family: 'Lato', sans-serif;
    margin-top: 40px;
    margin-bottom: 50px;

    h2 {
      font-weight: 700;
      text-transform: uppercase;
      margin-bottom: 5px;
    }

    p {
      font-weight: 500;
      font-size: 1.2em;

      &.test-page__component-name {
        margin-bottom: 0px;
      }

      &.test-page__warning {
        font-weight: 700;
        font-size: 1em;
        font-style: italic;
      }
    }
  }

  .test-page__content {
    text-align: left;
  }

  .fake-button {
    padding: 5px 10px;
    margin-top: 10px;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
}
</style>
