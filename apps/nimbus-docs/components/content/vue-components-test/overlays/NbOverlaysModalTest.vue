<template>
  <ClientOnly>
    <div class="preview">
      <div class="preview__component">
        <div class="preview__controls">
          <button
            class="preview__button"
            @click="showModal = !showModal"
          >
            {{ showModal ? 'Close Modal' : 'Open Modal' }}
          </button>
        </div>
        
        <NbModal
          nb-id="nb-modal-one"
          :show="showModal"
          theme="light"
          :backdrop-rgb-color="{ r: 0, g: 0, b: 0 }"
          :backdrop-alpha="0.6"
          :has-backdrop-blur="true"
          :backdrop-blur="5"
          :overlay-click-effect="true"
          :show-close-button="true"
          :close-on-overlay-click="false"
          content-padding="20px"
          :visible-on-mobile="true"
          :visible-on-tablet="true"
          :visible-on-desktop="true"
          :min-width-content-size="225"
          :max-width-content-size="600"
          :min-height-content-size="100"
          :max-height-content-size="400"
          :border-radius="0.5"
          dropdown-scroll-class="custom-sidebar-scrollbar"
          @close="showModal = false"
        >
          <template #content="{ closeModal }">
            <h3>Modal Content</h3>
            <p>This is the main content of the modal.</p>
            <p>You can add any content here.</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              volutpat nisl vel consequat tincidunt. Suspendisse in eros nec
              lectus cursus congue quis a ipsum. Aliquam in vehicula risus.
              Aliquam porta, nisl sit amet aliquam ullamcorper, eros metus lacinia
              magna, quis egestas ligula nulla et augue. Pellentesque tincidunt
              diam nec mi scelerisque, tincidunt pharetra libero pellentesque.
              Cras egestas consequat quam vel pulvinar. Nulla ac dui magna. Sed et
              consectetur lacus, vel dictum ipsum. Nam vestibulum dui non sem
              faucibus tincidunt. Proin justo magna, laoreet nec diam vel,
              porttitor fringilla turpis. Sed quis ante ac nunc condimentum
              imperdiet. Integer sit amet erat nunc.
            </p>
            <p>
              Nunc justo eros, posuere sed nulla nec, vulputate blandit est. Etiam
              eu ullamcorper arcu, eget mattis enim. Sed interdum condimentum
              ipsum non elementum. Vivamus accumsan lacus a volutpat ornare. Nulla
              massa elit, imperdiet eget velit eget, feugiat varius lorem. Donec
              ex massa, accumsan a magna quis, varius scelerisque nunc. Sed
              interdum urna nibh, et imperdiet nunc volutpat vitae. Nulla
              facilisi.
            </p>
            <div style="margin-top: 20px;">
              <button
                class="preview__button"
                @click="closeModal"
              >
                Close Modal
              </button>
            </div>
          </template>
        </NbModal>
        
        <p class="legend">Modal component - appears centered when opened</p>
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

const showModal = ref(false)

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

    .preview__controls {
      margin-bottom: 20px;
    }

    .preview__button {
      padding: 10px 20px;
      background-color: #4a90e2;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.3s;

      &:hover {
        background-color: #357abd;
      }
    }

    .legend {
      font-size: 0.8em;
      font-style: italic;
      margin: 0;
      margin-top: 10px;
    }
  }

  :deep(.component__menu-content) {
    &.custom-sidebar-scrollbar {
      &::-webkit-scrollbar {
        width: 8px;
      }

      &::-webkit-scrollbar-track {
        background: tomato;
      }

      &::-webkit-scrollbar-thumb {
        background: #640dfb;
        border-radius: 4px;

        &:hover {
          background: #4d0bc0;
        }
      }
    }
  }
}
</style>
