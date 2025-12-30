export const configPatternLetter = /[a-zA-Z]/
export const configPatternNumber = /[0-9]/
export const configPatternSpecial = /[!@#$%^&*(),.?:{}|<>+-_]/

export const configRules = [
  { title: 'ABC', regex: /[A-Z]+/ },
  { title: 'abc', regex: /.*[a-z]{1}/ },
  { title: '123', regex: /[0-9]+/ },
  { title: '8', regex: /.{8,}/ },
  { title: '@', regex: /.*[!@#$%^&*(),.?:{}|<>+\-_]+/ }
]
