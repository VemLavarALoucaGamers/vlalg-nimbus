# Vg-Credit-Card
> This component is only for [Vue.js 3+](https://vuejs.org/)

<br />

<div align="center">

![npm](https://img.shields.io/npm/v/@vemlavaraloucagamers/vg-credit-card?style=for-the-badge) ![npm](https://img.shields.io/npm/dm/@vemlavaraloucagamers/vg-credit-card?style=for-the-badge) ![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/@vemlavaraloucagamers/vg-credit-card?label=npm%20vulnerabilities&style=for-the-badge) ![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/VemLavarALoucaGamers/vlalg-frontend-components?label=Repo%20Vulnerabilities&style=for-the-badge)
</div>

<br />

<p align="center">
  <img src="https://github.com/VemLavarALoucaGamers/vlalg-frontend-components/raw/main/vue-components/vg-credit-card/src/images/example.gif" width="400">
</p>

This is a component credit card.

## Installation

```bash
npm install @vemlavaraloucagamers/vg-credit-card

# or

yarn add @vemlavaraloucagamers/vg-credit-card
```

## Usage
```js
// main.js
import { createApp } from 'vue'
import App from './App.vue'

import VgCreditCard from '@vemlavaraloucagamers/vg-credit-card'
import "@vemlavaraloucagamers/vg-credit-card/dist/style.css";

const app = createApp(App)
app.use(VgCreditCard)
app.mount('#app')
```

```jsx
// page.vue
<template>
  <VgCreditCard />
</template>

<template>
  <vg-credit-card />
</template>

<template>
  <vg-credit-card></vg-credit-card>
</template>
```

## Props
> Items with an (*) mean they are required

| name    | Value type | Default | Description |
| ------- | :--------- | :------ | :---------------------------- |
| vgId (*)    | String     |        | Sets the id attribute to differentiate from other components |
| showForm    | Boolean     |  false      | Defines whether to use the form |
| chipModel   | String     |  'two'      | Defines the model of the card chip. Accepts the following values **'one'** or **'two'** |
| cardNumber   | String     |        | Sets the card number. If showForm is false, this field can be used to pass the value of the card or even when it is active/inactive to pass a value coming from another location (database, other input, ...) |
| cardName   | String     |        | Sets the card holder name. If showForm is false, this field can be used to pass the value of the card or even when it is active/inactive to pass a value coming from another location (database, other input, ...) |
| cardExpMonth   | String     |        | Sets the card expiration month. If showForm is false, this field can be used to pass the value of the card or even when it is active/inactive to pass a value coming from another location (database, other input, ...). Accepts values from 01 to 12 |
| cardExpYear   | String     |        | Sets the card expiration year. If showForm is false, this field can be used to pass the value of the card or even when it is active/inactive to pass a value coming from another location (database, other input, ...). It accepts a value defined in the years property here below |
| years   | Array     |        | Defines a list of valid years that must contain the cardExpYear property, if a list is not passed, a list of years is created with the beginning of the year being 5 years before the current one with a total of 15 years. Example: Today is 2022, it will generate a list starting in 2017 and ending in 2032 |
| cardCcv   | String     |        | Sets the card ccv. If showForm is false, this field can be used to pass the value of the card or even when it is active/inactive to pass a value coming from another location (database, other input, ...) |
| flipOnHover   | Boolean     |  false      | Defines if the card will have a flip when having hover, it can be used in cases where the **showForm** is false allowing to visualize the ccv since the card by default has the flip when it is receiving interaction in the ccv input when the **showForm** is true |
| formNumberText   | String     | 'card number'       | Defines the text that appears on the form for the card number field |
| formHolderText   | String     | 'card holder'       | Defines the text that appears on the form for the card holder name field |
| formExpMonthText   | String     | 'expiration mm'       | Defines the text that appears on the form for the card expiration month field |
| formExpMonthText   | String     | 'month'       | Defines the text of the first option of the month select |
| formExpYearText   | String     | 'expiration yy'       | Defines the text that appears on the form for the card expiration year field |
| formExpYearDefaultText   | String     | 'year'       | Defines the text of the first option of the year select |
| formCcvText   | String     | 'ccv'       | Defines the text that appears on the form for the form ccv field |
| formBackground   | String     | '#fff'       | Defines the form background color. Accepts **Color name** and **Hex** |
| formColor   | String     | '#999'       | Defines the form text color. Accepts **Color name** and **Hex** |
| formRadius   | String     | '5'       | Defines the form border radius. |
| formShadow   | Boolean     | false       | Defines the form box shadow. |
| cardBackground   | String     | '#fff'       | Defines the card background color. Accepts **Color name** and **Hex** |
| cardColor   | String     | '#999'       | Defines the card text color. Accepts **Color name** and **Hex** |
| cardRadius   | String     | '5'       | Defines the card border radius. |
| cardShadow   | Boolean     | false       | Defines the card box shadow. |
| cardCcvColor   | String     | '#333'       | Defines the card ccv text color. Accepts **Color name** and **Hex** |
| formInputBackground   | String     | '#fff'       | Defines the input background color. Accepts **Color name** and **Hex** |
| formInputColor   | String     | '#444'       | Defines the input color. Accepts **Color name** and **Hex** |
| formInputActiveColor   | String     | '#B2B2B2'       | Defines the active input border color. Accepts **Color name** and **Hex** |
| formInputBorder   | String     | '#B2B2B2'       | Defines the input border color. Accepts **Color name** and **Hex** |
| formInputRadius   | String     | '10'       | Defines the input border radius. |


## Events

| name    | Return type | Description |
| ------- | :--------- | :---------------------------- |
| card-values | Object | Triggered when the card receives a change in the value of some field, regardless of what it is. An object with all values is returned (**number**, **name**, **expMonth**, **expYear**, **ccv**) |

## Example

<p align="left">
  <img src="https://github.com/VemLavarALoucaGamers/vlalg-frontend-components/raw/main/vue-components/vg-credit-card/images/props_example.gif" width="150">
</p>

```jsx
// page.vue
<template>
  <VgCreditCard
    vg-id="vg-credit-card-one"
    :show-form="true"
    chip-model="two"
    :flip-on-hover="true"
    :form-shadow="true"
    form-input-background="white"
    form-input-border="magenta"
    form-input-active-color="yellow"
    @card-values="somethingReturned"
  />
</template>

<script setup>
  const somethingReturned = () => {
    console.log('VgCreditCard something returned')
  }

  return {
    somethingReturned
  }
</script>
```

```bash
# console when something returned
VgCreditCard something returned
```

## License

[MIT](http://opensource.org/licenses/MIT)
