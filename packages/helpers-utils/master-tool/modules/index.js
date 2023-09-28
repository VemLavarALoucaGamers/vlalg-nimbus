/**
 * Master Tool v1.0.0 by Nimbus.
 * Nimbus Copyright (c) 2023 VLALG and contributors.
 */

export default () => {
  /**
    * Internal function that checks whether a passed parameter is empty
    * @param {any} parameter - Parameter that will be checked according to its type
    * @param {boolean} acceptsEmpty - Parameter that allows it to be passed empty
    * @returns {boolean} Returns if the parameter is empty
  */
  function withoutField (parameter, acceptsEmpty = false) {
    if (typeof parameter === 'boolean') return false

    if (!acceptsEmpty && (parameter === null || parameter === undefined)) return true

    if (!acceptsEmpty && (typeof parameter === 'string' && parameter.trim() === '')) return true

    if (!acceptsEmpty && (typeof parameter === 'object' && Object.keys(parameter).length === 0)) return true

    if (!acceptsEmpty && (Array.isArray(parameter) && parameter.length === 0)) return true

    if (!acceptsEmpty && (typeof parameter === 'function' && (parameter === null || parameter === undefined))) return true

    return false
  }

  /**
    * Internal function that shows an error message when the parameters of the function that called it are of the wrong type
    * @param {string} functionName - The name of the function that called this print
    * @returns It returns nothing
  */
  function errorTypes (functionName = '') {
    throw new Error(`Function '${functionName}': All parameters must have the correct type.`)
  }

  /**
    * Internal function that shows an error message with the parameters required in the function that requests it
    * @param {array} parameters - An array that contains a list of parameters
    * @param {string} functionName - The name of the function that called this print
    * @returns It returns nothing
  */
  function requiredParameters (parameters = [], functionName = '') {
    const mountParams = parameters.join(', ')
    throw new Error(`Function '${functionName}' has these required parameters: ${mountParams}.`)
  }

  return {
    /**
     * Function that checks if the parameter is a number
     * @param {number} value - Value to check
     * @returns {boolean} Return if it is a number
    */
    isNumber (value = null) {
      return !!(value && typeof value === 'number' && !isNaN(value))
    },

    /**
     * Function that centralizes the use of addEventListener, wantsUntrusted é opcional
     * @param {string} scope - Type name 
     * @param {string} event - Event name
     * @param {function} callback - Function to be executed
     * @param {boolean} wantsUntrusted - Used to specify whether the event can be triggered by untrusted content
     * @param {object} element - Used to specify HTML elements
     * @returns It returns nothing
    */
    async listener (scope = 'document', event, callback = () => { console.log('Default callback') }, wantsUntrusted = false, element = null) {
      if (withoutField(scope) || withoutField(event) || withoutField(callback)) {
        requiredParameters(['scope', 'event', 'callback', 'wantsUntrusted', 'element'], 'listener')
      }

      if (typeof scope !== 'string' || typeof event !== 'string' || typeof callback !== 'function' || typeof wantsUntrusted !== 'boolean' || typeof element !== 'object') {
        errorTypes('listener')
      }

      if (scope === 'window') {
        window.addEventListener(event, callback, wantsUntrusted)
      } else if (scope === 'document') {
        document.addEventListener(event, callback, wantsUntrusted)
      } else if (scope === 'others' && element) {
        element.addEventListener(event, callback, wantsUntrusted)
      } else {
        throw new Error('Scope not recognized. Use "document", "window" or "others" with the element property being passed')
      }
    },

    /**
     * Function created to do Async in `.map` of javascript
     * @param {array} itens - array of items
     * @param {function} callback - Function to be executed
     * @returns Returns a new array of items, as the callback function returns
    */
    async asyncMapPromise (itens = [], callback) {
      if (withoutField(itens) || withoutField(callback)) {
        requiredParameters(['itens', 'callback'], 'asyncMapPromise')
      }

      if (!Array.isArray(itens) || typeof callback !== 'function') {
        errorTypes('asyncMapPromise')
      }

      return await Promise.all(itens.map(async (item, index, array) => {
        const newItem = await callback(item, index, array)
        return newItem
      }))
    },

    /**
     * Function that convert HEX color to RGBA color
     * @param {string} hexCode - Color in hex, can be passed with or without the character `#`
     * @param {string} opacity - RGBA opacity, accepted from `0.0` to `1.0`
     * @returns {string} Returns the color in RGBA
    */
    convertHexToRGBA (hexCode = '', opacity = '1.0') {
      if (withoutField(hexCode) || withoutField(opacity)) {
        requiredParameters(['hexCode', 'opacity'], 'convertHexToRGBA')
      }

      if (typeof hexCode !== 'string' || typeof opacity !== 'string') {
        errorTypes('convertHexToRGBA')
      }

      let hex = hexCode.includes("#") ? hexCode.replace('#', '') : hexCode

      if (hex.length === 3) {
        const groupOne = `${hex[0]}${hex[0]}`
        const groupOTwo = `${hex[1]}${hex[1]}`
        const groupOThree = `${hex[2]}${hex[2]}`

        hex = `${groupOne}${groupOTwo}${groupOThree}`
      }

      const redColor = parseInt(hex.substring(0, 2), 16)
      const greenColor = parseInt(hex.substring(2, 4), 16)
      const blueColor = parseInt(hex.substring(4, 6), 16)

      return `rgba(${redColor},${greenColor},${blueColor}, ${opacity})`
    },

    /**
     * Function that returns the initial letters of the string
     * @param {string} wordsToPickUp - Text that will be analyzed
     * @returns {array} Returns all initial letters in uppercase
    */
    initialLetter (wordsToPickUp = '') {
      if (withoutField(wordsToPickUp)) {
        requiredParameters(['wordsToPickUp'], 'initialLetter')
      }

      if (typeof wordsToPickUp !== 'string') {
        errorTypes('initialLetter')
      }

      const words = wordsToPickUp.split(/[\s-]+/)

      return words.map(word => {
        return word.charAt(0).toUpperCase()
      })
    },

    /**
     * Function that removes any special character from a text
     * @param {string} textToRemove - Text that will be analyzed
     * @param {string} charactersAllowed - Characters that should not be removed
     * @returns {string} Returns the text with the characters already removed
    */
    removeSpecialCharacters (textToRemove = '', charactersAllowed = '') {
      if (withoutField(textToRemove) || withoutField(charactersAllowed, true)) {
        requiredParameters(['textToRemove'], 'removeSpecialCharacters')
      }

      if (typeof textToRemove !== 'string' || (charactersAllowed !== '' && typeof charactersAllowed !== 'string')) {
        errorTypes('removeSpecialCharacters')
      }

      const escapedCharacters = !charactersAllowed ? '' : charactersAllowed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

      const regex = new RegExp(`[^\\w\\s${escapedCharacters}]`, 'gi')

      return textToRemove.replace(regex, '');
    },

    /**
     * Function that trims (spaces at the beginning and end) the text
     * @param {string} text - Text that will be analyzed
     * @returns {string} Returns text without spaces at the beginning and end
    */
    trimText (text) {
      if (withoutField(text)) {
        requiredParameters(['text'], 'trimText')
      }

      if (typeof text !== 'string') {
        errorTypes('trimText')
      }

      return text.trim()
    },

    /**
     * Function that removes all spaces from text
     * @param {string} text - Text that will be analyzed
     * @returns {string} Returns text without spaces
    */
    removeSpaceInText (text) {
      if (withoutField(text)) {
        requiredParameters(['text'], 'removeSpaceInText')
      }

      if (typeof text !== 'string') {
        errorTypes('removeSpaceInText')
      }

      return text.replace(/\s+/g, '')
    },

    /**
     * Function used to generate a redirect URL for whastapp, both web and app
     * @param {string} phone - WhatsApp phone number that will be used to start a conversation
     * @param {string} msg - Message that will be placed in the text field when opening the WhatsApp conversation
     * @param {string} type - Redirection type, web (`api` or `wa`) or app (`intent`)
     * @returns {string} Returns the redirect url
    */
    goWhatsapp (phone = '5511966666666', msg = 'Default text', type = 'wa') {
      /*
      if (withoutField(phone) || withoutField(msg) || withoutField(type)) {
        requiredParameters(['phone', 'msg', 'type'], 'goWhatsapp')
      }

      if (typeof phone !== 'string' || typeof msg !== 'string' || typeof type !== 'string') {
        errorTypes('goWhatsapp')
      }*/
      console.log(phone)
      const newText = msg
      const newPhone = phone
      let message = `https://wa.me/${newPhone}?text=${newText}`

      if (type === 'api') {
        message = `https://api.whatsapp.com/send?phone=${newPhone}&text=${newText}`
      } else if (type === 'intent') {
        message = `intent://send?phone=${newPhone}&text=${newText}#Intent;scheme=whatsapp;package=com.whatsapp;end`
      }

      return message
    },

    /**
     * Function that checks if a variable is empty
     * @param {number} value - Variable to be checked
     * @returns {boolean} Returns if a variable is empty
    */
    isEmpty (value) {
      return withoutField(value)
    },
    
    /**
     * Function that turns null into 0
     * @param {null} value - ariable to be changed
     * @returns {number} Returns the passed value if it is not null and zero when it is null
    */
    fixNullToNumber (value) {
      if (value === null || value === undefined) return 0

      return value
    }
  }
}
