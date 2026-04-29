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
          <option value="tabs">tabs</option>
          <option value="stepper">stepper</option>
          <option value="stepperLine">stepperLine</option>
        </select>

       <div v-if="btType === 'tabs'">
        <input type="checkbox" v-model="activeTabDisabled"> Active Tab Disabled
       </div>
      </div>
    </div>

    <div v-if="btType === 'tabs'" class="row">
      <div class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
        style="margin-top: 50px; margin-bottom: 50px; background-color: #fff; color: #000">
        <h4 class="test-page__content-tile">NbTabs</h4>
        
        <NbTabs
          nb-id="tabs-light-1"
          display="b"
          input-style="background"
          theme="light"
          tab-model="one"
          :tabs="[
            { key: 'features', label: 'Features' },
            { key: 'specs', label: 'Specs' },
            { key: 'dimensions', label: 'Dimensions' },
            { key: 'contact', label: 'Contact' }
          ]"
          :disabled-tabs="disabledTabs"
          :active-tab="activeTab"
          :padding-x=".5"
          :padding-y=".2"
          :gap="10"
          :has-border-radius="true"
          lightBgColor="tomato"
          lightTextColor="green"
          lightTextColorActive="yellow"
          font-family="Chocolate, Arial, sans-serif"
          :is-scroll-class="true"
          scroll-class="custom-scrollbar"
          :disabled="activeTabDisabled"
          @changed="changedTab"
        />
        <NbTabs
          nb-id="tabs-light-2"
          display="b"
          input-style="line"
          theme="light"
          tab-model="one"
          :tabs="[
            { key: 'features', label: 'Features' },
            { key: 'specs', label: 'Specs' },
            { key: 'dimensions', label: 'Dimensions' },
            { key: 'contact', label: 'Contact' }
          ]"
          :disabled-tabs="disabledTabs"
          :active-tab="activeTab"
          :padding-x=".5"
          :padding-y=".2"
          :gap="0"
          :has-border-radius="true"
          lightBgColor="tomato"
          lightTextColor="green"
          lightTextColorActive="yellow"
          :disabled="activeTabDisabled"
          :is-scroll-class="true"
          scroll-class="custom-scrollbar"
          @changed="changedTab"
        />
        <NbTabs
          nb-id="tabs-light-3"
          display="b"
          input-style="border"
          theme="light"
          tab-model="one"
          :tabs="[
            { key: 'features', label: 'Features' },
            { key: 'specs', label: 'Specs' },
            { key: 'dimensions', label: 'Dimensions' },
            { key: 'contact', label: 'Contact' }
          ]"
          :disabled-tabs="disabledTabs"
          :active-tab="activeTab"
          :padding-x=".5"
          :padding-y=".2"
          :gap="0"
          :has-border-radius="true"
          lightBgColor="#fff"
          lightTextColor="green"
          lightTextColorActive="yellow"
          lightTabBorderColor="tomato"
          :disabled="activeTabDisabled"
          :is-scroll-class="true"
          scroll-class="custom-scrollbar"
          @changed="changedTab"
        />

        <br />
        
        <NbTabs
          nb-id="tabs-dark-1"
          display="b"
          input-style="background"
          theme="dark"
          tab-model="one"
          :tabs="[
            { key: 'features', label: 'Features' },
            { key: 'specs', label: 'Specs' },
            { key: 'dimensions', label: 'Dimensions' },
            { key: 'contact', label: 'Contact' }
          ]"
          :disabled-tabs="disabledTabs"
          :active-tab="activeTab"
          :padding-x=".5"
          :padding-y=".2"
          :gap="10"
          :has-border-radius="true"
          darkBgColor="tomato"
          :disabled="activeTabDisabled"
          :is-scroll-class="true"
          scroll-class="custom-scrollbar"
          @changed="changedTab"
        />
        <NbTabs
          nb-id="tabs-dark-2"
          display="b"
          input-style="line"
          theme="dark"
          tab-model="one"
          :tabs="[
            { key: 'features', label: 'Features' },
            { key: 'specs', label: 'Specs' },
            { key: 'dimensions', label: 'Dimensions' },
            { key: 'contact', label: 'Contact' }
          ]"
          :disabled-tabs="disabledTabs"
          :active-tab="activeTab"
          :padding-x=".5"
          :padding-y=".2"
          :gap="0"
          :has-border-radius="true"
          darkBgColor="tomato"
          darkTextColorActive="black"
          :disabled="activeTabDisabled"
          :is-scroll-class="true"
          scroll-class="custom-scrollbar"
          @changed="changedTab"
        />
        <NbTabs
          nb-id="tabs-dark-3"
          display="b"
          input-style="border"
          theme="dark"
          tab-model="one"
          :tabs="[
            { key: 'features', label: 'Features' },
            { key: 'specs', label: 'Specs' },
            { key: 'dimensions', label: 'Dimensions' },
            { key: 'contact', label: 'Contact' }
          ]"
          :disabled-tabs="disabledTabs"
          :active-tab="activeTab"
          :padding-x=".5"
          :padding-y=".2"
          :gap="0"
          :has-border-radius="true"
          darkBgColor="#fff"
          darkTextColor="black"
          darkTextColorActive="black"
          darkTabBorderColor="tomato"
          :disabled="activeTabDisabled"
          :is-scroll-class="true"
          scroll-class="custom-scrollbar"
          @changed="changedTab"
        />
        <div>
          <div v-if="activeTab === 1">Conteudo de Specs</div>
          <div v-else-if="activeTab === 2">Conteudo de Dimensions</div>
          <div v-else-if="activeTab === 3">Conteudo de Contact</div>
          <div v-else>Conteudo de Features</div>
        </div>
      </div>
    </div>

    <div v-if="btType === 'stepper'" class="row">
      <div class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
        style="margin-top: 50px; margin-bottom: 50px; background-color: #fff; color: #000">
        <h4 class="test-page__content-tile">NbStepper</h4>

        <span>Steps </span>
        <input type="number" v-model="steps" min="1" max="100" step="1"> <br />
        <span>Active Step </span>
        <input type="number" v-model="activeStep" min="1" :max="steps + 1" step="1">

        <br />

        <span>Circle Size (rem) </span>
        <input type="number" v-model="circleSize" min="0.1" max="100" step="0.1"> <br />
        <span>Circle Border Size (rem) </span>
        <input type="number" v-model="circleBorderSize" min="0.1" max="100" step="0.1"> <br />
        <span>Line Size (rem) </span>
        <input type="number" v-model="lineSize" min="0.1" max="100" step="0.1"> <br />

        <span>Block Click </span>
        Block Click <input type="checkbox" v-model="blockClick"> {{ blockClick }} <br />
        Has Tab Index Enter <input type="checkbox" v-model="hasTabIndexEnter"> {{ hasTabIndexEnter }} <br />
        Disabled <input type="checkbox" v-model="disabled"> {{ disabled }} <br />
        Vertical Stepper Height (px) <input type="number" v-model="verticalStepperHeight" min="100" max="1000" step="0"> <br />

        <NbStepper
          nb-id="stepper-1"
          display="b"
          theme="light"
          orientation="horizontal"
          :step="activeStep"
          :steps="steps"
          :circle-size="circleSize"
          :circle-border-size="circleBorderSize"
          :line-size="lineSize"
          :block-click="blockClick"
          :has-tab-index-enter="hasTabIndexEnter"
          :disabled="disabled"
          @changed="changedStep"
          @status="($event) => console.log('status', $event)"
        />
        <p>Algo depois</p>
        <NbStepper
          nb-id="stepper-2"
          display="b"
          theme="dark"
          orientation="horizontal"
          :step="activeStep"
          :steps="steps"
          :circle-size="circleSize"
          :circle-border-size="circleBorderSize"
          :line-size="lineSize"
          :block-click="blockClick"
          :has-tab-index-enter="hasTabIndexEnter"
          :disabled="disabled"
          @changed="changedStep"
          @status="($event) => console.log('status', $event)"
        />

        <div :style="{ height: verticalStepperHeight + 'px' }" style="border: 1px solid #353734;">
          <NbStepper
            nb-id="stepper-3"
            display="b"
            theme="dark"
            orientation="vertical"
            :step="activeStep"
            :steps="steps"
            :circle-size="circleSize"
            :circle-border-size="circleBorderSize"
            :line-size="lineSize"
            :block-click="blockClick"
            :has-tab-index-enter="hasTabIndexEnter"
            :disabled="disabled"
            @changed="changedStep"
            @status="($event) => console.log('status', $event)"
          />

          Algo depois
        </div>

        <br /><br />
        <p>StepperTwo</p>
        <StepperTwo/>
      </div>
    </div>

    <div v-if="btType === 'stepperLine'" class="row">
      <div class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
        style="margin-top: 50px; margin-bottom: 50px; background-color: #fff; color: #000">
        <h4 class="test-page__content-tile">NbStepper</h4>

        <span>Steps </span>
        <input type="number" v-model="steps" min="1" max="100" step="1"> <br />
        <span>Active Step </span>
        <input type="number" v-model="activeStep" min="1" :max="stepsText.length" step="1">

        <br />

        <span>Circle Size (rem) </span>
        <input type="number" v-model="circleSize" min="0.1" max="100" step="0.1"> <br />
        <span>Circle Border Size (rem) </span>
        <input type="number" v-model="circleBorderSize" min="0.1" max="100" step="0.1"> <br />
        <span>Line Size (rem) </span>
        <input type="number" v-model="lineSize" min="0.1" max="100" step="0.1"> <br />

        <span>Block Click </span>
        Block Click <input type="checkbox" v-model="blockClick"> {{ blockClick }} <br />
        Has Tab Index Enter <input type="checkbox" v-model="hasTabIndexEnter"> {{ hasTabIndexEnter }} <br />
        Disabled <input type="checkbox" v-model="disabled"> {{ disabled }} <br />
        Vertical Stepper Height (px) <input type="number" v-model="verticalStepperHeight" min="100" max="1000" step="0"> <br />

        <NbStepperLine
          nb-id="stepper-1"
          display="b"
          theme="light"
          orientation="horizontal"
          :step="activeStep"
          :steps="steps"
          :circle-size="circleSize"
          :circle-border-size="circleBorderSize"
          :line-size="lineSize"
          :block-click="blockClick"
          :has-tab-index-enter="hasTabIndexEnter"
          :disabled="disabled"
          @changed="changedStep"
          @status="($event) => console.log('status', $event)"
        />
        <NbStepperLine
          nb-id="stepper-2"
          display="b"
          theme="light"
          orientation="horizontal"
          :step="activeStep"
          :steps="stepsText"
          :circle-size="circleSize"
          :circle-border-size="circleBorderSize"
          :line-size="lineSize"
          :block-click="blockClick"
          :has-tab-index-enter="hasTabIndexEnter"
          :disabled="disabled"
          @changed="changedStep"
          @status="($event) => console.log('status', $event)"
        />
        <p>Algo depois</p>
        <NbStepperLine
          nb-id="stepper-3"
          display="b"
          theme="dark"
          orientation="horizontal"
          :step="activeStep"
          :steps="steps"
          :circle-size="circleSize"
          :circle-border-size="circleBorderSize"
          :line-size="lineSize"
          :block-click="blockClick"
          :has-tab-index-enter="hasTabIndexEnter"
          :disabled="disabled"
          @changed="changedStep"
          @status="($event) => console.log('status', $event)"
        />

        <br /><br />
        <p>StepperTwo</p>
        <StepperTwo/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue'

const NbTabs = defineAsyncComponent(() => import('@components/NbTabs.vue'))
const NbStepper = defineAsyncComponent(() => import('@components/NbStepper.vue'))
const NbStepperLine = defineAsyncComponent(() => import('@components/NbStepperLine.vue'))

const StepperTwo = defineAsyncComponent(() => import('@components/StepperTwo.vue'))

const btType = ref('stepperLine')


/* tests tab - model one*/
const activeTabDisabled = ref(false)
const activeTab = ref(3)
const disabledTabs = ref([1])
const changedTab = (value) => {
  activeTab.value = value.index
}

/* tests stepper */
const steps = ref(4)
const stepsText = ref([
  { id: 1, title: 'Barra de borda', isNew: true, future: false },
  { id: 2, title: 'Layout da guia', isNew: false, future: false },
  { id: 3, title: 'Modo escuro/claro', isNew: false, future: false },
  { id: 4, title: 'Organizar guias', isNew: false, future: true },
  { id: 5, title: 'Tela dividida', isNew: false, future: true },
  { id: 6, title: 'Ler em voz alta', isNew: false, future: true },
  { id: 7, title: 'Espaços de trabalho', isNew: false, future: true },
  { id: 8, title: 'Comece agora mesmo', isNew: false, future: true },
  { id: 9, title: 'Espaços de trabalho', isNew: false, future: true },
  { id: 10, title: 'Comece agora mesmo', isNew: false, future: true },
  { id: 11, title: 'Comece agora mesmo', isNew: false, future: true },
  { id: 12, title: 'Espaços de trabalho', isNew: false, future: true },
  { id: 13, title: 'Comece agora mesmo', isNew: false, future: true }
])
const activeStep = ref(1)
const circleSize = ref(0.8)
const circleBorderSize = ref(0.13)
const lineSize = ref(0.1)
const blockClick = ref(false)
const hasTabIndexEnter = ref(false)
const disabled = ref(false)
const verticalStepperHeight = ref(225)
const changedStep = (value) => {
  activeStep.value = value
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
}

:deep(.tabs-header) {
    &.custom-scrollbar {
      &::-webkit-scrollbar {
        height: 3px;
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
</style>
