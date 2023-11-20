<script setup>
import ControlNbCountdown from './ControlNbCountdown.vue'
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
    title="Nb Time/nb-countdown"
    :layout="{ type: 'grid', width: '100%' }"
    icon="game-icons:ringing-alarm"
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
        <NbCountdown
          v-if="state.nbId"
          :nb-id="state.nbId"
          :textColor="state.textColor"
          :numberColor="state.numberColor"
          :separatorColor="state.separatorColor"
          :border="state.border"
          :borderColor="state.borderColor"
          :day="state.day"
          :month="state.month"
          :year="state.year"
          :hour="state.hour"
          :minute="state.minute"
          :second="state.second"
          :daysText="state.daysText"
          :hoursText="state.hoursText"
          :minutesText="state.minutesText"
          :secondsText="state.secondsText"
          :showDays="state.showDays"
          :showHours="state.showHours"
          :showMinutes="state.showMinutes"
          :showSeconds="state.showSeconds"
          :separator="state.separator"
          :separatorType="state.separatorType"
          :fontSizeNumber="state.fontSizeNumber"
          :fontSizeText="state.fontSizeText"
          :fontSizeSeparator="state.fontSizeSeparator"
          :fontWeightNumber="state.fontWeightNumber"
          :fontWeightText="state.fontWeightText"
          :fontWeightSeparator="state.fontWeightSeparator"
          :containerWidth="state.containerWidth"
          :containerHeight="state.containerHeight"
        />
        text after
      </template>

      <template #controls="{ state }">
        <ControlNbCountdown :control-state="state" />
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
