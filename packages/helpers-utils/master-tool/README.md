<p align="center">
<img src="https://github.com/VemLavarALoucaGamers/vlalg-nimbus/raw/main/packages/helpers-utils/master-tool/images/Master_tool_Logo_White_Name.png" width="100">
</p>

<div align="center">

![npm](https://img.shields.io/npm/v/@vlalg-nimbus/master-tool?style=for-the-badge) ![npm](https://img.shields.io/npm/dm/@vlalg-nimbus/master-tool?style=for-the-badge) ![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/@vlalg-nimbus/master-tool?label=npm%20vulnerabilities&style=for-the-badge) ![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/VemLavarALoucaGamers/vlalg-nimbus?label=Repo%20Vulnerabilities&style=for-the-badge)
</div>

<br />

<p align="center">
<img src="https://github.com/VemLavarALoucaGamers/vlalg-nimbus/raw/main/packages/helpers-utils/master-tool/images/example.png" width="300">
</p>

This LIB has several Helpers/Users already created to avoid breaking the head making the same logic.

## Functions list
- [isNumber](#isNumber)
- [listener](#listener)
- [asyncMapPromise](#asyncmappromise)
- [convertHexToRGBA](#converthextorgba)
- [initialLetter](#initialletter)
- [removeSpecialCharacters](#removespecialcharacters)
- [trimText](#trimtext)
- [removeSpaceInText](#removespaceintext)
- [goWhatsapp](#gowhatsapp)
- [isEmpty](#isempty)
- [fixNullToNumber](#fixnulltonumber)

#### isNumber

Function that checks if the parameter is a number.

```js
masterTool.isNumber(value)
```

The default value is `null` and the return is `boolean` type.

```js
masterTool.isNumber(1) // true
masterTool.isNumber(true) // false
masterTool.isNumber('text') // false
masterTool.isNumber({ a: 1, b: 2}) // false
masterTool.isNumber(null) // false
```

#### listener

Function that centralizes the use of `addEventListener`.

```js
masterTool.listener(scope, event, callback, wantsUntrusted)
```

Params/Return:

- **Params**:
  - scope: The values accepted are `window` or `document`, default is `document`. If you will run on `Window` or `Document`.
  - event: The values accepted are the same as `type` on `addEventListener`, see the list [here](https://developer.mozilla.org/en-US/docs/Web/Events#event_listing).
  - callback: Function to be executed.
  - wantsUntrusted: Default is `false`. Used to specify whether the event can be triggered by untrusted content, it is an optional option and present in the `eventListener`.
- **Return**: It returns nothing.

```js
// Window
masterTool.listener('window', 'load', () => {
  console.log('Hello my window')
})

// Document
masterTool.listener('document', 'load', () => {
  console.log('Hello my document')
})

// HTML element
const buttonElement = document.querySelector('#close-button')
const cbFunction = () => {
  console.log('Hello my others')
}

masterTool.listener('others', 'load', cbFunction, false, buttonElement)
```

#### asyncMapPromise

Function created to do Async in `.map` of javascript. This function is asynchronous.

```js
masterTool.asyncMapPromise(itens, callback)
```

Params/Return:

- **Params**:
  - itens: array of items, default value is an empty array (`[]`).
  - callback: Function to be executed.
- **Return**: Returns a new array of items, as the callback function returns

```js
const array = ['1', '2', '3', '4']
const cbFunction = (item, index, array) => item === '2'
const newArray = await $masterTool.asyncMapPromise(array, cbFunction)
```

Obs.: The `.map` in JavaScript by default will return `undefined` if there is a conditional logic (`if`) inside it to return only if the condition passes, needing to run a `.filter` to clean the unwanted data (`undefined`), in `asyncMapPromise()` it works the same, here's an example:

```js
const array = ['1', '2', '3', '4']

// in JavaScript
const newArray = array.map((item, index, array) => {
  if (item === '2') return item
})
console.log(newArray) // [undefined, '2', undefined, undefined]
newArray.filter(item => item !== undefined) // ['2']


// asyncMapPromise()
const newArray2 = await $masterTool.asyncMapPromise(array, (item, index, array) => {
  if (item === '2') return item
})
console.log(newArray2) // [undefined, '2', undefined, undefined]
newArray2.filter(item => item !== undefined) // ['2']
```

#### convertHexToRGBA

Function that convert `HEX` color to `RGBA` color

```js
masterTool.convertHexToRGBA(hexCode, opacity)
```

Params/Return:

- **Params**:
  - hexCode: Color in `hex`, can be passed with or without the character `#`.
  - opacity: RGBA opacity, accepted from `0.0` to `1.0`.
- **Return**: Returns the color in RGBA.

```js
masterTool.convertHexToRGBA('#fff', '0.3') // rgba(255, 255, 255, 0.3)
masterTool.convertHexToRGBA('fff', '0.3') // rgba(255, 255, 255, 0.3)
```

#### initialLetter

Function that returns the initial letters of the string

```js
masterTool.initialLetter(wordsToPickUp)
```

Params/Return:

- **Params**:
  - wordsToPickUp: Text that will be analyzed.
- **Return**: Returns all initial letters in uppercase.

```js
masterTool.initialLetter('Text that will be analyzed') // ['T', 'T', 'W', 'B', 'A']
```

#### removeSpecialCharacters

Function that removes any special character from a text.

```js
masterTool.removeSpecialCharacters(textToRemove, charactersAllowed)
```

Params/Return:

- **Params**:
  - textoToRemove: Text that will be analyzed.
  - charactersAllowed: Characters that should not be removed.
- **Return**: Returns text without special characters.

```js
masterTool.removeSpecialCharacters('Special !@#$ characters.', '.') // Special characters.
```

#### trimText

Function that trims (spaces at the beginning and end) the text.

```js
masterTool.trimText(text)
```

Params/Return:

- **Params**:
  - text: Text that will be analyzed.
- **Return**: Returns text without spaces at the beginning and end.

```js
masterTool.trimText(' Special !@#$ characters. ')
// " Special !@#$ characters. " to "Special !@#$ characters."
```

#### removeSpaceInText

Function that removes all spaces from text.

```js
masterTool.removeSpaceInText(text)
```

Params/Return:

- **Params**:
  - text: Text that will be analyzed.
- **Return**: Returns text without spaces.

```js
masterTool.removeSpaceInText(" 'Special !@#$ characters' ")
// " 'Special !@#$ characters' " to "'Special!@#$characters'"
```

#### goWhatsapp

Function used to generate a redirect URL for whastapp, both web and app.

```js
masterTool.goWhatsapp(phone, msg, type)
```

Params/Return:

- **Params**:
  - phone: WhatsApp phone number that will be used to start a conversation.
  - msg: Message that will be placed in the text field when opening the WhatsApp conversation.
  - type: Redirection type, web (`api` or `wa`) or app (`intent`).
- **Return**: Returns the redirect url.

```js
const msg = 'I would like to know more about product X that is being advertised on the website'

// Example using a fake cell phone from Brazil (São Paulo)
// Country: Brazil - 55
// state: São Paulo - 11
// phone: São Paulo - 911111111
const fakePhone = '5511911111111'

const waType = $masterTool.goWhatsapp(fakePhone, msg, 'wa')
const apiType = $masterTool.goWhatsapp(fakePhone, msg, 'api')
const intentType = $masterTool.goWhatsapp(fakePhone, msg, 'intent')

console.log(waType)
// 'https://wa.me/5511911111111?text=I would like to know more about product X that is being advertised on the website'

console.log(apiType)
// 'https://api.whatsapp.com/send?phone=5511911111111&text=I would like to know more about product X that is being advertised on the website'

console.log(intentType)
// 'intent://send?phone=5511911111111&text=I would like to know more about product X that is being advertised on the website#Intent;scheme=whatsapp;package=com.whatsapp;end'
```

Example of using the url with `window.open()` for type `wa`

<img src="https://github.com/VemLavarALoucaGamers/vlalg-nimbus/raw/main/packages/helpers-utils/master-tool/images/example_goWhatsapp.png" width="300">

#### isEmpty

Function that checks if a variable is empty.

```js
masterTool.isEmpty(value)
```

Params/Return:

- **Params**:
  - value: Variable to be checked.
- **Return**: Returns if a variable is empty.

```js
$masterTool.isEmpty() // true
$masterTool.isEmpty('') // true
$masterTool.isEmpty({}) // true
$masterTool.isEmpty([]) // true
$masterTool.isEmpty(null) // true
$masterTool.isEmpty(undefined) // true

$masterTool.isEmpty('foo') // false
$masterTool.isEmpty(1) // false
$masterTool.isEmpty(true) // false
$masterTool.isEmpty(false) // false
$masterTool.isEmpty({ bao: 'foo'}) // false
$masterTool.isEmpty([1, 2]) // false
```

#### fixNullToNumber

Function that turns null into 0.

```js
masterTool.isEmpty(value)
```

Params/Return:

- **Params**:
  - value: Variable to be checked.
- **Return**: Returns if a variable is empty.

```js
$masterTool.fixNullToNumber() // 0
$masterTool.fixNullToNumber(null) // 0
$masterTool.fixNullToNumber(undefined) // 0

$masterTool.fixNullToNumber(1) // 1
```

## How to use?

##### To install

```bash
npm i @vlalg-nimbus/master-tool
```

or

```bash
yarn add @vlalg-nimbus/master-tool
```

##### To use

```js
import MasterTool from '@vlalg-nimbus/master-tool'

const $masterTool = MasterTool()

$masterTool.funcName()
```

##### CDN

[Unpkg](https://unpkg.com/@vlalg-nimbus/master-tool/dist/bundle.min.umd.js)

```js
https://unpkg.com/@vlalg-nimbus/master-tool/dist/bundle.min.umd.js
```

## License

[MIT](http://opensource.org/licenses/MIT)
