// Valores padroes das propriedades
export const defaultPropertiesValues = {
  nbId: 'nb-countdown',
  textColor: '#000000',
  numberColor: '#000000',
  separatorColor: '#000000',
  border: false,
  borderColor: '#000000',
  day: 31,
  month: 'nov',
  year: 2024,
  hour: 1,
  minute: 20,
  second: 0,
  daysText: 'days',
  hoursText: 'hours',
  minutesText: 'minutes',
  secondsText: 'seconds',
  showDays: true,
  showHours: true,
  showMinutes: true,
  showSeconds: true,
  separator: true,
  separatorType: '/',
	fontFamily: `'Lato', sans-serif`,
	fontSizeNumber: 2.5,
	fontSizeText: 1.3,
  fontSizeSeparator: 3,
  fontWeightNumber: 900,
  fontWeightText: 300,
  fontWeightSeparator: 900,
  containerWidth: 256,
  containerHeight: 43,
}

// Estado inicial do componente com os valores padroes
export const initState = {
  ...defaultPropertiesValues
}
