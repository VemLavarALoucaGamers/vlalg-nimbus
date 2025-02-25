import { ref } from 'vue';

function hasKey(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

export default {
  install(app, options = {}) {
    if (!options || !options.theme)
      throw new Error('The "theme type" is required and is missing.');

    const startTheme = (hasKey(options, 'theme'))
      ? options.theme
      : 'default';
    const showConsole = (hasKey(options, 'dev')) ? options.dev : false;
    const textList = (hasKey(options, 'texts')) ? options.texts : {}

    const theme = ref('');

    const startSystem = () => {
      let currentTheme = startTheme
      const localTheme = localStorage.getItem('theme')

      if (localTheme) {
          currentTheme = localTheme
      } else {
          localStorage.setItem('theme', currentTheme)
      }
      
      theme.value = currentTheme;
      document.documentElement.setAttribute('data-theme', theme.value);
    };

    const changeTheme = (value = '') => {
      if (showConsole)
          console.log(`changeTheme =>  old: ${theme.value} - new: ${value}`);

      const newTheme = !value ? 'default' : value;

      localStorage.setItem('theme', newTheme)
      theme.value = newTheme;
      document.documentElement.setAttribute('data-theme', newTheme);
    };

    const getThemeVariable = (prop = '') => {
        if (typeof window === 'undefined' || typeof document === 'undefined' || !prop) return ''

        try {
            const root = document.documentElement;
            const styles = getComputedStyle(root);

            // Verifica se há um tema definido no atributo `data-theme`
            const themeAttr = root.getAttribute('data-theme');
            if (!themeAttr) {
                console.warn('⚠️ No active themes found!');
                return {};
            }

            return styles.getPropertyValue(prop).trim()
        } catch (error) {
            console.error('❌ Error retrieving theme variables:', error);
            return '';
        }
    }

    const getThemeText = (text = '') => {
        if (!text) return ''

        return textList[theme.value][text] || ''
    }

    startSystem();

    Vue.provide('$theme', theme);
    Vue.provide('$changeTheme', changeTheme);
    Vue.provide('$themeVariable', getThemeVariable);
    Vue.provide('$themeText', getThemeText);
  },
};
