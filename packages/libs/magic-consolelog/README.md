<p align="center">
<img src="https://github.com/VemLavarALoucaGamers/vlalg-nimbus/raw/main/packages/libs/magic-consolelog/images/Magic_ConsoleLog_Logo_White_Name.png" width="100">
</p>

<div align="center">

![npm](https://img.shields.io/npm/v/@vlalg-nimbus/magic-consolelog?style=for-the-badge) ![npm](https://img.shields.io/npm/dm/@vlalg-nimbus/magic-consolelog?style=for-the-badge) ![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/@vlalg-nimbus/magic-consolelog?label=npm%20vulnerabilities&style=for-the-badge) ![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/VemLavarALoucaGamers/vlalg-nimbus?label=Repo%20Vulnerabilities&style=for-the-badge)
</div>

<br />

<p align="center">
<img src="https://github.com/VemLavarALoucaGamers/vlalg-nimbus/raw/main/packages/libs/magic-consolelog/images/example.png" width="300">
</p>

This package allows you to print beautiful **console.log**.

This **console.log** is used by companies that leave messages on the **console** of websites for when the user inspects a page, stating some precautions or even rewards.

## Config

The lib instance accepts two parameters (not optional):

- **type**: Type of Title
- **config**: Configuration of console.log

```js
new MagicConsole(type, config)
```

#### Type

It is the first parameter that must be passed, it accepts the following values:
 - **normal**
 - **bold**
 - **background**
 - **rainbow**

```js
new MagicConsole('background', config)

// other example

new MagicConsole('rainbow', config)
```

The default value is **normal**.

#### Config (configuration)

It is the second parameter that must be passed, it accepts the following properties:

- **title:** The company name or a word of attention is usually defined.
- **titleConfig:** This property is an object with two required properties (**color** and **size**) and two optional properties (**background** and **shadow**).
  - The **background** property is used for the **background type**.
  - The **shadow** property is used for the **rainbow type**, the **shadow** expects to receive an array with seven colors.
- **text:** It is used to inform something.
- **hasLink:** Accepts **true** or **false**, if set to true we can set the link property.
- **link:** If the previous property was set to **true**, we can set this. This property is an object with two required properties, **text** and **link**. **Text** is the text that references the link.

**OBS:** The values of the properties contained in **titleConfig** are css, so it is possible to define colors and backgrounds in HEX, RGB or transparent.

```js
const config = {
  title: 'Rainbow Type',
  titleConfig: {
  color: '#ffffff',
    size: '50px',
    background: 'transparent',
    shadow: [
      'rgb(217,31,38)',
      'rgb(226,91,14)',
      'rgb(245,221,8)',
      'rgb(5,148,68)',
      'rgb(2,135,206)',
      'rgb(4,77,145)',
      'rgb(42,21,113)',
    ],
  },
  text: 'Rainbow Text',
  hasLink: true,
  link: {
    text: 'Link description',
    url: 'https://github.com/VemLavarALoucaGamers/vlalg-nimbus',
  },
};

MagicConsole('rainbow', config)
```

## How to use?

##### To install

```bash
npm i @vlalg-nimbus/magic-consolelog
```

or

```
yarn add @vlalg-nimbus/magic-consolelog
```

##### To use

```js
import MagicConsole from '@vlalg-nimbus/magic-consolelog'

const rainbowConfig = {
  title: 'Rainbow Type',
  titleConfig: {
  color: '#ffffff',
    size: '50px',
    background: 'transparent',
    shadow: [
      'rgb(217,31,38)',
      'rgb(226,91,14)',
      'rgb(245,221,8)',
      'rgb(5,148,68)',
      'rgb(2,135,206)',
      'rgb(4,77,145)',
      'rgb(42,21,113)',
    ],
  },
  text: 'Rainbow Text',
  hasLink: true,
  link: {
    text: 'Link description',
    url: 'https://github.com/VemLavarALoucaGamers/vlalg-nimbus',
  },
};

new MagicConsole('rainbow', rainbowConfig);
```

<img src="https://github.com/VemLavarALoucaGamers/vlalg-nimbus/raw/main/packages/libs/magic-consolelog/images/example2.png" width="300">

## License

[MIT](http://opensource.org/licenses/MIT)
