<script setup>
import ControlNbSlideDivFixedSize from './ControlNbSlideDivFixedSize.vue'
import { defaultPropertiesValues } from './config'

/**
 * States List
 */
const initState = () => {
  return { ...defaultPropertiesValues }
}
</script>

<template>
  <Story
    title="Nb Slides/nb-slide-div-fixed-size"
    :layout="{ type: 'grid', width: '100%' }"
    icon="solar:slider-vertical-bold"
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
        Text before
        <NbSlideDivFixedSize
          v-if="state.nbId"
          :nb-id="state.nbId"
          :display="state.display"
          :disabled="state.disabled"
          :border-radius="state.borderRadius"
          :slide-type="state.slideType"
          :slide-width="state.slideWidth"
          :slide-height="state.slideHeight"
          :slide-interval="state.slideInterval"
          :show-buttons="state.showButtons"
          :buttons-size="state.buttonsSize"
          :button-margin-top="state.buttonMarginTop"
          :button-margin-bottom="state.buttonMarginBottom"
          :buttons-color="state.buttonsColor"
          :buttons-color-hover="state.buttonsColorHover"
          :show-progress-bar="state.showProgressBar"
          :progress-color="state.progressColor"
        >
          <template #slides1>
            <div style="background: gray; height: 100%; padding: 15px; text-wrap: wrap">
              <h1 style="margin-top: 0; text-align: center">Content 1</h1>
              <p>This is an example of content, look at the generated code to understand better.</p>
              <img src="http://localhost:6006/square.png" style="width: auto; height: 58%" />
            </div>
          </template>
          <template #slides2>
            <div style="background: green; height: 100%; padding: 15px; text-wrap: wrap">
              <h1 style="margin-top: 0; text-align: center">Content 2</h1>
              <p>This is an example of content, look at the generated code to understand better.</p>
              <img src="http://localhost:6006/square.png" style="width: auto; height: 58%" />
            </div>
          </template>
        </NbSlideDivFixedSize>
        text after
      </template>

      <template #controls="{ state }">
        <ControlNbSlideDivFixedSize :control-state="state" />
      </template>
    </Variant>

    <Variant
      title="Without slots (content)"
      icon="gis:flag-start"
      icon-color="#fca673"
      responsive-disabled
      :init-state="initState"
    >
      <template #default="{ state }">
        Text before
        <NbSlideDivFixedSize
          v-if="state.nbId"
          :nb-id="state.nbId"
          :display="state.display"
          :disabled="state.disabled"
          :border-radius="state.borderRadius"
          :slide-type="state.slideType"
          :slide-width="state.slideWidth"
          :slide-height="state.slideHeight"
          :slide-interval="state.slideInterval"
          :show-buttons="state.showButtons"
          :buttons-size="state.buttonsSize"
          :button-margin-top="state.buttonMarginTop"
          :button-margin-bottom="state.buttonMarginBottom"
          :buttons-color="state.buttonsColor"
          :buttons-color-hover="state.buttonsColorHover"
          :show-progress-bar="state.showProgressBar"
          :progress-color="state.progressColor"
        />
        text after
      </template>

      <template #controls="{ state }">
        <ControlNbSlideDivFixedSize :control-state="state" />
      </template>
    </Variant>

    <Variant
      title="One slot (content)"
      icon="gis:flag-start"
      icon-color="#fca673"
      responsive-disabled
      :init-state="initState"
    >
      <template #default="{ state }">
        Text before
        <NbSlideDivFixedSize
          v-if="state.nbId"
          :nb-id="state.nbId"
          :display="state.display"
          :disabled="state.disabled"
          :border-radius="state.borderRadius"
          :slide-type="state.slideType"
          :slide-width="state.slideWidth"
          :slide-height="state.slideHeight"
          :slide-interval="state.slideInterval"
          :show-buttons="state.showButtons"
          :buttons-size="state.buttonsSize"
          :button-margin-top="state.buttonMarginTop"
          :button-margin-bottom="state.buttonMarginBottom"
          :buttons-color="state.buttonsColor"
          :buttons-color-hover="state.buttonsColorHover"
          :show-progress-bar="state.showProgressBar"
          :progress-color="state.progressColor"
        >
          <template #slides1>
            <div style="background: gray; height: 100%; padding: 15px; text-wrap: wrap">
              <h1 style="margin-top: 0; text-align: center">Content 1</h1>
              <p>This is an example of content, look at the generated code to understand better.</p>
              <img src="http://localhost:6006/square.png" style="width: auto; height: 58%" />
            </div>
          </template>
        </NbSlideDivFixedSize>
        text after
      </template>

      <template #controls="{ state }">
        <ControlNbSlideDivFixedSize :control-state="state" />
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
# Nb Slide Div Fixed Size

> This component is only for [Vue.js 3+](https://vuejs.org/)

To learn more about this component, use the complete documentation available [here](https://nimbus.tec.br/vue-components/nb-slides/nb-slide-div-fixed-size) at lib.
</docs>
