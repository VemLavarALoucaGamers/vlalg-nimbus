<template>
  <div class="container-fluid test-page">
    <div class="row">
      <div class="col-md-10 col-md-offset-1 test-page__title">
        <h2>Test page</h2>
        <p class="test-page__component-name"><strong>Component:</strong> NbImages</p>
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

    <div v-if="btType === 'image-gallery'" class="row">
      <div class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
        style="margin-top: 50px; margin-bottom: 50px; height: 5000px; overflow: hidden;">
        <h4 class="test-page__content-tile">NbImagePreview</h4> <br/>

        <div style="width: 100%; overflow: hidden;">
          <NbImageGallery
            nb-id="image-gallery1"
            :images="images"
            :initial-image-index="6"
            max-width="500px"
          />asdas
          
          
          <NbImageGallery
            nb-id="image-gallery2"
            :images="images"
            :initial-image-index="6"
            max-width="500px"
            zoom-button-bg-type="blur"
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
          </NbImageGallery>
        </div>
      </div>
    </div>

    <div v-else-if="btType === 'image'" class="row">
      <div class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
        style="margin-top: 50px; margin-bottom: 50px;">
        <h4 class="test-page__content-tile">NbImage</h4>
        
        <div style="margin-bottom: 40px;">
          <h5 style="margin-bottom: 15px;">1. Tipo: none (tamanho fixo, não responsivo)</h5>
          <p style="margin-bottom: 10px; color: #999;">Mantém o tamanho original da imagem</p>
          <div style="width: 100%; border: 2px solid #333; padding: 10px; margin-bottom: 20px;">
            <NbImage
              nb-id="image-none"
              :image="images[0]"
              responsive-type="none"
              @clicked="handleImageClick('none')"
            />
          </div>
        </div>

        <div style="margin-bottom: 40px;">
          <h5 style="margin-bottom: 15px;">1.1. Tipo: none com constraints (min/max width/height)</h5>
          <p style="margin-bottom: 10px; color: #999;">Tamanho fixo mas com limites mínimos e máximos</p>
          <div style="width: 100%; border: 2px solid #333; padding: 10px; margin-bottom: 20px;">
            <NbImage
              nb-id="image-none-constrained"
              :image="images[0]"
              responsive-type="none"
              min-width="200px"
              max-width="500px"
              min-height="150px"
              max-height="400px"
              @clicked="handleImageClick('none-constrained')"
            />
          </div>
        </div>

        <div style="margin-bottom: 40px;">
          <h5 style="margin-bottom: 15px;">2. Tipo: full (width: 100%)</h5>
          <p style="margin-bottom: 10px; color: #999;">Escala para cima e para baixo conforme o container</p>
          <div style="width: 100%; border: 2px solid #333; padding: 10px; margin-bottom: 20px;">
            <NbImage
              nb-id="image-full"
              :image="images[0]"
              responsive-type="full"
              @clicked="handleImageClick('full')"
            />
          </div>
        </div>

        <div style="margin-bottom: 40px;">
          <h5 style="margin-bottom: 15px;">3. Tipo: scale-down (max-width: 100%)</h5>
          <p style="margin-bottom: 10px; color: #999;">Nunca maior que o tamanho original, mas pode reduzir</p>
          <div style="width: 100%; border: 2px solid #333; padding: 10px; margin-bottom: 20px;">
          <NbImage
            nb-id="image-scale-down"
            :image="images[1]"
            responsive-type="scale-down"
            @clicked="handleImageClick('scale-down')"
          />
          </div>
        </div>

        <div style="margin-bottom: 40px;">
          <h5 style="margin-bottom: 15px;">3. Tipo: restricted (width: 100% + max-width: 400px)</h5>
          <p style="margin-bottom: 10px; color: #999;">Responsivo até um limite máximo de 400px</p>
          <div style="width: 100%; border: 2px solid #333; padding: 10px; margin-bottom: 20px;">
          <NbImage
            nb-id="image-restricted"
            :image="images[2]"
            responsive-type="restricted"
            max-width="400px"
            @clicked="handleImageClick('restricted')"
          />
          </div>
        </div>

        <div style="margin-bottom: 40px;">
          <h5 style="margin-bottom: 15px;">5. Com object-fit: contain</h5>
          <p style="margin-bottom: 10px; color: #999;">Mostra a imagem inteira sem cortar</p>
          <div style="width: 100%; border: 2px solid #333; padding: 10px; margin-bottom: 20px; height: 300px;">
            <NbImage
              nb-id="image-contain"
              :image="images[3]"
              responsive-type="full"
              object-fit="contain"
              @clicked="handleImageClick('contain')"
            />
          </div>
        </div>

        <div style="margin-bottom: 40px;">
          <h5 style="margin-bottom: 15px;">6. Com border-radius customizado</h5>
          <p style="margin-bottom: 10px; color: #999;">Border radius de 1rem</p>
          <div style="width: 100%; border: 2px solid #333; padding: 10px; margin-bottom: 20px;">
          <NbImage
            nb-id="image-radius"
            :image="images[4]"
            responsive-type="full"
            :border-radius="1"
            @clicked="handleImageClick('radius')"
          />
          </div>
        </div>

        <div style="margin-bottom: 40px;">
          <h5 style="margin-bottom: 15px;">6. Container pequeno (300px) - Comparação</h5>
          <p style="margin-bottom: 10px; color: #999;">Testando em container pequeno</p>
          <div style="display: flex; gap: 20px; margin-bottom: 20px;">
            <div style="width: 300px; border: 2px solid #333; padding: 10px;">
              <p style="font-size: 12px; margin-bottom: 5px;">NbImage (full)</p>
              <NbImage
                nb-id="image-small-full"
                :image="images[5]"
                responsive-type="full"
                @clicked="handleImageClick('small-full')"
              />
            </div>
            <div style="width: 300px; border: 2px solid #333; padding: 10px;">
              <p style="font-size: 12px; margin-bottom: 5px;">NbImage (scale-down)</p>
              <NbImage
                nb-id="image-small-scale"
                :image="images[5]"
                responsive-type="scale-down"
                @clicked="handleImageClick('small-scale')"
              />
            </div>
            <div style="width: 300px; border: 2px solid #333; padding: 10px;">
              <p style="font-size: 12px; margin-bottom: 5px;">NbImage (restricted 200px)</p>
              <NbImage
                nb-id="image-small-restricted"
                :image="images[5]"
                responsive-type="restricted"
                max-width="200px"
                @clicked="handleImageClick('small-restricted')"
              />
            </div>
          </div>
        </div>

        <div style="margin-bottom: 40px;">
          <h5 style="margin-bottom: 15px;">8. Comparação com img HTML padrão</h5>
          <p style="margin-bottom: 10px; color: #999;">Componente vs HTML padrão</p>
          <div style="display: flex; gap: 20px; margin-bottom: 20px;">
            <div style="width: 50%; border: 2px solid #333; padding: 10px;">
              <p style="font-size: 12px; margin-bottom: 5px;">NbImage</p>
              <NbImage
                nb-id="image-compare"
                :image="images[6]"
                responsive-type="full"
                @clicked="handleImageClick('compare')"
              />
            </div>
            <div style="width: 50%; border: 2px solid #333; padding: 10px;">
              <p style="font-size: 12px; margin-bottom: 5px;">img HTML padrão</p>
              <img :src="images[6].url" :alt="images[6].alt" style="width: 100%; height: auto;" />
            </div>
          </div>
        </div>

        <div style="margin-bottom: 40px;">
          <h5 style="margin-bottom: 15px;">9. Com Preview Modal (clique na imagem para abrir)</h5>
          <p style="margin-bottom: 10px; color: #999;">Clique na imagem para abrir o modal com controles de rotação e zoom</p>
          <div style="width: 100%; border: 2px solid #333; padding: 10px; margin-bottom: 20px;">
            <NbImage
              nb-id="image-preview"
              :image="images[0]"
              responsive-type="full"
              :has-preview="true"
              :has-backdrop-blur="true"
              :backdrop-blur="10"
              :backdrop-r-g-b-color="{ r: 0, g: 0, b: 0 }"
              :backdrop-alpha="0.8"
              controls-bg-color="rgba(0, 0, 0, 0.7)"
              controls-text-color="#ffffff"
              controls-text-color-hover="#4CAF50"
              :controls-border-radius="8"
              :z-index="9999"
              @clicked="handleImageClick('preview')"
            />
          </div>
        </div>

        <div style="margin-bottom: 40px;">
          <h5 style="margin-bottom: 15px;">10. Com lupa</h5>
          <div style="width: 100%; border: 2px solid #333; padding: 10px; margin-bottom: 20px;">
            <NbImage
              nb-id="image-lupa"
              :image="images[0]"
              responsive-type="full"
              :hagnifier-glass="true"
              :has-preview="false"
              @clicked="handleImageClick('lupa')"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue'

const NbImageGallery = defineAsyncComponent(() => import('@components/NbImageGallery.vue'))
const NbImage = defineAsyncComponent(() => import('@components/NbImage.vue'))

const btType = ref('image')
const optionsLoaders = ref([
  'image-gallery',
  'image',
])
const imgW = ref(550)
const imgH = ref(550)
const images = ref([
  {
    url: `https://picsum.photos/id/1/${imgW.value}/${imgH.value}`,
    alt: 'Image 1',
    width: imgW.value,
    height: imgH.value
  },
  {
    url: `https://picsum.photos/id/2/${imgW.value}/${imgH.value}`,
    alt: 'Image 2',
    width: imgW.value,
    height: imgH.value
  },
  {
    url: `https://picsum.photos/id/3/${imgW.value}/${imgH.value}`,
    alt: 'Image 3',
    width: imgW.value,
    height: imgH.value
  },
  {
    url: `https://picsum.photos/id/4/${imgW.value}/${imgH.value}`,
    alt: 'Image 4',
    width: imgW.value,
    height: imgH.value
  },
  {
    url: `https://picsum.photos/id/5/${imgW.value}/${imgH.value}`,
    alt: 'Image 5',
    width: imgW.value,
    height: imgH.value
  },
  {
    url: `https://picsum.photos/id/6/${imgW.value}/${imgH.value}`,
    alt: 'Image 6',
    width: imgW.value,
    height: imgH.value
  },
  {
    url: `https://picsum.photos/id/7/${imgW.value}/${imgH.value}`,
    alt: 'Image 7',
    width: imgW.value,
    height: imgH.value
  },
  {
    url: `https://picsum.photos/id/8/${imgW.value}/${imgH.value}`,
    alt: 'Image 8',
    width: imgW.value,
    height: imgH.value
  },
])

const handleImageClick = (type) => {
  console.log(`Image clicked - Type: ${type}`)
}
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
