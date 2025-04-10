import type { App } from 'vue'
import type { IOptions, DataLayerEvent } from './types'

declare global {
  interface Window {
    dataLayer: DataLayerEvent[];
  }
}

async function startGtm (
  w: Window,
  d: Document,
  s: string,
  l: 'dataLayer',
  i: string,
  j?: HTMLScriptElement,
  f?: Node
) {
  w[l] = w[l] || []
  w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })
  j = d.createElement(s) as HTMLScriptElement
  j.async = true
  j.src = `https://www.googletagmanager.com/gtm.js?id=${i}&l=${l}`
  f = d.getElementsByTagName(s)[0]
  f?.parentNode?.insertBefore(j, f)
}

async function checkType (
  value: unknown,
  expectedType: string,
  errorMsg = 'Some of the options passed are incorrect or invalid.'
) {
  const typeChecks: Record<string, (val: unknown) => boolean> = {
      'array': (val) => Array.isArray(val),
      'null': (val) => val === null,
      'object': (val) => val !== null && typeof val === 'object' && !Array.isArray(val),
      'string': (val) => typeof val === 'string',
      'number': (val) => typeof val === 'number',
      'boolean': (val) => typeof val === 'boolean',
      'function': (val) => typeof val === 'function',
      'undefined': (val) => typeof val === 'undefined'
  };

  if (!typeChecks[expectedType] || !typeChecks[expectedType](value)) throw new Error(errorMsg)
}

async function isArrayOfStrings (value: unknown) {
  if (!Array.isArray(value) || !value.every(item => typeof item === 'string')) {
    throw new Error('If permitedDomains is set, it must be a string array.')
  }
}

function hasKey<T extends object> (obj: T, key: keyof any): key is keyof T {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

export default {
  async install(vue: App, options: IOptions = {}) {
    if (typeof vue === 'undefined') throw new Error('Vue must be installed first!')

    if (!options || !options.googleKey) throw new Error('The Google key is required and is missing.')

    await checkType(options.dev, 'boolean')
    await checkType(options.googleKey, 'string')
    await checkType(options.permitedDomains, 'array')

    if (options.permitedDomains?.length) isArrayOfStrings(options.permitedDomains)

    const showConsole = hasKey(options, 'dev') ? options.dev! : false
    const googleKey = hasKey(options, 'googleKey') ? options.googleKey! : ''
    const permitedDomains = hasKey(options, 'permitedDomains') ? options.permitedDomains! : []

    // Validação de domínio permitido
    const isDomainAllowed = !permitedDomains.length || permitedDomains.some((domain) => domain == window.location.origin)

    if (isDomainAllowed) {
        await startGtm(window, document, "script", "dataLayer", googleKey)
        
        if (window.dataLayer) {
            vue.provide('$gtag', window.dataLayer)

            vue.provide('$gtagpush', (otherProps: Record<string, any> = {}, e = 'click') => {
                const eventBody: DataLayerEvent = {
                    'event': e,
                    ...otherProps
                }

                if (showConsole) console.log('[GTM]', eventBody)
                
                window.dataLayer.push(eventBody)
            })
        }
    } else {
      vue.provide('$gtag', [])
      vue.provide('$gtagpush', () => {
        if (showConsole) console.warn('🛑 Domain not allowed for GTM')
        return 'Domain not allowed'
      })
    }
  },
};
