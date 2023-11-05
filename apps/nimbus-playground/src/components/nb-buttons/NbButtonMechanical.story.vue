<script setup>
import { logEvent } from 'histoire/client'
import ControlNbButtonMechanical from './ControlNbButtonMechanical.vue'
import { defaultPropertiesValues } from './config'

/**
 * States List
 */
const initState = () => {
  return { ...defaultPropertiesValues }
}

const betweenTextsState = () => {
  return {
    ...defaultPropertiesValues,
    display: 'ib'
  }
}

const clicked = () => {
  logEvent('clicked', null)
}
</script>

<template>
  <Story
    title="Nb Buttons/nb-button-mechanical"
    :layout="{ type: 'grid', width: '100%' }"
    icon="material-symbols:buttons-alt-rounded"
    icon-color="#8B5CF6"
    autoPropsDisabled
  >
    <Variant
      title="Default Values"
      icon="gis:flag-start"
      icon-color="#fca673"
      responsive-disabled
      :init-state="initState"
    >
      <template #default="{ state }">
        <NbButtonMechanical
          v-if="state.nbId"
          :nb-id="state.nbId"
          :display="state.display"
          :textColor="state.textColor"
          :containerColor="state.containerColor"
          :buttonColor="state.buttonColor"
          :paddingX="state.paddingX"
          :paddingY="state.paddingY"
          :disabled="state.disabled"
          :borderRadius="state.borderRadius"
          :animationSlow="state.animationSlow"
          :fontFamily="state.fontFamily"
          :fontSize="state.fontSize"
          :fontWeight="state.fontWeight"
          @clicked="clicked"
        />
      </template>

      <template #controls="{ state }">
        <ControlNbButtonMechanical :control-state="state" />
      </template>
    </Variant>

    <Variant
      title="Between texts (Display: Block 'b')"
      icon="gis:flag-start"
      icon-color="#fca673"
      responsive-disabled
      :init-state="betweenTextsState"
    >
      <template #default="{ state }">
        <div
          :style="{ backgroundColor: state.containerSimulator, padding: '10px 0', color: '#000' }"
        >
          <p>(Display: Block 'b')</p>

          <p>
            Before text
            <NbButtonMechanical
              v-if="state.nbId"
              :nb-id="state.nbId"
              :display="state.display"
              :textColor="state.textColor"
              :containerColor="state.containerColor"
              :buttonColor="state.buttonColor"
              :paddingX="state.paddingX"
              :paddingY="state.paddingY"
              :disabled="state.disabled"
              :borderRadius="state.borderRadius"
              :animationSlow="state.animationSlow"
              :fontFamily="state.fontFamily"
              :fontSize="state.fontSize"
              :fontWeight="state.fontWeight"
              @clicked="clicked"
            />
            > after text
          </p>
        </div>
      </template>

      <template #controls="{ state }">
        <ControlNbButtonMechanical :control-state="state" />
      </template>
    </Variant>

    <Variant
      title="Between texts (Display: inline-Block 'ib')"
      icon="gis:flag-start"
      icon-color="#fca673"
      responsive-disabled
      :init-state="betweenTextsState"
    >
      <template #default="{ state }">
        <div
          :style="{ backgroundColor: state.containerSimulator, padding: '10px 0', color: '#000' }"
        >
          <p>(Display: inline-Block 'ib')</p>

          <p>
            Before text
            <NbButtonMechanical
              v-if="state.nbId"
              :nb-id="state.nbId"
              :display="state.display"
              :textColor="state.textColor"
              :containerColor="state.containerColor"
              :buttonColor="state.buttonColor"
              :paddingX="state.paddingX"
              :paddingY="state.paddingY"
              :disabled="state.disabled"
              :borderRadius="state.borderRadius"
              :animationSlow="state.animationSlow"
              :fontFamily="state.fontFamily"
              :fontSize="state.fontSize"
              :fontWeight="state.fontWeight"
              @clicked="clicked"
            />
            after text
          </p>
        </div>
      </template>

      <template #controls="{ state }">
        <ControlNbButtonMechanical :control-state="state" />
      </template>
    </Variant>

    <Variant
      title="Content (slot)"
      icon="gis:flag-start"
      icon-color="#fca673"
      responsive-disabled
      :init-state="betweenTextsState"
    >
      <template #default="{ state }">
        <div
          :style="{ backgroundColor: state.containerSimulator, padding: '10px 0', color: '#000' }"
        >
          <p>Content (slot)</p>

          <NbButtonMechanical
            v-if="state.nbId"
            :nb-id="state.nbId"
            :display="state.display"
            :textColor="state.textColor"
            :containerColor="state.containerColor"
            :buttonColor="state.buttonColor"
            :paddingX="state.paddingX"
            :paddingY="state.paddingY"
            :disabled="state.disabled"
            :borderRadius="state.borderRadius"
            :animationSlow="state.animationSlow"
            :fontFamily="state.fontFamily"
            :fontSize="state.fontSize"
            :fontWeight="state.fontWeight"
            @clicked="clicked"
          >
            <template #content>Display block</template>
          </NbButtonMechanical>
        </div>
      </template>

      <template #controls="{ state }">
        <ControlNbButtonMechanical :control-state="state" />
      </template>
    </Variant>
  </Story>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Lugrasimo&display=swap');
.explanation {
  font-size: 0.8em;
  color: rgb(117, 117, 117);
}
:global(.__histoire-render-story) {
  direction: ltr !important;
  margin: 0;
  padding: 0;
  position: relative;
  text-align: center;
}
</style>

<docs lang="md">
# Nb Button Mechanical

> This component is only for [Vue.js 3+](https://vuejs.org/)

To learn more about this component, use the complete documentation available [here](https://nimbus.tec.br/vue-components/nb-buttons/nb-button-mechanical) at lib.
</docs>
