<p align="center">
<img src="https://github.com/VemLavarALoucaGamers/vlalg-nimbus/raw/main/packages/scss/bee-css-reset/images/Bee_Logo_White_Name.png" width="100">
</p>

<div align="center">

![npm](https://img.shields.io/npm/v/@vlalg-nimbus/bee-css-reset?style=for-the-badge) ![npm](https://img.shields.io/npm/dm/@vlalg-nimbus/bee-css-reset?style=for-the-badge) ![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/@vlalg-nimbus/bee-css-reset?label=npm%20vulnerabilities&style=for-the-badge) ![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/VemLavarALoucaGamers/vlalg-nimbus?label=Repo%20Vulnerabilities&style=for-the-badge)
</div>

<br />

<p align="center">
<img src="https://github.com/VemLavarALoucaGamers/vlalg-nimbus/raw/main/packages/scss/bee-css-reset/images/example.png" width="300">
</p>

A CSS library that resets the browser's default style settings, providing a clean, consistent foundation for web development.

This lib auto-imports Reset CSS through an IIFE function, if used, of course.

## How to use?

##### CDN

To use the CSS file via CDN, or if you prefer, you can use the auto-import file (JS) via CDN, it can be done this way:

[Unpkg CSS](https://unpkg.com/@vlalg-nimbus/bee-css-reset/dist/bee-css-reset.min.css) / [Unpkg JS](https://unpkg.com/@vlalg-nimbus/bee-css-reset/dist/bee-css-reset.min.js)

Links:

```js
https://unpkg.com/@vlalg-nimbus/bee-css-reset/dist/bee-css-reset.min.css

// or

https://unpkg.com/@vlalg-nimbus/bee-css-reset/dist/bee-css-reset.min.js
```

##### To install

```bash
npm i @vlalg-nimbus/bee-css-reset
```

or

```bash

yarn add @vlalg-nimbus/bee-css-reset

```

To use, just import the CSS file. I do not recommend using the auto import file (IIFE), this avoids possible conflicts if your system does not support IIFE.

```js
import '@vlalg-nimbus/bee-css-reset/dist/bee-css-reset.min.css'
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
