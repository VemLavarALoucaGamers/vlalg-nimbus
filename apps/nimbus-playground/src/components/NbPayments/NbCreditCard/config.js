const generateYearList = () => {
  const currentYear = new Date().getFullYear()
  const yearStart = currentYear - 5
  const defaultList = []
  const nextYears = 15

  for (let i = 0; i <= nextYears; i++ ) {
    defaultList.push(yearStart + i)
  }

  return defaultList
}

// Valores padroes das propriedades
export const defaultPropertiesValues = {
  nbId: 'nb-credit-card-one',
  showForm: true,
  chipModel: 'two',
  cardNumber: '',
  cardName: '',
  cardExpMonth: '',
  cardExpYear: '2018',
  years: generateYearList(),
  cardCcv: '',
  formatMode: 'two',
  flipOnHover: false,
  formNumberText: 'card number',
  formHolderText: 'card holder',
  formExpMonthText: 'expiration mm',
  formExpMonthDefaultText: 'month',
  formExpYearText: 'expiration yy',
  formExpYearDefaultText: 'year',
  formCcvText: 'ccv',
  cardHolderText: 'cardholder name',
  cardExpirationText: 'expiration',
  cardCcvText: 'ccv',
  formBackground: '#ffffff',
  formColor: '#999999',
  formRadius: '5',
  formShadow: false,
  formInputBackground: '#ffffff',
  formInputColor: '#444444',
  formInputActiveColor: 'rgba(0,0,0,.3)',
  formInputBorder: 'rgba(0,0,0,.3)',
  formInputRadius: '10',
  cardBackground: 'linear-gradient(45deg, blueviolet, deeppink)',
  cardColor: '#ffffff',
  cardRadius: '10',
  cardShadow: false,
  cardCcvColor: '#333333'
}

// Estado inicial do componente com os valores padroes
export const initState = {
  ...defaultPropertiesValues
}
