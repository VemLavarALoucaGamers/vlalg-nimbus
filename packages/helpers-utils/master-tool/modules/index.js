/**
 * Master Tool v1.0.0 by Nimbus.
 * Nimbus Copyright (c) 2023 VLALG and contributors.
 */

class MasterTool {
  /**
   * Function that checks if the parameter is a number
   * @param {number} value - Param description
   * @returns {boolean} Return description
  */
  isNumber (value = '') {
    return !!(value && typeof value === 'number' && !isNaN(value))
  }

  /**
   * Function that centralizes the use of addEventListener, wantsUntrusted é opcional
   * @param {string} type - Type name 
   * @param {string} event - Event name
   * @param {function} func - Function to be executed
   * @param {boolean} wantsUntrusted - Used to specify whether the event can be triggered by untrusted content
   * @returns It returns nothing by default, only if the defined function returns
  */
  async eventListener (type = 'document', event, func, wantsUntrusted = false) {
    if (type === 'window') {
      window.addEventListener(event, func, wantsUntrusted)
    } else {
      document.addEventListener(event, func, wantsUntrusted)
    }
  }
}

export default MasterTool


