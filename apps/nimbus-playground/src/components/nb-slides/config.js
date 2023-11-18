// Valores padroes das propriedades
export const defaultPropertiesValues = {
  nbId: 'nb-slide-div-fixed-size',
	display: 'ib',
	disabled: false,
  borderRadius: 0.375,
  slideType: 'transform',
  slideWidth: 200,
  slideHeight: 200,
  slideInterval: 5000,
  showButtons: true,
  buttonsSize: 10,
  buttonMarginTop: 10,
  buttonMarginBottom: 10,
  buttonsColor: '#FF6347',
  buttonsColorHover: '#0000FF',
  showProgressBar: false,
  progressColor: '#0000FF'
}

// Estado inicial do componente com os valores padroes
export const initState = {
  ...defaultPropertiesValues
}
