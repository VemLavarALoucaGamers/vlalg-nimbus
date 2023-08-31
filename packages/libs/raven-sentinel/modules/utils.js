import { LogLabel } from './enums.js'

// Parametro: Message pode ser Array de string ou Error ou string ou boolean
// Return: Ou uma String ou Undefined
export const getMessage = (message) => {
  if (Array.isArray(message)) return message.join(' | ')
  if (message instanceof Error) return message.message
  if (typeof message === 'object') return JSON.stringify(message, null, 1)

  const returnMessage = message || ''

  return `${returnMessage}`
}

function detectedNode (nodeEnv) {
  if (!nodeEnv) false

  const appEnv = nodeEnv
  return Object.prototype.toString.call((typeof nodeEnv !== 'undefined') ? nodeEnv : 0 ) === '[object process]' || !!(appEnv === 'production')
}

// name é um tipo LogLabel
export const mountLog = (name, style, className, classStyle, isPure = false, nodeEnv = '') => {
  if ([LogLabel.Table, LogLabel.CleanLog].includes(name)) return []

  if (detectedNode(nodeEnv) || isPure) {
    return [`${className} [${name}]: `]
  }

  return [
    `%c ${className} %c [ ${name} ] %c:`,
    classStyle,
    style,
    'background: transparent;'
  ]
}
