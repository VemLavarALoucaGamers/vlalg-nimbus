<!-- Use preprocessors via the lang attribute! e.g. <template lang="pug"> -->
  <template>
    <div id="app">
      {{ selected }}
      <div
        class="slide-nav slide-nav--numbered-expand slide-nav--dropdown slide-nav--area-media slide-page__nav"
      >
        <div aria-busy="true" class="slide-nav__inner" role="tablist">
          <div class="slide-nav__items slide-nav__items--align-end">
            <div class="px-fit slide-nav__fit slide-nav__fit--align-end">
              <div class="px-fit__outer" style="">
                <div class="slide-nav__nav-items slide-nav__nav-items--align-end">
                  <button
                    aria-label="Barra de borda"
                    role="tab"
                    class="slide-nav__nav-item slide-nav__nav-item--nav slide-nav__nav-item--fit-lg"
                    :class="[
                      selected === 1 ? 'slide-nav__nav-item--selected' : ''
                    ]"
                    @click="changeSelected(1)"
                    data-bi-id="Link-Navigate-Navbar-EdgeBar"
                  >
                    <span class="slide-nav__nav-item-counter">1.</span>
                    <span
                      aria-hidden="true"
                      class="slide-nav__nav-item-label"
                      :class="[
                        selected === 1
                          ? 'slide-nav__nav-item-label--selected'
                          : ''
                      ]"
                    >
                      <strong>Barra de borda</strong>
                      <span>Barra de borda</span>
                    </span>
                    <em class="slide-nav__nav-item-new"
                        :class="[
                        selected === 1
                          ? 'slide-nav__nav-item-new--selected'
                          : ''
                      ]">Novo</em>
                  </button>
                  <button
                    aria-label="Layout da guia"
                    role="tab"
                    class="slide-nav__nav-item slide-nav__nav-item--nav slide-nav__nav-item--fit-lg"
                    :class="[
                      selected === 2 ? 'slide-nav__nav-item--selected' : ''
                    ]"
                    @click="changeSelected(2)"
                    data-bi-id="Link-Navigate-Navbar-TabLayout"
                  >
                    <span class="slide-nav__nav-item-counter">2.</span>
                    <span
                      aria-hidden="true"
                      class="slide-nav__nav-item-label"
                      :class="[
                        selected === 2
                          ? 'slide-nav__nav-item-label--selected'
                          : ''
                      ]"
                    >
                      <strong>Layout da guia</strong>
                      <span>Layout da guia</span>
                    </span>
                    <!---->
                  </button>
                  <button
                    aria-label="Modo escuro/claro"
                    role="tab"
                    class="slide-nav__nav-item slide-nav__nav-item--nav slide-nav__nav-item--fit-lg"
                    :class="[
                      selected === 3 ? 'slide-nav__nav-item--selected' : ''
                    ]"
                    @click="changeSelected(3)"
                    data-bi-id="Link-Navigate-Navbar-DarkLightMode"
                  >
                    <span class="slide-nav__nav-item-counter">3.</span>
                    <span
                      aria-hidden="true"
                      class="slide-nav__nav-item-label"
                      :class="[
                        selected === 3
                          ? 'slide-nav__nav-item-label--selected'
                          : ''
                      ]"
                    >
                      <strong>Modo escuro/claro</strong>
                      <span>Modo escuro/claro</span>
                    </span>
                    <!---->
                  </button>
                  <button
                    aria-label="Organizar guias"
                    role="tab"
                    class="slide-nav__nav-item slide-nav__nav-item--nav slide-nav__nav-item--fit-lg slide-nav__nav-item--future"
                    :class="[
                      selected === 4 ? 'slide-nav__nav-item--selected' : ''
                    ]"
                    @click="changeSelected(4)"
                    data-bi-id="Link-Navigate-Navbar-OrganizeTabs"
                  >
                    <span class="slide-nav__nav-item-counter">4.</span>
                    <span
                      aria-hidden="true"
                      class="slide-nav__nav-item-label"
                      :class="[
                        selected === 4
                          ? 'slide-nav__nav-item-label--selected'
                          : ''
                      ]"
                    >
                      <strong>Organizar guias</strong>
                      <span>Organizar guias</span>
                    </span>
                    <!---->
                  </button>
                  <button
                    aria-label="Tela dividida"
                    role="tab"
                    class="slide-nav__nav-item slide-nav__nav-item--nav slide-nav__nav-item--fit-lg slide-nav__nav-item--future"
                    :class="[
                      selected === 5 ? 'slide-nav__nav-item--selected' : ''
                    ]"
                    @click="changeSelected(5)"
                    data-bi-id="Link-Navigate-Navbar-SplitScreen"
                  >
                    <span class="slide-nav__nav-item-counter">5.</span>
                    <span
                      aria-hidden="true"
                      class="slide-nav__nav-item-label"
                      :class="[
                        selected === 5
                          ? 'slide-nav__nav-item-label--selected'
                          : ''
                      ]"
                    >
                      <strong>Tela dividida</strong>
                      <span>Tela dividida</span>
                    </span>
                    <!---->
                  </button>
                  <button
                    aria-label="Ler em voz alta"
                    role="tab"
                    class="slide-nav__nav-item slide-nav__nav-item--nav slide-nav__nav-item--fit-lg slide-nav__nav-item--future"
                    :class="[
                      selected === 6 ? 'slide-nav__nav-item--selected' : ''
                    ]"
                    @click="changeSelected(6)"
                    data-bi-id="Link-Navigate-Navbar-ReadAloud"
                  >
                    <span class="slide-nav__nav-item-counter">6.</span>
                    <span
                      aria-hidden="true"
                      class="slide-nav__nav-item-label"
                      :class="[
                        selected === 6
                          ? 'slide-nav__nav-item-label--selected'
                          : ''
                      ]"
                    >
                      <strong>Ler em voz alta</strong>
                      <span>Ler em voz alta</span>
                    </span>
                    <!---->
                  </button>
                  <button
                    aria-label="Espaços de trabalho"
                    role="tab"
                    class="slide-nav__nav-item slide-nav__nav-item--nav slide-nav__nav-item--fit-lg slide-nav__nav-item--future"
                    :class="[
                      selected === 7 ? 'slide-nav__nav-item--selected' : ''
                    ]"
                    @click="changeSelected(7)"
                    data-bi-id="Link-Navigate-Navbar-Workspaces"
                  >
                    <span class="slide-nav__nav-item-counter">7.</span>
                    <span
                      aria-hidden="true"
                      class="slide-nav__nav-item-label"
                      :class="[
                        selected === 7
                          ? 'slide-nav__nav-item-label--selected'
                          : ''
                      ]"
                    >
                      <strong>Espaços de trabalho</strong>
                      <span>Espaços de trabalho</span>
                    </span>
                    <!---->
                  </button>
                  <button
                    aria-label="Comece agora mesmo"
                    role="tab"
                    class="slide-nav__nav-item slide-nav__nav-item--nav slide-nav__nav-item--fit-lg slide-nav__nav-item--future"
                    :class="[
                      selected === 8 ? 'slide-nav__nav-item--selected' : ''
                    ]"
                    @click="changeSelected(8)"
                    data-bi-id="Link-Navigate-Navbar-GetStarted"
                  >
                    <span class="slide-nav__nav-item-counter">8.</span>
                    <span
                      aria-hidden="true"
                      class="slide-nav__nav-item-label"
                      :class="[
                        selected === 8
                          ? 'slide-nav__nav-item-label--selected'
                          : ''
                      ]"
                    >
                      <strong>Comece agora mesmo</strong>
                      <span>Comece agora mesmo</span>
                    </span>
                    <!---->
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selected: 1
      };
    },
    methods: {
      changeSelected(value) {
        this.selected = value;
      }
    }
  };
  </script>
  
  <!-- Use preprocessors via the lang attribute! e.g. <style lang="scss"> -->
  <style>
  *,
  :after,
  :before {
    box-sizing: border-box;
  }
  
  .slide-page__nav {
      bottom: 0;
      grid-area: nav;
  }
  .slide-page * {
      font-family: segoe-vf, sans-serif;
  }
  .slide-nav {
      --slide-grid-title-width: min(25vw, 600px);
      --slide-grid-media-width: min(55vw, 1200px);
      color: #1a1a1a;
      display: grid;
      font-size: clamp(14px, .9375vw, 18px);
      grid-template-areas: "left-start left left-end right-start right right-end";
      grid-template-columns: 1fr var(--slide-grid-title-width) 1fr 1fr var(--slide-grid-media-width) 1fr;
      grid-template-rows: 100%;
      height: clamp(72px, 5vw, 96px);
      padding-bottom: 8px;
      padding-top: 8px;
      position: relative;
      transition: all .4s cubic-bezier(.165,.84,.44,1) 0ms;
  }
    .slide-nav--area-media .slide-nav__inner {
      display: contents;
  }
    .slide-nav--area-media .slide-nav__items {
      grid-area: right;
  }
    .slide-nav__items {
      align-items: center;
      display: flex;
      flex-wrap: nowrap;
      transition: color .4s cubic-bezier(.165,.84,.44,1) 0ms;
      width: calc(100% + 1em);
  }
    
    
    
    .slide-nav__fit--align-end {
      flex-direction: row-reverse;
  }
  .slide-nav__fit {
      display: flex;
      height: 100%;
      justify-content: space-between;
  }
  .px-fit {
      position: relative;
      width: 100%;
  }
    .px-fit__outer {
      left: 0;
      position: absolute;
      transition: opacity .1s cubic-bezier(.165,.84,.44,1) 0ms;
      width: 100%;
  }
    .px-fit, .px-fit__outer {
      display: grid;
      grid-template-columns: 100%;
      grid-template-rows: 100%;
      height: 100%;
  }
    .slide-nav--numbered-expand .slide-nav__nav-items {
      justify-content: stretch;
      width: 100%;
  }
    
    
    .slide-page * {
      font-family: segoe-vf, sans-serif;
  }
  .slide-nav__nav-items--align-end {
      justify-self: end;
  }
  .slide-nav__nav-items {
      position: relative;
  }
  .slide-nav__addons, .slide-nav__arrows, .slide-nav__dots-container, .slide-nav__dropdown-container, .slide-nav__nav-items, .slide-nav__navbar-actions {
      align-items: center;
      display: flex;
      height: 100%;
  }
  .px-fit__outer>* {
      grid-area: 1 / 1;
  }
    
    
    
    .slide-nav--numbered-expand .slide-nav__nav-item--nav {
      flex: 1;
      max-height: 4em;
      min-width: 2em;
      opacity: .5;
      padding-top: 2em;
      padding-inline: .5em;
      position: relative;
      
      overflow: hidden;
      transition: flex .65s cubic-bezier(.165,.84,.44,1) 0ms, color .65s cubic-bezier(.165,.84,.44,1) 0ms, opacity .65s cubic-bezier(.165,.84,.44,1) 0ms;
  }
  .slide-page * {
      font-family: segoe-vf, sans-serif;
  }
  .slide-nav__nav-item {
      align-items: center;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      padding: 0 1em;
  }
  
  .slide-nav__icon img, .slide-nav__nav-item {
      flex: none;
      height: 100%;
  }
  button {
      appearance: none;
      background: none #0000;
      background-color: #0000;
      border: none;
      border-spacing: 0;
      color: inherit;
      line-height: 1;
      outline: none;
      text-align: left;
      text-indent: 0;
      width: auto;
  }
  button, h1, h2, h3, h4, h5, h6, p {
      font-size: inherit;
      padding: 0;
  }
  [tabindex], area, button, input, label, select, summary, textarea {
      touch-action: manipulation;
  }
  button {
      text-transform: none;
  }
  button, input, select {
      margin: 0;
  }
    .slide-nav--numbered-expand .slide-nav__nav-item--nav:before {
      background-color: currentColor;
      content: "";
      display: block;
      height: 2px;
      left: .5em;
      opacity: .5;
      position: absolute;
      right: .5em;
      top: 50%;
      transition: opacity .65s cubic-bezier(.165,.84,.44,1) 0ms;
  }
    .slide-nav--numbered-expand .slide-nav__nav-item-counter {
      color: currentColor;
      left: .5em;
      position: absolute;
      text-align: end;
      top: .5em;
      white-space: nowrap;
  }
    .slide-nav--numbered-expand .slide-nav__nav-item--nav .slide-nav__nav-item-label, .slide-nav--numbered-expand .slide-nav__nav-item--nav .slide-nav__nav-item-new {
      line-height: 1.5;
      max-width: 0;
      opacity: 0;
      overflow: hidden;
      transition: max-width .65s cubic-bezier(.165,.84,.44,1) 0ms, opacity .65s cubic-bezier(.165,.84,.44,1) 0ms;
      white-space: nowrap;
  }
    .slide-nav--numbered-expand .slide-nav__nav-item--nav .slide-nav__nav-item-label {
      overflow: hidden;
  }
  .slide-nav--numbered-expand .slide-nav__nav-item--nav .slide-nav__nav-item-new {
      flex: none;
  }
  .slide-page * {
      font-family: segoe-vf, sans-serif;
  }
  .slide-nav__nav-item-new {
      background: #fec846;
      border-radius: .25em;
      color: #000;
      display: inline-block;
      font-size: clamp(6px, .5em, 8px);
      font-style: normal;
      font-weight: 600;
      margin-inline-start: .66em;
      padding: .33em;
      position: relative;
      text-transform: uppercase;
      top: .25em;
  }
    .slide-nav__nav-item-label>strong {
      font-weight: 600;
      opacity: 0;
  }
    .slide-nav__nav-item-label>span {
      left: 0;
      position: absolute;
      text-align: center;
      top: 0;
      width: 100%;
  }
  .slide-nav__nav-item-label>span, .slide-nav__nav-item-label>strong {
      transition: opacity .1s cubic-bezier(.165,.84,.44,1) 0ms;
  }
    .slide-nav--numbered-expand .slide-nav__nav-item--nav.slide-nav__nav-item--selected {
      color: #1a59c8;
      flex: 8;
      opacity: 1;
  }
    .slide-nav--numbered-expand .slide-nav__nav-item--nav.slide-nav__nav-item--selected:before {
      opacity: 1;
  }
  .slide-nav--numbered-expand .slide-nav__nav-item--nav .slide-nav__nav-item-label--selected, .slide-nav--numbered-expand .slide-nav__nav-item--nav .slide-nav__nav-item-new--selected {
      max-width: 20em;
      opacity: 1;
  }
    .slide-nav__nav-item-label--selected>strong {
      opacity: 1;
  }
    .slide-nav__nav-item-label--selected>span {
      opacity: 0;
  }
  </style>
  