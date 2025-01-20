# COMPONENTS
> Guia de como usar os componentes


## **Fragments**
### **BaseAlerts**
> De onde vem os dados?
>
> São fornecidos por meio do propData

_Props_
| Nome                | Tipo     | Default           | Valores Permitidos                  | Observacoes           |
|---------------------|----------|-------------------|-------------------------------------|-----------------------|
| propErroIcon        | String   | 'Errors'          | Qualquer coisa                      |                       |
| propSuccessIcon     | String   | 'Success'         | Qualquer coisa                      |                       |
| propWarnIcon        | String   | 'Warns'           | Qualquer coisa                      |                       |
| propInfoIcon        | String   | 'Infos'           | Qualquer coisa                      |                       |
| propBtnCloseIcon    | String   | 'X'               | Qualquer coisa                      |                       |
| propData            | Object   | {}                | Objeto de objetos de array          |                       |

_Emit_
| Nome Funcao               | Valor Evento              | O que fazer com isso?                                    |
|---------------------------|---------------------------|----------------------------------------------------------|
| close-base-alert          | **true**                  | Recebendo este TRUE podemos limpar os erros              |


_Exemplo de propDataAlert_
> Caso um item não exista passar a propriedade com array vazio
```js
// Com todos os alertas
{
  'error': [
    'Alguma coisa',
    'Alguma outra coisa',
    'Alguma outra coisa novamente',
  ],
  'success': [
    'Alguma coisa',
    'Alguma outra coisa',
    'Alguma outra coisa novamente',
  ],
  'warn': [
    'Alguma coisa',
    'Alguma outra coisa',
    'Alguma outra coisa novamente',
  ],
  'info': [
    'Alguma coisa',
    'Alguma outra coisa',
    'Alguma outra coisa novamente',
  ]
}

// Com apemas um alerta
{
  'error': [],
  'success': [
    'Alguma coisa',
    'Alguma outra coisa',
    'Alguma outra coisa novamente',
  ],
  'warn': [],
  'info': []
}
```

_Exemplo_
```html
<BaseAlerts
  :propErroIcon="Erros"
  :propSuccessIcon="Successo"
  :propWarnIcon="Atencao"
  :propInfoIcon="Informacoes"
  :propClearAlert="hasError"
  @alert-is-close="changeHasAlert('alertFalse', $event)"
/>
```



### **BaseInput**

_Props_
| Nome                       | Tipo     | Default           | Valores Permitidos                       | Observacoes           |
|----------------------------|----------|-------------------|------------------------------------------|-----------------------|
| propType                   | String   | 'text'            | **text**, **number**, **email**, **password**   |                       |
| propName                   | String   | ''                | Qualquer coisa                           | Determina o nome para o input |
| propId                     | String   | ''                | Qualquer coisa                           | Determina o id para o input |
| propShowEye                | Boolean  | false             | **true** ou **false**                    | Determina se deve aparecer o olho se o propType password |
| propActiveStyle            | String   | 'normal'          | **normal**, **italic** e **oblique**     | Quando o input estiver ativado/focado o texto fica segundo as opcoes permitidas  |
| propSizeMediaQuery         | String   | 'xs'              | **xs**, **sm**, **md** e **lg**          | Determina o tamanho dos inputs conforme as opcoes permitidas  |
| propTheme                  | String   | 'normal'          | **normal**, **primary**, **success**, **info**, **danger**, **warn**, **dark**, **light**     | Determina o Tema |
| propTextColor              | String   | 'black'           | **white**, **black**, **dark** ou **light**        | Determina a cor do texto  |
| propBorderRadius           | String   | '0'               | Qualquer numero com **px** ou **%**      | Determina o Radius da borda |
| propPlaceholder            | String   | ''                | Qualquer coisa                           | Determina o texto para placeholder |
| propRequired               | Boolean  | false             | **true** ou **false**                    | Determina se o campo é obrigatorio |
| propReadonly               | Boolean  | false             | **true** ou **false**                    | Determina se o input é somente leitura (bloqueado) |
| propDisabled               | Boolean  | false             | **true** ou **false**                    | Determina se o input esta desabilitado (bloqueado) |
| propAutocomplete           | String   | 'off'             | **on** ou **off**                        | Determina se o input é autocomplete (Nao funciona perfeitamente para propType email) |
| propUppercase              | Boolean  | false             | **true** ou **false**                    | Determina se o input tem o texto em uppercase |
| propSize                   | String   | '100%'            | Qualquer valor seguido de **px** ou outra medida   | Determina a largura do input    |
| propValue                  | String   | ''                | Qualquer coisa                           | Determina o valor do BaseInput  |

_Emit_
| Nome Funcao               | Valor Evento              | O que fazer com isso?                                    |
|---------------------------|---------------------------|----------------------------------------------------------|
| current-value             | Valor atual do input      | Saber o valor atual do BaseInput    |

_Exemplo_
```html
<BaseInput
  :propType="text"
  :propActiveStyle="italic"
  :propSizeMediaQuery="sm"
  propBorderRadius="5px"
  :propShowEye="false"
  propTheme="dark"
  propTextColor="light"
  propPlaceholder="Alguma coisa"
  :propRequired="true"
  :propReadonly="true"
  :propDisabled="true"
  propAutocomplete="on"
  :propUppercase="true"
  propName="inputX"
  propId="nameInput"
  propSize="10px"
  propValue="10"
  @current-value="inputValue('baseinput2', $event)"
/>
```



### **BaseInputLine**

_Props_
| Nome                       | Tipo     | Default           | Valores Permitidos                       | Observacoes           |
|----------------------------|----------|-------------------|------------------------------------------|-----------------------|
| propType                   | String   | 'text'            | **text**, **number**, **email**, **password**   |                       |
| propName                   | String   | ''                | Qualquer coisa                           | Determina o nome para o input |
| propId                     | String   | ''                | Qualquer coisa                           | Determina o id para o input |
| propShowEye                | Boolean  | false             | **true** ou **false**                    | Determina se deve aparecer o olho se o propType password |
| propActiveStyle            | String   | 'normal'          | **normal**, **italic** e **oblique**     | Quando o input estiver ativado/focado o texto fica segundo as opcoes permitidas  |
| propSizeMediaQuery         | String   | 'xs'              | **xs**, **sm**, **md** e **lg**          | Determina o tamanho dos inputs conforme as opcoes permitidas  |
| propTheme                  | String   | 'normal'          | **normal**, **primary**, **success**, **info**, **danger**, **warn**, **dark**, **light**     | Determina o Tema |
| propTextColor              | String   | 'black'           | **white**, **black**, **dark** ou **light**        | Determina a cor do texto  |
| propBorderRadius           | String   | '0'               | Qualquer numero com **px** ou **%**      | Determina o Radius da borda |
| propPlaceholder            | String   | ''                | Qualquer coisa                           | Determina o texto para placeholder |
| propRequired               | Boolean  | false             | **true** ou **false**                    | Determina se o campo é obrigatorio |
| propReadonly               | Boolean  | false             | **true** ou **false**                    | Determina se o input é somente leitura (bloqueado) |
| propDisabled               | Boolean  | false             | **true** ou **false**                    | Determina se o input esta desabilitado (bloqueado) |
| propAutocomplete           | String   | 'off'             | **on** ou **off**                        | Determina se o input é autocomplete (Nao funciona perfeitamente para propType email) |
| propUppercase              | Boolean  | false             | **true** ou **false**                    | Determina se o input tem o texto em uppercase |
| propSize                   | String   | '100%'            | Qualquer valor seguido de **px** ou outra medida   | Determina a largura do input    |
| propValue                  | String   | ''                | Qualquer coisa                           | Determina o valor do BaseInput  |

_Emit_
| Nome Funcao               | Valor Evento              | O que fazer com isso?                                    |
|---------------------------|---------------------------|----------------------------------------------------------|
| current-value             | Valor atual do input      | Saber o valor atual do BaseInputLine    |

_Exemplo_
```html
<BaseInputLine
  :propType="text"
  :propActiveStyle="italic"
  :propSizeMediaQuery="sm"
  propBorderRadius="5px"
  :propShowEye="false"
  propTheme="dark"
  propTextColor="light"
  propPlaceholder="Alguma coisa"
  :propRequired="true"
  :propReadonly="true"
  :propDisabled="true"
  propAutocomplete="on"
  :propUppercase="true"
  propName="inputX"
  propId="nameInput"
  propSize="10px"
  propValue="10"
  @current-value="inputValue('baseinputline2', $event)"
/>
```



### **BaseInputBorder**

_Props_
| Nome                       | Tipo     | Default           | Valores Permitidos                       | Observacoes           |
|----------------------------|----------|-------------------|------------------------------------------|-----------------------|
| propType                   | String   | 'text'            | **text**, **number**, **email**, **password**   |                       |
| propName                   | String   | ''                | Qualquer coisa                           | Determina o nome para o input |
| propId                     | String   | ''                | Qualquer coisa                           | Determina o id para o input |
| propShowEye                | Boolean  | false             | **true** ou **false**                    | Determina se deve aparecer o olho se o propType password |
| propActiveStyle            | String   | 'normal'          | **normal**, **italic** e **oblique**     | Quando o input estiver ativado/focado o texto fica segundo as opcoes permitidas  |
| propSizeMediaQuery         | String   | 'xs'              | **xs**, **sm**, **md** e **lg**          | Determina o tamanho dos inputs conforme as opcoes permitidas  |
| propTheme                  | String   | 'normal'          | **normal**, **primary**, **success**, **info**, **danger**, **warn**, **dark**, **light**     | Determina o Tema |
| propTextColor              | String   | 'black'           | **white**, **black**, **dark** ou **light**        | Determina a cor do texto  |
| propBorderRadius           | String   | '0'               | Qualquer numero com **px** ou **%**      | Determina o Radius da borda |
| propPlaceholder            | String   | ''                | Qualquer coisa                           | Determina o texto para placeholder |
| propRequired               | Boolean  | false             | **true** ou **false**                    | Determina se o campo é obrigatorio |
| propReadonly               | Boolean  | false             | **true** ou **false**                    | Determina se o input é somente leitura (bloqueado) |
| propDisabled               | Boolean  | false             | **true** ou **false**                    | Determina se o input esta desabilitado (bloqueado) |
| propAutocomplete           | String   | 'off'             | **on** ou **off**                        | Determina se o input é autocomplete (Nao funciona perfeitamente para propType email) |
| propUppercase              | Boolean  | false             | **true** ou **false**                    | Determina se o input tem o texto em uppercase |
| propSize                   | String   | '100%'            | Qualquer valor seguido de **px** ou outra medida   | Determina a largura do input    |
| propValue                  | String   | ''                | Qualquer coisa                           | Determina o valor do BaseInput  |

_Emit_
| Nome Funcao               | Valor Evento              | O que fazer com isso?                                    |
|---------------------------|---------------------------|----------------------------------------------------------|
| current-value             | Valor atual do input      | Saber o valor atual do BaseInputLine    |

_Exemplo_
```html
<BaseInputBorder
  :propType="text"
  :propActiveStyle="italic"
  :propSizeMediaQuery="sm"
  propBorderRadius="5px"
  :propShowEye="false"
  propTheme="dark"
  propTextColor="light"
  propPlaceholder="Alguma coisa"
  :propRequired="true"
  :propReadonly="true"
  :propDisabled="true"
  propAutocomplete="on"
  :propUppercase="true"
  propName="inputX"
  propId="nameInput"
  propSize="10px"
  propValue="10"
  @current-value="inputValue('baseinputborder2', $event)"
/>
```



### **BaseTabs**

_Props_
| Nome                       | Tipo     | Default           | Valores Permitidos                       | Observacoes           |
|----------------------------|----------|-------------------|------------------------------------------|-----------------------|
| propItems                  | Array    | []                | Objetos com **title** e **text**         | Determina o texto do botao |
| propFadeIn                 | Boolean  | false             | **true** ou **false**                    | Determina se vai ter efeito de Fade In ao abrir os items |
| propWithSlot               | Boolean  | false             | **true** ou **false**                    | Determina se os conteudos vão ser personalizados, se definido, o **propItems** é anulado |
| propSlotTitles             | Array    | []                | Qualquer coisa                           | Determina os textos dos botoes (recebe um array de strings) |
| propId                     | String   | ''                | Qualquer coisa                           | Determina o id para o BaseTabs |
| propTabUppercase           | Boolean  | false             | **true** ou **false**                    | Determina se o texto das tabs vai ser uppercase |
| propTabItalic              | Boolean  | false             | **true** ou **false**                    | Determina se o texto das tabs vai ser italico |
| propTabBold                | Boolean  | false             | **true** ou **false**                    | Determina se o texto das tabs vai ser negrito |
| propTheme                  | String   | 'normal'          | **normal**, **primary**, **success**, **info**, **danger**, **warn**, **dark**, **light**      | Determina o Tema |
| propSizeMediaQuery         | String   | 'xs'              | **xs**, **sm**, **md** e **lg**          | Determina o tamanho dos inputs conforme as opcoes permitidas  |

_Exemplo de propItems_
> Se o array for vazio o componente nao aparece
```js
// Com todos os alertas
[
  {
    title: 'London',
    text: 'London is the capital city of England.'
  },
  {
    title: 'Paris',
    text: 'Paris is the capital of France.'
  },
  {
    title: 'Tokyo',
    text: 'Tokyo is the capital of Japan.'
  }
]
```

_Exemplo propItems_
```html
<BaseTabs
  propId="tabs1"
  propItems="arrayDeObjetos"
  :propFadeIn="true"
  :propTabUppercase="false"
  :propTabItalic="true"
  :propTabBold="false"
  propTheme="dark"
  propSizeMediaQuery="md"
/>
```
_Exemplo propWithSlot_
> Os slots recebem o indice do item de **propSlotTitles** ao qual pertencem como nome, se nao informado ou informado um indice que nao existe de titulo ele nao aparece
>
> O conteudo deve ser desenvolvido dentro de **template**
>
> Os **templates** podem receber tags html's
```html
<BaseTabs
  propId="tabs1"
  :propFadeIn="false"
  :propWithSlot="true"
  propSlotTitles="['Tab 1', 'Tab 2', 'Tab 3']"
  :propTabUppercase="false"
  :propTabItalic="true"
  :propTabBold="false"
  propTheme="dark"
  propSizeMediaQuery="md"
>
  <template v-slot:0>
    Conteudo do Tab 1
  </template>
  <template v-slot:1>
    Conteudo do Tab 2
  </template>
  <template v-slot:2>
    <h1>Conteudo do Tab 3</h1>
    <p>Conteudo qualquer</p>
  </template>
  <template v-slot:3>
    Este item nao aparece pois nao existe o TAB 4 em propSlotTitles
  </template>
</BaseTabs>
```




### **BaseZoom**

_Props_
| Nome                       | Tipo     | Default           | Valores Permitidos                       | Observacoes           |
|----------------------------|----------|-------------------|------------------------------------------|-----------------------|
| propId                     | String   | ''                | Qualquer coisa                           | Determina o id para o BaseZoom |
| propScale                  | String   | '1.5'             | **1.5**, **2**, **3**, **4** ou **5**    | Determina o tamanho do zoom  |
| propBackground             | Boolean  | false             | **true** ou **false**                    | Determina se vai ter background |
| propBackgroundColor        | String   | '#fff'            | Qualquer cor em HEX ou nome (Adiciona 1px de padding left e right) | Determina a cor do background  |
| propTextColor              | String   | '#000'            | Qualquer cor em HEX ou nome              | Determina a cor do texto para quando definir o background  |

```html
<BaseZoom propId="zoom1" propScale="2" :propBackground="true" propBackgroundColor="tomato">Conteudo que vai receber o zoom</BaseZoom>
```







### **BaseSwitch**

_Props_
| Nome                       | Tipo     | Default           | Valores Permitidos                       | Observacoes           |
|----------------------------|----------|-------------------|------------------------------------------|-----------------------|
| propId                     | String   | ''                | Qualquer coisa                           | Determina o id para o BaseSwitch |
| propTextEnable             | String   | ''                | Qualquer coisa                           | Determina o conteudo quando o BaseSwitch estiver habilitado  |
| propTextDisable            | String   | ''                | Qualquer coisa                           | Determina o conteudo quando o BaseSwitch estiver desabilitado  |
| propValue                  | String   | 'off'             | **on** ou **off**                        | Determina se o status inicial do BaseSwitch  |
| propDisabled               | Boolean  | false             | **true** ou **false**                    | Determina se o input esta desabilitado (bloqueado) |
| propTheme                  | String   | 'normal'          | **normal**, **primary**, **success**, **info**, **danger**, **warn**, **dark**, **light**      | Determina o Tema |
| propAnimantion             | Boolean  | false             | **true** ou **false**                    | Determina se o texto tem um efeito ao aparecer |
| propSizeMediaQuery         | String   | 'xs'              | **xs**, **sm**, **md** e **lg**          | Determina o tamanho dos inputs conforme as opcoes permitidas  |

_Emit_
| Nome Funcao               | Valor Evento              | O que fazer com isso?                                    |
|---------------------------|---------------------------|----------------------------------------------------------|
| current-value             | **true** para habilitado ou **false** para desabilitado   | Saber o valor atual do BaseSwitch    |

```html
<BaseSwitch
  propId="accordion1"
  propTextEnable="Sim"
  propTextDisable="Não"
  propValue="on"
  propTheme="dark"
  :propAnimantion="true"
  propSizeMediaQuery="md"
  :propDisabled="false"
  @current-value="switchValue('baseSwitchValue', $event)"
/>
```



### **BaseToggle**

_Props_
| Nome                       | Tipo     | Default           | Valores Permitidos                       | Observacoes           |
|----------------------------|----------|-------------------|------------------------------------------|-----------------------|
| propId                     | String   | ''                | Qualquer coisa                           | Determina o id para o BaseToggle |
| propValue                  | String   | 'off'             | **on** ou **off**                        | Determina se o status inicial do BaseToggle  |
| propDisabled               | Boolean  | false             | **true** ou **false**                    | Determina se o input esta desabilitado (bloqueado) |
| propTheme                  | String   | 'normal'          | **normal**, **primary**, **success**, **info**, **danger**, **warn**, **dark**, **light**      | Determina o Tema |
| propSizeMediaQuery         | String   | 'xs'              | **xs**, **sm**, **md** e **lg**          | Determina o tamanho dos inputs conforme as opcoes permitidas  |

_Emit_
| Nome Funcao               | Valor Evento              | O que fazer com isso?                                    |
|---------------------------|---------------------------|----------------------------------------------------------|
| current-value             | **true** para habilitado ou **false** para desabilitado   | Saber o valor atual do BaseToggle    |

```html
<BaseToggle
  propId="accordion1"
  propValue="on"
  propTheme="dark"
  propSizeMediaQuery="md"
  :propDisabled="false"
  @current-value="switchValue('baseSwitchValue', $event)"
/>
```




### **BaseTooltip**

_Props_
| Nome                       | Tipo     | Default           | Valores Permitidos                       | Observacoes           |
|----------------------------|----------|-------------------|------------------------------------------|-----------------------|
| propId                     | String   | ''                | Qualquer coisa                           | Determina o id para o BaseTooltip |
| propDirection              | String   | 'top'             | **top** ou **buttom**                    | Determina a direcao do conteudo |
| propMessage                | String   | ''                | Qualquer coisa                           | Determina a mensagem que vai aparecer no BaseTooltip |
| propTheme                  | String   | 'normal'          | **normal**, **primary**, **success**, **info**, **danger**, **warn**, **dark**, **light**      | Determina o Tema |

_Exemplo_
```html
<BaseTooltip
  propId="tooltip1"
  propDirection="buttom"
  propMessage="Alguma coisa"
  propTheme="dark"
>
  Conteudo que vai receber o tooltip
</BaseTooltip>
```




### **BaseRadio**

_Props_
| Nome                       | Tipo     | Default           | Valores Permitidos                       | Observacoes           |
|----------------------------|----------|-------------------|------------------------------------------|-----------------------|
| propId                     | String   | ''                | Qualquer coisa                           | Determina o id para o BaseRadio |
| propItems                  | Array    | []                | Array de Objetos com 3 keys obrigatorias (value e text)  | Determina os itens do radio |
| propGroupName              | String   | ''                | Qualquer coisa                           | Determina o nome do grupo de radios |
| propValue                  | String   | null              | Qualquer value já informado              | Determina o valor inicial do redio e se nao informado entao nao tem valor predefinido  |
| propDisplay                | String   | 'block'           | **block** ou **inline**                  | Determina se será um embaixo do outro ou em linha |
| propDirection              | String   | 'left'            | **left** ou **right**                    | Determina a direcao do radio em relacao ao texto |
| propTextColor              | String   | 'black'           | **white**, **black**, **dark** ou **light**        | Determina a cor do texto  |
| propTheme                  | String   | 'normal'          | **normal**, **primary**, **success**, **info**, **danger**, **warn**, **dark**, **light**      | Determina o Tema |
| propDisabled               | Boolean  | false             | **true** ou **false**                    | Determina se o radio vai estar desabilitado (bloqueado) |

_Exemplo de propItems_
> Caso um item não exista passar a propriedade com array vazio
```js
// Com todos os alertas
[
  {
    value: 'dog',
    name: 'Cachorro'
  },
  {
    value: 'cat',
    name: 'Gato'
  },
  {
    value: 'fish',
    name: 'Peixe'
  }
]
```

_Emit_
| Nome Funcao               | Valor Evento              | O que fazer com isso?                                    |
|---------------------------|---------------------------|----------------------------------------------------------|
| current-value             | **true** para habilitado ou **false** para desabilitado   | Saber o valor atual do BaseRadio    |


_Exemplo_
```html
<BaseRadio
  propId="radio"
  propItems="[ {value: 'dog', name: 'Cachorro'} ]"
  propGroupName="animais"
  propValue="dog"
  propDisplay="inline"
  propDirection="right"
  propTextColor="light"
  propTheme="success"
  :propDisabled="false"
  @current-value="radioValue('baseRadioValue', $event)"
/>
```




### **BaseFlipBox**

_Props_
| Nome                       | Tipo     | Default           | Valores Permitidos                       | Observacoes           |
|----------------------------|----------|-------------------|------------------------------------------|-----------------------|
| propId                     | String   | ''                | Qualquer coisa                           | Determina o id para o BaseFlipBox |
| propEfectDirection         | String   | 'horizontal'      | **horizontal** ou **vertical**           | Determina o tipo de efeito do BaseFlipBox |
| propThreeDimensionalEfect  | Boolean  | false             | **true** ou **false**                    | Determina se o BaseFlipBox tem um efeito 3D|
| propBorder                 | Boolean  | false             | **true** ou **false**                    | Determina se o BaseFlipBox tem uma borda de conteudo|
| propBorderTheme            | String   | 'normal'          | **normal**, **primary**, **success**, **info**, **danger**, **warn**, **dark**, **light**      | Determine o Tema da borda |
| propWidth                  | String   | '300px'           | Qualquer tamanho em px                   | Determina a largura do BaseFlipBox |
| propHeight                 | String   | '200px'           | Qualquer tamanho em px                   | Determina a altura do BaseFlipBox |
| propTheme                  | String   | 'normal'          | **normal**, **primary**, **success**, **info**, **danger**, **warn**, **dark**, **light**      | Determina o Tema |

_Slots_
| Nome                       | O que é                                                        |
|----------------------------|----------------------------------------------------------------|
| front                      | Aceita qualquer conteudo dentro e pode ser qualquer tag        |
| back                       | Aceita qualquer conteudo dentro e pode ser qualquer tag        |


_Exemplo_
```html
<BaseFlipBox
  propId="flipbox"
  propEfectDirection="vertical"
  :propThreeDimensionalEfect="false"
  :propBorder="true"
  propBorderTheme="success"
  propWidth="500"
  propHeight="25"
  propTheme="success"
>
<p slot="front">Conteudo front</p>
<p slot="back">Conteudo back</p>
</BaseFlipBox>
```




### **BaseHr**

_Props_
| Nome                       | Tipo     | Default           | Valores Permitidos                       | Observacoes           |
|----------------------------|----------|-------------------|------------------------------------------|-----------------------|
| propId                     | String   | ''                | Qualquer coisa                           | Determina o id para o BaseHr |
| propHeight                 | String   | '200px'           | Qualquer tamanho em px                   | Determina a altura do BaseHr |
| propBorderStyle            | String   | 'solid'           | **solid**, **dotted**, **dashed**, **double**, **groove**, **ridge**, **inset**, **outset**    | Determina o estilo da borda BaseHr |
| propTheme                  | String   | 'normal'          | **normal**, **primary**, **success**, **info**, **danger**, **warn**, **dark**, **light**      | Determina o Tema |

_Exemplo_
```html
<BaseHr
  propId="basehr1"
  propBorderStyle="dotted"
  propHeight="5px"
  propTheme="primary"
/>
```



### **BaseTextarea**

_Props_
| Nome                       | Tipo     | Default           | Valores Permitidos                       | Observacoes           |
|----------------------------|----------|-------------------|------------------------------------------|-----------------------|
| propName                   | String   | ''                | Qualquer coisa                           | Determina o nome para o textarea |
| propId                     | String   | ''                | Qualquer coisa                           | Determina o id para o textarea |
| propTheme                  | String   | 'normal'          | **normal**, **primary**, **success**, **info**, **danger**, **warn**, **dark**, **light**     | Determina o Tema |
| propPlaceholder            | String   | ''                | Qualquer coisa                           | Determina o texto para placeholder |
| propRequired               | Boolean  | false             | **true** ou **false**                    | Determina se o campo é obrigatorio |
| propReadonly               | Boolean  | false             | **true** ou **false**                    | Determina se o textarea é somente leitura (bloqueado) |
| propDisabled               | Boolean  | false             | **true** ou **false**                    | Determina se o textarea esta desabilitado (bloqueado) |
| propUppercase              | Boolean  | false             | **true** ou **false**                    | Determina se o textarea tem o texto em uppercase |
| propValue                  | String   | ''                | Qualquer coisa                           | Determina o valor do BaseTextarea  |
| propHasResize              | Boolean  | false             | **true** ou **false**                    | Determina se o textarea var ter efeito de redimensionar |
| propResizeType             | String   | 'vertical'        | **vertical**, **horizontal** ou **both** | Determina qual o tipo de redimensionamento quando definido o propHasResize como true  |
| propCols                   | Number   | '20'              | Qualquer numero                          | Determina o valor de cols (largura média dos caracteres do textarea) do BaseTextarea  |
| propRows                   | Number   | '2'               | Qualquer numero                          | Determina o valor de rows (linhas visiveis do textarea) do BaseTextarea  |

_Emit_
| Nome Funcao               | Valor Evento              | O que fazer com isso?                                    |
|---------------------------|---------------------------|----------------------------------------------------------|
| current-value             | Valor atual do input      | Saber o valor atual do BaseTextarea    |

_Exemplo_
```html
<BaseTextarea
  propTheme="dark"
  propPlaceholder="Alguma coisa"
  :propRequired="true"
  :propReadonly="true"
  :propDisabled="true"
  :propUppercase="true"
  propName="inputX"
  propId="nameInput"
  propValue="10"
  :propHasResize="true"
  propResizeType="horizontal"
  propCols="3"
  propRows="3"
  @current-value="inputValue('baseinput2', $event)"
/>
```



### **BaseEmphasi**

_Props_
| Nome                       | Tipo     | Default           | Valores Permitidos                       | Observacoes           |
|----------------------------|----------|-------------------|------------------------------------------|-----------------------|
| propId                     | String   | ''                | Qualquer coisa                           | Determina o id para o emphasi |
| propTheme                  | String   | 'normal'          | **normal**, **primary**, **success**, **info**, **danger**, **warn**, **dark**, **light**     | Determina o Tema |
| propUppercase              | Boolean  | false             | **true** ou **false**                    | Determina se o textarea tem o texto em uppercase |

_Exemplo_
```html
<BaseEmphasi
  propId="baseemphasi"
  propTheme="dark"
  :propUppercase="true"
>
  Mensagem
</BaseEmphasi>
```



### **BaseMark**

_Props_
| Nome                       | Tipo     | Default           | Valores Permitidos                       | Observacoes           |
|----------------------------|----------|-------------------|------------------------------------------|-----------------------|
| propId                     | String   | ''                | Qualquer coisa                           | Determina o id para o mark |
| propTheme                  | String   | 'normal'          | **normal**, **primary**, **success**, **info**, **danger**, **warn**, **dark**, **light**     | Determina o Tema |
| propUppercase              | Boolean  | false             | **true** ou **false**                    | Determina se o textarea tem o texto em uppercase |

_Exemplo_
```html
<BaseMark
  propId="basemark"
  propTheme="dark"
  :propUppercase="true"
>
  Mensagem
</BaseMark>
```



### **BaseLoader**

_Props_
| Nome                       | Tipo     | Default           | Valores Permitidos                       | Observacoes           |
|----------------------------|----------|-------------------|------------------------------------------|-----------------------|
| propId                     | String   | ''                | Qualquer coisa                           | Determina o id para o loader |
| propType                   | String   | 'bars'            | **bars**, **water-drop**, **coin**, **circle-lines**, **solar**, **dots**, **leds**, **snake**, **zoom-ball**, **train**, **ring**, **partial-ring**    | Determina o Tema |
| propTheme                  | String   | 'normal'          | **normal**, **primary**, **success**, **info**, **danger**, **warn**, **dark**, **light**     | Determina o Tema |
| propVisible                | Boolean  | false             | **true** ou **false**                    | Determina se o loader fica visivel |

_Exemplo_
```html
<BaseLoader
  propId="baseloader"
  propType="bars"
  propTheme="dark"
  :propVisible="true"
/>
```






### **BaseSnackbar**

_Props_
| Nome                       | Tipo     | Default           | Valores Permitidos                       | Observacoes           |
|----------------------------|----------|-------------------|------------------------------------------|-----------------------|
| propId                     | String   | ''                | Qualquer coisa                           | Determina o id para o sneckbar |
| propText                   | String   | ''                | Qualquer coisa                           | Determina o texto do conteudo do sneckbar |
| propBorderRadius           | String   | '0'               | Qualquer numero com **px** ou **%**      | Determina o Radius da borda |
| propTheme                  | String   | 'normal'          | **normal**, **primary**, **success**, **info**, **danger**, **warn**, **dark**, **light**     | Determina o Tema do sneckbar |
| propIsVisible              | Boolean  | false             | **true** ou **false**                    | Determina se sneckbar esta visivel |

_Emit_
| Nome Funcao               | Valor Evento              | O que fazer com isso?                                    |
|---------------------------|---------------------------|----------------------------------------------------------|
| remove-snackbar           | O id do snackbar que esta emitindo      | Saber quando e qual snackbar apagar        |


_Exemplo_
```html
<BaseCard
  propId="basesnackbar"
  propText="Texto do Sneckbar"
  propBorderRadius="5px"
  propTheme="light"
  :propIsVisible="false"
  @remove-snackbar="removeSnackbar($event)"
/>
```



### **BaseGoTopButton**
> Se nao informar propIdNameToGo ele nao aparece

_Props_
| Nome                       | Tipo     | Default           | Valores Permitidos                       | Observacoes           |
|----------------------------|----------|-------------------|------------------------------------------|-----------------------|
| propId                     | String   | ''                | Qualquer coisa                           | Determina o id para o GoTopButton |
| propText                   | String   | 'Go Top'          | Qualquer coisa                           | Determina o texto do GoTopButton |
| propIdNameToGo             | String   | ''                | Qualquer coisa                           | Determina o id para onde o GoTopButton deve subir |
| propShowInHeight           | Number   | 100               | Qualquer coisa                           | Determina a altura que o GoTopButton deve comecar aparecer |
| propPositionRight          | Number   | 30                | Qualquer coisa                           | Determina a posicao em relacao a direita do navegador |
| propPositionBottom         | Number   | 30                | Qualquer coisa                           | Determina a posicao em relacao a baixo do navegador |
| propContentType            | String   | 'text'            | **text** ou **icon**                     | Determina o se o tipo de conteudo vai ser um texto ou um icone, se for texto usar propText e se for icone usar o slot  |
| propBorderRadius           | String   | '0'               | Qualquer numero com **px** ou **%**      | Determina o Radius da borda |
| propTheme                  | String   | 'normal'          | **normal**, **primary**, **success**, **info**, **danger**, **warn**, **dark**, **light**     | Determina o Tema |

_Slots_
| Nome                       | O que é                                                        |
|----------------------------|----------------------------------------------------------------|
| gotopbuttonicon            | Aceita qualquer conteudo dentro e pode ser qualquer tag        |

_Exemplo sem slot_
```html
<BaseGoTopButton
  propId="basegotopbutton"
  propText="Subir"
  propIdNameToGo="header_id"
  :propShowInHeight="450"
  :propPositionRight="45"
  :propPositionBottom="45"
  propContentType="text"
  propBorderRadius="5%"
  propTheme="primary"
/>
```

_Exemplo com slot_
```html
<BaseGoTopButton
  propId="basegotopbutton"
  propText="Subir"
  propIdNameToGo="header_id"
  :propShowInHeight="450"
  :propPositionRight="45"
  :propPositionBottom="45"
  propContentType="icon"
  propBorderRadius="5px"
  propTheme="primary"
>
  <div slot="gotopbuttonicon">^</div>
</BaseGoTopButton>
```



### **BaseList**

_Props_
| Nome                       | Tipo     | Default           | Valores Permitidos                       | Observacoes           |
|----------------------------|----------|-------------------|------------------------------------------|-----------------------|
| propId                     | String   | ''                | Qualquer coisa                           | Determina o id para o BaseList |
| propItems                  | Array    | []                | Array de Strings                         | Determina os itens da lista |
| propHasStyle               | Boolean  | false             | **true** ou **false**                    | Determina se BaseList tem estilo |
| propStyle                  | String   | '-'               | Qualquer coisa                           | Determina o estilo se definido propHasStyle como true |
| propTextColor              | String   | 'black'           | **white**, **black**, **dark** ou **light** | Determina a cor do texto |
| propTheme                  | String   | 'normal'          | **normal**, **primary**, **success**, **info**, **danger**, **warn**, **dark**, **light**     | Determina o Tema |

_Exemplo de propItems_
```js
[
  'Item 1',
  'Item 2',
  'Item 3',
  'Item 4',
  'Item 5',
  'Item 6'
]
```

_Exemplo_
```html
<BaseList
  propId="baselist"
  :propItems="['Item 1', 'Item 2', 'Item 3', 'Item 4']"
  :propHasStyle="true"
  propStyle=">"
  propTheme="primary"
  propTextTheme="primary"
/>
```



### **BaseProgressBar**

_Props_
| Nome                       | Tipo     | Default           | Valores Permitidos                       | Observacoes           |
|----------------------------|----------|-------------------|------------------------------------------|-----------------------|
| propId                     | String   | ''                | Qualquer coisa                           | Determina o id para o BaseProgressBar |
| propCurrentValue           | Number   | 0                 | Qualquer valor                           | Determina o valor atual |
| propMaxValue               | Number   | 100               | Qualquer valor                           | Determina o valor maximo |
| propHeight                 | Number   | 10                | Qualquer numero de 10 até 20             | Determina a altura da BaseProgressBar |
| propHasMessage             | Boolean  | false             | **true** ou **false**                    | Determina se vai mostrar a mensagem de status no meio da BaseProgressBar |
| propMessageType            | String   | 'percent'         | **percent** ou **startEnd**              | Determina qual o tipo da mensagem BaseProgressBar |
| propTheme                  | String   | 'normal'          | **normal**, **primary**, **success**, **info**, **danger**, **warn**, **dark**, **light**     | Determina o Tema |

_Exemplo_
```html
<BaseProgressBar
  propId="baseprogressbar3"
  :propCurrentValue="20"
  :propMaxValue="150"
  :propHeight="20"
  :propHasMessage="true"
  propMessageType="startEnd"
  propTheme="primary"
/>
```



### **BaseImageComparison**

_Props_
| Nome                       | Tipo     | Default           | Valores Permitidos                       | Observacoes           |
|----------------------------|----------|-------------------|------------------------------------------|-----------------------|
| propId                     | String   | ''                | Qualquer coisa                           | Determina o id para o BaseImageComparison |
| propImageLeft              | String   | ''                | Url da imagem que vai ficar na esquerda  | Determina a imagem esquerda |
| propImageRight             | String   | ''                | Url da imagem que vai ficar na direita   | Determina a imagem direita |
| propWidth                  | Number   | 300               | Qualquer numero                          | Determina a largura do BaseImageComparison |
| propHeight                 | Number   | 200               | Qualquer numero                          | Determina a altura do BaseImageComparison |
| propTheme                  | String   | 'normal'          | **normal**, **primary**, **success**, **info**, **danger**, **warn**, **dark**, **light**     | Determina o Tema |

_Exemplo_
```html
<BaseImageComparison
  propId="baseimagecomparison"
  propImageLeft="https://dominio.com/img1.jpg"
  propImageRight="https://dominio.com/img2.jpg"
  :propWidth="300"
  :propHeight="200"
  propTheme="light"
/>
```



### **BaseNewContentServiceWorker**

_Props_
| Nome                       | Tipo     | Default           | Valores Permitidos                       | Observacoes           |
|----------------------------|----------|-------------------|------------------------------------------|-----------------------|
| propId                     | String   | ''                | Qualquer coisa                           | Determina o id para o BaseNewContentServiceWorker |
| propText                   | String   | 'New version available!' | Qualquer coisa  | Determina o texto |
| propButtonText             | String   | 'Click to update' | Qualquer coisa  | Determina o texto do botao |
| propHasNewContent          | Boolean  | false             | **true** ou **false**  | Determina se é para aparecer |
| propRegistrationServiceWorkerContent  | Function  | null  | Service Worker  | Determina o conteudo do service worker |

_Emit_
| Nome Funcao               | Valor Evento              | O que fazer com isso?                                    |
|---------------------------|---------------------------|----------------------------------------------------------|
| close-base-new-content-service-worker  | false        | Alterar o valor passado no propHasNewContent        |


_Exemplo_
```html
<BaseNewContentServiceWorker
  propId="basenewcontentalert"
  propText="Novo conteudo"
  propButtonText="Atualizar site"
  :propHasNewContent="true"
  :propRegistrationServiceWorkerContent="registration"
/>
```



### **BaseImage**
_Props_
| Nome                       | Tipo     | Default           | Valores Permitidos                       | Observacoes           |
|----------------------------|----------|-------------------|------------------------------------------|-----------------------|
| propId                     | String   | ''                | Qualquer coisa                           | Determina o id para o BaseImage |
| propSrc                    | String   | ''                | Url                                      | Determina a url da imagem |
| propDisplay                | String   | 'inlineBlock'     | **inlineBlock**, **inline** ou **block** | Determina o style display da imagem |
| propImageType              | String   | 'none'            | **none**, **rounded** ou **circle**      | Determina o tipo da imagem |
| propBorder                 | Number   | '0'               | Qualquer coisa                           | Determina a borda |
| propTheme                  | String   | 'normal'          | **normal**, **primary**, **success**, **info**, **danger**, **warn**, **dark**, **light**     | Determina o Tema |
| propSize                   | String   | '50x50'           | Qualquer tamanho com esta estrutura (larguraxaltura)   | Determina o tamanho |
| propSizeType               | String   | 'pixel'           | **pixel** ou **percent**                 | Determina o tipo do tamanho |
| propActionType             | String   | 'none'            | **none**, **link**, **routerLink** ou **func**       | Determina se tem acao de click |
| propActionLink             | String   | ''                | Link                                     | Determina a url para seguir quando clicar |
| propActionTarget           | String   | 'blank'           | **blank**, **self**, **parent** e **top**  | Determina o target da url |
| propRouterLinkTo           | String   | ''                | Aceita o padrao do **to** do **router-link** | Determina o **to** do **router-link** (**propActionType** igual **routerLink**) |

_Emit_
| Nome Funcao               | Valor Evento              | O que fazer com isso?                                    |
|---------------------------|---------------------------|----------------------------------------------------------|
| base-image-clicked        | { id: baseImagemId, status: true }         | Saber quando o botao foi clicado para ativar alguma funcao de callback        |


_Exemplo_
```html
<BaseImage
  propId="baseimage"
  propSrc="https://img.com.br/imagem1.png"
  propDisplay="inlineBlock"
  propImageType="rounded"
  :propBorder="5"
  propTheme="light"
  propSize="40x40"
  propSizeType="percent"
  propActionType="link"
  propActionTarget="blank"
/>
```





### **BaseImageZoom**
_Props_
| Nome                       | Tipo     | Default           | Valores Permitidos                       | Observacoes           |
|----------------------------|----------|-------------------|------------------------------------------|-----------------------|
| propId                     | String   | ''                | Qualquer coisa                           | Determina o id para o BaseImageZoom |
| propSrc                    | String   | ''                | Url                                      | Determina a url da imagem |
| propDisplay                | String   | 'inlineBlock'     | **inlineBlock** ou **block**             | Determina o style display da imagem |
| propImageType              | String   | 'none'            | **none** ou **rounded**                  | Determina o tipo da imagem |
| propLensBorder             | Number   | '1'               | Qualquer coisa                           | Determina a borda |
| propTheme                  | String   | 'normal'          | **normal**, **primary**, **success**, **info**, **danger**, **warn**, **dark**, **light**     | Determina o Tema |


_Exemplo_
```html
<BaseImageZoom
  propId="baseimage"
  propSrc="https://img.com.br/imagem1.png"
  propDisplay="inlineBlock"
  propImageType="rounded"
  :propLensBorder="5"
  propTheme="light"
/>
```





### **BaseNewsletterPopUp**
_Props_
| Nome                       | Tipo     | Default           | Valores Permitidos                       | Observacoes           |
|----------------------------|----------|-------------------|------------------------------------------|-----------------------|
| propId                     | String   | ''                | Qualquer coisa                           | Determina o id para o BaseNewsletterPopUp |
| propShow                   | Boolean  | false             | **true** ou **false**                    | Determina se é para aparecer o BaseNewsletterPopUp |
| propSrc                    | String   | ''                | Url                                      | Determina a url da imagem lateral |
| propTheme                  | String   | 'normal'          | **normal**, **primary**, **success**, **info**, **danger**, **warn**, **dark**, **light**     | Determina o Tema do overlay |
| propCloseButtonTheme       | String   | 'normal'          | **normal**, **primary**, **success**, **info**, **danger**, **warn**, **dark**, **light**     | Determina o Tema do botao de fechar, o X |
| propCanOverlayClose        | Boolean  | false             | **true** ou **false**                    | Determina se ao clicar no overlay ele deve fechar o modal tbm, simulando o comportamento do X |
| propBorderRadius           | String   | '0'               | Qualquer numero com **px** ou **%**      | Determina o Radius da borda do BaseNewsletterPopUp |
| propDontShowMoreIsVisible  | Boolean  | false             | **true** ou **false**                    | Determina se checkbox de nao mostrar mais deve aparecer  |
| propDontShowMoreText       | String   | 'Don`t show this popup again'  | Qualquer coisa              | Determina o texto do checkbox de nao mostrar mais  |
| propDontShowMoreTheme      | String   | 'normal'          | **normal**, **primary**, **success**, **info**, **danger**, **warn**, **dark**, **light**     | Determina o checkbox de nao mostrar mais |
| propInputNameFirstPlaceholder | String | First Name       | Qualquer coisa                           | Determina o Placeholder do Fist Name  |
| propInputNameLastPlaceholder  | String | Last Name        | Qualquer coisa                           | Determina o Placeholder do Last Name  |
| propInputEmailPlaceholder  | String   | Email             | Qualquer coisa                           | Determina o Placeholder do Email      |
| propInputActiveStyle       | String   | 'normal'          | **normal**, **italic** e **oblique**     | Quando o input estiver ativado/focado o texto fica segundo as opcoes permitidas  |
| propInputSizeMediaQuery    | String   | 'xs'              | **xs**, **sm**, **md** e **lg**          | Determina o tamanho dos inputs conforme as opcoes permitidas  |
| propInputTheme             | String   | 'normal'          | **normal**, **primary**, **success**, **info**, **danger**, **warn**, **dark**, **light**     | Determina o Tema dos inputs |
| propInputBorderRadius      | String   | '0'               | Qualquer numero com **px** ou **%**      | Determina o Radius da borda dos inputs |
| propInputUppercase         | Boolean  | false             | **true** ou **false**                    | Determina se os inputs tem o texto em uppercase |
| propInputNameFirstRequired | Boolean  | false             | **true** ou **false**                    | Determina se o campo nome é obrigatorio |
| propInputNameLastRequired  | Boolean  | false             | **true** ou **false**                    | Determina se o campo sobrenome é obrigatorio |
| propSubButtonBorderRadius  | String   | '0'               | Qualquer numero com **px** ou **%**      | Determina o Radius da borda do botao |
| propSubButtonText          | String   | 'SUBSCRIBE'       | Qualquer coisa                           | Determina o texto do botao |
| propSubButtonTheme         | String   | 'normal'          | **normal**, **primary**, **success**, **info**, **danger**, **warn**, **dark**, **light**     | Determina o Tema dos botao |
| propFetchUrl               | String   | ''                | Qualquer coisa                           | Determina o objeto de configuracao do metodo fetch, olhar [aqui](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch) caso nao saiba usar |
| propFetchConfig            | Object   | {}                | Objeto                                   | Determina o objeto de configuracao do metodo fetch, olhar [aqui](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch) caso nao saiba usar |
| propFetchStatusErrorCode   | Array    | [422]             | Array de Numeros                         | Determina os status que o fetch pode considerar como erro |
| propFetchStatusSuccessCode | Array    | [200]             | Array de Numeros                         | Determina os status que o fetch pode considerar como sucesso |
| propFetchErrorMsg          | String   | 'Error message default'   | Qualquer coisa                   | Determina o texto para quando da erro |
| propFetchSuccessMsg        | String   | 'Success message default' | Qualquer coisa                   | Determina o texto para quando da sucesso |

_Emit_
| Nome Funcao               | Valor Evento              | O que fazer com isso?                                    |
|---------------------------|---------------------------|----------------------------------------------------------|
| close-base-newsletter-popup| { dontShowMore: status }         | Saber se vai ter que ser tratado para nao aparecer mais, se o checkbox foi flegado        |


_Exemplo propFetchConfig_
Olhar [aqui](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch para mais detalhes

O body ja esta definido internamente, se precisar alterar, entrar e alterar.

```html
{
  method: 'POST',
  headers: {
   Accept: 'application/json',
   'Content-Type': 'application/json'
  }
}
```

_Exemplo_
```html
<BaseNewsletterPopUp
  propId="baseimage"
  :propShow="false"
  :propCanOverlayClose="true"
  propSrc="img.com.br/image.png"
  propTheme="light"
  propCloseButtonTheme="light"
  propBorderRadius="5px"
  :propDontShowMoreIsVisible="true"
  propDontShowMoreText="Não mostrar este PopUp novamente"
  propDontShowMoreTheme="light"
  propInputNameFirstPlaceholder="Nome"
  propInputNameLastPlaceholder="Sobrenome"
  propInputEmailPlaceholder="email"
  propInputActiveStyle="italic"
  propInputSizeMediaQuery="sm"
  propInputTheme="success"
  propInputBorderRadius="5px"
  :propInputUppercase="true"
  :propInputNameFirstRequired="true"
  :propInputNameLastRequired="true"
  propSubButtonBorderRadius="5px"
  propSubButtonText="Assinar"
  propSubButtonTheme="success"
  propFetchUrl="dominio.com/newsletter"
  :propFetchConfig="{}"
  :propFetchStatusErrorCode="[422]"
  :propFetchStatusSuccessCode="[201]"
  propFetchErrorMsg="Ocorreu um erro"
  propFetchSuccessMsg="Assinatura efetuada"
  close-base-newsletter-popup="fecharPopup($event)"
/>
```





### **BaseModal**
_Props_
| Nome                       | Tipo     | Default           | Valores Permitidos                       | Observacoes           |
|----------------------------|----------|-------------------|------------------------------------------|-----------------------|
| propId                     | String   | ''                | Qualquer coisa                           | Determina o id para o BaseModal |
| propShow                   | Boolean  | false             | **true** ou **false**                    | Determina se é para aparecer o BaseModal |
| propTheme                  | String   | 'normal'          | **normal**, **primary**, **success**, **info**, **danger**, **warn**, **dark**, **light**     | Determina o Tema do overlay |
| propCloseButtonTheme       | String   | 'normal'          | **normal**, **primary**, **success**, **info**, **danger**, **warn**, **dark**, **light**     | Determina o Tema do botao de fechar, o X |
| propCanOverlayClose        | Boolean  | false             | **true** ou **false**                    | Determina se ao clicar no overlay ele deve fechar o modal tbm, simulando o comportamento do X |
| propBorderRadius           | String   | '0'               | Qualquer numero com **px** ou **%**      | Determina o Radius da borda do BaseModal |

_Slots_
| Nome                       | O que é                                                        |
|----------------------------|----------------------------------------------------------------|
| header                     | Aceita qualquer conteudo dentro e pode ser qualquer tag        |
| content                    | Aceita qualquer conteudo dentro e pode ser qualquer tag        |
| footer                     | Aceita qualquer conteudo dentro e pode ser qualquer tag        |

_Emit_
| Nome Funcao               | Valor Evento              | O que fazer com isso?       |
|---------------------------|---------------------------|-----------------------------|
| close-base-modal| true                     | Fechar o modal              |


_Exemplo_
```html
<BaseModal
  propId="baseimage"
  :propShow="false"
  :propCanOverlayClose="true"
  propTheme="light"
  propCloseButtonTheme="light"
  propBorderRadius="5px"
  close-base-modal="fecharPopup($event)"
>
  <p slot="header">Titulo</p>

  <div slot="content">
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
    </ul>
  </div>

  <p slot="footer" style="padding: 10px">Rodapé</p>
</BaseModal>
```





### **BaseTable**

_Props_
| Nome                       | Tipo     | Default           | Valores Permitidos                       | Observacoes           |
|----------------------------|----------|-------------------|------------------------------------------|-----------------------|
| propId                     | String   | ''                | Qualquer coisa                           | Determina o id para o basetable |
| propCaption                | String   | ''                | Qualquer coisa                           | Determina a legenda (caption) da tabela |
| propCaptionDirection       | String   | 'left'            | **left**, **center** e **right**         | Determina a direção do caption |
| propCaptionPosition        | String   | 'top'             | **top** e **bottom**                     | Determina a posicao do caption |
| propBorder                 | String   | 'none'            | **none**, **title**, **title-table** e **all** | Determina onde vai ter borda e se vai ter borda |
| propTitleAlign             | String   | 'left'            | **left**, **center** e **right**         | Determina a direção dos titulos |
| propTitleTransform         | String   | 'none'            | **none**, **capitalize**, **uppercase** e **lowercase**    | Determina a transformaacao do titulo (text-transform) |
| propTitleStyle             | String   | 'normal'          | **normal**, **italic** e **oblique**     | Determina o style do titulo (font-style) |
| propTitleBold              | Boolean  | false             | **true** e **false**                     | Determina se titulo é bold (font-weight) |
| propTitleSortable          | Boolean  | false             | **true** e **false**                     | Determina se titulo é classificavel (sort) |
| propTitleSortableColor     | String   | '#000'            | Qualquer cor em HEX ou nome              | Determina a cor do texto para quando definir o background  |
| propFields                 | Array    | []                | Qualquer array de de array de strings ('field', 'traducao')    | Determina os titulos da tabela  |
| propFieldsAllowSort        | Array    | []                | Qualquer array de strings (strings contidas no propFields) | Determina qual dos propFields podem ser ordenados  |
| propSortType               | String   | 'asc'             | **asc** e **desc**                       | Determina o tipo da ordenacao inicial  |
| propSortField              | String   | ''                | Qualquer string (string contida no propFields) | Determina o field inicial que vai ter ordenacao  |
| propTableMarginTop         | Number   | 0                 | Qualquer numero                          | Determina a margin-top |
| propTableMarginBottom      | Number   | 0                 | Qualquer numero                          | Determina a margin-bottom |
| propTableMarginLeft        | Number   | 0                 | Qualquer numero                          | Determina a margin-left |
| propTableMarginRight       | Number   | 0                 | Qualquer numero                          | Determina a margin-right |
| propRecordsPerPage         | Array    | [5, 7, 10, 15, 20, 25, 50, 100]  | Array de numeros           | Determina as opções de itens por pagina |
| propRecordsTotal           | Number   | 0                 | Qualquer numero                          | Determina a quantidade total de itens no banco |
| propRecordCurrentPage      | Number   | 1                 | Qualquer numero                          | Determina a pagina atual |
| propRecordPages            | Number   | 1                 | Qualquer numero                          | Determina o total de paginas |
| propRecordPerPages         | Number   | 0                 | Qualquer numero                          | Determina a quantidade de itens por pagina |
| propLoading                | Boolean  | false             | **true** e **false**                     | Determina se o conteudo esta sendo carregado |
| propLoaderType             | String   | 'bars'            | **bars**, **water-drop**, **coin**, **circle-lines**, **solar**, **dots**, **leds**, **snake**, **zoom-ball**, **train**, **ring**, **partial-ring**    | Determina o tipo do loader |
| propTheme                  | String   | 'normal'          | **normal**, **primary**, **success**, **info**, **danger**, **warn**, **dark**, **light**     | Determina o Tema |
| propItems                  | Array    | []                | Array de Objetos                         | Determina os itens para aa tabela |
| propHasError               | Boolean  | false             | **true** e **false**                     | Determina se tem erro e se mostra propErrorMessage |
| propErrorMessage           | String   | 'No items found'  | Qualquer coisa                           | Determina uma mensagem para erro ao obter itens |


_Emit_
| Nome Funcao               | Valor Evento              | O que fazer com isso?       |
|---------------------------|---------------------------|-----------------------------|
| change-sort               | Objeto                    | Alterar o sortType e sortField. Refazer a pesquisa com estes novos valores |
| change-page               | Number                    | Alterar a pagina. Refazer a pesquisa com estes novos valores |
| change-perpage            | Number                    | Alterar a quantidade de itens por pagina. Refazer a pesquisa com estes novos valores |


_Exemplo do emit change-sort_
```js
{
  whatsChange: 'type ou typeField',
  value: {
    type: 'novo type',
    field: 'novo field'
  }
}
```

```js
// Codigo de exemplo
async mounted () {
  await this.getTableItens()
},
methods: {
  async changeSort (event) {
    const whatsChange = event.whatsChange
    const typeValue = event.value.type
    const fieldValue = event.value.field

    this.table.sortType = typeValue

    this.table.sortField = fieldValue
    this.table.sort = tableChangeSort(whatsChange, typeValue, fieldValue)

    await this.getTableItens()
  },
  async changePage (event) {
    this.table.page = event

    await this.getTableItens()
  },
  changePerPage (event) {
    this.table.metadata.perPages = parseInt(event, 10)
    this.changePage(1)
  },
  async getTableItens () {
    this.table.loading = true
    this.table.hasError = false

    const result = await teste(this.table.page, this.table.metadata.perPages, 'id,email,name,user,status,created_at,updated_at', this.table.sort, 'all')
    const keysValues = [
      ['status', 'name']
    ]

    if (result.status === 'success') {
      this.table.items = tableFormatResult(result.data.results, keysValues, this.table.fields)
      this.table.metadata = tableChangeInfos(result.data.metadata.resultset)
      this.table.page = 1
      this.table.loading = false
      this.table.hasError = false
    } else {
      this.table.items = []
      this.table.page = 1
      this.table.loading = false
      this.table.hasError = true
    }
  },
  tableItemClicled (event) {
    console.log('item clicado --> ', event)
  }
}
```

_Exemplo do emit change-page_
```js
// Codigo de exemplo
changePage (event) {
  this.page = event
}
```

_Exemplo do emit change-perpage_
```js
// Codigo de exemplo
changePerPage (event) {
  this.perPages = parseInt(event, 10)
  this.page = 1
}
```

_Exemplo_
```html
<BaseTable
  propId="basetable"
  propCaption="Legenda"
  propCaptionDirection="center"
  propCaptionPosition="bottom"
  propBorder="title"
  propTitleAlign="center"
  propTitleTransform="capitalize"
  propTitleStyle="italic"
  :propTitleBold="true"
  :propTitleSortable="true"
  propTitleSortableColor="tomato"
  :propFields="[
    ['name', 'nome'],
    ['email', 'email'],
    ['age', 'idade'],
    ['address', 'endereço'],
    ['game', 'game favorito'],
    ['car', 'carro']
  ]"
  :propFieldsAllowSort="['name', 'age']"
  propSortType="ASC"
  propSortField="name"
  :propTableMarginTop="10"
  :propTableMarginBottom="10"
  :propTableMarginLeft="5"
  :propTableMarginRight="5"
  :propRecordsPerPage="[5, 7, 10, 15, 20, 25, 50, 100]"
  :propRecordsTotal="210"
  :propRecordCurrentPage="2"
  :propRecordPages="6"
  :propRecordPerPages="5"
  :propRecordTotalSeparator="de"
  :propLoading="true"
  :propLoaderType="dots"
  propTheme="primary"
  :propItems="array"
  :propHasError="false"
  :propErrorMessage="Nenhum item encontrado"
/>
```


<template>
  <div :id="propId" class="base-select custom-select custom-select-bg-primary">
    <select class="base-select__select select-bg-primary">
      <option v-for="(option, index) in propOptions" :key="index" :value="option" :selected="option.value === propSelectedItem">{{ option.text }}</option>
    </select>
  </div>
</template>


### **BaseSelect**
_Props_
| Nome                       | Tipo     | Default           | Valores Permitidos                       | Observacoes           |
|----------------------------|----------|-------------------|------------------------------------------|-----------------------|
| propId                     | String   | ''                | Qualquer coisa                           | Determina o id para o BaseModal |
| propOptions                | Array    | []                | Array de Objetos com as keys { value: '', text: '' } | Determina os itens para o select |
| propSelectedItem           | String   | ''                | Um valor existente em algum propOptions.value  | Determina o item já selecionado |
| propTheme                  | String   | 'normal'          | **normal**, **primary**, **success**, **info**, **danger**, **warn**, **dark**, **light**     | Determina o Tema do select |
| propDisabled               | Boolean  | false             | **true** ou **false**                    | Determina se o select esta desabilitado (bloqueado) |
| propWidth                  | Number   | 250               | Qualquer numero maior que 120            | Determina a largura do select |


_Emit_
| Nome Funcao               | Valor Evento              | O que fazer com isso?       |
|---------------------------|---------------------------|-----------------------------|
| change-selected           | Valor (value) do obj selecionado | Altera o valor da propSelectedItem |


_Exemplo_
```html
<BaseSelect
  propId="baseselect"
  propOptions="[]"
  propSelectedItem="1"
  propTheme="primary"
  :propDisabled="false"
  :propWidth="250"
  change-selected="updateSelectedValue($event)"
/>
```


### **BaseValidPassword**
_Props_
| Nome                       | Tipo     | Default           | Valores Permitidos                       | Observacoes           |
|----------------------------|----------|-------------------|------------------------------------------|-----------------------|
| propId                     | String   | ''                | Qualquer coisa                           | Determina o id para o BaseValidPassword |
| propValue                  | String   | ''                | Qualquer coisa                           | Determina o valor para ser validado |
| propLabel                  | String   | ''                | Qualquer coisa                           | Determina o texto da label, se nao defino nao aparece |
| propDescriptions           | Array    | []                | Array de 5 Strings                       | Determina as descrições das validações |
| propDisplay                | String   | 'inlineBlock'     | **inlineBlock**, **inline** ou **block** | Determina o style display do validador |
| propMargin                 | String   | '0'               | Qualquer valor de margim                 | Determina a margem do validador |
| propTitleColor             | String   | '#000'            | Qualquer cor em HEX ou nome              | Determina a cor dos simbolos |
| propValidStatusColor       | String   | '#72f258'         | Qualquer cor em HEX ou nome              | Determina a cor do Status valido |

_Emit_
| Nome Funcao               | Valor Evento              | O que fazer com isso?       |
|---------------------------|---------------------------|-----------------------------|
| valid-password            | Se esta valido            | Saber se o valor passa é valido |


_Exemplo_
```html
<BaseValidPassword
  propId="base-valid-password"
  :propValue="senha"
  :propLabel="$t('components.BaseValidPassword.label')"
  :propDescriptions="validationText"
  propDisplay="block"
  propMargin="50px 0"
  @valid-password="isValid"
/>
```

_Exemplo validationText_
```js
data () {
  return {
    validationText: [
      this.$t('components.BaseValidPassword.rules.minUppercase'),
      this.$t('components.BaseValidPassword.rules.minLowercase'),
      this.$t('components.BaseValidPassword.rules.minNumber'),
      this.$t('components.BaseValidPassword.rules.minCharacters'),
      this.$t('components.BaseValidPassword.rules.specialCharacter')
    ]
  }
}
```

_Exemplo emit_
```js
methods: {
  isValid (value) {
    console.log('recebido -> ', value)
  }
}
```







































# TESTE
```
<template>
  <div class="row">
    <!--<div class="col-md-6 col-md-offset-3 color2" style="">-->
    device: <input v-model="resolucao" type="number" min="0" max="3"> size: <input v-model="grid" type="number" min="0" max="12"> {{ `col-${device}-${grid}` }}<br>
    <div :class="[`col-${device}-${grid}`]" class="color2" style="height: 6000px">
      <h1>Home Page View</h1>
      <br>
      <br>
      <br>
      <br>
    </div>
  </div>
</template>

<script>
// import { datetimeHowMuchTime } from '@helpers/datetime.js'
// const BaseSelect = () => import('@components/fragments/BaseSelect')

export default {
  name: 'HomePage',
  metaInfo () {
    return {
      title: this.$t('pages.website.homePage.html.title'),
      link: [
        { rel: 'canonical', href: `${process.env.VUE_APP_BASE}/` }
      ]
    }
  },
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {
    // console.log(datetimeHowMuchTime('2021-01-19T12:00:00.000Z'))
  },
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {},
  data () {
    return {
      resolucao: '0',
      grid: '12'
    }
  },
  components: {
    // BaseSelect
  },
  computed: {
    device () {
      switch (this.resolucao) {
        case '3':
          return 'lg'
        case '2':
          return 'md'
        case '1':
          return 'sm'
        default:
          return 'xs'
      }
    }
  },
  methods: {},
  filters: {},
  watch: {}
}
</script>

<style scoped lang="scss">
/*
*, p {
  color: white;
}
*/
.cards {
  background-color: blue;
  .base-card {
    width: 250px;
    position: relative;
    &:not(:first-child) {
      margin-left: 10px;
    }
  }
}
</style>
```
