// Valores padroes das propriedades
export const defaultPropertiesValues = {
  nbId: 'nb-button-mechanical-one',
	display: 'b',
	textColor: '#ffffff',
	containerColor: '#ffffff',
	buttonColor: '#bbbbbb',
	paddingX: 1,
	paddingY: 0.2,
	disabled: false,
	borderRadius: 0.375,
	animationSlow: false,
	fontFamily: `'Lato', sans-serif`,
	fontSize: '1.6em',
  fontWeight: 400,
  containerSimulator: '#ffffff'
}

// Estado inicial do componente com os valores padroes
export const initState = {
  ...defaultPropertiesValues
}
