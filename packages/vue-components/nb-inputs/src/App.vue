<template>
  <div class="container-fluid test-page">
    <div class="row">
      <div class="col-md-10 col-md-offset-1 test-page__title">
        <h2>Test page</h2>
        <p class="test-page__component-name"><strong>Component:</strong> NbInputs</p>
        <p class="test-page__warning">Warning: Look at the console to see the click event</p>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12 col-md-10 col-md-offset-1 test-page__content" style="margin-bottom: 50px; overflow: hidden">
        <select v-model="btType">
          <option value="radio">radio</option>
          <option value="checkbox">checkbox</option>
        </select>
      </div>
    </div>

    <div v-if="btType === 'radio'" class="row">
      <div class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
        style="margin-top: 50px; margin-bottom: 50px; overflow: hidden;">
        <h4 class="test-page__content-tile">NbInputRadio</h4>
        
        <NbInputRadio
          nb-id="radio1"
          display="b"
          group-name="radio-test1"
          :current-optiton="currentRadioItem"
          :options="inputOptions"
          direction="left"
          text-color="white"
          @current-value="changeRadioItem($event)"
        />

        <p style="margin-top: 4px;">
          Text before
          <NbInputRadio
            nb-id="radio2"
            display="ib"
            group-name="radio-test2"
            :current-optiton="currentRadioItem"
            :options="inputOptions"
            direction="left"
            text-color="white"
            @current-value="changeRadioItem($event)"
          />
          text after
        </p>
      </div>
    </div>

  <div v-if="btType === 'checkbox'" class="row">
    <div class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
      style="margin-top: 50px; margin-bottom: 50px; overflow: hidden;">
      <h4 class="test-page__content-tile">NbInputCheckbox</h4>
      
      <NbInputCheckbox
        nb-id="checkbox1"
        display="b"
        group-name="checkbox-test1"
        :current-optiton="currentCheckboxItem"
        :options="inputOptions"
        direction="left"
        type="circle"
        text-color="white"
        @current-value="changeChackboxItem($event)"
      />

      <p style="margin-top: 4px;">
        Text before
        <NbInputCheckbox
          nb-id="checkbox2"
          display="ib"
          group-name="checkbox-test2"
          :current-optiton="currentCheckboxItem"
          :options="inputOptions"
          direction="left"
          text-color="white"
          @current-value="changeChackboxItem($event)"
        />
        text after
      </p>
    </div>
  </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent, ref, computed } from 'vue'

const NbInputRadio = defineAsyncComponent(() => import('@components/NbInputRadio.vue'))
const NbInputCheckbox = defineAsyncComponent(() => import('@components/NbInputCheckbox.vue'))

const btType = ref('checkbox')
const currentRadioItem = ref('')
const currentCheckboxItem = ref([''])
const inputOptions = computed(() => {
  return [
    {
      value: 'dog',
      text: 'dog',
    },
    {
      value: 'cat',
      text: 'cat',
    },
    {
      value: 'fish',
      text: 'fish',
    },
  ]
})

const changeRadioItem = (event) => {
  currentRadioItem.value = event
}
const changeChackboxItem = (event) => {
  currentCheckboxItem.value = event
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
    overflow: hidden;
  }
}
</style>
