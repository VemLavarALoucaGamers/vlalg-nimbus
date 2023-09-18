<p align="center">
<img src="https://github.com/VemLavarALoucaGamers/vlalg-nimbus/raw/main/packages/scss/mystery-box-css-framework/images/Mystery_Box_Logo_White_Name.png" width="100">
</p>

<div align="center">

![npm](https://img.shields.io/npm/v/@vlalg-nimbus/mystery-box-css-framework?style=for-the-badge) ![npm](https://img.shields.io/npm/dm/@vlalg-nimbus/mystery-box-css-framework?style=for-the-badge) ![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/@vlalg-nimbus/mystery-box-css-framework?label=npm%20vulnerabilities&style=for-the-badge) ![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/VemLavarALoucaGamers/vlalg-nimbus?label=Repo%20Vulnerabilities&style=for-the-badge)
</div>

<br />

A simplistic CSS Framework. Internally it is already using the [`@vlalg-nimbus/bee-css-reset`](https://www.npmjs.com/package/@vlalg-nimbus/bee-css-reset) and [`@vlalg-nimbus/chameleon-grid-layout`](https://www.npmjs.com/package/@vlalg-nimbus/chameleon-grid-layout) libs.

To get all available classes, look at the [documentation](https://nimbus.tec.br/css-libraries/mystery-box-css-framework).

## How to use?

##### CDN

To use the CSS file via CDN, or if you prefer, you can use the auto-import file (JS) via CDN, it can be done this way:

[Unpkg CSS](https://unpkg.com/@vlalg-nimbus/mystery-box-css-framework/dist/mystery-box-css-framework.min.css) / [Unpkg JS](https://unpkg.com/@vlalg-nimbus/mystery-box-css-framework/dist/mystery-box-css-framework.min.js)

Links:

```js
https://unpkg.com/@vlalg-nimbus/mystery-box-css-framework/dist/mystery-box-css-framework.min.css

// or

https://unpkg.com/@vlalg-nimbus/mystery-box-css-framework/dist/mystery-box-css-framework.min.js
```

##### To install

```bash
npm i @vlalg-nimbus/mystery-box-css-framework
```

or

```bash

yarn add @vlalg-nimbus/mystery-box-css-framework

```

To use, just import the CSS file. I do not recommend using the auto import file (IIFE), this avoids possible conflicts if your system does not support IIFE.

```js
import '@vlalg-nimbus/mystery-box-css-framework/dist/mystery-box-css-framework.min.css'
```

## Browser support

These were some of the browsers tested:

- Chrome
- Edge
- Firefox ESR+
- Internet Explorer 10+
- Safari 8+
- Opera

I didn't mention the all versions, but I guarantee that it works correctly in 99% of browsers that have already been previously tested. The tests were carried out on [browserling](https://www.browserling.com) and [browserstack](https://www.browserstack.com).

## License

[MIT](http://opensource.org/licenses/MIT)
