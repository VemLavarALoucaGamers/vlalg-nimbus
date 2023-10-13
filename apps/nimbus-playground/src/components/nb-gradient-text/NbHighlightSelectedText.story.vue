<script setup>
import ControlNbHighlightSelectedText from './ControlNbHighlightSelectedText.vue'
import { initHighlightSelectedTextState } from './config'

/**
 * States List
 */
const initState = () => {
  return { ...initHighlightSelectedTextState }
}
</script>

<template>
  <Story
    title="Nb Text/nb-highlight-selected-text"
    :layout="{ type: 'grid', width: '500' }"
    icon="material-symbols:format-ink-highlighter"
    icon-color="#8B5CF6"
    autoPropsDisabled
  >
    <Variant
      title="only the component"
      icon="gis:flag-start"
      icon-color="#fca673"
      :init-state="initState"
    >
      <template #default="{ state }">
        <div class="test-content">
          <NbHighlightSelectedText
            :nb-id="state.nbId"
            :background-color="state.backgroundColor"
            :text-color="state.textColor"
          >
            <template #text>
              {{ state.text }}
            </template>
          </NbHighlightSelectedText>
        </div>
      </template>

      <template #controls="{ state }">
        <ControlNbHighlightSelectedText :control-state="state" />
      </template>
    </Variant>

    <Variant
      title="component in the middle of a text"
      icon="gis:flag-start"
      icon-color="#fca673"
      :init-state="initState"
    >
      <template #default="{ state }">
        <div class="test-content" v-if="state.nbId">
          Select
          <NbHighlightSelectedText
            :nb-id="state.nbId"
            :background-color="state.backgroundColor"
            :text-color="state.textColor"
          >
            <template #text>
              {{ state.text }}
            </template>
          </NbHighlightSelectedText>
          to see it in another color
        </div>
      </template>

      <template #controls="{ state }">
        <ControlNbHighlightSelectedText :control-state="state" />
      </template> </Variant
    ><!---->
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
.test-content {
  color: #fff;
  font-size: 18px;
}
</style>

<docs lang="md">
# Nb Gradient Text

> This component is only for [Vue.js 3+](https://vuejs.org/)

To learn more about this component, use the complete documentation available [here](https://nimbus.tec.br/vue-components/nb-text/nb-highlight-selected-text) at lib.
</docs>
