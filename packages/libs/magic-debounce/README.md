<p align="center">
<img src="https://github.com/VemLavarALoucaGamers/vlalg-nimbus/raw/main/packages/libs/magic-debounce/images/magic-debounce_logo.png" width="100">
</p>

<div align="center">

![npm](https://img.shields.io/npm/v/@vlalg-nimbus/magic-debounce?style=for-the-badge) ![npm](https://img.shields.io/npm/dm/@vlalg-nimbus/magic-debounce?style=for-the-badge) ![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/@vlalg-nimbus/magic-debounce?label=npm%20vulnerabilities&style=for-the-badge) ![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/VemLavarALoucaGamers/vlalg-nimbus?label=Repo%20Vulnerabilities&style=for-the-badge)
</div>

<br />

This lib is a debounce utility that simplifies the control of function execution timing, preventing unnecessary calls and improving performance.

Full documentation can be found [here](http://nimbus.tec.br/js-libraries/magic-debunce), a summary is below.

## Config

The lib accepts three parameters:

- **wait**: The time (in milliseconds) to wait before calling the `callback`.
- **callback**: The function to be executed after the debounce delay. Required.
- **firstClickOnly**: If `true`, only the first call is executed during the debounce window. Useful for preventing repeated triggers.

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
      
const { debouncedFunction, cancel } = MagicDebounce({
  wait: 300,
  callback: () => {
    console.log('Debounced!');
  }
});

debouncedFunction();
cancel();
```

## License

[MIT](http://opensource.org/licenses/MIT)
