/**
 * Magic ConsoleLog v2.0.3 by Nimbus.
 * Nimbus Copyright (c) 2023 VLALG and contributors.
 */

function objectHasProp (requiredProps, obj, errorMsg) {
  for (const prop of requiredProps) {
    if (!(prop in obj)) {
      throw new Error(errorMsg);
    }
  }
}

function styledLog(styledText, regularText, titleStyle) {
  console.log(`%c${styledText}%c${regularText}`, titleStyle, '');
}

function consoleMount (type, title, titleConfig, text, hasLink, link) {
  const { color, size, weight, background, shadow } = titleConfig;
  let titleStyle = `font-color: ${color}; font-size: ${size}; font-weight: ${weight}; background-color: ${background}; word-break: break-word; line-height: 1.3;`;

  if (type === 'rainbow' && shadow) {
    const shadowStyles = shadow.map((s, index) => {
      const num = [3, 6, 6, 9, 12, 15, 18, 21][index] || 3;
      return `${num}px ${num}px 0px ${s}`;
    });
    titleStyle += ` text-shadow: ${shadowStyles.join(', ')}`;
  }

  const formattedTitle = `${title}\n\n`;
  const completeText = `${text}\n\n${link.text}:\n${link.url}\n\n`;
  const basicText = `${text}\n\n`;

  if (hasLink) {
    styledLog(formattedTitle, completeText, titleStyle);
  } else {
    styledLog(formattedTitle, basicText, titleStyle);
  }
}

export default class MagicConsole {
  constructor (type = 'normal', config = null) {
    this.type = type
    this.config = config
    
    this.awesome()
  }

  awesome () {
    const currentType = this.type
    const currentConfig = this.config

    const defaultLink = {
      text: 'Default link',
      url: 'https://github.com/VemLavarALoucaGamers/vlalg-nimbus/tree/main/packages/libs/magic-consolelog',
    };
  
    const defaultConfig = {
      title: 'Title undefined',
      titleConfig: {
        color: '#ffffff',
        size: '20px',
        weight: 'bold',
        background: 'transparent',
        shadow: [
          '#D91F26',
          '#E25B0E',
          '#F5DD08',
          '#059444',
          '#0287CE',
          '#044D91',
          '#2A1571',
        ],
      },
      text: 'Text undefined',
      hasLink: true,
      link: defaultLink,
    };
  
    const config = { ...defaultConfig, ...currentConfig };
  
    objectHasProp(
      ['color', 'size', 'background'],
      config.titleConfig,
      'titleConfig must have color, background, and size'
    );
  
    if (config.hasLink) {
      objectHasProp(['text', 'url'], config.link, 'link must have text and url');
    }
  
    if (currentType === 'bold' || currentType === 'rainbow') {
      config.titleConfig.weight = 'bold';
    }
  
    consoleMount(
      currentType,
      config.title,
      config.titleConfig,
      config.text,
      config.hasLink,
      config.link
    )
  }
}
