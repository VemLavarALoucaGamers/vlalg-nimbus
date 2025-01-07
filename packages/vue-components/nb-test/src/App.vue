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
            v-for="(option, index) in options"
            :key="index"
            :value="option"
          >{{ option }}</option>
        </select>
      </div>
    </div>

    <div v-if="btType === 'test'" class="row">
      <div class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
        style="margin-top: 50px; margin-bottom: 50px;">

        <NbTest
          nb-id="radio1"
          message="texto tooltip de teste asdas dasdasdas"
        >Mouse aqui</NbTest>
        
        <br><br>
        
        <p>
          Text before
          <NbTest
            nb-id="radio1"
            display="ib"
            direction="bottom"
            message="texto tooltip de teste asdas dasdasdas"
          >
            Mouse aqui
          </NbTest>
          text after
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue'

const NbTest = defineAsyncComponent(() => import('@components/NbTest.vue'))

const btType = ref('test')
const options = ref([
  'test'
])
// const inputValue = ref('test')
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
}
</style>
