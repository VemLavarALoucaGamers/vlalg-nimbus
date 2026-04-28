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
        </select>
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
          lightBorderColor="green"
          @changed="changedTab"
        />
        <br />
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
          lightBorderColor="green"
          @changed="changedTab"
        />
        <br />
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
          lightBgColor="tomato"
          lightBorderColor="green"
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
  </div>
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue'

const NbTabs = defineAsyncComponent(() => import('@components/NbTabs.vue'))

const btType = ref('tabs')


/* tests tab - model one*/
const activeTab = ref(1)
const disabledTabs = ref([1])
const changedTab = (value) => {
  activeTab.value = value.index
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
</style>
