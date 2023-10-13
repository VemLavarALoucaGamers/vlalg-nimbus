// Valores padroes das propriedades
export const defaultGradientTextValues = {
  nbId: 'nb-gradient-text',
  lineHeight: '1.42857143',
  text: 'Default Text',
  size: '3.5',
  sizeType: 'em',
  bgFirst: '#5639fc',
  bgSecond: '#05f7ff',
  alignment: 'left',
  paddingBottom: '5',
  font: 'Fugaz One, cursive'
}
export const defaultHighlightSelectedTextValues = {
  nbId: 'nb-highlight-selected-text',
  text: 'Default Text',
	backgroundColor: '#000000',
	textColor: '#ffffff',
}

// Estado inicial do componente com os valores padroes
export const initGradientTextState = {
  ...defaultGradientTextValues
}
export const initHighlightSelectedTextState = {
  ...defaultHighlightSelectedTextValues
}
