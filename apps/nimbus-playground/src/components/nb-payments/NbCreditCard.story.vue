<script setup>
import { logEvent } from 'histoire/client'
import ControlNbCreditCard from './ControlNbCreditCard.vue'
import { defaultPropertiesValues } from './config'

/**
 * States List
 */
const initState = () => {
  return { ...defaultPropertiesValues }
}

/*
const sizeState = () => {
  return {
    ...defaultValues,
    nbId: 'nb-gradient-text-two',
    size: '1.5',
    sizeType: 'em'
  }
}
const colorState = () => {
  return {
    ...defaultValues,
    nbId: 'nb-gradient-text-tree',
    bgFirst: 'tomato',
    bgSecond: 'blue'
  }
}
const alignmentState = () => {
  return {
    ...defaultValues,
    nbId: 'nb-gradient-text-four',
    alignment: 'center'
  }
}
const paddingBottomState = () => {
  return {
    ...defaultValues,
    nbId: 'nb-gradient-text-six',
    paddingBottom: '50'
  }
}
const fontState = () => {
  return {
    ...defaultValues,
    nbId: 'nb-gradient-text-six',
    font: "'Lugrasimo', cursive"
  }
}*/

const setCardValues = ($event) => {
  logEvent('setCardValues', $event)
}
</script>

<template>
  <Story
    title="Nb Payments/nb-credit-card"
    :layout="{ type: 'grid', width: '100%' }"
    icon="ic:round-payment"
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
        <NbCreditCard
          :nb-id="state.nbId"
          :showForm="state.showForm"
          :chipModel="state.chipModel"
          :cardNumber="state.cardNumber"
          :cardName="state.cardName"
          :cardExpMonth="state.cardExpMonth"
          :cardExpYear="state.cardExpYear"
          :years="state.years"
          :cardCcv="state.cardCcv"
          :formatMode="state.formatMode"
          :flipOnHover="state.flipOnHover"
          :formNumberText="state.formNumberText"
          :formHolderText="state.formHolderText"
          :formExpMonthText="state.formExpMonthText"
          :formExpMonthDefaultText="state.formExpMonthDefaultText"
          :formExpYearText="state.formExpYearText"
          :formExpYearDefaultText="state.formExpYearDefaultText"
          :formCcvText="state.formCcvText"
          :cardHolderText="state.cardHolderText"
          :cardExpirationText="state.cardExpirationText"
          :cardCcvText="state.cardCcvText"
          :formBackground="state.formBackground"
          :formColor="state.formColor"
          :formRadius="state.formRadius"
          :formShadow="state.formShadow"
          :formInputBackground="state.formInputBackground"
          :formInputColor="state.formInputColor"
          :formInputActiveColor="state.formInputActiveColor"
          :formInputBorder="state.formInputBorder"
          :formInputRadius="state.formInputRadius"
          :cardBackground="state.cardBackground"
          :cardColor="state.cardColor"
          :cardRadius="state.cardRadius"
          :cardShadow="state.cardShadow"
          :cardCcvColor="state.cardCcvColor"
          @card-values="setCardValues"
        />
      </template>

      <template #controls="{ state }">
        <ControlNbCreditCard :control-state="state" />
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
# Nb Credit Card

> This component is only for [Vue.js 3+](https://vuejs.org/)

To learn more about this component, use the complete documentation available [here](https://nimbus.tec.br/vue-components/nb-payments/nb-credit-card) at lib.
</docs>
