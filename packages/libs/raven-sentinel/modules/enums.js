export const LogColors = {
  accent: '#780051',
  dark: '#22252c',
  debug: '#323232',
  info: '#00d1c1',
  log: '#364a8f',
  negative: '#ffaa91',
  positive: '#bce071',
  primary: '#04F0FC',
  secondary: '#007a87',
  warning: '#ffb400'
}

export const LogLevelStyle = {
  Log: `background:${LogColors.log}; padding: 2px; border-radius: 0 2px 2px 0;  color: #fff;`,
  Debug: `background:${LogColors.debug}; padding: 2px; border-radius: 0 2px 2px 0;  color: #fff;`,
  Info: `background:${LogColors.info}; padding: 2px; border-radius: 0 2px 2px 0;  color: #fff;`,
  Warn: `background:${LogColors.warning}; padding: 2px; border-radius: 0 2px 2px 0;  color: #000;`,
  Error: `background:${LogColors.negative}; padding: 2px; border-radius: 0 2px 2px 0;  color: #fff;`,
  Method: `background:${LogColors.accent}; padding: 2px; border-radius: 0 2px 2px 0;  color: #fff;`,
  Table: '',
  CleanLog: ''
}

export const LogName = {
  All: 'all',
  CleanLog: 'cleanLog',
  Debug: 'debug',
  Error: 'error',
  Info: 'info',
  Log: 'log',
  Method: 'method',
  None: 'none',
  Table: 'table',
  Time: 'time',
  TimeEnd: 'timeEnd',
  Trace: 'trace',
  Warn: 'warn'
}

export const LogLabel = {
  All: 'All',
  CleanLog: 'CleanLog',
  Debug: 'Debug',
  Error: 'Error',
  Info: 'Info',
  Log: 'Log',
  Method: 'Method',
  Table: 'Table',
  Time: 'Time',
  TimeEnd: 'Time End',
  Trace: 'Trace',
  Warn: 'Warn'
}

export const LogLevelNumber = {
  Trace: '0',
  Debug: '1',
  Info: '2',
  Warn: '3',
  Error: '4',
  None: '5'
}
