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

    const theme = ref('');

    const startSystem = () => {
      theme.value = startTheme;
      document.documentElement.setAttribute('data-theme', theme.value);
    };

    const changeTheme = (value = '') => {
      if (showConsole)
        console.log(`changeTheme =>  old: ${theme.value} - new: ${value}`);

      const newTheme = !value ? 'default' : value;
      theme.value = newTheme;
      document.documentElement.setAttribute('data-theme', newTheme);
    };

    // Definimos o tema inicial no HTML
    startSystem();

    app.provide('$theme', theme);
    app.provide('changeTheme', changeTheme);
  },
};
