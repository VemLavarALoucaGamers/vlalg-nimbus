import {
  LogColors,
  LogLevelStyle,
  LogLabel,
  LogLevelNumber,
  LogName
} from './enums.js'

import { mountLog } from './utils.js'

// Retorno: Record<string, unknown>
function printObject (obj) {
  return typeof obj === 'object'
    ? JSON.parse(JSON.stringify(obj, null, 2))
    : JSON.parse(JSON.stringify(String(obj)))
}

export class LoggerFactory {
  // parameters recebe
  /*
    className: string
    logStyle: string
    showLogs: LogLevelNumber
    mockConsole: null
  */
  constructor (parameters) {
    /**
     * Show the logs on the console
     * é um tipo LogLevelNumber
     */
    this.showLogs = LogLevelNumber[parameters.showLogs] || LogLevelNumber.Trace

    if (parameters.showLogs && !LogLevelNumber[parameters.showLogs]) {
      throw new Error(
        `Invalid log level ${parameters.showLogs} allowed:  ${JSON.stringify(
          LogLevelNumber
        )}`
      )
    }

    this.nodeEnv = parameters.nodeEnv || ''

    /**
     * Console Instance
     * é do tipo console
     */
    if (parameters.mockConsole) {
      this.mockConsole = parameters.mockConsole
    } else {
      this.mockConsole = console

      Object.assign(console, {
        ...console,
        // eslint-disable-next-line no-console
        method: console.log,
        // eslint-disable-next-line no-console
        cleanLog: console.log,
        // eslint-disable-next-line no-console
        logInfo: console.log,
        // eslint-disable-next-line no-console
        logDebug: console.log,
        // eslint-disable-next-line no-console
        logError: console.error
      })
    }
    /**
     * Class name for using with the log
     * tipo string
     */
    this.className = parameters.className || 'Log Manager'
    /**
     * Log style to be used when the log is called
     * tipo string
     */

    const primaryColor = parameters.primaryColor || LogColors.primary
    this.logStyle =
      parameters.logStyle ||
      `background: ${primaryColor}; padding: 2px; border-radius: 2px 0 0 2px; color: #fff;`
  }

  // logEnum é do tipo LogName
  // return string[]
  getLogMessage (logEnum) {
    switch (logEnum) {
      case LogName.Trace:
        return mountLog(
          LogLabel.Trace,
          LogLevelStyle.Info,
          this.className,
          this.logStyle,
          false,
          this.nodeEnv
        )
      case LogName.Debug:
        return mountLog(
          LogLabel.Debug,
          LogLevelStyle.Debug,
          this.className,
          this.logStyle,
          false,
          this.nodeEnv
        )
      case LogName.Error:
        return mountLog(
          LogLabel.Error,
          LogLevelStyle.Error,
          this.className,
          this.logStyle,
          false,
          this.nodeEnv
        )
      case LogName.Warn:
        return mountLog(
          LogLabel.Warn,
          LogLevelStyle.Warn,
          this.className,
          this.logStyle,
          false,
          this.nodeEnv
        )
      case LogName.Method:
        return mountLog(
          LogLabel.Method,
          LogLevelStyle.Method,
          this.className,
          this.logStyle,
          false,
          this.nodeEnv
        )
      case LogName.Info:
        return mountLog(
          LogLabel.Info,
          LogLevelStyle.Info,
          this.className,
          this.logStyle,
          false,
          this.nodeEnv
        )
      case LogName.Time:
        return mountLog(
          LogLabel.Time,
          LogLevelStyle.Debug,
          this.className,
          this.logStyle,
          true,
          this.nodeEnv
        )
      case LogName.TimeEnd:
        return mountLog(
          LogLabel.Time,
          LogLevelStyle.Debug,
          this.className,
          this.logStyle,
          true,
          this.nodeEnv
        )
      case LogName.Table:
        return mountLog(
          LogLabel.Table,
          LogLevelStyle.Table,
          this.className,
          this.logStyle,
          true,
          this.nodeEnv
        )
      case LogName.CleanLog:
        return mountLog(
          LogLabel.CleanLog,
          LogLevelStyle.CleanLog,
          this.className,
          this.logStyle,
          true,
          this.nodeEnv
        )
      case LogName.Log:
      default:
        return mountLog(
          LogLabel.Log,
          LogLevelStyle.Log,
          this.className,
          this.logStyle,
          false,
          this.nodeEnv
        )
    }
  }

  // logEnum é do tipo LogName
  // fn é do tipo function
  // minLevel é do tipo LogLevelNumber = LogLevelNumber.Trace
  makeMethod (logEnum, fn, minLevel = 0) {
    return () => {
      if (this.showLogs > minLevel) {
        return () => {}
      }

      return Function.prototype.bind.apply(fn, [
        this.mockConsole,
        ...this.getLogMessage(logEnum)
      ])
    }
  }

  // retorna LogMethods
  create () {
    const _ = this

    return {
      cleanLog: _.makeMethod(
        LogName.CleanLog,
        _.mockConsole.log,
        LogLevelNumber.Info
      )(),
      debug: _.makeMethod(
        LogName.Debug,
        _.mockConsole.debug,
        LogLevelNumber.Debug
      )(),
      error: _.makeMethod(
        LogName.Error,
        _.mockConsole.error,
        LogLevelNumber.Error
      )(),
      logError: _.makeMethod(
        LogName.Error,
        _.mockConsole.error,
        LogLevelNumber.Error
      )(),
      log: _.makeMethod(
        LogName.Log,
        _.mockConsole.log,
        LogLevelNumber.Info
      )(),
      logDebug: _.makeMethod(
        LogName.Debug,
        _.mockConsole.log,
        LogLevelNumber.Debug
      )(),
      logInfo: _.makeMethod(
        LogName.Info,
        _.mockConsole.log,
        LogLevelNumber.Info
      )(),
      method: _.makeMethod(
        LogName.Method,
        _.mockConsole.log,
        LogLevelNumber.Info
      )(),
      printObject: _.makeMethod(
        LogName.CleanLog,
        printObject,
        LogLevelNumber.Info
      )(),
      table: this.makeMethod(
        LogName.Table,
        _.mockConsole.table,
        LogLevelNumber.Info
      )(),
      time: _.makeMethod(
        LogName.Time,
        _.mockConsole.time,
        LogLevelNumber.Debug
      )(),
      timeEnd: _.makeMethod(
        LogName.TimeEnd,
        _.mockConsole.timeEnd,
        LogLevelNumber.Debug
      )(),
      trace: _.makeMethod(
        LogName.Trace,
        _.mockConsole.debug,
        LogLevelNumber.Trace
      )(),
      warn: _.makeMethod(
        LogName.Warn,
        _.mockConsole.warn,
        LogLevelNumber.Warn
      )()
    }
  }
}

export default LoggerFactory
