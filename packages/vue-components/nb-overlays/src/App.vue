<template>
  <div class="container-fluid test-page">
    <div class="row">
      <div class="col-md-10 col-md-offset-1 test-page__title">
        <h2>Test page</h2>
        <p class="test-page__component-name"><strong>Component:</strong> NbLoaders</p>
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

    <div v-if="btType === 'sidebar'" class="row">
      <div class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
        style="margin-top: 50px; margin-bottom: 50px; height: 5000px; overflow: hidden;">
        <h4 class="test-page__content-tile">NbSidebar</h4> <br/>

        <button class="fake-button" @click="showSidebar = !showSidebar">{{ showSidebar ? 'Hide Sidebar' : 'Show Sidebar' }}</button>

        <NbSidebar
          nb-id="sidebar1"
          :show="showSidebar"
          @close="showSidebar = false"
        >
        </NbSidebar>
      </div>
    </div>

    <div v-else-if="btType === 'modal'" class="row">
      <div class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
        style="margin-top: 50px; margin-bottom: 50px; height: 5000px; overflow: hidden;">
        <h4 class="test-page__content-tile">NbModal</h4> <br/>

        <button class="fake-button" @click="showModal = !showModal">{{ showModal ? 'Hide Modal' : 'Show Modal' }}</button>

        <NbModal
          nb-id="modal1"
          :show="showModal"
          dropdown-scroll-class="custom-scrollbar"
          @close="showModal = false"
        >
          <template #content="{ closeModal }">
            <div>
              <button class="fake-button" @click="closeModal">Close Modal</button>
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
              <br />
    
              <p>
                Nunc justo eros, posuere sed nulla nec, vulputate blandit est. Etiam
                eu ullamcorper arcu, eget mattis enim. Sed interdum condimentum
                ipsum non elementum. Vivamus accumsan lacus a volutpat ornare. Nulla
                massa elit, imperdiet eget velit eget, feugiat varius lorem. Donec
                ex massa, accumsan a magna quis, varius scelerisque nunc. Sed
                interdum urna nibh, et imperdiet nunc volutpat vitae. Nulla
                facilisi.
              </p>
              <br />
    
              <p>
                Aliquam non tempor mi. Suspendisse ut erat interdum, tempor ex eu,
                molestie neque. Nam eget nibh non elit malesuada rutrum. Integer ac
                nisl justo. Proin vitae erat porta, pulvinar ligula eu, dignissim
                ex. Maecenas aliquet libero elit, eu porttitor magna accumsan ut.
                Sed nec vestibulum ante, quis vulputate ante. Fusce semper, magna id
                ullamcorper dictum, lectus orci tempor sapien, vitae congue erat
                eros at nibh. Suspendisse ut nulla in eros imperdiet sodales ac ut
                orci. Quisque id sapien orci. Aliquam vitae dolor pulvinar,
                tristique dui viverra, gravida dolor. Ut velit ligula, mattis ut
                augue et, imperdiet rutrum risus. Morbi lobortis mattis nulla sed
                porttitor. Vivamus condimentum faucibus mauris, et tincidunt urna
                molestie id. Duis mauris elit, porttitor at aliquam vitae, porta et
                mauris. Suspendisse sed semper nisl.
              </p>
              <br />
    
              <p>
                Mauris condimentum ut leo eu accumsan. Donec ac leo magna.
                Pellentesque venenatis, sem eu blandit porttitor, tortor dui varius
                ante, non fermentum libero lectus eu ex. Donec vel urna sit amet
                augue euismod malesuada. Mauris auctor augue sed justo semper,
                porttitor dignissim lorem sollicitudin. Pellentesque habitant morbi
                tristique senectus et netus et malesuada fames ac turpis egestas.
                Mauris at porta dui, quis fringilla tortor. Vestibulum arcu urna,
                lacinia vitae nisl vel, facilisis pretium magna. Vivamus sodales
                orci diam, eu tincidunt sapien sodales vitae.
              </p>
              <br />
    
              <p>
                Aliquam mollis bibendum blandit. Suspendisse elit magna, faucibus eu
                leo dignissim, pellentesque blandit tellus. Integer tempus sapien
                eget ante rhoncus, ut maximus velit consectetur. Aliquam ac
                ullamcorper est, et finibus lorem. Pellentesque sem eros, mattis sit
                amet metus quis, pharetra varius arcu. Proin feugiat turpis nunc,
                bibendum aliquet quam auctor id. Vestibulum risus quam, bibendum
                eget lectus id, ullamcorper lacinia felis.
              </p>
            </div>
          </template>
        </NbModal>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue'

const NbSidebar = defineAsyncComponent(() => import('@components/NbSidebar.vue'))
const NbModal = defineAsyncComponent(() => import('@components/NbModal.vue'))

const btType = ref('modal')
const optionsLoaders = ref([
  'sidebar',
  'modal',
])

const showSidebar = ref(false)
const showModal = ref(false)
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

  .skeleton-container {
    width: 100px;
    height: 50px;
    background: tomato;
    margin-bottom: 5px;
    overflow: hidden;
    position: relative;

    &--no-margin {
      margin-bottom: 0;
      margin-right: 5px;
      position: relative;
      display: inline-block;
    }
  }

  :deep(.component__menu-content) {
    &.custom-scrollbar {
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
