<script setup>
import ControlNbGradientText from './ControlNbGradientText.vue'
import { initGradientTextState } from './config'

/**
 * States List
 */
const initState = () => {
  return { ...initGradientTextState }
}
</script>

<template>
  <Story
    title="Nb Text/nb-gradient-text"
    :layout="{ type: 'grid', width: '500' }"
    icon="ic:round-texture"
    icon-color="#8B5CF6"
    autoPropsDisabled
  >
    <Variant title="playground" icon="gis:flag-start" icon-color="#fca673" :init-state="initState">
      <template #default="{ state }">
        <NbGradientText
          :nb-id="state.nbId"
          :alignment="state.alignment"
          :line-height="state.lineHeight"
          :size="`${state.size}${state.sizeType}`"
          :padding-bottom="state.paddingBottom"
          :bg-first="state.bgFirst"
          :bg-second="state.bgSecond"
          :font="state.font"
        >
          <template #text>
            {{ state.text }}
          </template>
        </NbGradientText>
      </template>

      <template #controls="{ state }">
        <ControlNbGradientText :control-state="state" />
      </template>
    </Variant>
  </Story>
</template>

<style scoped>
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
# Nb Gradient Text

> This component is only for [Vue.js 3+](https://vuejs.org/)

To learn more about this component, use the complete documentation available [here](https://nimbus.tec.br/vue-components/nb-text/nb-gradient-text) at lib.
</docs>
