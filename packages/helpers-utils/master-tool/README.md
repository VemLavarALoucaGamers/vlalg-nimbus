<p align="center">
<img src="https://github.com/VemLavarALoucaGamers/vlalg-nimbus/raw/main/packages/libs/raven-sentinel/images/Raven_Logo_White_Name.png" width="100">
</p>

<div align="center">

![npm](https://img.shields.io/npm/v/@vlalg-nimbus/raven-sentinel?style=for-the-badge) ![npm](https://img.shields.io/npm/dm/@vlalg-nimbus/raven-sentinel?style=for-the-badge) ![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/@vlalg-nimbus/raven-sentinel?label=npm%20vulnerabilities&style=for-the-badge) ![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/VemLavarALoucaGamers/vlalg-nimbus?label=Repo%20Vulnerabilities&style=for-the-badge)
</div>

<br />

<p align="center">
<img src="https://github.com/VemLavarALoucaGamers/vlalg-nimbus/raw/main/packages/libs/raven-sentinel/images/example.png" width="300">
</p>

This lib is a log manager that facilitates the identification of logs in code.

## Logs list
- [cleanLog](#cleanLog)
- [debug](#debug)
- [error](#error)
- [log](#log)
- [logDebug](#logDebug)
- [logError](#logError)
- [logInfo](#logInfo)
- [method](#method)
- [printObject](#printObject)
- [table](#table)
- [time](#time)
- [timeEnd](#timeEnd)
- [trace](#trace)
- [warn](#warn)

#### cleanLog
Internally it is an `console.log`.
No styling, i.e. a default `console.log`
```js
this.$log.cleanLog($log.printObject(data));
```

#### debug
Internally it is an `console.debug`
```js
this.$log.debug('Msg test for debug');
```

#### error
> In the example the **e** is passed in the catch, so it could be an error or something else

Internally it is an `console.error`
```js
this.$log.error(e);
```

#### log
Internally it is an `console.log`
```js
this.$log.log('Hello world')
this.$log.log('Hello world 1', 'Hello world 2')
```

#### logDebug
Internally it is an `console.log`
```js
this.$log.logDebug('Hello world')
this.$log.logDebug('Hello world 1', 'Hello world 2')
this.$log.logDebug(JSON.stringify({algumObj}, null, 2))
```

#### logError
Internally it is an `console.error`
```js
this.$log.logError('this is the error')
```

#### logInfo
Internally it is an `console.log`
```js
this.$log.logInfo('Hello world')
this.$log.logInfo('Hello world 1', 'Hello world 2')
```

#### method
Internally it is an `console.log`
```js
this.$log.method('Hello world')
this.$log.method('Hello world 1', 'Hello world 2')
```

#### printObject
> Used with the **$log.cleanLog**

Internally it is an `printObject`
```js
this.$log.cleanLog(this.$log.printObject({ name: 'test' }));
```

#### table
Internally it is an `console.table`
```js
this.$log.table({ name: 'test' });
```

#### time
> Starts a timer in the console

Internally it is an `console.time`
```js
this.$log.time();
for (let i = 0; i < 3; i++) {
    console.log(i)
}
this.$log.timeEnd();
```

#### timeEnd
> It is used after the logic inserted after $log.time()

Internally it is an `console.timeEnd`
```js
this.$log.time();
for (let i = 0; i < 3; i++) {
    console.log(i)
}
this.$log.timeEnd();
```

#### trace
Internally it is an `console.debug`

```js
this.$log.trace('Msg test for trace')
```

#### warn
Internally it is an `console.warn`

```js
this.$log.warn('Msg test for warn')
```

## How to use?
##### To install
```bash
npm i @vlalg-nimbus/raven-sentinel
```
or
```
yarn add @vlalg-nimbus/raven-sentinel
```

##### To use
```js
import LoggerFactory from '@vlalg-nimbus/raven-sentinel'

const nodeEnv = process.env.NODE_ENV
const isDev = !!(nodeEnv === 'development')

const logOptions = {
  className: 'App Name',
  nodeEnv: nodeEnv,
  showLogs: isDev ? 'Trace' : 'Warn'
}

const $log = new LoggerFactory(logOptions).create()

$log.logDebug('Hello world')
```

##### CDN

[Unpkg](https://unpkg.com/@vlalg-nimbus/raven-sentinel/dist/bundle.min.umd.js)

```js
https://unpkg.com/@vlalg-nimbus/raven-sentinel/dist/bundle.min.umd.js
```

<img src="https://github.com/VemLavarALoucaGamers/vlalg-nimbus/raw/main/packages/libs/raven-sentinel/images/example2.png" width="300">

### Options
- **showLogs**: It serves to inform which log level can appear in the development and production environments. For the previous example we used level 0 (trace) if it is 'development', so all logs are allowed, as it is not safe and correct to be logging in production, we set level 3 (warn), which will log (Warn, Error and None) that is, the levels (3, 4 and 5) in production.
  ```js
  Trace = '0'
  Debug = '1'
  Info = '2'
  Warn = '3'
  Error = '4'
  None = '5'
  ```

- **className**: Used to pass the system name, libs and such that are using log-manager. This makes it easier to identify the log, since we can use it in several places, so if we were using it in a service and in the general application, we could set the right name of the service as 'Service X' and inside the application 'Application Y', when you consult the console, everything will be separated.

- **nodeEnv**: This field receives the environment that is currently being used, if I am in development `development` and production `production`. Then we pass `process.env.NODE_ENV` or whatever env you are using.

- **primaryColor**: Used to pass a hex of some color that will be used as the primary color. The default is the color `#04F0FC`. The default color is used if none is passed.

- **logStyle**: You can pass the style of the log, if you do not inform anything, the default will be used. This would basically be like working with **css** in `console.log`.



## License

[MIT](http://opensource.org/licenses/MIT)
