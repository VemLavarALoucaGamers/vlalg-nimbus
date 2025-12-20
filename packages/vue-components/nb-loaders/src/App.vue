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

    <div v-if="btType === 'loaders'" class="row">
      <div class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
        style="margin-top: 50px; margin-bottom: 50px;">

        <p style="color: #fff;">Select the loader type:</p>
        <select v-model="loaderType">
          <option
            v-for="(option, index) in options"
            :key="index"
            :value="option"
          >{{ option }}</option>
        </select>

        <br /><br /><br /><br />
        
        asda
        <NbLoaders
          nb-id="radio1"
          display="b"
          :type="loaderType"
        />
        asdas

        <br><br>
        <p style="margin-top: 4px;">
          Text before
          <NbLoaders
            nb-id="radio1"
            display="ib"
            :type="loaderType"
          />
          text after
        </p>
      </div>
    </div>

    <div v-else-if="btType === 'indeterminate'" class="row">
      <div class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
        style="margin-top: 50px; margin-bottom: 50px; overflow: hidden;">
        <h4 class="test-page__content-tile">NbIndeterminate</h4>

        <NbIndeterminate nb-id="indeterminate1" />
      </div>
    </div>

    <div v-else-if="btType === 'skeleton'" class="row">
      <div class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
        style="margin-top: 50px; margin-bottom: 50px; overflow: hidden;">
        <h4 class="test-page__content-tile">NbSkeleton</h4>

        <p>Skeleton Rectangle</p>
        <div
          class="skeleton-container skeleton"
          style="width: 218px; height: 14px; border-radius: 6px"
        ><NbSkeleton nb-id="skeleton1" /></div>
        <div
          class="skeleton-container skeleton"
          style="width: 140px; height: 14px; border-radius: 6px"
        ><NbSkeleton nb-id="skeleton1" /></div>
        <div
          class="skeleton-container skeleton"
          style="width: 70px; height: 28px; border-radius: 6px"
        ><NbSkeleton nb-id="skeleton1" /></div>
        <div
          class="skeleton-container skeleton"
          style="width: 218px; height: 14px; border-radius: 6px"
        ><NbSkeleton nb-id="skeleton1" /></div>
        <div
          class="skeleton-container skeleton"
          style="width: 140px; height: 56px; border-radius: 6px"
        ><NbSkeleton nb-id="skeleton1" /></div>

        <p>Skeleton Rounded</p>
        <div
          class="skeleton-container skeleton"
          style="width: 218px; height: 14px; border-radius: 16px"
        ><NbSkeleton nb-id="skeleton1" /></div>
        <div
          class="skeleton-container skeleton"
          style="width: 140px; height: 14px; border-radius: 16px"
        ><NbSkeleton nb-id="skeleton1" /></div>
        <div
          class="skeleton-container skeleton"
          style="width: 70px; height: 28px; border-radius: 16px"
        ><NbSkeleton nb-id="skeleton1" /></div>
        <div
          class="skeleton-container skeleton"
          style="width: 218px; height: 14px; border-radius: 16px"
        ><NbSkeleton nb-id="skeleton1" /></div>
        <div
          class="skeleton-container skeleton"
          style="width: 140px; height: 56px; border-radius: 16px"
        ><NbSkeleton nb-id="skeleton1" /></div>

        <p>Skeleton Square</p>
        <span
          class="skeleton-container skeleton-container--no-margin skeleton"
          style="width: 28px; height: 28px; border-radius: 6px"
        ><NbSkeleton nb-id="skeleton1" /></span>
        <span
          class="skeleton-container skeleton-container--no-margin skeleton"
          style="width: 42px; height: 42px; border-radius: 6px"
        ><NbSkeleton nb-id="skeleton1" /></span>
        <span
          class="skeleton-container skeleton-container--no-margin skeleton"
          style="width: 56px; height: 56px; border-radius: 6px"
        ><NbSkeleton nb-id="skeleton1" /></span>
        <span
          class="skeleton-container skeleton-container--no-margin skeleton"
          style="width: 70px; height: 70px; border-radius: 6px"
        ><NbSkeleton nb-id="skeleton1" /></span>

        <p>Skeleton Circle</p>
        <span
          class="skeleton-container skeleton-container--no-margin skeleton"
          style="width: 28px; height: 28px; border-radius: 50%"
        ><NbSkeleton nb-id="skeleton1" /></span>
        <span
          class="skeleton-container skeleton-container--no-margin skeleton"
          style="width: 42px; height: 42px; border-radius: 50%"
        ><NbSkeleton nb-id="skeleton1" /></span>
        <span
          class="skeleton-container skeleton-container--no-margin skeleton"
          style="width: 56px; height: 56px; border-radius: 50%"
        ><NbSkeleton nb-id="skeleton1" /></span>
        <span
          class="skeleton-container skeleton-container--no-margin skeleton"
          style="width: 70px; height: 70px; border-radius: 50%"
        ><NbSkeleton nb-id="skeleton1" /></span>
      </div>
    </div>

    <div v-else-if="btType === 'loading-bar'" class="row">
      <div class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
        style="margin-top: 50px; margin-bottom: 50px; overflow: hidden;">
        <h4 class="test-page__content-tile">NbLoadingBar</h4> <br/>

        <button class="fake-button" @click="showLoadingBar = !showLoadingBar">{{ showLoadingBar ? 'Hide Loading Bar' : 'Show Loading Bar' }}</button>

        <NbLoadingBar nb-id="loading-bar1" :show="showLoadingBar" />
      </div>
    </div>

    <div v-else-if="btType === 'page-scroll-bar'" class="row">
      <div class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
        style="margin-top: 50px; margin-bottom: 50px; height: 3000px; overflow: hidden;">
        <h4 class="test-page__content-tile">NbPageScrollBar</h4> <br/>

        <NbPageScrollBar
          nb-id="page-scroll-bar1"
          @scrolled="($event) => console.log('scrolled', $event)"
          @scrolling="($event) => console.log('scrolling', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue'

const NbLoaders = defineAsyncComponent(() => import('@components/NbLoaders.vue'))
const NbIndeterminate = defineAsyncComponent(() => import('@components/NbIndeterminate.vue'))
const NbSkeleton = defineAsyncComponent(() => import('@components/NbSkeleton.vue'))
const NbLoadingBar = defineAsyncComponent(() => import('@components/NbLoadingBar.vue'))
const NbPageScrollBar = defineAsyncComponent(() => import('@components/NbPageScrollBar.vue'))

const btType = ref('page-scroll-bar')
const loaderType = ref('bars')
const optionsLoaders = ref([
  'loaders',
  'indeterminate',
  'skeleton',
  'loading-bar',
  'page-scroll-bar'
])
const options = ref([
  'clock',
  'glass-filling',
  'pulse-crazy',
  'pulse',
  'ring-pulse',
  'double-ring-pulse',
  'bling-ball',
  'bars',
  'water-drop',
  'coin',
  'circle-lines',
  'solar',
  'dots',
  'leds',
  'snake',
  'zoom-ball',
  'train',
  'ring',
  'partial-ring'
])

const showLoadingBar = ref(false)
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
