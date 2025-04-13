import { App, ref, Ref } from 'vue'
import type { ThemeOptions, ThemeTextMap } from './types'

function hasKey<T extends object>(obj: T, key: keyof any): key is keyof T {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

const plugin = {
  install(Vue: App, options: ThemeOptions) {
    if (!options || !options.theme)
      throw new Error('The "theme type" is required and is missing.')

    const startTheme = (hasKey(options, 'theme')) ? options.theme : 'default'
    const showConsole = (hasKey(options, 'dev')) ? options.dev : false
    const textList: ThemeTextMap = hasKey(options, 'texts') ? options.texts! : {};

    const theme: Ref<string> = ref('')

    const startSystem = () => {
      let currentTheme = startTheme
      const localTheme = localStorage.getItem('theme')

      if (localTheme) {
          currentTheme = localTheme
      } else {
          localStorage.setItem('theme', currentTheme)
      }
      
      theme.value = currentTheme
      document.documentElement.setAttribute('data-theme', theme.value)
    };

    const changeTheme = (value = '') => {
      if (showConsole) console.log(`changeTheme =>  [old] ${theme.value} - [new]: ${value}`);

      const newTheme = !value ? 'default' : value

      localStorage.setItem('theme', newTheme)
      theme.value = newTheme
      document.documentElement.setAttribute('data-theme', newTheme)
    };

    const getThemeVariableValue = (prop: string | null = null): string => {
        if (typeof window === 'undefined' || typeof document === 'undefined' || !prop) return ''

        try {
            const root = document.documentElement
            const styles = getComputedStyle(root)

            // Verifica se há um tema definido no atributo `data-theme`
            const themeAttr = root.getAttribute('data-theme')
            if (!themeAttr) {
                console.warn('⚠️ No active themes found!')
                return ''
            }

            return styles.getPropertyValue(prop).trim()
        } catch (error) {
            console.error('❌ Error retrieving theme variables:', error)
            return ''
        }
    }

    const getThemeText = (text = ''): string => {
        if (!text || !textList[theme.value] || !textList[theme.value][text]) return ''

        return textList[theme.value][text]
    }

    startSystem()

    Vue.provide('$getTheme', theme)
    Vue.provide('$getThemeVariableValue', getThemeVariableValue)
    Vue.provide('$getThemeText', getThemeText)
    Vue.provide('$changeTheme', changeTheme)
  },
}

export default plugin
