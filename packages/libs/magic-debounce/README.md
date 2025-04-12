<p align="center">
<img src="https://github.com/VemLavarALoucaGamers/vlalg-nimbus/raw/main/packages/libs/magic-debounce/images/magic-debounce_logo.png" width="100">
</p>

<div align="center">

![npm](https://img.shields.io/npm/v/@vlalg-nimbus/magic-debounce?style=for-the-badge) ![npm](https://img.shields.io/npm/dm/@vlalg-nimbus/magic-debounce?style=for-the-badge) ![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/@vlalg-nimbus/magic-debounce?label=npm%20vulnerabilities&style=for-the-badge) ![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/VemLavarALoucaGamers/vlalg-nimbus?label=Repo%20Vulnerabilities&style=for-the-badge)
</div>

<br />

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
  wait: 300,
  firstClickOnly: false,
  callback:() => {}
};

MagicDebounce(config)
```

## How to use?

##### To install

```bash
npm i @vlalg-nimbus/magic-debounce
```

or

```
yarn add @vlalg-nimbus/magic-debounce
```

##### CDN

[Unpkg](https://unpkg.com/@vlalg-nimbus/magic-debounce/dist/bundle.min.umd.js)

```js
https://unpkg.com/@vlalg-nimbus/magic-debounce/dist/bundle.min.umd.js
```

##### To use

```js
import MagicDebounce from '@vlalg-nimbus/magic-debounce'
      
const { debouncedFunction } = MagicDebounce({
  wait: 300,
  callback: () => {
    console.log('Debounced!');
  }
});

debouncedFunction();
```

## License

[MIT](http://opensource.org/licenses/MIT)
