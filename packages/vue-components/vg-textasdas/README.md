# Vg-Text
> This component is only for [Vue.js 3+](https://vuejs.org/)

<br />

<div align="center">

![npm](https://img.shields.io/npm/v/@vemlavaraloucagamers/vg-text?style=for-the-badge) ![npm](https://img.shields.io/npm/dm/@vemlavaraloucagamers/vg-text?style=for-the-badge) ![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/@vemlavaraloucagamers/vg-text?label=npm%20vulnerabilities&style=for-the-badge) ![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/VemLavarALoucaGamers/vlalg-frontend-components?label=Repo%20Vulnerabilities&style=for-the-badge)
</div>

<br />


## Installation

```bash
npm install @vemlavaraloucagamers/vg-text

# or

yarn add @vemlavaraloucagamers/vg-text
```

## Usage
```js
// main.js
import { createApp } from 'vue'
import App from './App.vue'

import VgText from '@vemlavaraloucagamers/vg-text'
import "@vemlavaraloucagamers/vg-text/dist/style.css";

const app = createApp(App)
app.use(VgText)
app.mount('#app')
```

After installing you can use any component:

- [Vg-Gradient-Text](#Vg-Gradient-Text)
- [Vg-Highlight-Selected-Text](#Vg-Highlight-Selected-Text)

<br />

# Vg-Gradient-Text

This is a component Gradient Text.

<p align="center">
  <img src="https://github.com/VemLavarALoucaGamers/vlalg-frontend-components/raw/main/vue-components/vg-text/images/example.png" width="200">
  <img src="https://github.com/VemLavarALoucaGamers/vlalg-frontend-components/raw/main/vue-components/vg-text/images/example2.png" width="200">
</p>

```jsx
// page.vue
<template>
  <VgGradientText>
    <template #text>
      Slot content
    </template>
  </VgGradientText>
</template>

<template>
  <vg-gradient-text>
    <template #text>
      Slot content
    </template>
  </vg-gradient-text>
</template>
```

## Props
> Items with an (*) mean they are required

| name    | Value type | Default | Description |
| ------- | :--------- | :------ | :---------------------------- |
| vgId (*)    | String     |        | Sets the id attribute to differentiate from other components |
| lineHeight    | String     |  '1.42857143'      | Defines text line-height, accepts any value greater than 0  |
| size    | String     |  '3rem'      | Defines text size, accepts any `value + type` (**px**, **em** or **...**)  |
| bgFirst   | String     | '#5639fc'       | Defines the first gradient background color. Accepts **Color name** and **Hex** |
| bgSecond   | String     | '#05f7ff'       | Defines the second gradient background color. Accepts **Color name** and **Hex** |
| alignment   | String     | 'left'       | Defines the text align. Accepts **center**, **left** and **left**. For this property to work, the component needs to have the **size** property high and in a container of size X or the text to be large and also being in a container of size X. There are several ways for this property to work, all involving the size of the container this component is included in. |
| paddingBottom    | String     |  '5'      | Defines text padding-bottom. Depending on the font size (size prop) and if the last paragraph has a letter with a long leg, the leg of the letter will have a hidden part. This property allows to fix this. The minimum value is 5 |
| font    | String     |  'Fugaz One, cursive'      | Defines text font-family. Pass the font-family you want and that is configured in your project |



## Example

<p align="left">
  <img src="https://github.com/VemLavarALoucaGamers/vlalg-frontend-components/raw/main/vue-components/vg-gradient-text/images/props_example.png" width="150">
</p>

```jsx
// page.vue
<template>
  <VgGradientText
    vg-id="vg-gradient-text-one"
    alignment="center"
    line-height="1"
    size="3.5em"
    padding-bottom="10"
    bg-first="magenta"
    bg-second="cyan"
  >
    <template #text>
      i love to<br />drink coffee<br />very much
    </template>
  </VgGradientText>
</template>

<script setup>
</script>
```

# Vg-Highlight-Selected-Text

This is a component Highlight Selected Text.

<p align="center">
  <img src="https://github.com/VemLavarALoucaGamers/vlalg-frontend-components/raw/main/vue-components/vg-text/images/VgHighlightSelectedText.gif" width="400">
</p>

```jsx
// page.vue
<template>
  <p>
    Select 
    <VgHighlightSelectedText
      vg-id="asdas"
    >
      this part of the text
    </VgHighlightSelectedText>
     to see it in another color
  </p>
</template>

<template>
  <p>
    Select 
    <vg-highlight-selected-text
      vg-id="vg-highlight-selected-text"
    >
      this part of the text
    </vg-highlight-selected-text>
     to see it in another color
  </p>
</template>
```

## Props
> Items with an (*) mean they are required

| name    | Value type | Default | Description |
| ------- | :--------- | :------ | :---------------------------- |
| vgId (*)    | String     |        | Sets the id attribute to differentiate from other components |
| backgroundColor   | String     | '#000000'       | Defines the background color. Accepts **Color name** and **Hex** |
| textColor   | String     | '#ffffff'       | Defines the text color. Accepts **Color name** and **Hex** |




## Example

<p align="center">
  <img src="https://github.com/VemLavarALoucaGamers/vlalg-frontend-components/raw/main/vue-components/vg-text/images/VgHighlightSelectedText_example.gif" width="400">
</p>

```jsx
// page.vue
<template>
  <p>
    Select 
    <VgHighlightSelectedText
      vg-id="vg-highlight-selected-text"
      background-color="tomato"
      text-color="blue"
    >
      this part of the text
    </VgHighlightSelectedText>
     to see it in another color
  </p>
</template>

<script setup>
</script>
```

## License

[MIT](http://opensource.org/licenses/MIT)
