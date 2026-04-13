/*
  Função auxiliar para formatar valor de tempo com zero à esquerda
  exemplo: 1 -> 01 (using 0 to 9)
*/
export const formatTimeValue = (value) => {
  return String(value).padStart(2, '0')
}

/*
  Função para formatar data/hora ISO local (sem timezone)
  exemplo: 2026-02-19T10:00:00.000Z -> 2026-02-19T10:00:00
  exemplo: 2026-02-19T10:00:00+00:00 -> 2026-02-19T10:00:00
  exemplo: 2026-02-19T10:00:00-03:00 -> 2026-02-19T10:00:00
  exemplo: 2026-02-19T10:00:00+03:00 -> 2026-02-19T10:00:00
*/
export const formatISOLocal = (date) => {
  if (!date || !(date instanceof Date)) return null

  const year = date.getFullYear() // Converter ano para número
  const month = formatTimeValue(date.getMonth() + 1) // Converter mês para número
  const day = formatTimeValue(date.getDate()) // Converter dia para número
  const hours = formatTimeValue(date.getHours()) // Converter hora para número
  const minutes = formatTimeValue(date.getMinutes()) // Converter minuto para número
  const seconds = formatTimeValue(date.getSeconds()) // Converter segundo para número

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}` // Retornar data/hora ISO local
}

/*
  Função para formatar ISO string com timezone conforme formato
  exemplo: 2026-02-19T10:00:00.000Z -> 2026-02-19T10:00:00+00:00
*/
export const formatISOString = (date, timezoneFormat = 'Z') => {
  if (!date || !(date instanceof Date)) return null

  const isoString = date.toISOString() // Converter data/hora para ISO string

  // Verificar se o timezoneFormat é '+00:00'
  if (timezoneFormat === '+00:00') {
    return isoString.replace('Z', '+00:00') // Substituir Z por +00:00
  }

  return isoString // Retornar ISO string
}

/*
  Função para verificar se duas datas são do mesmo dia
  exemplo: 2026-02-19T10:00:00.000Z e 2026-02-19T10:00:00.000Z -> true
  exemplo: 2026-02-19T10:00:00.000Z e 2026-02-20T10:00:00.000Z -> false
  exemplo: 2026-02-19T10:00:00.000Z e 2026-02-19T11:00:00.000Z -> false
  exemplo: 2026-02-19T10:00:00.000Z e 2026-02-19T09:00:00.000Z -> false
  exemplo: 2026-02-19T10:00:00.000Z e 2026-02-19T10:00:00.000Z -> true
  exemplo: 2026-02-19T10:00:00.000Z e 2026-02-19T10:00:01.000Z -> false
  exemplo: 2026-02-19T10:00:00.000Z e 2026-02-19T10:00:00.000Z -> true
*/
export const isSameDay = (date1, date2) => {
  if (!date1 || !date2) return false

  // Verificar se as datas são do mesmo dia
  return date1.getFullYear() === date2.getFullYear() && // Verificar se o ano é o mesmo
         date1.getMonth() === date2.getMonth() && // Verificar se o mês é o mesmo
         date1.getDate() === date2.getDate() // Verificar se o dia é o mesmo
}

/*
  Função para parsear uma data local a partir de string YYYY-MM-DD
  exemplo: 2026-02-19 -> 2026-02-19T00:00:00.000Z
  exemplo: 2026-02-19T10:00:00.000Z -> 2026-02-19T10:00:00.000Z
  exemplo: 2026-02-19T10:00:00.000Z -> 2026-02-19T10:00:00.000Z
*/
export const parseLocalDate = (dateStr) => {
  if (!dateStr) return null

  // Verificar se o formato da data é YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    // Separar a data em ano, mês e dia
    const [year, month, day] = dateStr.split('-').map(Number)

    // Criar nova data com o ano, mês e dia
    return new Date(year, month - 1, day)
  }

  // Criar nova data com a string
  const date = new Date(dateStr)

  // Verificar se a data é válida
  return isNaN(date.getTime()) ? null : date
}

/*
  Função para obter o ano ISO 8601 da semana
  exemplo: 2026-02-19T10:00:00.000Z -> 2026
  exemplo: 2026-02-19T10:00:00.000Z -> 2026
*/
export const getISOWeekYear = (date) => {
  // Criar nova data com a data passada
  const d = new Date(date.getTime())

  // Definir o dia da semana para a terceira segunda-feira
  d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7)
  
  // Retornar o ano
  return d.getFullYear()
}

/*
  Função para obter o número da semana ISO 8601
  exemplo: 2026-02-19T10:00:00.000Z -> 1
  exemplo: 2026-02-19T10:00:00.000Z -> 2
  exemplo: 2026-02-19T10:00:00.000Z -> 3
  exemplo: 2026-02-19T10:00:00.000Z -> 4
  exemplo: 2026-02-19T10:00:00.000Z -> 5
  exemplo: 2026-02-19T10:00:00.000Z -> 6
  exemplo: 2026-02-19T10:00:00.000Z -> 7
*/
export const getISOWeekNumber = (date) => {
  // Criar nova data com a data passada
  const d = new Date(date.getTime())
  d.setHours(0, 0, 0, 0) // Definir hora, minuto, segundo e milissegundo como 0

  const dayOfWeek = d.getDay() || 7 // Dia da semana
  const daysToThursday = (4 - dayOfWeek + 7) % 7 // Dias para o primeiro thursday
  
  d.setDate(d.getDate() + daysToThursday) // Definir dia da semana
  
  const jan4 = new Date(d.getFullYear(), 0, 4) // Data de 4 de janeiro
  jan4.setHours(0, 0, 0, 0) // Definir hora, minuto, segundo e milissegundo como 0
  
  const jan4Day = jan4.getDay() || 7 // Dia da semana de 4 de janeiro
  const jan4DaysToThursday = (4 - jan4Day + 7) % 7 // Dias para o primeiro thursday
  const firstThursday = new Date(jan4) // Primeiro thursday
  
  firstThursday.setDate(jan4.getDate() + jan4DaysToThursday) // Definir dia da semana
  
  const diffTime = d.getTime() - firstThursday.getTime() // Tempo entre a data e o primeiro thursday
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) // Dias entre a data e o primeiro thursday
  const weekNumber = Math.floor(diffDays / 7) + 1 // Número da semana
  
  return weekNumber // Retornar o número da semana
}

/*
  Função para obter a data de início da semana (segunda-feira)
  exemplo: 2026-02-19T10:00:00.000Z -> 2026-02-16T00:00:00.000Z
  exemplo: 2026-02-19T10:00:00.000Z -> 2026-02-16T00:00:00.000Z
*/
export const getWeekStartDate = (date) => {
  // Criar nova data com a data passada
  const d = new Date(date.getTime())
  
  // Obter o dia da semana
  const day = d.getDay() // Dia da semana
  const diff = d.getDate() - day + (day === 0 ? -6 : 1) // Dias para a segunda-feira
  const result = new Date(d.getFullYear(), d.getMonth(), diff) // Data de início da semana
  
  result.setHours(0, 0, 0, 0) // Definir hora, minuto, segundo e milissegundo como 0
  
  return result // Retornar a data de início da semana
}

/*
  Função para obter a data de fim da semana (domingo)
  exemplo: 2026-02-19T10:00:00.000Z -> 2026-02-22T23:59:59.999Z
  exemplo: 2026-02-19T10:00:00.000Z -> 2026-02-22T23:59:59.999Z
*/
export const getWeekEndDate = (date) => {
  // Obter a data de início da semana
  const start = getWeekStartDate(date)
  
  // Criar nova data com a data de início da semana
  const end = new Date(start.getTime())
  end.setDate(end.getDate() + 6) // Definir dia da semana
  
  return end // Retornar a data de fim da semana
}

/*
  Função para formatar string da semana no formato ISO 8601
  exemplo: 2026-02-19T10:00:00.000Z -> 2026-W08
  exemplo: 2026-02-19T10:00:00.000Z -> 2026-W08
*/
export const formatWeekString = (date) => {
  // Obter o ano da semana
  const year = getISOWeekYear(date)

  // Obter o número da semana
  const week = getISOWeekNumber(date)
  
  return `${year}-W${String(week).padStart(2, '0')}` // Retornar string da semana no formato ISO 8601
}

/*
  Função para construir objeto completo a partir do inputText
  exemplo: 2026-02-19 -> { date: 2026-02-19T00:00:00.000Z, dateString: 2026-02-19, isoString: 2026-02-19T00:00:00.000Z, isoStringLocal: 2026-02-19T00:00:00, day: { date: 19, fullDate: 2026-02-19T00:00:00.000Z, isOtherMonth: false, isToday: false, isSelected: true, isInRange: false, isRangeStart: false, isRangeEnd: false, isDisabled: false, events: [] } }
  exemplo: 2026-02-19T10:00:00.000Z -> { date: 2026-02-19T10:00:00.000Z, dateString: 2026-02-19T10:00:00.000Z, isoString: 2026-02-19T10:00:00.000Z, isoStringLocal: 2026-02-19T10:00:00, day: { date: 19, fullDate: 2026-02-19T10:00:00.000Z, isOtherMonth: false, isToday: false, isSelected: true, isInRange: false, isRangeStart: false, isRangeEnd: false, isDisabled: false, events: [] } }
  exemplo: 2026-02-19T10:00:00.000Z -> { date: 2026-02-19T10:00:00.000Z, dateString: 2026-02-19T10:00:00.000Z, isoString: 2026-02-19T10:00:00.000Z, isoStringLocal: 2026-02-19T10:00:00, day: { date: 19, fullDate: 2026-02-19T10:00:00.000Z, isOtherMonth: false, isToday: false, isSelected: true, isInRange: false, isRangeStart: false, isRangeEnd: false, isDisabled: false, events: [] } }
*/
export const buildCompleteDataFromInputText = (value, options = {}) => {
  const {
    inputType,
    hasSeconds = false,
    allowRange = false,
    timezoneFormat = 'Z',
    locale = 'en-US'
  } = options

  /*
    Se o valor for vazio, nulo, undefined ou não for uma string, retornar objeto vazio conforme inputType
  */
  if (!value || value === '' || value === null || value === undefined) {
    // Retornar objeto vazio conforme inputType
    if (inputType === 'date') {
      return { date: null, dateString: null, isoString: null, isoStringLocal: null, day: null }
    } else if (inputType === 'time') {
      return { hour: 0, minute: 0, second: undefined, timeString: '' }
    } else if (inputType === 'datetime-local') {
      return { date: null, hour: 0, minute: 0, second: undefined, datetimeString: null, isoString: null, isoStringLocal: null, day: null }
    } else if (inputType === 'week') {
      return { weekString: null, weekStartDate: null, weekEndDate: null, weekNumber: null, weekYear: null, isoString: null, isoStringLocal: null }
    } else if (inputType === 'month') {
      return { date: null, dateString: null, month: null, year: null, monthName: null, isoString: null, isoStringLocal: null }
    } else if (allowRange) {
      return { startDate: null, endDate: null, isRange: true, isoString: null, isoStringLocal: null }
    }
    return null
  }

  try {
    if (inputType === 'date') {
      // Parsear a data local
      const date = parseLocalDate(value)
      if (!date) return { date: null, dateString: null, isoString: null, isoStringLocal: null, day: null }
      
      const today = new Date() // Data de hoje
      today.setHours(0, 0, 0, 0) // Definir hora, minuto, segundo e milissegundo como 0
      const normalizedDate = new Date(date.getTime()) // Data normalizada
      normalizedDate.setHours(0, 0, 0, 0) // Definir hora, minuto, segundo e milissegundo como 0
      
      return {
        date: normalizedDate,
        dateString: value,
        isoString: formatISOString(normalizedDate, timezoneFormat),
        isoStringLocal: formatISOLocal(normalizedDate),
        day: {
          date: normalizedDate.getDate(),
          fullDate: normalizedDate,
          isOtherMonth: false,
          isToday: isSameDay(normalizedDate, today),
          isSelected: true,
          isInRange: false,
          isRangeStart: false,
          isRangeEnd: false,
          isDisabled: false,
          events: []
        }
      }
    } else if (inputType === 'time') {
      // Expressão regular para time
      const timeRegex = /^(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?$/

      // Verificar se o valor corresponde à expressão regular
      const match = value.match(timeRegex)
      if (!match) return { hour: 0, minute: 0, second: undefined, timeString: '' }
      
      const hour = parseInt(match[1], 10) // Converter hora para número
      const minute = parseInt(match[2], 10) // Converter minuto para número
      const second = match[3] ? parseInt(match[3], 10) : undefined // Converter segundo para número
      
      return {
        hour,
        minute,
        second: hasSeconds ? second : undefined,
        timeString: value
      }
    } else if (inputType === 'datetime-local') {
      // Separar data e hora
      const parts = value.split('T')
      // Verificar se a data e hora foram separadas corretamente
      if (parts.length !== 2) return { date: null, hour: 0, minute: 0, second: undefined, datetimeString: null, isoString: null, isoStringLocal: null, day: null }
      
      const datePart = parts[0] // Parte da data
      const timePart = parts[1] // Parte da hora

      // Parsear a data local
      const date = parseLocalDate(datePart)
      if (!date) return { date: null, hour: 0, minute: 0, second: undefined, datetimeString: null, isoString: null, isoStringLocal: null, day: null }
      
      // Expressão regular para time
      const timeRegex = /^(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?$/
      // Verificar se o valor corresponde à expressão regular
      const match = timePart.match(timeRegex)
      if (!match) return { date: null, hour: 0, minute: 0, second: undefined, datetimeString: null, isoString: null, isoStringLocal: null, day: null }
      
      const hour = parseInt(match[1], 10) // Converter hora para número
      const minute = parseInt(match[2], 10) // Converter minuto para número
      const second = match[3] ? parseInt(match[3], 10) : undefined // Converter segundo para número
      
      const dateTime = new Date(date.getTime()) // Data e hora
      dateTime.setHours(hour, minute, second || 0, 0) // Definir hora, minuto, segundo e milissegundo
      
      const today = new Date() // Data de hoje
      today.setHours(0, 0, 0, 0) // Definir hora, minuto, segundo e milissegundo como 0
      const normalizedDate = new Date(date.getTime()) // Data normalizada
      normalizedDate.setHours(0, 0, 0, 0) // Definir hora, minuto, segundo e milissegundo como 0
      
      return {
        date: normalizedDate,
        hour,
        minute,
        second: hasSeconds ? second : undefined,
        datetimeString: value,
        isoString: formatISOString(dateTime, timezoneFormat),
        isoStringLocal: formatISOLocal(dateTime),
        day: {
          date: normalizedDate.getDate(),
          fullDate: normalizedDate,
          isOtherMonth: false,
          isToday: isSameDay(normalizedDate, today),
          isSelected: true,
          isInRange: false,
          isRangeStart: false,
          isRangeEnd: false,
          isDisabled: false,
          events: []
        }
      }
    } else if (inputType === 'week') {
      // Expressão regular para week
      const weekRegex = /^(\d{4})-W(\d{2})$/
      // Verificar se o valor corresponde à expressão regular
      const match = value.match(weekRegex)
      if (!match) return { weekString: null, weekStartDate: null, weekEndDate: null, weekNumber: null, weekYear: null, isoString: null, isoStringLocal: null }
      
      const year = parseInt(match[1], 10) // Converter ano para número
      const week = parseInt(match[2], 10) // Converter semana para número
      
      const jan4 = new Date(year, 0, 4) // Data de 4 de janeiro
      const jan4Day = jan4.getDay() || 7 // Dia da semana de 4 de janeiro
      const daysToMonday = (8 - jan4Day) % 7 // Dias para a primeira segunda-feira
      const firstMonday = new Date(year, 0, 4 + daysToMonday) // Primeira segunda-feira
      
      const weekStart = new Date(firstMonday.getTime()) // Data de início da semana
      weekStart.setDate(firstMonday.getDate() + (week - 1) * 7) // Definir dia da semana
      weekStart.setHours(0, 0, 0, 0) // Definir hora, minuto, segundo e milissegundo como 0
      
      const weekEnd = new Date(weekStart.getTime()) // Data de fim da semana
      weekEnd.setDate(weekStart.getDate() + 6) // Definir dia da semana
      weekEnd.setHours(23, 59, 59, 999) // Definir hora, minuto, segundo e milissegundo como 23:59:59.999
      
      return {
        weekString: value,
        weekStartDate: weekStart,
        weekEndDate: weekEnd,
        weekNumber: week,
        weekYear: year,
        isoString: formatISOString(weekStart, timezoneFormat),
        isoStringLocal: formatISOLocal(weekStart)
      }
    } else if (inputType === 'month') {
      // Expressão regular para month
      const monthRegex = /^(\d{4})-(\d{2})$/

      // Verificar se o valor corresponde à expressão regular
      const match = value.match(monthRegex)
      if (!match) return { date: null, dateString: null, month: null, year: null, monthName: null, isoString: null, isoStringLocal: null }
      
      const year = parseInt(match[1], 10) // Converter ano para número
      const month = parseInt(match[2], 10) - 1 // Converter mês para número
      
      const monthStart = new Date(year, month, 1) // Data de início do mês
      monthStart.setHours(0, 0, 0, 0) // Definir hora, minuto, segundo e milissegundo como 0
      
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      
      return {
        date: monthStart,
        dateString: `${year}-${formatTimeValue(month + 1)}-01`,
        month,
        year,
        monthName: monthNames[month],
        isoString: formatISOString(monthStart, timezoneFormat),
        isoStringLocal: formatISOLocal(monthStart)
      }
    } else if (allowRange && typeof value === 'string' && value.startsWith('{')) {
      try {
        // Parsear o valor como JSON
        const rangeValue = JSON.parse(value)

        // Verificar se o valor é um objeto e tem startDate ou endDate
        if (rangeValue && (rangeValue.startDate || rangeValue.endDate)) {

          // Parsear a data de início
          const startDate = rangeValue.startDate ? parseLocalDate(rangeValue.startDate) : null

          // Parsear a data de fim
          const endDate = rangeValue.endDate ? parseLocalDate(rangeValue.endDate) : null

          // Verificar se a data de início e a data de fim são válidas
          if (startDate && endDate) {
            // Definir hora, minuto, segundo e milissegundo como 0
            startDate.setHours(0, 0, 0, 0)
            // Definir hora, minuto, segundo e milissegundo como 0
            endDate.setHours(0, 0, 0, 0)
            
            return {
              startDate,
              endDate,
              isRange: true,
              isoString: {
                start: formatISOString(startDate, timezoneFormat),
                end: formatISOString(endDate, timezoneFormat)
              },
              isoStringLocal: {
                start: formatISOLocal(startDate),
                end: formatISOLocal(endDate)
              }
            }
          } else {
            return {
              startDate: startDate,
              endDate: endDate,
              isRange: true,
              isoString: null,
              isoStringLocal: null
            }
          }
        }
      } catch (e) {
        // Retornar objeto vazio com range true e isoString e isoStringLocal nulos
        return { startDate: null, endDate: null, isRange: true, isoString: null, isoStringLocal: null }
      }
    }
  } catch (e) {
    console.error('Error building complete data from inputText:', e)
  }

  // Retornar null se ocorrer erro
  return null
}


