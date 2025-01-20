<template>
  <div class="row" style="background: #121212;">
    <div class="col-md-10 col-md-offset-1">
      <div class="components">
        <h1>Components</h1>
        <h2>Página de exemplo dos componentes</h2>
        <p>Olhar o arquivo components.md para saber como usar cada componente</p>

        <ul>
          <li><a @click.prevent="mostra('VlalgAlerts')">VlalgAlerts</a></li>
          <li><a @click.prevent="mostra('VlalgInput')">VlalgInput</a></li>
          <li><a @click.prevent="mostra('VlalgInputLine')">VlalgInputLine</a></li>
          <li><a @click.prevent="mostra('VlalgInputBorder')">VlalgInputBorder</a></li>
          <li><a @click.prevent="mostra('VlalgTabs')">VlalgTabs</a></li>
          <li><a @click.prevent="mostra('VlalgZoom')">VlalgZoom</a></li>
          <li><a @click.prevent="mostra('VlalgSwitch')">VlalgSwitch</a></li>
          <li><a @click.prevent="mostra('VlalgTooltip')">VlalgTooltip</a></li>
          <li><a @click.prevent="mostra('VlalgRadio')">VlalgRadio</a></li>
          <li><a @click.prevent="mostra('VlalgFlipBox')">VlalgFlipBox</a></li>
          <li><a @click.prevent="mostra('VlalgHr')">VlalgHr</a></li>
          <li><a @click.prevent="mostra('VlalgTextarea')">VlalgTextarea</a></li>
          <li><a @click.prevent="mostra('VlalgEmphasi')">VlalgEmphasi</a></li>
          <li><a @click.prevent="mostra('VlalgMark')">VlalgMark</a></li>
          <li><a @click.prevent="mostra('VlalgLoader')">VlalgLoader</a></li>
          <li><a @click.prevent="mostra('VlalgSnackbar')">VlalgSnackbar</a></li>
          <li><a @click.prevent="mostra('VlalgGoTopButton')">VlalgGoTopButton</a></li>
          <li><a @click.prevent="mostra('VlalgList')">VlalgList</a></li>
          <li><a @click.prevent="mostra('VlalgProgressBar')">VlalgProgressBar</a></li>
          <li><a @click.prevent="mostra('VlalgImageComparison')">VlalgImageComparison</a></li>
          <li><a @click.prevent="mostra('VlalgImage')">VlalgImage</a></li>
          <li><a @click.prevent="mostra('VlalgImageZoom')">VlalgImageZoom</a></li>
          <li><a @click.prevent="mostra('VlalgNewsletterPopUp')">VlalgNewsletterPopUp</a></li>
          <li><a @click.prevent="mostra('VlalgToggle')">VlalgToggle</a></li>
          <li><a @click.prevent="mostra('VlalgModal')">BasaModal</a></li>
          <li><a @click.prevent="mostra('VlalgTable')">BasaTable</a></li>
          <li><a @click.prevent="mostra('VlalgSelect')">VlalgSelect</a></li>
        </ul>

        <div v-if="currentComponent === 'VlalgAlerts'" class="new-component">
          <h2 class="new-component__title">VlalgAlert</h2>
          <button @click="simularAlertas">Simular alertas</button> <button @click="limparAlertas">Simular limpeza store de aletas</button><br>
          <VlalgAlerts :propData="dataTestVlalgAlert" propBtnCloseIcon="X" propErroIcon="Erros" propSuccessIcon="Successo" propWarnIcon="Atencao" propInfoIcon="Informacoes" @alert-is-close="changeHasAlert('alertFalse', $event)"/>
        </div>

        <div v-else-if="currentComponent === 'VlalgInput'" class="new-component">
          <h2 class="new-component__title">VlalgInput</h2>

          <VlalgInput propId="baseinput1" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="normal" propPlaceholder="tema normal" :propRequired="true" :propReadonly="false" :propDisabled="false" propAutocomplete="off" :propUppercase="true" />
          <br>
          <VlalgInput propId="baseinput2" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="normal" propPlaceholder="tema normal (bloqueado)" :propRequired="true" :propReadonly="false" :propDisabled="true" propAutocomplete="off" :propUppercase="true" />
          <br>
          <VlalgInput propId="baseinput3" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="primary" propPlaceholder="tema primary" :propRequired="true" :propReadonly="false" :propDisabled="false" propAutocomplete="off" />
          <br>
          <VlalgInput propId="baseinput4" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="primary" propPlaceholder="tema primary (bloqueado)" :propRequired="true" :propReadonly="false" :propDisabled="true" propAutocomplete="off" />
          <br>
          <VlalgInput propId="baseinput5" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="success" propPlaceholder="tema primary" :propRequired="true" :propReadonly="false" :propDisabled="false" propAutocomplete="off" />
          <br>
          <VlalgInput propId="baseinput6" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="success" propPlaceholder="tema success (bloqueado)" :propRequired="true" :propReadonly="false" :propDisabled="true" propAutocomplete="off" />
          <br>
          <VlalgInput propId="baseinput7" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="info" propPlaceholder="tema info" :propRequired="true" :propReadonly="false" :propDisabled="false" propAutocomplete="off" />
          <br>
          <VlalgInput propId="baseinput8" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="info" propPlaceholder="tema info (bloqueado)" :propRequired="true" :propReadonly="false" :propDisabled="true" propAutocomplete="off" />
          <br>
          <VlalgInput propId="baseinput9" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="warn" propPlaceholder="tema warn" :propRequired="true" :propReadonly="false" :propDisabled="false" propAutocomplete="off" />
          <br>
          <VlalgInput propId="baseinput10" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="warn" propPlaceholder="tema warn (bloqueado)" :propRequired="true" :propReadonly="false" :propDisabled="true" propAutocomplete="off" />
          <br>
          <VlalgInput propId="baseinput11" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="danger" propPlaceholder="tema danger" :propRequired="true" :propReadonly="false" :propDisabled="false" propAutocomplete="off" />
          <br>
          <VlalgInput propId="baseinput12" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="danger" propPlaceholder="tema danger (bloqueado)" :propRequired="true" :propReadonly="false" :propDisabled="true" propAutocomplete="off" />
          <br>
          <VlalgInput propId="baseinput13" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="dark" propPlaceholder="tema dark" :propRequired="true" :propReadonly="false" :propDisabled="false" propAutocomplete="off" />
          <br>
          <VlalgInput propId="baseinput14" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="dark" propPlaceholder="tema dark (bloqueado)" :propRequired="true" :propReadonly="false" :propDisabled="true" propAutocomplete="off" />
          <br>
          <VlalgInput propId="baseinput15" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="light" propPlaceholder="tema light" :propRequired="true" :propReadonly="false" :propDisabled="false" propAutocomplete="off" />
          <br>
          <VlalgInput propId="baseinput16" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="light" propPlaceholder="tema light (bloqueado)" :propRequired="true" :propReadonly="false" :propDisabled="true" propAutocomplete="off" />
          <br>
          <VlalgInput propId="baseinput17" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="light" propPlaceholder="xs" :propRequired="true" :propReadonly="false" :propDisabled="false" propAutocomplete="off" />
          <br>
          <VlalgInput propId="baseinput18" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="sm" propTheme="light" propPlaceholder="sm" :propRequired="true" :propReadonly="false" :propDisabled="false" propAutocomplete="off" />
          <br>
          <VlalgInput propId="baseinput19" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="md" propTheme="light" propPlaceholder="md" :propRequired="true" :propReadonly="false" :propDisabled="false" propAutocomplete="off" />
          <br>
          <VlalgInput propId="baseinput20" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="lg" propTheme="light" propPlaceholder="lg" :propRequired="true" :propReadonly="false" :propDisabled="false" propAutocomplete="off" />
          <br>
          <VlalgInput propId="baseinput21" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="lg" propTheme="light" propPlaceholder="lg com radius de 20px" :propRequired="true" :propReadonly="false" :propDisabled="false" propAutocomplete="off" propBorderRadius="20px" />
          <br>
          <VlalgInput propId="baseinput22" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="normal" propPlaceholder="tema normal" :propRequired="true" :propReadonly="false" :propDisabled="false" propAutocomplete="off" :propUppercase="true" :propValue="baseInputValorAtual" @current-value="inputValue('baseinput22', $event)" /> {{ baseInputValorAtual }}
        </div>

        <div v-else-if="currentComponent === 'VlalgInputLine'" class="new-component">
          <h2 class="new-component__title">VlalgInputLine</h2>
          <VlalgInputLine propId="baseinputline1" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="normal" propPlaceholder="tema normal" :propRequired="true" :propReadonly="false" :propDisabled="false" propAutocomplete="off" :propUppercase="true" />
          <br>
          <VlalgInputLine propId="baseinputline2" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="normal" propPlaceholder="tema normal (bloqueado)" :propRequired="true" :propReadonly="false" :propDisabled="true" propAutocomplete="off" :propUppercase="true" />
          <br>
          <VlalgInputLine propId="baseinputline3" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="primary" propPlaceholder="tema primary" :propRequired="true" :propReadonly="false" :propDisabled="false" propAutocomplete="off" />
          <br>
          <VlalgInputLine propId="baseinputline4" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="primary" propPlaceholder="tema primary (bloqueado)" :propRequired="true" :propReadonly="false" :propDisabled="true" propAutocomplete="off" />
          <br>
          <VlalgInputLine propId="baseinputline5" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="success" propPlaceholder="tema primary" :propRequired="true" :propReadonly="false" :propDisabled="false" propAutocomplete="off" />
          <br>
          <VlalgInputLine propId="baseinputline6" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="success" propPlaceholder="tema success (bloqueado)" :propRequired="true" :propReadonly="false" :propDisabled="true" propAutocomplete="off" />
          <br>
          <VlalgInputLine propId="baseinputline7" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="info" propPlaceholder="tema info" :propRequired="true" :propReadonly="false" :propDisabled="false" propAutocomplete="off" />
          <br>
          <VlalgInputLine propId="baseinputline8" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="info" propPlaceholder="tema info (bloqueado)" :propRequired="true" :propReadonly="false" :propDisabled="true" propAutocomplete="off" />
          <br>
          <VlalgInputLine propId="baseinputline9" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="warn" propPlaceholder="tema warn" :propRequired="true" :propReadonly="false" :propDisabled="false" propAutocomplete="off" />
          <br>
          <VlalgInputLine propId="baseinputline10" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="warn" propPlaceholder="tema warn (bloqueado)" :propRequired="true" :propReadonly="false" :propDisabled="true" propAutocomplete="off" />
          <br>
          <VlalgInputLine propId="baseinputline11" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="danger" propPlaceholder="tema danger" :propRequired="true" :propReadonly="false" :propDisabled="false" propAutocomplete="off" />
          <br>
          <VlalgInputLine propId="baseinputline12" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="danger" propPlaceholder="tema danger (bloqueado)" :propRequired="true" :propReadonly="false" :propDisabled="true" propAutocomplete="off" />
          <br>
          <VlalgInputLine propId="baseinputline13" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="dark" propPlaceholder="tema dark" :propRequired="true" :propReadonly="false" :propDisabled="false" propAutocomplete="off" />
          <br>
          <VlalgInputLine propId="baseinputline14" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="dark" propPlaceholder="tema dark (bloqueado)" :propRequired="true" :propReadonly="false" :propDisabled="true" propAutocomplete="off" />
          <br>
          <VlalgInputLine propId="baseinputline15" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="light" propPlaceholder="tema light" :propRequired="true" :propReadonly="false" :propDisabled="false" propAutocomplete="off" />
          <br>
          <VlalgInputLine propId="baseinputline16" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="light" propPlaceholder="tema light (bloqueado)" :propRequired="true" :propReadonly="false" :propDisabled="true" propAutocomplete="off" />
          <br>
          <VlalgInputLine propId="baseinputline17" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="light" propPlaceholder="xs" :propRequired="true" :propReadonly="false" :propDisabled="false" propAutocomplete="off" />
          <br>
          <VlalgInputLine propId="baseinputline18" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="sm" propTheme="light" propPlaceholder="sm" :propRequired="true" :propReadonly="false" :propDisabled="false" propAutocomplete="off" />
          <br>
          <VlalgInputLine propId="baseinputline19" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="md" propTheme="light" propPlaceholder="md" :propRequired="true" :propReadonly="false" :propDisabled="false" propAutocomplete="off" />
          <br>
          <VlalgInputLine propId="baseinputline20" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="lg" propTheme="light" propPlaceholder="lg" :propRequired="true" :propReadonly="false" :propDisabled="false" propAutocomplete="off" />
          <br>
          <VlalgInputLine propId="baseinputline21" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="light" propPlaceholder="lg" :propRequired="true" :propReadonly="false" :propDisabled="false" propAutocomplete="off" :propValue="baseInputLineValorAtual" @current-value="inputValue('baseinputline21', $event)" /> {{ baseInputLineValorAtual }}
        </div>

        <div v-else-if="currentComponent === 'VlalgInputBorder'" class="new-component">
          <h2 class="new-component__title">VlalgInputBorder</h2>
          <VlalgInputBorder propId="baseinputborder1" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="normal" propPlaceholder="tema normal" :propRequired="true" :propReadonly="false" :propDisabled="false" propAutocomplete="off" :propUppercase="true" />
          <br>
          <VlalgInputBorder propId="baseinputborder2" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="normal" propPlaceholder="tema normal (bloqueado)" :propRequired="true" :propReadonly="false" :propDisabled="true" propAutocomplete="off" :propUppercase="true" />
          <br>
          <VlalgInputBorder propId="baseinputborder3" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="primary" propPlaceholder="tema primary" :propRequired="true" :propReadonly="false" :propDisabled="false" propAutocomplete="off" />
          <br>
          <VlalgInputBorder propId="baseinputborder4" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="primary" propPlaceholder="tema primary (bloqueado)" :propRequired="true" :propReadonly="false" :propDisabled="true" propAutocomplete="off" />
          <br>
          <VlalgInputBorder propId="baseinputborder5" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="success" propPlaceholder="tema primary" :propRequired="true" :propReadonly="false" :propDisabled="false" propAutocomplete="off" />
          <br>
          <VlalgInputBorder propId="baseinputborder6" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="success" propPlaceholder="tema success (bloqueado)" :propRequired="true" :propReadonly="false" :propDisabled="true" propAutocomplete="off" />
          <br>
          <VlalgInputBorder propId="baseinputborder7" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="info" propPlaceholder="tema info" :propRequired="true" :propReadonly="false" :propDisabled="false" propAutocomplete="off" />
          <br>
          <VlalgInputBorder propId="baseinputborder8" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="info" propPlaceholder="tema info (bloqueado)" :propRequired="true" :propReadonly="false" :propDisabled="true" propAutocomplete="off" />
          <br>
          <VlalgInputBorder propId="baseinputborder9" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="warn" propPlaceholder="tema warn" :propRequired="true" :propReadonly="false" :propDisabled="false" propAutocomplete="off" />
          <br>
          <VlalgInputBorder propId="baseinputborder10" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="warn" propPlaceholder="tema warn (bloqueado)" :propRequired="true" :propReadonly="false" :propDisabled="true" propAutocomplete="off" />
          <br>
          <VlalgInputBorder propId="baseinputborder11" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="danger" propPlaceholder="tema danger" :propRequired="true" :propReadonly="false" :propDisabled="false" propAutocomplete="off" />
          <br>
          <VlalgInputBorder propId="baseinputborder12" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="danger" propPlaceholder="tema danger (bloqueado)" :propRequired="true" :propReadonly="false" :propDisabled="true" propAutocomplete="off" />
          <br>
          <VlalgInputBorder propId="baseinputborder13" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="dark" propPlaceholder="tema dark" :propRequired="true" :propReadonly="false" :propDisabled="false" propAutocomplete="off" />
          <br>
          <VlalgInputBorder propId="baseinputborder14" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="dark" propPlaceholder="tema dark (bloqueado)" :propRequired="true" :propReadonly="false" :propDisabled="true" propAutocomplete="off" />
          <br>
          <VlalgInputBorder propId="baseinputborder15" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="light" propPlaceholder="tema light" :propRequired="true" :propReadonly="false" :propDisabled="false" propAutocomplete="off" />
          <br>
          <VlalgInputBorder propId="baseinputborder16" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="light" propPlaceholder="tema light (bloqueado)" :propRequired="true" :propReadonly="false" :propDisabled="true" propAutocomplete="off" />
          <br>
          <VlalgInputBorder propId="baseinputborder17" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="light" propPlaceholder="xs" :propRequired="true" :propReadonly="false" :propDisabled="false" propAutocomplete="off" />
          <br>
          <VlalgInputBorder propId="baseinputborder18" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="sm" propTheme="light" propPlaceholder="sm" :propRequired="true" :propReadonly="false" :propDisabled="false" propAutocomplete="off" />
          <br>
          <VlalgInputBorder propId="baseinputborder19" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="md" propTheme="light" propPlaceholder="md" :propRequired="true" :propReadonly="false" :propDisabled="false" propAutocomplete="off" />
          <br>
          <VlalgInputBorder propId="baseinputborder20" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="lg" propTheme="light" propPlaceholder="lg" :propRequired="true" :propReadonly="false" :propDisabled="false" propAutocomplete="off" />
          <br>
          <VlalgInputBorder propId="baseinputborder21" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="lg" propTheme="light" propPlaceholder="lg" :propRequired="true" :propReadonly="false" :propDisabled="false" propAutocomplete="off" propBorderRadius="5px" />
          <br>
          <VlalgInputBorder propId="baseinputborder22" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="light" propPlaceholder="xs" :propRequired="true" :propReadonly="false" :propDisabled="false" propAutocomplete="off" propBorderRadius="5px" />
          <br>
          <VlalgInputBorder propId="baseinputborder23" propName="algo" propType="text" propActiveStyle="italic" propSizeMediaQuery="xs" propTheme="light" propPlaceholder="xs" :propRequired="true" :propReadonly="false" :propDisabled="false" propAutocomplete="off" propBorderRadius="5px" :propValue="baseInputBorderValorAtual" @current-value="inputValue('baseinputborder23', $event)" /> {{ baseInputBorderValorAtual }}
        </div>

        <div v-else-if="currentComponent === 'VlalgTabs'" class="new-component">
          <h2 class="new-component__title">VlalgTabs</h2>
          <p>Aqui tem um sem conteudo, nao aparece</p>
          <VlalgTabs propId="basetabs1" :propItems="[]"/>
          <p>Com propTabUppercase</p>
          <VlalgTabs propId="basetabs2" :propItems="tabsTest" :propTabUppercase="true" :propTabItalic="false" :propTabBold="false" />

          <p>- Com propTabItalic</p>
          <VlalgTabs propId="basetabs2" :propItems="tabsTest" :propTabUppercase="false" :propTabItalic="true" :propTabBold="false"/>

          <p>- Com propTabBold</p>
          <VlalgTabs propId="basetabs3" :propItems="tabsTest" :propTabUppercase="false" :propTabItalic="false" :propTabBold="true"/>

          <p>- Com propTabUppercase, propTabItalic e propTabBold</p>
          <VlalgTabs propId="basetabs4" :propItems="tabsTest" :propTabUppercase="true" :propTabItalic="true" :propTabBold="true"/>

          <p>- Com propItems</p>
          <VlalgTabs propId="basetabs5" :propItems="tabsTest" />

          <p>- Com propWithSlot e propSlotTitles</p>
          <VlalgTabs propId="basetabs6" :propWithdata-slot="true" :propSlotTitles="['London', 'paris', 'tokyo']">
            <template v-slot:0>
              sadasdasdsa
            </template>
            <template v-slot:1>
              asdaaaaa
            </template>
            <template v-slot:2>
              <h1>Terceiro</h1>
              <p>Paragrafo 1</p>
            </template>
            <template v-slot:3>
              qwoeqiwoeqwoeqiw
            </template>
          </VlalgTabs>

          <p>- Com propFadeIn</p>
          <VlalgTabs propId="basetabs7" :propItems="tabsTest" :propFadeIn="true"/>

          <p>- Com propTheme</p>
          <VlalgTabs propId="basetabs7" :propItems="tabsTest" :propFadeIn="true"/>
          <VlalgTabs propId="basetabs7" :propItems="tabsTest" :propFadeIn="true" propTheme="normal"/>
          <VlalgTabs propId="basetabs7" :propItems="tabsTest" :propFadeIn="true" propTheme="primary"/>
          <VlalgTabs propId="basetabs7" :propItems="tabsTest" :propFadeIn="true" propTheme="success"/>
          <VlalgTabs propId="basetabs7" :propItems="tabsTest" :propFadeIn="true" propTheme="info"/>
          <VlalgTabs propId="basetabs7" :propItems="tabsTest" :propFadeIn="true" propTheme="warn"/>
          <VlalgTabs propId="basetabs7" :propItems="tabsTest" :propFadeIn="true" propTheme="danger"/>
          <VlalgTabs propId="basetabs7" :propItems="tabsTest" :propFadeIn="true" propTheme="dark"/>
          <VlalgTabs propId="basetabs7" :propItems="tabsTest" :propFadeIn="true" propTheme="light"/>

          <p>- Com propSizeMediaQuery</p>
          <VlalgTabs propId="basetabs7" :propItems="tabsTest" :propFadeIn="true" propTheme="primary" />
          <VlalgTabs propId="basetabs7" :propItems="tabsTest" :propFadeIn="true" propTheme="primary" propSizeMediaQuery="xs"/>
          <VlalgTabs propId="basetabs7" :propItems="tabsTest" :propFadeIn="true" propTheme="primary" propSizeMediaQuery="sm"/>
          <VlalgTabs propId="basetabs7" :propItems="tabsTest" :propFadeIn="true" propTheme="primary" propSizeMediaQuery="md"/>
          <VlalgTabs propId="basetabs7" :propItems="tabsTest" :propFadeIn="true" propTheme="primary" propSizeMediaQuery="lg"/>
        </div>

        <div v-else-if="currentComponent === 'VlalgZoom'" class="new-component">
          <h2 class="new-component__title">VlalgZoom</h2>
          <p>Teste com o zoom padrao de 1.5. <VlalgZoom propId="basezoom1">Mouse aqui</VlalgZoom> e <VlalgZoom propId="basezoom2">Mouse aqui</VlalgZoom></p>
          <br>
          <p>Teste com o zoom padrao de 2. <VlalgZoom propId="basezoom3" propScale="2">Mouse aqui</VlalgZoom> e <VlalgZoom propId="basezoom4" propScale="2">Mouse aqui</VlalgZoom></p>
          <br>
          <p>Teste com o zoom padrao de 2. <VlalgZoom propId="basezoom5" propScale="3">Mouse aqui</VlalgZoom> e <VlalgZoom propId="basezoom6" propScale="3">Mouse aqui</VlalgZoom></p>
          <br>
          <p>Teste com o zoom padrao de 2. <VlalgZoom propId="basezoom7" propScale="4">Mouse aqui</VlalgZoom> e <VlalgZoom propId="basezoom8" propScale="4">Mouse aqui</VlalgZoom></p>
          <br>
          <p>Teste com o zoom padrao de 2. <VlalgZoom propId="basezoom9" propScale="5">Mouse aqui</VlalgZoom> e <VlalgZoom propId="basezoom10" propScale="5">Mouse aqui</VlalgZoom></p>
          <br>
          <p>Teste com o zoom padrao de 2. e background-color padrao <VlalgZoom propId="basezoom9" propScale="5" :propBackground="true">Banana</VlalgZoom> e <VlalgZoom propId="basezoom10" propScale="5" :propBackground="true">macaco</VlalgZoom></p>
          <br>
          <p>Teste com o zoom padrao de 2. e background-color personalizado <VlalgZoom propId="basezoom9" propScale="5" :propBackground="true" propBackgroundColor="orange">Banana</VlalgZoom> e <VlalgZoom propId="basezoom10" propScale="5" :propBackground="true" propBackgroundColor="tomato">macaco</VlalgZoom></p>
          <br>
          <p>Teste com o zoom padrao de 2. e background-color personalizado <VlalgZoom propId="basezoom9" propScale="5" :propBackground="true" propBackgroundColor="orange" propTextColor="blue">Banana</VlalgZoom> e <VlalgZoom propId="basezoom10" propScale="5" :propBackground="true" propBackgroundColor="tomato" propTextColor="green">macaco</VlalgZoom></p>
        </div>

        <div v-else-if="currentComponent === 'VlalgAccordion'" class="new-component">
          <h2 class="new-component__title">VlalgAccordion</h2>
          <VlalgAccordion propId="baseaccordion1" :propItems="[]"/>
          <p>Com propTabUppercase</p>
          <VlalgAccordion propId="baseaccordion2" :propItems="tabsAccordion" :propTabUppercase="true" :propTabItalic="false" :propTabBold="false" /><br>

          <p>- Com propTabItalic</p>
          <VlalgAccordion propId="baseaccordion2" :propItems="tabsAccordion" :propTabUppercase="false" :propTabItalic="true" :propTabBold="false"/><br>

          <p>- Com propTabBold</p>
          <VlalgAccordion propId="baseaccordion3" :propItems="tabsAccordion" :propTabUppercase="false" :propTabItalic="false" :propTabBold="true"/><br>

          <p>- Com propTabUppercase, propTabItalic e propTabBold</p>
          <VlalgAccordion propId="baseaccordion4" :propItems="tabsAccordion" :propTabUppercase="true" :propTabItalic="true" :propTabBold="true"/><br>

          <p>- Com propItems</p>
          <VlalgAccordion propId="baseaccordion5" :propItems="tabsAccordion" /><br>

          <p>- Com propWithSlot e propSlotTitles</p>
          <VlalgAccordion propId="baseaccordion6" :propWithdata-slot="true" :propSlotTitles="['London', 'paris', 'tokyo']">
            <template v-slot:0>
              sadasdasdsa
            </template>
            <template v-slot:1>
              asdaaaaa
            </template>
            <template v-slot:2>
              <h1>Terceiro</h1>
              <h6>Paragrafo 1</h6>
            </template>
            <template v-slot:3>
              qwoeqiwoeqwoeqiw
            </template>
          </VlalgAccordion><br>

          <p>- Com propTheme</p>
          <VlalgAccordion propId="baseaccordion7" :propItems="tabsAccordion" /><br>
          <VlalgAccordion propId="baseaccordion7" :propItems="tabsAccordion" propTheme="normal"/><br>
          <VlalgAccordion propId="baseaccordion7" :propItems="tabsAccordion" propTheme="primary"/><br>
          <VlalgAccordion propId="baseaccordion7" :propItems="tabsAccordion" propTheme="success"/><br>
          <VlalgAccordion propId="baseaccordion7" :propItems="tabsAccordion" propTheme="info"/><br>
          <VlalgAccordion propId="baseaccordion7" :propItems="tabsAccordion" propTheme="warn"/><br>
          <VlalgAccordion propId="baseaccordion7" :propItems="tabsAccordion" propTheme="danger"/><br>
          <VlalgAccordion propId="baseaccordion7" :propItems="tabsAccordion" propTheme="dark"/><br>
          <VlalgAccordion propId="baseaccordion7" :propItems="tabsAccordion" propTheme="light"/><br>

          <p>- Com propSizeMediaQuery</p>
          <VlalgAccordion propId="baseaccordion7" :propItems="tabsAccordion" propTheme="primary" /><br>
          <VlalgAccordion propId="baseaccordion7" :propItems="tabsAccordion" propTheme="primary" propSizeMediaQuery="xs"/><br>
          <VlalgAccordion propId="baseaccordion7" :propItems="tabsAccordion" propTheme="primary" propSizeMediaQuery="sm"/><br>
          <VlalgAccordion propId="baseaccordion7" :propItems="tabsAccordion" propTheme="primary" propSizeMediaQuery="md"/><br>
          <VlalgAccordion propId="baseaccordion7" :propItems="tabsAccordion" propTheme="primary" propSizeMediaQuery="lg"/>
        </div>

        <div v-else-if="currentComponent === 'VlalgSwitch'" class="new-component">
          <h2 class="new-component__title">VlalgSwitch</h2>
          <p>- Com propId apenas<br>Valor atual: {{switch1}}</p>
          <VlalgSwitch propId="switch1" @current-value="switchValue('switch1', $event)" />
          <br>
          <p>- Com propTextEnable<br>Valor atual: {{switch3}}</p>
          <VlalgSwitch propId="switch3" propLabel="Maior de idade" propTextEnable="Ene" @current-value="switchValue('switch3', $event)" />
          <br>
          <p>- Com propTextDisable<br>Valor atual: {{switch4}}</p>
          <VlalgSwitch propId="switch4" propLabel="Maior de idade" propTextDisable="Dis" @current-value="switchValue('switch4', $event)" />
          <br>
          <p>- Com propTextEnable e propTextDisable<br>Valor atual: {{switch5}}</p>
          <VlalgSwitch propId="switch5" propLabel="Maior de idade" propTextEnable="Ene" propTextDisable="Dis" @current-value="switchValue('switch5', $event)" />
          <br>
          <p>- Com propValue true<br>Valor atual: {{switch6}}</p>
          <VlalgSwitch propId="switch6" propLabel="Maior de idade" :propValue="true" @current-value="switchValue('switch6', $event)" />
          <br>
          <p>- Com propValue false (default)<br>Valor atual: {{switch7}}</p>
          <VlalgSwitch propId="switch7" propLabel="Maior de idade" :propValue="false" @current-value="switchValue('switch7', $event)" />
          <br>
          <p>- Com propAnimantion<br>Valor atual: {{switch8}}</p>
          <VlalgSwitch propId="switch8" propLabel="Maior de idade" :propValue="false" @current-value="switchValue('switch8', $event)" :propAnimantion="true"/>
          <br>
          <p>- Com propTheme</p>
          <VlalgSwitch propId="switch9" propLabel="Maior de idade" :propValue="false" @current-value="switchValue('switch9', $event)" :propAnimantion="true" propTheme="normal"/>{{switch9}}<br>
          <VlalgSwitch propId="switch10" propLabel="Maior de idade" :propValue="false" @current-value="switchValue('switch10', $event)" :propAnimantion="true" propTheme="primary"/>{{switch10}}<br>
          <VlalgSwitch propId="switch11" propLabel="Maior de idade" :propValue="false" @current-value="switchValue('switch11', $event)" :propAnimantion="true" propTheme="success"/>{{switch11}}<br>
          <VlalgSwitch propId="switch12" propLabel="Maior de idade" :propValue="false" @current-value="switchValue('switch12', $event)" :propAnimantion="true" propTheme="info"/>{{switch12}}<br>
          <VlalgSwitch propId="switch13" propLabel="Maior de idade" :propValue="false" @current-value="switchValue('switch13', $event)" :propAnimantion="true" propTheme="warn"/>{{switch13}}<br>
          <VlalgSwitch propId="switch14" propLabel="Maior de idade" :propValue="false" @current-value="switchValue('switch14', $event)" :propAnimantion="true" propTheme="danger"/>{{switch14}}<br>
          <VlalgSwitch propId="switch15" propLabel="Maior de idade" :propValue="false" @current-value="switchValue('switch15', $event)" :propAnimantion="true" propTheme="dark"/>{{switch15}}<br>
          <VlalgSwitch propId="switch16" propLabel="Maior de idade" :propValue="false" @current-value="switchValue('switch16', $event)" :propAnimantion="true" propTheme="light"/>{{switch16}}
          <br>
          <p>- Com propDisabled</p>
          <VlalgSwitch propId="switch17" propLabel="Maior de idade" :propValue="true" @current-value="switchValue('switch17', $event)" :propAnimantion="true" propTheme="normal" :propDisabled="true" />{{switch17}}<br>
          <VlalgSwitch propId="switch18" propLabel="Maior de idade" :propValue="false" @current-value="switchValue('switch18', $event)" :propAnimantion="true" propTheme="primary" :propDisabled="true"/>{{switch18}}<br>
          <VlalgSwitch propId="switch19" propLabel="Maior de idade" :propValue="false" @current-value="switchValue('switch19', $event)" :propAnimantion="true" propTheme="success" :propDisabled="true"/>{{switch19}}<br>
          <VlalgSwitch propId="switch20" propLabel="Maior de idade" :propValue="false" @current-value="switchValue('switch20', $event)" :propAnimantion="true" propTheme="info" :propDisabled="true"/>{{switch20}}<br>
          <VlalgSwitch propId="switch21" propLabel="Maior de idade" :propValue="false" @current-value="switchValue('switch21', $event)" :propAnimantion="true" propTheme="warn" :propDisabled="true"/>{{switch21}}<br>
          <VlalgSwitch propId="switch22" propLabel="Maior de idade" :propValue="false" @current-value="switchValue('switch22', $event)" :propAnimantion="true" propTheme="danger" :propDisabled="true"/>{{switch22}}<br>
          <VlalgSwitch propId="switch23" propLabel="Maior de idade" :propValue="false" @current-value="switchValue('switch23', $event)" :propAnimantion="true" propTheme="dark" :propDisabled="true"/>{{switch23}}<br>
          <VlalgSwitch propId="switch24" propLabel="Maior de idade" :propValue="false" @current-value="switchValue('switch24', $event)" :propAnimantion="true" propTheme="light" :propDisabled="true"/>{{switch24}}
          <br>
          <p>- Com propSizeMediaQuery</p>
          <VlalgSwitch propId="switch25" propLabel="Maior de idade" :propValue="true" @current-value="switchValue('switch25', $event)" :propAnimantion="true" propTheme="normal" :propDisabled="false" propSizeMediaQuery="xs" />{{switch25}}<br>
          <VlalgSwitch propId="switch26" propLabel="Maior de idade" :propValue="false" @current-value="switchValue('switch26', $event)" :propAnimantion="true" propTheme="primary" :propDisabled="false" propSizeMediaQuery="sm"/>{{switch26}}<br>
          <VlalgSwitch propId="switch27" propLabel="Maior de idade" :propValue="false" @current-value="switchValue('switch27', $event)" :propAnimantion="true" propTheme="success" :propDisabled="false" propSizeMediaQuery="md"/>{{switch27}}<br>
          <VlalgSwitch propId="switch28" propLabel="Maior de idade" :propValue="false" @current-value="switchValue('switch28', $event)" :propAnimantion="true" propTheme="info" :propDisabled="false" propSizeMediaQuery="lg"/>{{switch28}}<br>
        </div>

        <div v-else-if="currentComponent === 'VlalgToggle'" class="new-component">
          <h2 class="new-component__title">VlalgToggle</h2>
          <VlalgToggle propId="basetoggle1" :propValue="valueToggle" @current-value="toggleValue('toggle', $event)" />
          <br><br>
          <p>com propDisabled (true)</p>
          <VlalgToggle propId="basetoggle2" propTheme="normal" :propValue="valueToggle" :propDisabled="true" @current-value="toggleValue('toggle', $event)" /><br>
          <VlalgToggle propId="basetoggle3" propTheme="primary" :propValue="valueToggle" :propDisabled="true" @current-value="toggleValue('toggle', $event)" /><br>
          <VlalgToggle propId="basetoggle4" propTheme="success" :propValue="valueToggle" :propDisabled="true" @current-value="toggleValue('toggle', $event)" /><br>
          <VlalgToggle propId="basetoggle5" propTheme="info" :propValue="valueToggle" :propDisabled="true" @current-value="toggleValue('toggle', $event)" /><br>
          <VlalgToggle propId="basetoggle6" propTheme="warn" :propValue="valueToggle" :propDisabled="true" @current-value="toggleValue('toggle', $event)" /><br>
          <VlalgToggle propId="basetoggle7" propTheme="danger" :propValue="valueToggle" :propDisabled="true" @current-value="toggleValue('toggle', $event)" /><br>
          <VlalgToggle propId="basetoggle8" propTheme="dark" :propValue="valueToggle" :propDisabled="true" @current-value="toggleValue('toggle', $event)" /><br>
          <VlalgToggle propId="basetoggle9" propTheme="light" :propValue="valueToggle" :propDisabled="true" @current-value="toggleValue('toggle', $event)" /><br><br>
          <p>com Theme</p>
          <VlalgToggle propId="basetoggle10" propTheme="normal" :propValue="valueToggle" :propDisabled="true" /> <VlalgToggle propId="basetoggle1" propTheme="normal" :propValue="valueToggle" :propDisabled="false" @current-value="toggleValue('toggle', $event)" /><br>
          <VlalgToggle propId="basetoggle11" propTheme="primary" :propValue="valueToggle" :propDisabled="true" /> <VlalgToggle propId="basetoggle1" propTheme="primary" :propValue="valueToggle" :propDisabled="false" @current-value="toggleValue('toggle', $event)" /><br>
          <VlalgToggle propId="basetoggle12" propTheme="success" :propValue="valueToggle" :propDisabled="true" /> <VlalgToggle propId="basetoggle1" propTheme="success" :propValue="valueToggle" :propDisabled="false" @current-value="toggleValue('toggle', $event)" /><br>
          <VlalgToggle propId="basetoggle13" propTheme="info" :propValue="valueToggle" :propDisabled="true" /> <VlalgToggle propId="basetoggle1" propTheme="info" :propValue="valueToggle" :propDisabled="false" @current-value="toggleValue('toggle', $event)" /><br>
          <VlalgToggle propId="basetoggle14" propTheme="warn" :propValue="valueToggle" :propDisabled="true" /> <VlalgToggle propId="basetoggle1" propTheme="warn" :propValue="valueToggle" :propDisabled="false" @current-value="toggleValue('toggle', $event)" /><br>
          <VlalgToggle propId="basetoggle15" propTheme="danger" :propValue="valueToggle" :propDisabled="true" /> <VlalgToggle propId="basetoggle1" propTheme="danger" :propValue="valueToggle" :propDisabled="false" @current-value="toggleValue('toggle', $event)" /><br>
          <VlalgToggle propId="basetoggle16" propTheme="dark" :propValue="valueToggle" :propDisabled="true" /> <VlalgToggle propId="basetoggle1" propTheme="dark" :propValue="valueToggle" :propDisabled="false" @current-value="toggleValue('toggle', $event)" /><br>
          <VlalgToggle propId="basetoggle17" propTheme="light" :propValue="valueToggle" :propDisabled="true" /> <VlalgToggle propId="basetoggle1" propTheme="light" :propValue="valueToggle" :propDisabled="false" @current-value="toggleValue('tootle', $event)" /><br><br>

          <p>com propSizeMediaQuery(xs)</p>
          <VlalgToggle propId="basetoggle18" propTheme="light" :propValue="valueToggle" :propDisabled="false" propSizeMediaQuery="xs" @current-value="toggleValue('toggle', $event)" /><br><br>

          <p>com propSizeMediaQuery(sm)</p>
          <VlalgToggle propId="basetoggle19" propTheme="light" :propValue="valueToggle" :propDisabled="false" propSizeMediaQuery="sm" @current-value="toggleValue('toggle', $event)" /><br><br>

          <p>com propSizeMediaQuery(md)</p>
          <VlalgToggle propId="basetoggle20" propTheme="light" :propValue="valueToggle" :propDisabled="false" propSizeMediaQuery="md" @current-value="toggleValue('toggle', $event)" /><br><br>

          <p>com propSizeMediaQuery(lg)</p>
          <VlalgToggle propId="basetoggle21" propTheme="light" :propValue="valueToggle" :propDisabled="false" propSizeMediaQuery="lg" @current-value="toggleValue('toggle', $event)" /><br><br>
        </div>

        <div v-else-if="currentComponent === 'VlalgTooltip'" class="new-component">
          <h2 class="new-component__title">VlalgTooltip</h2>
          <p>Alguma coisa <VlalgTooltip propId="basetooltip1" propDirection="top" :propMessage="msgTooltipXs">top</VlalgTooltip>, <VlalgTooltip propId="basetooltip2" propDirection="bottom" :propMessage="msgTooltipSm">bottom</VlalgTooltip>, <VlalgTooltip propId="basetooltip3" propDirection="top" :propMessage="msgTooltipMd">top</VlalgTooltip> e <VlalgTooltip propId="basetooltip4" propDirection="bottom" :propMessage="msgTooltipLg">bottom</VlalgTooltip> asdas sad asdas dasdasdas asda sdasda dasdas dasdsa adsd asdas asdsa asdasdasdas dasd adasd adas asd asdasdasdajhsdasj <VlalgTooltip propId="basetooltip5" propDirection="bottom" :propMessage="msgTooltipLg">bottom</VlalgTooltip> dhkslhdalksh lkashdkasjdklas dlkasjd lkdjaskldjaslkdj asfjd ks fldasjkfjh kjdfhk jfkjdfhkjdas hkljshf ksljhfjsh kjshf</p>

          <p><VlalgTooltip propId="basetooltip6" propDirection="top" propMessage="Alguma coisa" propTheme="normal">Passe o mouse normal</VlalgTooltip></p>
          <p><VlalgTooltip propId="basetooltip7" propDirection="top" propMessage="Alguma coisa" propTheme="primary">Passe o mouse primary</VlalgTooltip></p>
          <p><VlalgTooltip propId="basetooltip8" propDirection="top" propMessage="Alguma coisa" propTheme="success">Passe o mouse success</VlalgTooltip></p>
          <p><VlalgTooltip propId="basetooltip9" propDirection="top" propMessage="Alguma coisa" propTheme="info">Passe o mouse info</VlalgTooltip></p>
          <p><VlalgTooltip propId="basetooltip10" propDirection="top" propMessage="Alguma coisa" propTheme="warn">Passe o mouse warn</VlalgTooltip></p>
          <p><VlalgTooltip propId="basetooltip11" propDirection="top" propMessage="Alguma coisa" propTheme="danger">Passe o mouse danger</VlalgTooltip></p>
          <p> ad   asd as a <VlalgTooltip propId="basetooltip12" propDirection="bottom" propMessage="Alguma coisa" propTheme="dark">Passe o mouse dark</VlalgTooltip> asdasda</p>
          <p>asdas asdas sad <VlalgTooltip propId="basetooltip13" propDirection="top" propMessage="Alguma coisa" propTheme="light">Passe o mouse light</VlalgTooltip> asdas  sada</p>
        </div>

        <div v-else-if="currentComponent === 'VlalgRadio'" class="new-component">
          <h2 class="new-component__title">VlalgRadio</h2>
          <p>- Com propValue</p>
          <br>Valor atual: {{ baseRadio1ValorAtual }}<br>
          <VlalgRadio propId="radio1" :propItems="radio1" propGroupName="Animal1" propValue="Dog" @current-value="radioValue('baseradio1', $event)" />
          <br>
          <p>- Com propValue</p>
          Valor atual: {{ baseRadio2ValorAtual }}<br>
          <VlalgRadio propId="radio2" :propItems="radio2" propGroupName="Animal2" propValue="fish" @current-value="radioValue('baseradio2', $event)"/>
          <br>
          <p>- Com propValue com valor errado</p>
          Valor atual: {{ baseRadio3ValorAtual }}<br>
          <VlalgRadio propId="radio3" :propItems="radio2" propGroupName="Animal3" propValue="algumacoisa" @current-value="radioValue('baseradio3', $event)"/>
          <br><br>
          <p>- Com propDisplay default (block)</p>
          Valor atual: {{ baseRadio4ValorAtual }}<br>
          <VlalgRadio propId="radio4" :propItems="radio1" propGroupName="Animal4" propValue="" @current-value="radioValue('baseradio4', $event)"/>
          <br><br>
          <p>- Com propDisplay (inline)</p>
          Valor atual: {{ baseRadio5ValorAtual }}<br>
          <VlalgRadio propId="radio5" :propItems="radio1" propGroupName="Animal5" propValue="" propDisplay="inline" @current-value="radioValue('baseradio5', $event)"/>
          <br><br>
          <p>- Com propDisplay (block) e propDirection right</p>
          Valor atual: {{ baseRadio6ValorAtual }}<br>
          <VlalgRadio propId="radio6" :propItems="radio1" propGroupName="Animal6" propValue="" propDisplay="block" propDirection="right" @current-value="radioValue('baseradio6', $event)"/>
          <br><br>
          <p>- Com propDisplay (inline) e propDirection right</p>
          Valor atual: {{ baseRadio7ValorAtual }}<br>
          <VlalgRadio propId="radio7" :propItems="radio1" propGroupName="Animal7" propValue="" propDisplay="inline" propDirection="right" @current-value="radioValue('baseradio7', $event)"/>
          <br><br>
          <p>- Com propTheme</p>
          Valor atual: {{ baseRadio8ValorAtual }}<br>
          <VlalgRadio propId="radio8" :propItems="radio1" propGroupName="Animal8" propValue="dog" propDisplay="inline" propDirection="right" propTheme="normal" propTextColor="light" @current-value="radioValue('baseradio8', $event)"/><br>
          <VlalgRadio propId="radio9" :propItems="radio1" propGroupName="Animal9" propValue="cat" propDisplay="inline" propDirection="right" propTheme="primary" propTextColor="light" @current-value="radioValue('baseradio8', $event)"/><br>
          <VlalgRadio propId="radio10" :propItems="radio1" propGroupName="Animal10" propValue="fish" propDisplay="inline" propDirection="right" propTheme="success" propTextColor="light" @current-value="radioValue('baseradio8', $event)"/><br>
          <VlalgRadio propId="radio11" :propItems="radio1" propGroupName="Animal11" propValue="fish" propDisplay="inline" propDirection="right" propTheme="info" propTextColor="light" @current-value="radioValue('baseradio8', $event)"/><br>
          <VlalgRadio propId="radio12" :propItems="radio1" propGroupName="Animal12" propValue="cat" propDisplay="inline" propDirection="right" propTheme="danger" propTextColor="light" @current-value="radioValue('baseradio8', $event)"/><br>
          <VlalgRadio propId="radio13" :propItems="radio1" propGroupName="Animal13" propValue="dog" propDisplay="inline" propDirection="right" propTheme="warn" propTextColor="light" @current-value="radioValue('baseradio8', $event)"/><br>
          <VlalgRadio propId="radio14" :propItems="radio1" propGroupName="Animal14" propValue="dog" propDisplay="inline" propDirection="right" propTheme="dark" propTextColor="light" @current-value="radioValue('baseradio8', $event)"/><br>
          <VlalgRadio propId="radio15" :propItems="radio1" propGroupName="Animal15" propValue="cat" propDisplay="inline" propDirection="right" propTheme="light" propTextColor="light" @current-value="radioValue('baseradio8', $event)"/>
          <br><br>
          <p>- Com propTextColor (black)</p>
          Valor atual: {{ baseRadio16ValorAtual }}<br>
          <VlalgRadio propId="radio16" :propItems="radio1" propGroupName="Animal16" propValue="dog" propDisplay="inline" propDirection="right" propTheme="normal" propTextColor="black" @current-value="radioValue('baseradio16', $event)"/><br>
          <p>- Com propTextColor (white)</p>
          Valor atual: {{ baseRadio19ValorAtual }}<br>
          <VlalgRadio propId="radio19" :propItems="radio1" propGroupName="Animal19" propValue="dog" propDisplay="inline" propDirection="right" propTheme="normal" propTextColor="white" @current-value="radioValue('baseradio19', $event)"/><br>
          <p>- Com propTextColor (dark)</p>
          Valor atual: {{ baseRadio17ValorAtual }}<br>
          <VlalgRadio propId="radio17" :propItems="radio1" propGroupName="Animal10" propValue="dog" propDisplay="inline" propDirection="right" propTheme="normal" propTextColor="dark" @current-value="radioValue('baseradio17', $event)"/><br>
          <p>- Com propTextColor (light)</p>
          Valor atual: {{ baseRadio18ValorAtual }}<br>
          <VlalgRadio propId="radio18" :propItems="radio1" propGroupName="Animal11" propValue="dog" propDisplay="inline" propDirection="right" propTheme="normal" propTextColor="light" @current-value="radioValue('baseradio18', $event)"/>
          <br><br>
          <p>- Com propDisabled</p>
          Valor atual: {{ baseRadio8ValorAtual }}<br>
          <VlalgRadio propId="radio8" :propItems="radio1" propGroupName="Animal8" propValue="dog" propDisplay="inline" propDirection="right" propTheme="normal" propTextColor="black" :propDisabled="true" @current-value="radioValue('baseradio8', $event)"/><br>
          <VlalgRadio propId="radio9" :propItems="radio1" propGroupName="Animal9" propValue="cat" propDisplay="inline" propDirection="right" propTheme="primary" propTextColor="black" :propDisabled="true" @current-value="radioValue('baseradio8', $event)"/><br>
          <VlalgRadio propId="radio10" :propItems="radio1" propGroupName="Animal10" propValue="fish" propDisplay="inline" propDirection="right" propTheme="success" propTextColor="black" :propDisabled="true" @current-value="radioValue('baseradio8', $event)"/><br>
          <VlalgRadio propId="radio11" :propItems="radio1" propGroupName="Animal11" propValue="fish" propDisplay="inline" propDirection="right" propTheme="info" propTextColor="black" :propDisabled="true" @current-value="radioValue('baseradio8', $event)"/><br>
          <VlalgRadio propId="radio12" :propItems="radio1" propGroupName="Animal12" propValue="cat" propDisplay="inline" propDirection="right" propTheme="danger" propTextColor="black" :propDisabled="true" @current-value="radioValue('baseradio8', $event)"/><br>
          <VlalgRadio propId="radio13" :propItems="radio1" propGroupName="Animal13" propValue="dog" propDisplay="inline" propDirection="right" propTheme="warn" propTextColor="black" :propDisabled="true" @current-value="radioValue('baseradio8', $event)"/><br>
          <VlalgRadio propId="radio14" :propItems="radio1" propGroupName="Animal14" propValue="dog" propDisplay="inline" propDirection="right" propTheme="dark" propTextColor="black" :propDisabled="true" @current-value="radioValue('baseradio8', $event)"/><br>
          <VlalgRadio propId="radio15" :propItems="radio1" propGroupName="Animal15" propValue="cat" propDisplay="inline" propDirection="right" propTheme="light" propTextColor="black" :propDisabled="true" @current-value="radioValue('baseradio8', $event)"/><br>

          <VlalgRadio propId="radio8" :propItems="radio1" propGroupName="Animal8" propValue="dog" propDisplay="inline" propDirection="right" propTheme="normal" propTextColor="white" :propDisabled="true" @current-value="radioValue('baseradio8', $event)"/><br>
          <VlalgRadio propId="radio9" :propItems="radio1" propGroupName="Animal9" propValue="cat" propDisplay="inline" propDirection="right" propTheme="primary" propTextColor="white" :propDisabled="true" @current-value="radioValue('baseradio8', $event)"/><br>
          <VlalgRadio propId="radio10" :propItems="radio1" propGroupName="Animal10" propValue="fish" propDisplay="inline" propDirection="right" propTheme="success" propTextColor="white" :propDisabled="true" @current-value="radioValue('baseradio8', $event)"/><br>
          <VlalgRadio propId="radio11" :propItems="radio1" propGroupName="Animal11" propValue="fish" propDisplay="inline" propDirection="right" propTheme="info" propTextColor="white" :propDisabled="true" @current-value="radioValue('baseradio8', $event)"/><br>
          <VlalgRadio propId="radio12" :propItems="radio1" propGroupName="Animal12" propValue="cat" propDisplay="inline" propDirection="right" propTheme="danger" propTextColor="white" :propDisabled="true" @current-value="radioValue('baseradio8', $event)"/><br>
          <VlalgRadio propId="radio13" :propItems="radio1" propGroupName="Animal13" propValue="dog" propDisplay="inline" propDirection="right" propTheme="warn" propTextColor="white" :propDisabled="true" @current-value="radioValue('baseradio8', $event)"/><br>
          <VlalgRadio propId="radio14" :propItems="radio1" propGroupName="Animal14" propValue="dog" propDisplay="inline" propDirection="right" propTheme="dark" propTextColor="white" :propDisabled="true" @current-value="radioValue('baseradio8', $event)"/><br>
          <VlalgRadio propId="radio15" :propItems="radio1" propGroupName="Animal15" propValue="cat" propDisplay="inline" propDirection="right" propTheme="light" propTextColor="white" :propDisabled="true" @current-value="radioValue('baseradio8', $event)"/><br>

          <VlalgRadio propId="radio8" :propItems="radio1" propGroupName="Animal8" propValue="dog" propDisplay="inline" propDirection="right" propTheme="normal" propTextColor="dark" :propDisabled="true" @current-value="radioValue('baseradio8', $event)"/><br>
          <VlalgRadio propId="radio9" :propItems="radio1" propGroupName="Animal9" propValue="cat" propDisplay="inline" propDirection="right" propTheme="primary" propTextColor="dark" :propDisabled="true" @current-value="radioValue('baseradio8', $event)"/><br>
          <VlalgRadio propId="radio10" :propItems="radio1" propGroupName="Animal10" propValue="fish" propDisplay="inline" propDirection="right" propTheme="success" propTextColor="dark" :propDisabled="true" @current-value="radioValue('baseradio8', $event)"/><br>
          <VlalgRadio propId="radio11" :propItems="radio1" propGroupName="Animal11" propValue="fish" propDisplay="inline" propDirection="right" propTheme="info" propTextColor="dark" :propDisabled="true" @current-value="radioValue('baseradio8', $event)"/><br>
          <VlalgRadio propId="radio12" :propItems="radio1" propGroupName="Animal12" propValue="cat" propDisplay="inline" propDirection="right" propTheme="danger" propTextColor="dark" :propDisabled="true" @current-value="radioValue('baseradio8', $event)"/><br>
          <VlalgRadio propId="radio13" :propItems="radio1" propGroupName="Animal13" propValue="dog" propDisplay="inline" propDirection="right" propTheme="warn" propTextColor="dark" :propDisabled="true" @current-value="radioValue('baseradio8', $event)"/><br>
          <VlalgRadio propId="radio14" :propItems="radio1" propGroupName="Animal14" propValue="dog" propDisplay="inline" propDirection="right" propTheme="dark" propTextColor="dark" :propDisabled="true" @current-value="radioValue('baseradio8', $event)"/><br>
          <VlalgRadio propId="radio15" :propItems="radio1" propGroupName="Animal15" propValue="cat" propDisplay="inline" propDirection="right" propTheme="light" propTextColor="dark" :propDisabled="true" @current-value="radioValue('baseradio8', $event)"/><br>

          <VlalgRadio propId="radio8" :propItems="radio1" propGroupName="Animal8" propValue="dog" propDisplay="inline" propDirection="right" propTheme="normal" propTextColor="light" :propDisabled="true" @current-value="radioValue('baseradio8', $event)"/><br>
          <VlalgRadio propId="radio9" :propItems="radio1" propGroupName="Animal9" propValue="cat" propDisplay="inline" propDirection="right" propTheme="primary" propTextColor="light" :propDisabled="true" @current-value="radioValue('baseradio8', $event)"/><br>
          <VlalgRadio propId="radio10" :propItems="radio1" propGroupName="Animal10" propValue="fish" propDisplay="inline" propDirection="right" propTheme="success" propTextColor="light" :propDisabled="true" @current-value="radioValue('baseradio8', $event)"/><br>
          <VlalgRadio propId="radio11" :propItems="radio1" propGroupName="Animal11" propValue="fish" propDisplay="inline" propDirection="right" propTheme="info" propTextColor="light" :propDisabled="true" @current-value="radioValue('baseradio8', $event)"/><br>
          <VlalgRadio propId="radio12" :propItems="radio1" propGroupName="Animal12" propValue="cat" propDisplay="inline" propDirection="right" propTheme="danger" propTextColor="light" :propDisabled="true" @current-value="radioValue('baseradio8', $event)"/><br>
          <VlalgRadio propId="radio13" :propItems="radio1" propGroupName="Animal13" propValue="dog" propDisplay="inline" propDirection="right" propTheme="warn" propTextColor="light" :propDisabled="true" @current-value="radioValue('baseradio8', $event)"/><br>
          <VlalgRadio propId="radio14" :propItems="radio1" propGroupName="Animal14" propValue="dog" propDisplay="inline" propDirection="right" propTheme="dark" propTextColor="light" :propDisabled="true" @current-value="radioValue('baseradio8', $event)"/><br>
          <VlalgRadio propId="radio15" :propItems="radio1" propGroupName="Animal15" propValue="cat" propDisplay="inline" propDirection="right" propTheme="light" propTextColor="light" :propDisabled="true" @current-value="radioValue('baseradio8', $event)"/><br>
        </div>

        <div v-else-if="currentComponent === 'VlalgFlipBox'" class="new-component">
          <h2 class="new-component__title">VlalgFlipBox</h2>
          <p>- Com propEfectDirection (horizontal)</p>
          <VlalgFlipBox propId="flipbox1" propEfectDirection="horizontal">
            <p data-slot="front">Conteudo front asdasd asdasdas asdasdasdasdasdasdasdasdasdas asdasdas asdasd asdasd asdas das</p>
            <p data-slot="back">Conteudo back</p>
          </VlalgFlipBox><br>
          <p>- Com propEfectDirection (vertical)</p>
          <VlalgFlipBox propId="flipbox2" propEfectDirection="vertical">
            <p data-slot="front">Conteudo front</p>
            <p data-slot="back">Conteudo back</p>
          </VlalgFlipBox><br>
          <p>- Com prop3dEfect</p>
          <VlalgFlipBox propId="flipbox3" propEfectDirection="horizontal" :propThreeDimensionalEfect="true">
            <p data-slot="front">Conteudo front</p>
            <p data-slot="back">Conteudo back</p>
          </VlalgFlipBox><br>
          <VlalgFlipBox propId="flipbox4" propEfectDirection="vertical" :propThreeDimensionalEfect="true">
            <p data-slot="front">Conteudo front</p>
            <p data-slot="back">Conteudo back</p>
          </VlalgFlipBox><br>
          <p>- Com propBorder e propBorderTheme</p>
          <VlalgFlipBox propId="flipbox5" propEfectDirection="horizontal" :propThreeDimensionalEfect="true" :propBorder="true" propBorderTheme="dark">
            <p data-slot="front">Conteudo front</p>
            <p data-slot="back">Conteudo back</p>
          </VlalgFlipBox><br>
          <p>- Com propWidth</p>
          <VlalgFlipBox propId="flipbox6" propEfectDirection="horizontal" :propThreeDimensionalEfect="true" :propBorder="true" propBorderTheme="dark" propWidth="500px">
            <p data-slot="front">Conteudo front</p>
            <p data-slot="back">Conteudo back</p>
          </VlalgFlipBox><br>
          <p>- Com propWidth em %</p>
          <VlalgFlipBox propId="flipbox6" propEfectDirection="horizontal" :propThreeDimensionalEfect="true" :propBorder="true" propBorderTheme="dark" propWidth="100%">
            <p data-slot="front">Conteudo front</p>
            <p data-slot="back">Conteudo back</p>
          </VlalgFlipBox><br>
          <p>- Com propHeight</p>
          <VlalgFlipBox propId="flipbox7" propEfectDirection="horizontal" :propThreeDimensionalEfect="true" :propBorder="true" propBorderTheme="dark" propHeight="500px">
            <p data-slot="front">Conteudo front</p>
            <p data-slot="back">Conteudo back</p>
          </VlalgFlipBox><br>
          <p>- Com propWidth e propHeight</p>
          <VlalgFlipBox propId="flipbox8" propEfectDirection="horizontal" :propThreeDimensionalEfect="true" :propBorder="true" propBorderTheme="dark" propWidth="500px" propHeight="150px">
            <p data-slot="front">Conteudo front</p>
            <p data-slot="back">Conteudo back</p>
          </VlalgFlipBox><br>
          <p>- Com propTheme</p>
          <VlalgFlipBox propId="flipbox9" propEfectDirection="horizontal" :propThreeDimensionalEfect="true" :propBorder="true" propBorderTheme="dark" propWidth="500px" propHeight="50px" propTheme="normal">
            <p data-slot="front">Conteudo front</p>
            <p data-slot="back">Conteudo back</p>
          </VlalgFlipBox>
          <VlalgFlipBox propId="flipbox10" propEfectDirection="horizontal" :propThreeDimensionalEfect="true" :propBorder="true" propBorderTheme="dark" propWidth="500px" propHeight="50px" propTheme="primary">
            <p data-slot="front">Conteudo front</p>
            <p data-slot="back">Conteudo back</p>
          </VlalgFlipBox>
          <VlalgFlipBox propId="flipbox11" propEfectDirection="horizontal" :propThreeDimensionalEfect="true" :propBorder="true" propBorderTheme="dark" propWidth="500px" propHeight="50px" propTheme="success">
            <p data-slot="front">Conteudo front</p>
            <p data-slot="back">Conteudo back</p>
          </VlalgFlipBox>
          <VlalgFlipBox propId="flipbox12" propEfectDirection="horizontal" :propThreeDimensionalEfect="true" :propBorder="true" propBorderTheme="dark" propWidth="500px" propHeight="50px" propTheme="info">
            <p data-slot="front">Conteudo front</p>
            <p data-slot="back">Conteudo back</p>
          </VlalgFlipBox>
          <VlalgFlipBox propId="flipbox13" propEfectDirection="horizontal" :propThreeDimensionalEfect="true" :propBorder="true" propBorderTheme="dark" propWidth="500px" propHeight="50px" propTheme="warn">
            <p data-slot="front">Conteudo front</p>
            <p data-slot="back">Conteudo back</p>
          </VlalgFlipBox>
          <VlalgFlipBox propId="flipbox14" propEfectDirection="horizontal" :propThreeDimensionalEfect="true" :propBorder="true" propBorderTheme="dark" propWidth="500px" propHeight="50px" propTheme="danger">
            <p data-slot="front">Conteudo front</p>
            <p data-slot="back">Conteudo back</p>
          </VlalgFlipBox>
          <VlalgFlipBox propId="flipbox15" propEfectDirection="horizontal" :propThreeDimensionalEfect="true" :propBorder="true" propBorderTheme="dark" propWidth="500px" propHeight="50px" propTheme="dark">
            <p data-slot="front">Conteudo front</p>
            <p data-slot="back">Conteudo back</p>
          </VlalgFlipBox>
          <VlalgFlipBox propId="flipbox16" propEfectDirection="horizontal" :propThreeDimensionalEfect="true" :propBorder="true" propBorderTheme="dark" propWidth="500px" propHeight="50px" propTheme="light">
            <p data-slot="front">Conteudo front</p>
            <p data-slot="back">Conteudo back</p>
          </VlalgFlipBox>
        </div>

        <div v-else-if="currentComponent === 'VlalgHr'" class="new-component">
          <h2 class="new-component__title">VlalgHr</h2>
          <p>- Sem configuracao (default)</p>
          <VlalgHr propId="basehr1" /><br>
          <p>- Sem propHeight</p>
          <VlalgHr propId="basehr2" propHeight="10px" /><br>
          <p>- Sem propBorderStyle</p>
          <VlalgHr propId="basehr3" propHeight="2px" propBorderStyle="solid" />
          <VlalgHr propId="basehr4" propHeight="2px" propBorderStyle="dotted" />
          <VlalgHr propId="basehr5" propHeight="2px" propBorderStyle="dashed" />
          <VlalgHr propId="basehr6" propHeight="2px" propBorderStyle="double" />
          <VlalgHr propId="basehr7" propHeight="2px" propBorderStyle="groove" />
          <VlalgHr propId="basehr8" propHeight="2px" propBorderStyle="ridge" />
          <VlalgHr propId="basehr9" propHeight="2px" propBorderStyle="inset" />
          <VlalgHr propId="basehr10" propHeight="2px" propBorderStyle="outset" />
          <p>- Com propTheme</p>
          <VlalgHr propId="basehr11" propTheme="normal" /><br>
          <VlalgHr propId="basehr12" propTheme="primary" /><br>
          <VlalgHr propId="basehr13" propTheme="success" /><br>
          <VlalgHr propId="basehr14" propTheme="info" /><br>
          <VlalgHr propId="basehr15" propTheme="warn" /><br>
          <VlalgHr propId="basehr16" propTheme="danger" /><br>
          <VlalgHr propId="basehr17" propTheme="dark" /><br>
          <VlalgHr propId="basehr18" propTheme="light" /><br>
        </div>

        <div v-else-if="currentComponent === 'VlalgTextarea'" class="new-component">
          <h2 class="new-component__title">VlalgTextarea</h2>
          <p>com propDisabled</p>{{ baseTextareaValorAtual }}<br>
          <VlalgTextarea propId="basetextarea1" propName="algo" propTheme="normal" propPlaceholder="tema normal" :propRequired="true" :propReadonly="false" :propDisabled="true" :propUppercase="false" :propValue="baseTextareaValorAtual" @current-value="textareaValue('basetextarea1', $event)" /><br><br>

          <p>com propReadonly</p>{{ baseTextarea2ValorAtual }}<br>
          <VlalgTextarea propId="basetextarea2" propName="algo" propTheme="normal" propPlaceholder="tema normal" :propRequired="true" :propReadonly="true" :propDisabled="false" :propUppercase="false" :propValue="baseTextarea2ValorAtual" @current-value="textareaValue('basetextarea2', $event)" /><br><br>

          <p>com propUppercase</p>{{ baseTextarea3ValorAtual }}<br>
          <VlalgTextarea propId="basetextarea3" propName="algo" propTheme="normal" propPlaceholder="tema normal" :propRequired="true" :propReadonly="false" :propDisabled="false" :propUppercase="true" :propValue="baseTextarea3ValorAtual" @current-value="textareaValue('basetextarea3', $event)" /><br><br>

          <p>com propHasResize e propResizeType (horizontal)</p>{{ baseTextarea5ValorAtual }}<br>
          <VlalgTextarea propId="basetextarea12" propName="algo" propTheme="normal" propPlaceholder="tema normal" :propRequired="true" :propReadonly="false" :propDisabled="false" :propUppercase="true" :propHasResize="true" propResizeType="horizontal" :propValue="baseTextarea5ValorAtual" @current-value="textareaValue('basetextarea12', $event)" /><br><br>

          <p>com propCols (40)</p>{{ baseTextarea6ValorAtual }}<br>
          <VlalgTextarea propId="basetextarea13" propName="algo" propTheme="normal" propPlaceholder="tema normal" :propRequired="true" :propReadonly="false" :propDisabled="false" :propUppercase="true" :propHasResize="true" propResizeType="horizontal" :propCols="40" :propValue="baseTextarea6ValorAtual" @current-value="textareaValue('basetextarea13', $event)" /><br><br>

          <p>com propRows (5)</p>{{ baseTextarea7ValorAtual }}<br>
          <VlalgTextarea propId="basetextarea14" propName="algo" propTheme="normal" propPlaceholder="tema normal" :propRequired="true" :propReadonly="false" :propDisabled="false" :propUppercase="true" :propHasResize="true" propResizeType="horizontal" :propRows="5" :propValue="baseTextarea7ValorAtual" @current-value="textareaValue('basetextarea14', $event)" /><br><br>

          <p>com propTheme</p>{{ baseTextarea4ValorAtual }}<br>
          <VlalgTextarea propId="basetextarea4" propName="algo" propTheme="normal" propPlaceholder="tema normal" :propRequired="true" :propReadonly="false" :propDisabled="false" :propUppercase="false" :propValue="baseTextarea4ValorAtual" @current-value="textareaValue('basetextarea4', $event)" /><br>
          <VlalgTextarea propId="basetextarea41" propName="algo" propTheme="normal" propPlaceholder="tema normal" :propRequired="true" :propReadonly="false" :propDisabled="true" :propUppercase="false" :propValue="baseTextarea4ValorAtual" @current-value="textareaValue('basetextarea41', $event)" /><br>
          <VlalgTextarea propId="basetextarea5" propName="algo" propTheme="primary" propPlaceholder="tema normal" :propRequired="true" :propReadonly="false" :propDisabled="false" :propUppercase="false" :propValue="baseTextarea4ValorAtual" @current-value="textareaValue('basetextarea5', $event)" /><br>
          <VlalgTextarea propId="basetextarea51" propName="algo" propTheme="primary" propPlaceholder="tema normal" :propRequired="true" :propReadonly="false" :propDisabled="true" :propUppercase="false" :propValue="baseTextarea4ValorAtual" @current-value="textareaValue('basetextarea51', $event)" /><br>
          <VlalgTextarea propId="basetextarea6" propName="algo" propTheme="success" propPlaceholder="tema normal" :propRequired="true" :propReadonly="false" :propDisabled="false" :propUppercase="false" :propValue="baseTextarea4ValorAtual" @current-value="textareaValue('basetextarea6', $event)" /><br>
          <VlalgTextarea propId="basetextarea61" propName="algo" propTheme="success" propPlaceholder="tema normal" :propRequired="true" :propReadonly="false" :propDisabled="true" :propUppercase="false" :propValue="baseTextarea4ValorAtual" @current-value="textareaValue('basetextarea61', $event)" /><br>
          <VlalgTextarea propId="basetextarea7" propName="algo" propTheme="info" propPlaceholder="tema normal" :propRequired="true" :propReadonly="false" :propDisabled="false" :propUppercase="false" :propValue="baseTextarea4ValorAtual" @current-value="textareaValue('basetextarea7', $event)" /><br>
          <VlalgTextarea propId="basetextarea71" propName="algo" propTheme="info" propPlaceholder="tema normal" :propRequired="true" :propReadonly="false" :propDisabled="true" :propUppercase="false" :propValue="baseTextarea4ValorAtual" @current-value="textareaValue('basetextarea71', $event)" /><br>
          <VlalgTextarea propId="basetextarea8" propName="algo" propTheme="danger" propPlaceholder="tema normal" :propRequired="true" :propReadonly="false" :propDisabled="false" :propUppercase="false" :propValue="baseTextarea4ValorAtual" @current-value="textareaValue('basetextarea8', $event)" /><br>
          <VlalgTextarea propId="basetextarea81" propName="algo" propTheme="danger" propPlaceholder="tema normal" :propRequired="true" :propReadonly="false" :propDisabled="true" :propUppercase="false" :propValue="baseTextarea4ValorAtual" @current-value="textareaValue('basetextarea81', $event)" /><br>
          <VlalgTextarea propId="basetextarea9" propName="algo" propTheme="warn" propPlaceholder="tema normal" :propRequired="true" :propReadonly="false" :propDisabled="false" :propUppercase="false" :propValue="baseTextarea4ValorAtual" @current-value="textareaValue('basetextarea9', $event)" /><br>
          <VlalgTextarea propId="basetextarea91" propName="algo" propTheme="warn" propPlaceholder="tema normal" :propRequired="true" :propReadonly="false" :propDisabled="true" :propUppercase="false" :propValue="baseTextarea4ValorAtual" @current-value="textareaValue('basetextarea91', $event)" /><br>
          <VlalgTextarea propId="basetextarea10" propName="algo" propTheme="dark" propPlaceholder="tema normal" :propRequired="true" :propReadonly="false" :propDisabled="false" :propUppercase="false" :propValue="baseTextarea4ValorAtual" @current-value="textareaValue('basetextarea10', $event)" /><br>
          <VlalgTextarea propId="basetextarea101" propName="algo" propTheme="dark" propPlaceholder="tema normal" :propRequired="true" :propReadonly="false" :propDisabled="true" :propUppercase="false" :propValue="baseTextarea4ValorAtual" @current-value="textareaValue('basetextarea101', $event)" /><br>
          <VlalgTextarea propId="basetextarea11" propName="algo" propTheme="light" propPlaceholder="tema normal" :propRequired="true" :propReadonly="false" :propDisabled="false" :propUppercase="false" :propValue="baseTextarea4ValorAtual" @current-value="textareaValue('basetextarea11', $event)" /><br>
          <VlalgTextarea propId="basetextarea111" propName="algo" propTheme="light" propPlaceholder="tema normal" :propRequired="true" :propReadonly="false" :propDisabled="true" :propUppercase="false" :propValue="baseTextarea4ValorAtual" @current-value="textareaValue('basetextarea111', $event)" /><br>
        </div>

        <div v-else-if="currentComponent === 'VlalgEmphasi'" class="new-component">
          <h2 class="new-component__title">VlalgEmphasi</h2>
          <p>com propUppercase<br>
          <p>Lorem ipsum dolor sit amet, <VlalgEmphasi propId="baseemphasi1" :propUppercase="true">consectetur</VlalgEmphasi> adipiscing elit.</p>
          <p>com propTheme<br>
          <p>Lorem ipsum dolor sit amet, <VlalgEmphasi propId="baseemphasi2" propTheme="normal">normal emphasi</VlalgEmphasi> adipiscing elit.</p>
          <p>Lorem ipsum dolor sit amet, <VlalgEmphasi propId="baseemphasi3" propTheme="primary">primary emphasi</VlalgEmphasi> adipiscing elit.</p>
          <p>Lorem ipsum dolor sit amet, <VlalgEmphasi propId="baseemphasi4" propTheme="success">success emphasi</VlalgEmphasi> adipiscing elit.</p>
          <p>Lorem ipsum dolor sit amet, <VlalgEmphasi propId="baseemphasi5" propTheme="info">info emphasi</VlalgEmphasi> adipiscing elit.</p>
          <p>Lorem ipsum dolor sit amet, <VlalgEmphasi propId="baseemphasi6" propTheme="danger">danger emphasi</VlalgEmphasi> adipiscing elit.</p>
          <p>Lorem ipsum dolor sit amet, <VlalgEmphasi propId="baseemphasi7" propTheme="warn">warn emphasi</VlalgEmphasi> adipiscing elit.</p>
          <p>Lorem ipsum dolor sit amet, <VlalgEmphasi propId="baseemphasi8" propTheme="dark">dark emphasi</VlalgEmphasi> adipiscing elit.</p>
          <p>Lorem ipsum dolor sit amet, <VlalgEmphasi propId="baseemphasi9" propTheme="light">light emphasi</VlalgEmphasi> adipiscing elit.</p>
        </div>

        <div v-else-if="currentComponent === 'VlalgMark'" class="new-component">
          <h2 class="new-component__title">VlalgMark</h2>
          <p>com propUppercase<br>
          <p>Lorem ipsum dolor sit amet, <VlalgMark propId="basemark1" :propUppercase="true">consectetur</VlalgMark> adipiscing elit.</p>
          <p>com propTheme<br>
          <p>Lorem ipsum dolor sit amet, <VlalgMark propId="basemark1" propTheme="normal">normal mark</VlalgMark> adipiscing elit.</p>
          <p>Lorem ipsum dolor sit amet, <VlalgMark propId="basemark1" propTheme="primary">primary mark</VlalgMark> adipiscing elit.</p>
          <p>Lorem ipsum dolor sit amet, <VlalgMark propId="basemark1" propTheme="success">success mark</VlalgMark> adipiscing elit.</p>
          <p>Lorem ipsum dolor sit amet, <VlalgMark propId="basemark1" propTheme="info">info mark</VlalgMark> adipiscing elit.</p>
          <p>Lorem ipsum dolor sit amet, <VlalgMark propId="basemark1" propTheme="danger">danger mark</VlalgMark> adipiscing elit.</p>
          <p>Lorem ipsum dolor sit amet, <VlalgMark propId="basemark1" propTheme="warn">warn mark</VlalgMark> adipiscing elit.</p>
          <p>Lorem ipsum dolor sit amet, <VlalgMark propId="basemark1" propTheme="dark">dark mark</VlalgMark> adipiscing elit.</p>
          <p>Lorem ipsum dolor sit amet, <VlalgMark propId="basemark1" propTheme="light">light mark</VlalgMark> adipiscing elit.</p>
        </div>

        <div v-else-if="currentComponent === 'VlalgLoader'" class="new-component">
          <h2 class="new-component__title">VlalgLoader</h2>
          <p>com propVisible</p>
          <VlalgLoader propId="baseloader1" propType="bars" :propVisible="true" />
          <p>com propType</p>
          <VlalgLoader propId="baseloader1" propType="bars" :propVisible="true" />
          <VlalgLoader propId="baseloader2" propType="water-drop" :propVisible="true" />
          <VlalgLoader propId="baseloader3" propType="coin" :propVisible="true" />
          <VlalgLoader propId="baseloader4" propType="circle-lines" :propVisible="true" />
          <VlalgLoader propId="baseloader5" propType="solar" :propVisible="true" />
          <VlalgLoader propId="baseloader6" propType="dots" :propVisible="true" />
          <VlalgLoader propId="baseloader7" propType="leds" :propVisible="true" />
          <VlalgLoader propId="baseloader8" propType="snake" :propVisible="true" />
          <VlalgLoader propId="baseloader9" propType="zoom-ball" :propVisible="true" />
          <VlalgLoader propId="baseloader10" propType="train" :propVisible="true" />
          <VlalgLoader propId="baseloader11" propType="ring" :propVisible="true" />
          <VlalgLoader propId="baseloader12" propType="partial-ring" :propVisible="true" />
          <p>com propTheme</p>
          <button @click="changeVlalgLoaderTheme('normal')">normal</button>
          <button @click="changeVlalgLoaderTheme('primary')">primary</button>
          <button @click="changeVlalgLoaderTheme('success')">success</button>
          <button @click="changeVlalgLoaderTheme('info')">info</button>
          <button @click="changeVlalgLoaderTheme('warn')">warn</button>
          <button @click="changeVlalgLoaderTheme('danger')">danger</button>
          <button @click="changeVlalgLoaderTheme('dark')">dark</button>
          <button @click="changeVlalgLoaderTheme('light')">light</button><br>
          <VlalgLoader propId="baseloader13" propType="bars" :propVisible="true" :propTheme="baseLoaderTheme" />
          <VlalgLoader propId="baseloader14" propType="water-drop" :propVisible="true" :propTheme="baseLoaderTheme" />
          <VlalgLoader propId="baseloader15" propType="coin" :propVisible="true" :propTheme="baseLoaderTheme" />
          <VlalgLoader propId="baseloader16" propType="circle-lines" :propVisible="true" :propTheme="baseLoaderTheme" />
          <VlalgLoader propId="baseloader17" propType="solar" :propVisible="true" :propTheme="baseLoaderTheme" />
          <VlalgLoader propId="baseloader18" propType="dots" :propVisible="true" :propTheme="baseLoaderTheme" />
          <VlalgLoader propId="baseloader19" propType="leds" :propVisible="true" :propTheme="baseLoaderTheme" />
          <VlalgLoader propId="baseloader20" propType="snake" :propVisible="true" :propTheme="baseLoaderTheme" />
          <VlalgLoader propId="baseloader21" propType="zoom-ball" :propVisible="true" :propTheme="baseLoaderTheme" />
          <VlalgLoader propId="baseloader22" propType="train" :propVisible="true" :propTheme="baseLoaderTheme" />
          <VlalgLoader propId="baseloader23" propType="ring" :propVisible="true" :propTheme="baseLoaderTheme" />
          <VlalgLoader propId="baseloader24" propType="partial-ring" :propVisible="true" :propTheme="baseLoaderTheme" />
        </div>

        <div v-else-if="currentComponent === 'VlalgSnackbar'" class="new-component">
          <h2 class="new-component__title">VlalgSnackbar</h2>
          <button @click="atualizaSnackbar" :disabled="mostraSnackbar">atualiza Snackbar</button>
          <VlalgSnackbar propId="basesnackbar1" propText="Conquista debloqueada" :propIsVisible="mostraSnackbar" @remove-snackbar="removeSnackbar($event)" propTheme="success" />
        </div>

        <div v-else-if="currentComponent === 'VlalgGoTopButton'" class="new-component">
          <h2 class="new-component__title">VlalgGoTopButton</h2>
          <p>Esta aparecendo na tela</p>

          <VlalgGoTopButton propId="basegotopbutton1" propIdNameToGo="header_id" :propShowInHeight="450" :propPositionRight="50" :propPositionBottom="50" propContentType="text" propBorderRadius="5%" propTheme="dark" />

          <VlalgGoTopButton propId="basegotopbutton2" propIdNameToGo="header_id" :propShowInHeight="450" :propPositionRight="300" :propPositionBottom="50" propContentType="icon" propBorderRadius="5%">
            <div data-slot="gotopbuttonicon">
              ^
            </div>
          </VlalgGoTopButton>
        </div>

        <div v-else-if="currentComponent === 'VlalgList'" class="new-component">
          <h2 class="new-component__title">VlalgList</h2>
          <p>com propHasStyle (false)</p>
          <VlalgList propId="baselist" :propItems="listArray" :propHasStyle="false" /><br><br>

          <p>com propHasStyle (true)</p>
          <VlalgList propId="baselist2" :propItems="listArray" :propHasStyle="true" /><br><br>

          <p>com propHasStyle (true) e propStyle</p>
          <VlalgList propId="baselist3" :propItems="listArray2" :propHasStyle="true" /><br><br>

          <p>com propTextColor</p>
          <VlalgList propId="baselist4" :propItems="listArray2" :propHasStyle="true" propTextColor="light" /><br><br>
          <VlalgList propId="baselist5" :propItems="listArray2" :propHasStyle="true" propTextColor="white" /><br><br>
          <VlalgList propId="baselist6" :propItems="listArray2" :propHasStyle="true" propTextColor="black" /><br><br>
          <VlalgList propId="baselist7" :propItems="listArray2" :propHasStyle="true" propTextColor="dark" /><br><br>

          <p>com propTheme</p>
          <VlalgList propId="baselist8" :propItems="listArray2" :propHasStyle="true" propTheme="normal" propTextColor="white" /><br><br>
          <VlalgList propId="baselist9" :propItems="listArray2" :propHasStyle="true" propTheme="primary" propTextColor="white" /><br><br>
          <VlalgList propId="baselist10" :propItems="listArray2" :propHasStyle="true" propTheme="success" propTextColor="white" /><br><br>
          <VlalgList propId="baselist11" :propItems="listArray2" :propHasStyle="true" propTheme="info" propTextColor="white" /><br><br>
          <VlalgList propId="baselist12" :propItems="listArray2" :propHasStyle="true" propTheme="warn" propTextColor="white" /><br><br>
          <VlalgList propId="baselist13" :propItems="listArray2" :propHasStyle="true" propTheme="danger" propTextColor="white" /><br><br>
          <VlalgList propId="baselist14" :propItems="listArray2" :propHasStyle="true" propTheme="dark" propTextColor="white" /><br><br>
          <VlalgList propId="baselist15" :propItems="listArray2" :propHasStyle="true" propTheme="light" propTextColor="white" /><br><br>
        </div>

        <div v-else-if="currentComponent === 'VlalgProgressBar'" class="new-component">
          <h2 class="new-component__title">VlalgProgressBar</h2>
          <p>Para simular o valor</p>
          <button @click="upProgressBar">+1</button>
          <button @click="downProgressBar">-1</button><br>
          <p>com propHeight (20)</p>
          <VlalgProgressBar propId="baseprogressbar1" :propCurrentValue="progressBarValue" :propMaxValue="progressBarMaxValue" :propHeight="20" />
          <p>com propHasMessage (true) e propMessageType (percent) </p>
          <VlalgProgressBar propId="baseprogressbar2" :propCurrentValue="progressBarValue" :propMaxValue="progressBarMaxValue" :propHeight="20" :propHasMessage="true" propMessageType="percent" />
          <p>com propHasMessage (true) e propMessageType (startEnd) </p>
          <VlalgProgressBar propId="baseprogressbar3" :propCurrentValue="progressBarValue" :propMaxValue="progressBarMaxValue" :propHeight="20" :propHasMessage="true" propMessageType="startEnd" />
          <p>com theme </p>
          <VlalgProgressBar propId="baseprogressbar3" :propCurrentValue="progressBarValue" :propMaxValue="progressBarMaxValue" :propHeight="20" :propHasMessage="true" propMessageType="startEnd" propTheme="normal" />
          <VlalgProgressBar propId="baseprogressbar3" :propCurrentValue="progressBarValue" :propMaxValue="progressBarMaxValue" :propHeight="20" :propHasMessage="true" propMessageType="startEnd" propTheme="primary" />
          <VlalgProgressBar propId="baseprogressbar3" :propCurrentValue="progressBarValue" :propMaxValue="progressBarMaxValue" :propHeight="20" :propHasMessage="true" propMessageType="startEnd" propTheme="success" />
          <VlalgProgressBar propId="baseprogressbar3" :propCurrentValue="progressBarValue" :propMaxValue="progressBarMaxValue" :propHeight="20" :propHasMessage="true" propMessageType="startEnd" propTheme="info" />
          <VlalgProgressBar propId="baseprogressbar3" :propCurrentValue="progressBarValue" :propMaxValue="progressBarMaxValue" :propHeight="20" :propHasMessage="true" propMessageType="startEnd" propTheme="warn" />
          <VlalgProgressBar propId="baseprogressbar3" :propCurrentValue="progressBarValue" :propMaxValue="progressBarMaxValue" :propHeight="20" :propHasMessage="true" propMessageType="startEnd" propTheme="danger" />
          <VlalgProgressBar propId="baseprogressbar3" :propCurrentValue="progressBarValue" :propMaxValue="progressBarMaxValue" :propHeight="20" :propHasMessage="true" propMessageType="startEnd" propTheme="dark" />
          <VlalgProgressBar propId="baseprogressbar3" :propCurrentValue="progressBarValue" :propMaxValue="progressBarMaxValue" :propHeight="20" :propHasMessage="true" propMessageType="startEnd" propTheme="light" />
        </div>

        <div v-else-if="currentComponent === 'VlalgImageComparison'" class="new-component">
          <h2 class="new-component__title">VlalgImageComparison</h2>
          <p>com propWidth (500) e propHeight (300)</p>
          <VlalgImageComparison propId="baseimagecomparison" propImageLeft="https://www.w3schools.com/howto/img_forest.jpg" propImageRight="https://www.w3schools.com/howto/img_snow.jpg" :propWidth="500" :propHeight="300" /><br><br>
          <p>com propSliderOpacity (1)</p>
          <VlalgImageComparison propId="baseimagecomparison" propImageLeft="https://www.w3schools.com/howto/img_forest.jpg" propImageRight="https://www.w3schools.com/howto/img_snow.jpg" :propWidth="500" :propHeight="300" /><br><br>
          <p>com propTheme</p>
          <VlalgImageComparison propId="baseimagecomparison" propImageLeft="https://www.w3schools.com/howto/img_forest.jpg" propImageRight="https://www.w3schools.com/howto/img_snow.jpg" :propWidth="300" :propHeight="200" propTheme="normal" />
          <VlalgImageComparison propId="baseimagecomparison" propImageLeft="https://www.w3schools.com/howto/img_forest.jpg" propImageRight="https://www.w3schools.com/howto/img_snow.jpg" :propWidth="300" :propHeight="200" propTheme="primary" />
          <VlalgImageComparison propId="baseimagecomparison" propImageLeft="https://www.w3schools.com/howto/img_forest.jpg" propImageRight="https://www.w3schools.com/howto/img_snow.jpg" :propWidth="300" :propHeight="200" propTheme="success" />
          <VlalgImageComparison propId="baseimagecomparison" propImageLeft="https://www.w3schools.com/howto/img_forest.jpg" propImageRight="https://www.w3schools.com/howto/img_snow.jpg" :propWidth="300" :propHeight="200" propTheme="info" />
          <VlalgImageComparison propId="baseimagecomparison" propImageLeft="https://www.w3schools.com/howto/img_forest.jpg" propImageRight="https://www.w3schools.com/howto/img_snow.jpg" :propWidth="300" :propHeight="200" propTheme="warn" />
          <VlalgImageComparison propId="baseimagecomparison" propImageLeft="https://www.w3schools.com/howto/img_forest.jpg" propImageRight="https://www.w3schools.com/howto/img_snow.jpg" :propWidth="300" :propHeight="200" propTheme="danger" />
          <VlalgImageComparison propId="baseimagecomparison" propImageLeft="https://www.w3schools.com/howto/img_forest.jpg" propImageRight="https://www.w3schools.com/howto/img_snow.jpg" :propWidth="300" :propHeight="200" propTheme="dark" />
          <VlalgImageComparison propId="baseimagecomparison" propImageLeft="https://www.w3schools.com/howto/img_forest.jpg" propImageRight="https://www.w3schools.com/howto/img_snow.jpg" :propWidth="300" :propHeight="200" propTheme="light" />
        </div>

        <div v-else-if="currentComponent === 'VlalgImage'" class="new-component">
          <h2 class="new-component__title">VlalgImage</h2>
          <p>com propSrc</p>
          <VlalgImage propId="baseimage1" propSrc="http://static4.gamespot.com/uploads/scale_tiny/1197/11970954/2889858-halo5_boxshots_xb1_fob_rgb_rp.jpg" propDisplay="inlineBlock" /><br><br>

          <p>com propDisplay (inline-block)</p>
          <VlalgImage propId="baseimage2" propSrc="http://static4.gamespot.com/uploads/scale_tiny/1197/11970954/2889858-halo5_boxshots_xb1_fob_rgb_rp.jpg" propDisplay="inlineBlock" />asdsa<br><br>

          <p>com propDisplay (inline)</p>
          <VlalgImage propId="baseimage3" propSrc="http://static4.gamespot.com/uploads/scale_tiny/1197/11970954/2889858-halo5_boxshots_xb1_fob_rgb_rp.jpg" propDisplay="inline" />asdsa<br><br>

          <p>com propDisplay (block)</p>
          <VlalgImage propId="baseimage4" propSrc="http://static4.gamespot.com/uploads/scale_tiny/1197/11970954/2889858-halo5_boxshots_xb1_fob_rgb_rp.jpg" propDisplay="block" />asdsa<br><br>

          <p>com propImageType (none)</p>
          <VlalgImage propId="baseimage4" propSrc="http://static4.gamespot.com/uploads/scale_tiny/1197/11970954/2889858-halo5_boxshots_xb1_fob_rgb_rp.jpg" propDisplay="inlineBlock" propImageType="none" /><br><br>

          <p>com propImageType (rounded)</p>
          <VlalgImage propId="baseimage5" propSrc="http://static4.gamespot.com/uploads/scale_tiny/1197/11970954/2889858-halo5_boxshots_xb1_fob_rgb_rp.jpg" propDisplay="inlineBlock" propImageType="rounded" /><br><br>

          <p>com propImageType (circle)</p>
          <VlalgImage propId="baseimage6" propSrc="http://static4.gamespot.com/uploads/scale_tiny/1197/11970954/2889858-halo5_boxshots_xb1_fob_rgb_rp.jpg" propDisplay="inlineBlock" propImageType="circle" /><br><br>

          <p>com propTheme (normal)</p>
          <VlalgImage propId="baseimage7" propSrc="http://static4.gamespot.com/uploads/scale_tiny/1197/11970954/2889858-halo5_boxshots_xb1_fob_rgb_rp.jpg" propDisplay="inlineBlock" propImageType="circle" :propBorder="10" propTheme="normal" /><br><br>

          <p>com propTheme (primary)</p>
          <VlalgImage propId="baseimage8" propSrc="http://static4.gamespot.com/uploads/scale_tiny/1197/11970954/2889858-halo5_boxshots_xb1_fob_rgb_rp.jpg" propDisplay="inlineBlock" propImageType="circle" :propBorder="10" propTheme="primary" /><br><br>

          <p>com propTheme (success)</p>
          <VlalgImage propId="baseimage9" propSrc="http://static4.gamespot.com/uploads/scale_tiny/1197/11970954/2889858-halo5_boxshots_xb1_fob_rgb_rp.jpg" propDisplay="inlineBlock" propImageType="circle" :propBorder="10" propTheme="success" /><br><br>

          <p>com propTheme (info)</p>
          <VlalgImage propId="baseimage10" propSrc="http://static4.gamespot.com/uploads/scale_tiny/1197/11970954/2889858-halo5_boxshots_xb1_fob_rgb_rp.jpg" propDisplay="inlineBlock" propImageType="circle" :propBorder="10" propTheme="info" /><br><br>

          <p>com propTheme (warn)</p>
          <VlalgImage propId="baseimage11" propSrc="http://static4.gamespot.com/uploads/scale_tiny/1197/11970954/2889858-halo5_boxshots_xb1_fob_rgb_rp.jpg" propDisplay="inlineBlock" propImageType="circle" :propBorder="10" propTheme="warn" /><br><br>

          <p>com propTheme (danger)</p>
          <VlalgImage propId="baseimage12" propSrc="http://static4.gamespot.com/uploads/scale_tiny/1197/11970954/2889858-halo5_boxshots_xb1_fob_rgb_rp.jpg" propDisplay="inlineBlock" propImageType="circle" :propBorder="10" propTheme="danger" /><br><br>

          <p>com propTheme (dark)</p>
          <VlalgImage propId="baseimage13" propSrc="http://static4.gamespot.com/uploads/scale_tiny/1197/11970954/2889858-halo5_boxshots_xb1_fob_rgb_rp.jpg" propDisplay="inlineBlock" propImageType="circle" :propBorder="10" propTheme="dark" /><br><br>

          <p>com propTheme (light)</p>
          <VlalgImage propId="baseimage14" propSrc="http://static4.gamespot.com/uploads/scale_tiny/1197/11970954/2889858-halo5_boxshots_xb1_fob_rgb_rp.jpg" propDisplay="inlineBlock" propImageType="circle" :propBorder="10" propTheme="light" /><br><br>

          <p>com propSize (100x100)</p>
          <VlalgImage propId="baseimage15" propSrc="http://static4.gamespot.com/uploads/scale_tiny/1197/11970954/2889858-halo5_boxshots_xb1_fob_rgb_rp.jpg" propDisplay="inlineBlock" propImageType="circle" :propBorder="10" propTheme="light" propSize="100x100" /><br><br>

          <p>com propSize (100x100) propSizeType (pixel)</p>
          <VlalgImage propId="baseimage16" propSrc="http://static4.gamespot.com/uploads/scale_tiny/1197/11970954/2889858-halo5_boxshots_xb1_fob_rgb_rp.jpg" propDisplay="inlineBlock" propImageType="circle" :propBorder="10" propTheme="light" propSize="100x100" propSizeType="pixel" /><br><br>

          <p>com propSize (75x75) propSizeType (percent)</p>
          <VlalgImage propId="baseimage17" propSrc="http://static4.gamespot.com/uploads/scale_tiny/1197/11970954/2889858-halo5_boxshots_xb1_fob_rgb_rp.jpg" propDisplay="inlineBlock" propImageType="circle" :propBorder="10" propTheme="light" propSize="75x75" propSizeType="percent" /><br><br>

          <p>com propSizeType (responsive)</p>
          <div>
            <VlalgImage propId="baseimage18" propSrc="http://static4.gamespot.com/uploads/scale_tiny/1197/11970954/2889858-halo5_boxshots_xb1_fob_rgb_rp.jpg" propDisplay="inlineBlock" propImageType="circle" :propBorder="10" propTheme="light" propSize="75x75" propSizeType="responsive" propActionType="func" @base-image-clicked="imageClicked($event)" />
          </div><br><br>

          <p>com propActionType (link)</p>
          <VlalgImage propId="baseimage20" propSrc="http://static4.gamespot.com/uploads/scale_tiny/1197/11970954/2889858-halo5_boxshots_xb1_fob_rgb_rp.jpg" propDisplay="inlineBlock" propImageType="circle" :propBorder="10" propTheme="light" propSize="75x75" propSizeType="percent" propActionType="link" /><br><br>

          <p>com propActionType (func)</p>
          <VlalgImage propId="baseimage21" propSrc="http://static4.gamespot.com/uploads/scale_tiny/1197/11970954/2889858-halo5_boxshots_xb1_fob_rgb_rp.jpg" propDisplay="inlineBlock" propImageType="circle" :propBorder="10" propTheme="light" propSize="75x75" propSizeType="percent" propActionType="func" @base-image-clicked="imageClicked($event)" />
        </div>

        <div v-else-if="currentComponent === 'VlalgImageZoom'" class="new-component">
          <h2 class="new-component__title">VlalgImageZoom</h2>
          <p>com propDisplay (inlineBlock)</p>
          <VlalgImageZoom propId="baseimagezoom1" propSrc="https://www.w3schools.com/howto/img_girl.jpg" propDisplay="inlineBlock" />asdasdas<br><br>

          <p>com propDisplay (block)</p>
          <VlalgImageZoom propId="baseimagezoom2" propSrc="https://www.w3schools.com/howto/img_girl.jpg" propDisplay="block" />asdadads<br><br>

          <p>com propImageType (rounded)</p>
          <VlalgImageZoom propId="baseimagezoom3" propSrc="https://www.w3schools.com/howto/img_girl.jpg" propDisplay="block" propImageType="rounded" /><br><br>

          <p>com propLensBorder (5)</p>
          <VlalgImageZoom propId="baseimagezoom4" propSrc="https://www.w3schools.com/howto/img_girl.jpg" propDisplay="block" :propLensBorder="5" /><br><br>

          <p>com propTheme</p>
          <VlalgImageZoom propId="baseimagezoom4" propSrc="https://www.w3schools.com/howto/img_girl.jpg" propDisplay="block" :propLensBorder="5" propTheme="normal" /><br>
          <VlalgImageZoom propId="baseimagezoom4" propSrc="https://www.w3schools.com/howto/img_girl.jpg" propDisplay="block" :propLensBorder="5" propTheme="primary" /><br>
          <VlalgImageZoom propId="baseimagezoom4" propSrc="https://www.w3schools.com/howto/img_girl.jpg" propDisplay="block" :propLensBorder="5" propTheme="success" /><br>
          <VlalgImageZoom propId="baseimagezoom4" propSrc="https://www.w3schools.com/howto/img_girl.jpg" propDisplay="block" :propLensBorder="5" propTheme="info" /><br>
          <VlalgImageZoom propId="baseimagezoom4" propSrc="https://www.w3schools.com/howto/img_girl.jpg" propDisplay="block" :propLensBorder="5" propTheme="warn" /><br>
          <VlalgImageZoom propId="baseimagezoom4" propSrc="https://www.w3schools.com/howto/img_girl.jpg" propDisplay="block" :propLensBorder="5" propTheme="danger" /><br>
          <VlalgImageZoom propId="baseimagezoom4" propSrc="https://www.w3schools.com/howto/img_girl.jpg" propDisplay="block" :propLensBorder="5" propTheme="dark" /><br>
          <VlalgImageZoom propId="baseimagezoom4" propSrc="https://www.w3schools.com/howto/img_girl.jpg" propDisplay="block" :propLensBorder="5" propTheme="light" />
        </div>

        <div v-else-if="currentComponent === 'VlalgNewsletterPopUp'" class="new-component">
          <VlalgNewsletterPopUp propId="basenewsletterpopup" :propShow="mostraVlalgNewsletterPopUp" :propCanOverlayClose="false" propSrc="https://www.w3schools.com/howto/img_girl.jpg" propTheme="dark" propCloseButtonTheme="primary" propDontShowMoreTheme="primary" propBorderRadius="5px" :propDontShowMoreIsVisible="true" propDontShowMoreText="Não mostrar este popup novamente" propInputNameFirstPlaceholder="Nome" propInputNameLastPlaceholder="Sobrenome" propSubButtonText="ASSINAR" propInputActiveStyle="italic" propInputSizeMediaQuery="sm" propInputTheme="dark" :propInputUppercase="false" :propInputNameFirstRequired="true" :propInputNameLastRequired="true" propInputBorderRadius="5px" propSubButtonBorderRadius="5px" propSubButtonTheme="dark" :propFetchStatusErrorCode="[422,400]" :propFetchStatusSuccessCode="[200,201]" :propFetchUrl="baseNewsletterPopUpFetchUrl" :propFetchConfig="baseNewsletterPopUpFetchConfig" @close-base-newsletter-popup="baseNewsletterPopUpClose($event)" />
          <a @click.prevent="mostraVlalgNewsletterPopUp = true" class="btn btn-primary skip" style="padding:6px 15px; background:#333; color:#fff; text-decoration:none; font-family:poppins; border-radius:3px; display:inline-block;">OPEN POPUP</a>
        </div>

        <div v-else-if="currentComponent === 'VlalgModal'" class="new-component">
          <VlalgModal propId="baseModal" :propShow="mostraVlalgModal" :propCanOverlayClose="false" propTheme="dark" propCloseButtonTheme="primary" propBorderRadius="5px" @close-base-modal="baseModalClose($event)">
            <p data-slot="header">Titulo</p>

            <div data-slot="content">
              <ul>
                <li>Item 1</li>
                <li>Item 2</li>
              </ul>
            </div>

            <p data-slot="footer" style="padding: 10px">Rodapé</p>
          </VlalgModal>
          <a @click.prevent="mostraVlalgModal = true" class="btn btn-primary skip" style="padding:6px 15px; background:#333; color:#fff; text-decoration:none; font-family:poppins; border-radius:3px; display:inline-block;">OPEN MODAL</a>
        </div>

        <div v-else-if="currentComponent === 'VlalgTable'" class="new-component">
          <VlalgTable
            propId="basetable"
            propCaption="Legenda tabela"
            propCaptionDirection="center"
            propCaptionPosition="top"
            propBorder="all"
            propTitleAlign="left"
            propTitleTransform="capitalize"
            propTitleStyle="normal"
            propTitleBold
            propTitleSortable
            propTitleSortableColor="yellow"
            :propFields="table.fields"
            :propFieldsAllowSort="table.fieldsAllowSort"
            :propReturnField="table.returnField"
            :propSortType="table.sortType"
            :propSortField="table.sortField"
            :propTableMarginTop="10"
            :propTableMarginBottom="10"
            :propTableMarginLeft="5"
            :propTableMarginRight="5"
            :propRecordsPerPage="table.perPageOptions"
            :propRecordsTotal="table.metadata.count"
            :propRecordCurrentPage="table.metadata.currentPage"
            :propRecordPages="table.metadata.pages"
            :propRecordPerPages="table.metadata.perPages"
            propRecordTotalSeparator="de"
            :propLoading="table.loading"
            :propLoaderType="table.loaderType"
            propTheme="success"
            :propItems="table.items"
            :propHasError="table.hasError"
            :propErrorMessage="table.errorMessage"
            @change-sort="changeSort($event)"
            @change-page="changePage($event)"
            @change-perpage="changePerPage($event)"
            @clicked="tableItemClicled($event)"
          />
        </div>

        <div v-else-if="currentComponent === 'VlalgSelect'" class="new-component">
          <p>com propTheme</p>
          <VlalgSelect propId="baseSelect" :propOptions="selectOptions" :propSelectedItem="selectedItem" propTheme="normal" :propDisabled="false" :propWidth="350" @change-selected="changeSelectedItem($event)" />
          <VlalgSelect propId="baseSelect2" :propOptions="selectOptions" :propSelectedItem="selectedItem" propTheme="primary" :propDisabled="false" :propWidth="350" @change-selected="changeSelectedItem($event)" />
          <VlalgSelect propId="baseSelect3" :propOptions="selectOptions" :propSelectedItem="selectedItem" propTheme="success" :propDisabled="false" :propWidth="350" @change-selected="changeSelectedItem($event)" />
          <VlalgSelect propId="baseSelect4" :propOptions="selectOptions" :propSelectedItem="selectedItem" propTheme="info" :propDisabled="false" :propWidth="350" @change-selected="changeSelectedItem($event)" />
          <VlalgSelect propId="baseSelect5" :propOptions="selectOptions" :propSelectedItem="selectedItem" propTheme="warn" :propDisabled="false" :propWidth="350" @change-selected="changeSelectedItem($event)" />
          <VlalgSelect propId="baseSelect6" :propOptions="selectOptions" :propSelectedItem="selectedItem" propTheme="danger" :propDisabled="false" :propWidth="350" @change-selected="changeSelectedItem($event)" />
          <VlalgSelect propId="baseSelect7" :propOptions="selectOptions" :propSelectedItem="selectedItem" propTheme="dark" :propDisabled="false" :propWidth="350" @change-selected="changeSelectedItem($event)" />
          <VlalgSelect propId="baseSelect8" :propOptions="selectOptions" :propSelectedItem="selectedItem" propTheme="light" :propDisabled="false" :propWidth="350" @change-selected="changeSelectedItem($event)" />
          <p>com propDisabled</p>
          <VlalgSelect propId="baseSelect9" :propOptions="selectOptions" :propSelectedItem="selectedItem" propTheme="normal" :propDisabled="true" :propWidth="350" @change-selected="changeSelectedItem($event)" />
          <VlalgSelect propId="baseSelect10" :propOptions="selectOptions" :propSelectedItem="selectedItem" propTheme="primary" :propDisabled="true" :propWidth="350" @change-selected="changeSelectedItem($event)" />
          <VlalgSelect propId="baseSelect11" :propOptions="selectOptions" :propSelectedItem="selectedItem" propTheme="success" :propDisabled="true" :propWidth="350" @change-selected="changeSelectedItem($event)" />
          <VlalgSelect propId="baseSelect12" :propOptions="selectOptions" :propSelectedItem="selectedItem" propTheme="info" :propDisabled="true" :propWidth="350" @change-selected="changeSelectedItem($event)" />
          <VlalgSelect propId="baseSelect13" :propOptions="selectOptions" :propSelectedItem="selectedItem" propTheme="warn" :propDisabled="true" :propWidth="350" @change-selected="changeSelectedItem($event)" />
          <VlalgSelect propId="baseSelect14" :propOptions="selectOptions" :propSelectedItem="selectedItem" propTheme="danger" :propDisabled="true" :propWidth="350" @change-selected="changeSelectedItem($event)" />
          <VlalgSelect propId="baseSelect15" :propOptions="selectOptions" :propSelectedItem="selectedItem" propTheme="dark" :propDisabled="true" :propWidth="350" @change-selected="changeSelectedItem($event)" />
          <VlalgSelect propId="baseSelect16" :propOptions="selectOptions" :propSelectedItem="selectedItem" propTheme="light" :propDisabled="true" :propWidth="350" @change-selected="changeSelectedItem($event)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import helpersQueries from '@helpersQueries'
const { teste } = helpersQueries

import { tableChangeSort, tableChangeInfos, tableFormatResult } from '@helpers/tableFunctions.js'

const VlalgAlerts = () => import('@components/fragments/VlalgAlerts')
const VlalgInput = () => import('@components/fragments/VlalgInput')
const VlalgInputLine = () => import('@components/fragments/VlalgInputLine')
const VlalgInputBorder = () => import('@components/fragments/VlalgInputBorder')
const VlalgBlockquote = () => import('@components/fragments/VlalgBlockquote')
const VlalgTabs = () => import('@components/fragments/VlalgTabs')
const VlalgZoom = () => import('@components/fragments/VlalgZoom')
const VlalgSwitch = () => import('@components/fragments/VlalgSwitch')
const VlalgTooltip = () => import('@components/fragments/VlalgTooltip')
const VlalgRadio = () => import('@components/fragments/VlalgRadio')
const VlalgFlipBox = () => import('@components/fragments/VlalgFlipBox')
const VlalgHr = () => import('@components/fragments/VlalgHr')
const VlalgTextarea = () => import('@components/fragments/VlalgTextarea')
const VlalgEmphasi = () => import('@components/fragments/VlalgEmphasi')
const VlalgMark = () => import('@components/fragments/VlalgMark')
const VlalgLoader = () => import('@components/fragments/VlalgLoader')
const VlalgSnackbar = () => import('@components/fragments/VlalgSnackbar')
const VlalgGoTopButton = () => import('@components/fragments/VlalgGoTopButton')
const VlalgList = () => import('@components/fragments/VlalgList')
const VlalgProgressBar = () => import('@components/fragments/VlalgProgressBar')
const VlalgImageComparison = () => import('@components/fragments/VlalgImageComparison')
const VlalgImage = () => import('@components/fragments/VlalgImage')
const VlalgImageZoom = () => import('@components/fragments/VlalgImageZoom')
const VlalgNewsletterPopUp = () => import('@components/fragments/VlalgNewsletterPopUp')
const VlalgToggle = () => import('@components/fragments/VlalgToggle')
const VlalgModal = () => import('@components/fragments/VlalgModal')
const VlalgTable = () => import('@components/fragments/VlalgTable')
const VlalgSelect = () => import('@components/fragments/VlalgSelect')

export default {
  name: 'ComponentPage',
  metaInfo: {
    title: 'Component Page',
    link: [
      { rel: 'canonical', href: `${process.env.VUE_APP_BASE}/components` }
    ]
  },
  beforeCreate () {},
  created () {},
  beforeMount () {},
  async mounted () {
    await this.getTableItens()
  },
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {},
  components: {
    VlalgAlerts,
    VlalgInput,
    VlalgInputLine,
    VlalgInputBorder,
    VlalgBlockquote,
    VlalgTabs,
    VlalgZoom,
    VlalgAccordion,
    VlalgSwitch,
    VlalgTooltip,
    VlalgRadio,
    VlalgFlipBox,
    VlalgHr,
    VlalgTextarea,
    VlalgEmphasi,
    VlalgMark,
    VlalgLoader,
    VlalgSnackbar,
    VlalgGoTopButton,
    VlalgList,
    VlalgProgressBar,
    VlalgImageComparison,
    VlalgImage,
    VlalgImageZoom,
    VlalgNewsletterPopUp,
    VlalgToggle,
    VlalgModal,
    VlalgTable,
    VlalgSelect
  },
  data () {
    return {
      components: {
        current: 'VlalgAlerts',
        list: {
          VlalgAlerts: true,
          VlalgInput: false,
          VlalgInputLine: false,
          VlalgInputBorder: false,
          VlalgBlockquote: false,
          VlalgTabs: false,
          VlalgZoom: false,
          VlalgAccordion: false,
          VlalgSwitch: false,
          VlalgTooltip: false,
          VlalgRadio: false,
          VlalgFlipBox: false,
          VlalgHr: false,
          VlalgTextarea: false,
          VlalgEmphasi: false,
          VlalgMark: false,
          VlalgLoader: false,
          VlalgSnackbar: false,
          VlalgGoTopButton: false,
          VlalgList: false,
          VlalgProgressBar: false,
          VlalgImageComparison: false,
          VlalgImage: false,
          VlalgImageZoom: false,
          VlalgNewsletterPopUp: false,
          VlalgToggle: false,
          VlalgModal: false,
          VlalgTable: false,
          VlalgSelect: false
        }
      },
      dataTestVlalgAlert: {},
      baseInputValorAtual: '',
      baseInputLineValorAtual: '',
      baseInputBorderValorAtual: '',
      numberButtonClicked: 0,
      mostraVlalgNewsletterPopUp: false,
      mostraVlalgModal: false,
      baseNewsletterPopUpFetchConfig: {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      },
      switch1: false,
      switch2: false,
      switch3: false,
      switch4: false,
      switch5: false,
      switch6: false,
      switch7: false,
      switch8: false,
      switch9: false,
      switch10: false,
      switch11: false,
      switch12: false,
      switch13: false,
      switch14: false,
      switch15: false,
      switch16: false,
      switch17: true,
      switch18: false,
      switch19: false,
      switch20: false,
      switch21: false,
      switch22: false,
      switch23: false,
      switch24: false,
      switch25: false,
      switch26: false,
      switch27: false,
      switch28: false,
      valueToggle: false,
      msgTooltipXs: 'Tooltip text',
      msgTooltipSm: 'Tooltip text asd asd asda',
      msgTooltipMd: 'Tooltip text asd asd asda sdasdasdas asdas Tooltip text asd asd',
      msgTooltipLg: 'Tooltip text asd asd asda sdasdasdas asdas Tooltip text asd asd asda sdasdasdas asdas Tooltip text asd asd asda sdasdasdas asdas',
      baseRadio1ValorAtual: null,
      baseRadio2ValorAtual: null,
      baseRadio3ValorAtual: null,
      baseRadio4ValorAtual: null,
      baseRadio5ValorAtual: null,
      baseRadio6ValorAtual: null,
      baseRadio7ValorAtual: null,
      baseRadio8ValorAtual: null,
      baseRadio16ValorAtual: null,
      baseRadio17ValorAtual: null,
      baseRadio18ValorAtual: null,
      baseRadio19ValorAtual: null,
      radio1: [
        {
          value: 'dog',
          text: 'Cachorro'
        },
        {
          value: 'cat',
          text: 'Gato'
        },
        {
          value: 'fish',
          text: 'Peixe'
        }
      ],
      radio2: [
        {
          value: 'dog',
          text: 'Cachorro'
        },
        {
          value: 'fish',
          text: 'Peixe'
        }
      ],
      radio3: [
        {
          value: 'fish',
          text: 'Peixe'
        }
      ],
      baseTextareaValorAtual: 'asdasdas asda sdasd asd asdas asdasdas asda sdasd asd asdas asdasdas asda sdasd asd asdas asdasdas asda sdasd asd asdas asdasdas asda sdasd asd asdas asdasdas asda sdasd asd asdas',
      baseTextarea2ValorAtual: 'asdasdas asda sdasd asd asdas asdasdas asda sdasd asd asdas asdasdas asda sdasd asd asdas asdasdas asda sdasd asd asdas asdasdas asda sdasd asd asdas asdasdas asda sdasd asd asdas',
      baseTextarea3ValorAtual: 'asdasdas asda sdasd asd asdas asdasdas asda sdasd asd asdas asdasdas asda sdasd asd asdas asdasdas asda sdasd asd asdas asdasdas asda sdasd asd asdas asdasdas asda sdasd asd asdas',
      baseTextarea4ValorAtual: 'asdasdas asda sdasd',
      baseTextarea5ValorAtual: 'asdasdas asda sdasd asd asdas asdasdas asda sdasd asd asdas asdasdas asda sdasd asd asdas asdasdas asda sdasd asd asdas asdasdas asda sdasd asd asdas asdasdas asda sdasd asd asdas',
      baseTextarea6ValorAtual: 'asdasdas asda sdasd asd asdas asdasdas asda sdasd asd asdas asdasdas asda sdasd asd asdas asdasdas asda sdasd asd asdas asdasdas asda sdasd asd asdas asdasdas asda sdasd asd asdas',
      baseTextarea7ValorAtual: 'asdasdas asda sdasd asd asdas asdasdas asda sdasd asd asdas asdasdas asda sdasd asd asdas asdasdas asda sdasd asd asdas asdasdas asda sdasd asd asdas asdasdas asda sdasd asd asdas',
      baseLoaderTheme: 'normal',
      mostraSnackbar: false,
      listArray: [
        'item 1',
        'item 2',
        'item 3',
        'item 4',
        'item 5',
        'item 6',
        'item 7'
      ],
      listArray2: [
        'item 1',
        'item 2',
        'item 3',
        'item 4'
      ],
      progressBarValue: 60,
      progressBarMaxValue: 100,
      table: {
        items: [],
        sortType: 'desc',
        sortField: 'status',
        sort: 'status',
        fields: [
          ['_id', 'ID'],
          ['email', 'Email'],
          ['user', 'Usuario'],
          ['name', 'Nome'],
          ['status', 'Status'],
          ['created_at', 'Data Criação'],
          ['updated_at', 'Data Atualização']
        ],
        fieldsAllowSort: ['_id', 'email', 'name', 'user', 'status'],
        returnField: '_id',
        perPageOptions: [5, 7, 10, 15, 20, 25, 50, 100],
        metadata: {
          count: 0,
          currentPage: 0,
          pages: 0,
          perPages: 5
        },
        page: 1,
        loading: false,
        loaderType: 'dots',
        hasError: false,
        errorMessage: 'Nenhum item encontrado'
      },
      selectOptions: [
        { value: '1', text: 'Anima asasd asdasd asd asd asd asdasdasdasdasasdl' },
        { value: '2', text: 'Fruta' },
        { value: '3', text: 'Veiculo' },
        { value: '4', text: 'Vestuario' },
        { value: '5', text: 'Carne' },
        { value: '6', text: 'Outros' },
        { value: '7', text: 'Outros' },
        { value: '8', text: 'Outros' },
        { value: '9', text: 'Outros' },
        { value: '10', text: 'Outros' },
        { value: '11', text: 'Outros' },
        { value: '12', text: 'Outros' },
        { value: '13', text: 'Outros' },
        { value: '14', text: 'Outros' },
        { value: '15', text: 'Outros' },
        { value: '16', text: 'Outros' },
        { value: '17', text: 'Outros' },
        { value: '18', text: 'Outros' },
        { value: '19', text: 'Outros' },
        { value: '20', text: 'Outros' },
        { value: '21', text: 'Outros' },
        { value: '22', text: 'Outros' },
        { value: '23', text: 'Outros' },
        { value: '24', text: 'Outros' },
        { value: '25', text: 'Outros' },
        { value: '26', text: 'Outros' },
        { value: '27', text: 'Outros' },
        { value: '28', text: 'Outros' },
        { value: '29', text: 'Outros' },
        { value: '30', text: 'Outros' },
        { value: '31', text: 'Outros' },
        { value: '32', text: 'Outros' },
        { value: '33', text: 'Outros' },
        { value: '34', text: 'Outros' },
        { value: '35', text: 'Outros' },
        { value: '36', text: 'Outros' },
        { value: '37', text: 'Outros' },
        { value: '38', text: 'Outros' },
        { value: '39', text: 'Outros' },
        { value: '40', text: 'Outros' },
        { value: '41', text: 'Outros' }
      ],
      selectedItem: '1'
    }
  },
  computed: {
    currentComponent () {
      return this.components.current
    },
    baseNewsletterPopUpFetchUrl () {
      return process.env.VUE_APP_REST_API_V1_NEWSLETTER
    }
  },
  methods: {
    mostra (value) {
      const current = this.currentComponent

      if (current !== value) {
        this.components.list[current] = false
        this.components.list[value] = true
        this.components.current = value
      }
    },
    inputValue (refValue, eventValue) {
      if (refValue === 'baseinput22') {
        this.baseInputValorAtual = eventValue
      } else if (refValue === 'baseinputline21') {
        this.baseInputLineValorAtual = eventValue
      } else if (refValue === 'baseinputborder23') {
        this.baseInputBorderValorAtual = eventValue
      }
    },
    clickedButton (eventValue) {
      this.numberButtonClicked += 1
    },
    simularAlertas () {
      this.dataTestVlalgAlert = {
        error: [
          'Alguma coisa',
          'Alguma outra coisa',
          'Alguma outra coisa novamente'
        ],
        success: [
          'Alguma coisa',
          'Alguma outra coisa'
        ],
        warn: [
          'Alguma outra coisa novamente'
        ],
        info: [
          'Alguma coisa',
          'Alguma outra coisa'
        ]
      }
    },
    limparAlertas () {
      this.dataTestVlalgAlert = {}
    },
    changeHasAlert (value) {
      this.dataTestVlalgAlert = {}
    },
    toggleValue (refValue, eventValue) {
      this.valueToggle = eventValue
    },
    switchValue (refValue, eventValue) {
      switch (refValue) {
        case 'switch2':
          this.switch2 = eventValue
          break
        case 'switch3':
          this.switch3 = eventValue
          break
        case 'switch4':
          this.switch4 = eventValue
          break
        case 'switch5':
          this.switch5 = eventValue
          break
        case 'switch6':
          this.switch6 = eventValue
          break
        case 'switch7':
          this.switch7 = eventValue
          break
        case 'switch8':
          this.switch8 = eventValue
          break
        case 'switch9':
          this.switch9 = eventValue
          break
        case 'switch10':
          this.switch10 = eventValue
          break
        case 'switch11':
          this.switch11 = eventValue
          break
        case 'switch12':
          this.switch12 = eventValue
          break
        case 'switch13':
          this.switch13 = eventValue
          break
        case 'switch14':
          this.switch14 = eventValue
          break
        case 'switch15':
          this.switch15 = eventValue
          break
        case 'switch16':
          this.switch16 = eventValue
          break
        case 'switch17':
          this.switch17 = eventValue
          break
        case 'switch18':
          this.switch18 = eventValue
          break
        case 'switch19':
          this.switch19 = eventValue
          break
        case 'switch20':
          this.switch20 = eventValue
          break
        case 'switch21':
          this.switch21 = eventValue
          break
        case 'switch22':
          this.switch22 = eventValue
          break
        case 'switch23':
          this.switch23 = eventValue
          break
        case 'switch24':
          this.switch24 = eventValue
          break
        case 'switch25':
          this.switch25 = eventValue
          break
        case 'switch26':
          this.switch26 = eventValue
          break
        case 'switch27':
          this.switch27 = eventValue
          break
        case 'switch28':
          this.switch28 = eventValue
          break
        default:
          this.switch1 = eventValue
          break
      }
    },
    radioValue (refValue, eventValue) {
      if (refValue === 'baseradio1') {
        this.baseRadio1ValorAtual = eventValue
      } else if (refValue === 'baseradio2') {
        this.baseRadio2ValorAtual = eventValue
      } else if (refValue === 'baseradio3') {
        this.baseRadio3ValorAtual = eventValue
      } else if (refValue === 'baseradio4') {
        this.baseRadio4ValorAtual = eventValue
      } else if (refValue === 'baseradio5') {
        this.baseRadio5ValorAtual = eventValue
      } else if (refValue === 'baseradio6') {
        this.baseRadio6ValorAtual = eventValue
      } else if (refValue === 'baseradio7') {
        this.baseRadio7ValorAtual = eventValue
      } else if (refValue === 'baseradio8') {
        this.baseRadio8ValorAtual = eventValue
      } else if (refValue === 'baseradio16') {
        this.baseRadio16ValorAtual = eventValue
      } else if (refValue === 'baseradio17') {
        this.baseRadio17ValorAtual = eventValue
      } else if (refValue === 'baseradio18') {
        this.baseRadio18ValorAtual = eventValue
      } else if (refValue === 'baseradio19') {
        this.baseRadio19ValorAtual = eventValue
      }
    },
    textareaValue (refValue, eventValue) {
      if (refValue === 'basetextarea1') {
        this.baseTextareaValorAtual = eventValue
      } else if (refValue === 'basetextarea2') {
        this.baseTextarea2ValorAtual = eventValue
      } else if (refValue === 'basetextarea3') {
        this.baseTextarea3ValorAtual = eventValue
      } else if (refValue === 'basetextarea4') {
        this.baseTextarea4ValorAtual = eventValue
      } else if (refValue === 'basetextarea12') {
        this.baseTextarea5ValorAtual = eventValue
      } else if (refValue === 'basetextarea13') {
        this.baseTextarea6ValorAtual = eventValue
      } else if (refValue === 'basetextarea14') {
        this.baseTextarea7ValorAtual = eventValue
      }
    },
    changeVlalgLoaderTheme (value) {
      this.baseLoaderTheme = value
    },
    atualizaSnackbar () {
      this.mostraSnackbar = true
    },
    removeSnackbar (event) {
      this.mostraSnackbar = false
    },
    upProgressBar () {
      if (this.progressBarValue < this.progressBarMaxValue) this.progressBarValue += 1
    },
    downProgressBar () {
      if (this.progressBarValue > 0) this.progressBarValue -= 1
    },
    imageClicked (event) {
      console.log('baseImage clicada -> ', event)
    },
    baseNewsletterPopUpClose (e) {
      console.log('recebi o fechamento mostraVlalgNewsletterPopUp --> ', e)
      this.mostraVlalgNewsletterPopUp = false
    },
    baseModalClose (e) {
      this.mostraVlalgModal = false
    },
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
      const keysValuesToFormat = [
        ['status', 'name']
      ]

      if (result.status === 'success') {
        this.table.items = tableFormatResult(result.data.results, keysValuesToFormat, this.table.fields)
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
    },
    changeSelectedItem (event) {
      this.selectedItem = event
    }
  },
  filters: {},
  watch: {
    currentComponent (newValue, oldValue) {
      if (newValue !== oldValue && newValue === 'VlalgTable') this.getTableItens()
    }
  }
}
</script>

<style scoped lang="scss">
.components {
  // color: rgba(#f8f8f2, 0.7);
  .new-component {
    margin-top: 30px;
    margin-bottom: 80px;

    .new-component__title {
      margin-bottom: 20px;
    }
  }
}
</style>
