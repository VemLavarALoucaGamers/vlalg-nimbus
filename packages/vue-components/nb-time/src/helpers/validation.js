export const validDay = (value) => {
  const valueLength = value ? value.toString().length : 1
  return (valueLength >= 1 && valueLength <= 2 && value >= 1 && value <= 31)
}

export const validMonth = (value) => {
  const validMonths = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec']
  return validMonths.includes(value)
}

export const validYear = (value) => {
  const valueLength = value ? value.toString().length : 0
  return (valueLength > 0 && valueLength < 5)
}

export const validHour = (value) => {
  const valueLength = value ? value.toString().length : 0
  return (valueLength >= 0 && valueLength <= 2 && value >= 0 && value <= 23)
}

export const validMinute = (value) => {
  const valueLength = value ? value.toString().length : 0
  return (valueLength >= 0 && valueLength <= 2 && value >= 0 && value <= 59)
}

export const validSecond = (value) => {
  const valueLength = value ? value.toString().length : 0
  return (valueLength >= 0 && valueLength <= 2 && value >= 0 && value <= 59)
}
