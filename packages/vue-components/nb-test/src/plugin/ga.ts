/*
import gtm from './gtm'

app.use(gtm, { 
    googleKey: "GTM-MT759RR5",
    permitedDomains: [],
    dev: true
})

$gtagpush('', { something: 'test' })
*/
async function startGtm (w: any, d: any, s: any, l: any, i: any, j?: any, f?: any) {
  w[l] = w[l] || [];
  w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  j = d.createElement(s);
  j.async = true;
  j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + '&l=' + l;
  f = d.getElementsByTagName(s)[0];
  f.parentNode.insertBefore(j, f);
}

async function checkType (value, expectedType, errorMsg = 'Some of the options passed are incorrect or invalid.') {
  const typeChecks = {
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

async function isArrayOfStrings (value) {
  if (Array.isArray(value) && value.every(item => typeof item !== 'string')) throw new Error('If it is set to permitted Domains it needs to be a string array.')
}

function hasKey (obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

export default {
  async install(Vue, options) {
      if (typeof Vue === 'undefined') throw new Error('Vue must be installed first!')

      if (!options || !options.googleKey) throw new Error('The Google key is required and is missing.')
      if (!options || !options.partner) throw new Error('The "partner" is required and is missing.');

      await checkType(options.dev, 'boolean')
      await checkType(options.googleKey, 'string')
      await checkType(options.permitedDomains, 'array')

      if (options.permitedDomains.length) isArrayOfStrings(options.permitedDomains)

      const showConsole = await hasKey(options, 'dev') ? options.dev : false
      const googleKey = await hasKey(options, 'googleKey') ? options.googleKey : ''
      const permitedDomains = await hasKey(options, 'permitedDomains') ? options.permitedDomains : []

      if (!permitedDomains.length || (permitedDomains.length && permitedDomains.some((domain) => domain == window.location.origin))) {
          await startGtm(window, document, "script", "dataLayer", googleKey)
          
          if (window.dataLayer) {
              Vue.provide('$gtag', window.dataLayer)
              Vue.provide('$gtagpush', (otherProps = {}, e = 'click') => {
                  const eventBody = {
                      'event': e,
                      ...otherProps
                  }

                  if (showConsole) console.log(eventBody)
                  
                  window.dataLayer.push(eventBody)
              })
          }
      } else {
        Vue.provide('$gtag', [])
        Vue.provide('$gtagpush', () => 'Domain not allowed')
      }
  }
}
