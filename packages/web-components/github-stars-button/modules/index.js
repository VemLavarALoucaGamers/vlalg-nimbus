const itIsObject = obj => {
  if (obj.constructor === Object) return true
  return false
}
const objectIsEmpty = (obj) => {
  if (!itIsObject(obj)) return false
  return Object.keys(obj).length === 0 && obj.constructor === Object
}

const validProps = ['repoOwner', 'repoName', 'showCount', 'goRepo']

class StarRate extends HTMLElement {
  constructor() {
		super()

		this.start()
  }
  
  // Component initialization logic
  start () {
    if (this.preBuild()) {
      this.build()
    } else {
      this.setConsoleMessage('error')
    }
  }

	// Checks if the required attributes are being passed
	preBuild () {
		const props = objectIsEmpty(this.dataset) ? [] : Object.keys(this.dataset)

		return validProps.every(value => props.includes(value))
	}

	// Start creating the component
  build () {
    // Check if a Shadow Root already exists
    if (this.shadowRoot) {
      console.warn("Shadow root já existente. Evitando recriação.")
      return
    }

    // Start values
    this.repoOwner = this.dataset.repoOwner || this.getAttribute('repoOwner') || ''
    this.repoName = this.dataset.repoName || this.getAttribute('repoName') || ''
    this.showCount = this.dataset.showCount || this.getAttribute('showCount') || ''
    this.goRepo = this.dataset.goRepo || this.getAttribute('goRepo') || ''

		// Shadow Mode: Can receive changes from outside later
		const shadowMode = 'closed' // 'open' or 'closed'

		// Creating a ShadownDOM
    let shadow = ''
    
    if (!this.shadowRoot) {
      shadow = this.attachShadow({ mode: shadowMode }); // ou 'closed'
    }

		// Starting structure
		const wrapper = this.createWrapper()
		const wrapperContent = this.createContent()
		wrapper.appendChild(wrapperContent)

		// Adding the styles
		shadow.appendChild(this.createStyle())

		// Adding structure
		shadow.appendChild(wrapper)

		this.setConsoleMessage('success')
	}

	// Creating the component wrapper
	createWrapper () {
		const webComponentWrapper = document.createElement('div')
		
		webComponentWrapper.classList.add('web-component__wrapper')

		return webComponentWrapper
	}

	// Creating component content
	createContent () {
		const webComponentContent = document.createElement('div')
		
		webComponentContent.classList.add('web-component__wrapper-content')
		webComponentContent.classList.add('web-component__wrapper-content-reset')

    const githubSvgIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 50 50" fill="#000000" class="svg-icon">
    <path d="M25,8c9.389,0,17,7.611,17,17c0,7.548-4.921,13.944-11.729,16.163c0.002-0.006,0.005-0.016,0.005-0.016	s-1.147-0.538-1.123-1.498c0.027-1.056,0-3.521,0-4.426c0-1.553-0.983-2.654-0.983-2.654s7.709,0.087,7.709-8.139	c0-3.174-1.659-4.825-1.659-4.825s0.871-3.388-0.302-4.825c-1.315-0.142-3.669,1.257-4.675,1.91c0,0-1.593-0.653-4.244-0.653	c-2.65,0-4.244,0.653-4.244,0.653c-1.005-0.653-3.36-2.052-4.675-1.91c-1.173,1.437-0.302,4.825-0.302,4.825	s-1.659,1.652-1.659,4.825c0,8.226,7.709,8.139,7.709,8.139s-0.777,0.878-0.946,2.168c-0.538,0.183-1.33,0.408-1.969,0.408	c-1.673,0-2.946-1.626-3.412-2.379c-0.46-0.742-1.403-1.365-2.281-1.365c-0.579,0-0.861,0.289-0.861,0.62	c0,0.331,0.811,0.562,1.347,1.175c1.129,1.294,1.109,4.202,5.132,4.202c0.437,0,1.329-0.107,2-0.198	c-0.004,0.916-0.005,1.882,0.009,2.447c0.024,0.96-1.123,1.498-1.123,1.498s0.003,0.01,0.005,0.016C12.921,38.944,8,32.548,8,25	C8,15.611,15.611,8,25,8z"></path>
    </svg>`

    let contentBody = `
    <div class="content-icon">
      ${githubSvgIcon} STAR
    </div>
    `

    if (this.showCount === 'true') contentBody = `${contentBody}<div class="content-count">2000</div>`

    webComponentContent.innerHTML = contentBody

		webComponentContent.addEventListener('click', event => this.eventContentClick(event))

		return webComponentContent
	}
	
	// Creating the stylization
	createStyle () {
		const style = document.createElement('style')
		
		style.textContent = `
			.web-component__wrapper {
				padding: 0;
				font-size: 62.5%;
				-webkit-box-sizing: border-box;
				-moz-box-sizing: border-box;
				box-sizing: border-box;

        display: inline-block;
			}
			.web-component__wrapper-disabled {
				cursor: not-allowed;
				pointer-events: none;
				user-select: none;
				opacity: 0.8;

				&:hover {
					cursor: not-allowed;
				}
			}
			.web-component__wrapper-content-reset {
				font-family: 'Lato', sans-serif;
				font-style: normal;
				font-weight: light;
				line-height: 1.42857143;
				color: #333;
			
				* {
					margin: 0;
					padding: 0;
				}
				*,
				*::before,
				*::after {
					-webkit-box-sizing: border-box;
					-moz-box-sizing: border-box;
					box-sizing: border-box;
				}
			}
			.web-component__wrapper-content {
				margin: 0;
				padding: 0;
				box-sizing: border-box;
				line-height: 1.42857143;
				color: 'black';

        max-height: 30px;
        width: auto;
        overflow: hidden;
        display: flex !important;
        flex-direction: row !important;
        align-items: center;
        font-size: 1.4em;
        font-weight: 900;
        border-radius: 5px;
        border: 1px solid #cdcdcd;
			}
      .web-component__wrapper-content .content-icon {
        background: #f8f8f8;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0 10px;
        border-right: 1px solid #cdcdcd;
      }
      .web-component__wrapper-content .content-count {
        background: #ffffff;
        padding: 0 10px;
      }
      .content-icon .svg-icon {
        height: 30px;
      }
			.web-component__wrapper-content:hover {
				cursor: pointer;
			}
		`

		return style
  }

	// Adding custom event
	eventContentClick () {
    if (this.goRepo === 'true' && this.repoName && this.repoOwner) {
      const owner = this.repoOwner ? this.repoOwner : 'VemLavarALoucaGamers'
      const name = this.repoName ? this.repoName : 'vlalg-nimbus'

      const repoUrl = `https://github.com/${owner}/${name}`

      window.open(repoUrl, '_blank')
    }
    
		this.customEvent('webcomp-clicked', { message: 'Web Component clicked' })
	}

	// Creating custom event
	customEvent (eventName, returnValue) {
		const validEventNames = ['webcomp-clicked']
		const hasValidEventName = validEventNames.includes(eventName)

		if (eventName && returnValue && hasValidEventName) {
			const customEvent = new CustomEvent(eventName, {
				detail: returnValue
			})

			// Dispara o evento personalizado a partir do Web Component
			this.dispatchEvent(customEvent)
		}
  }

  // Observing changes in attributes
  static get observedAttributes() {
    return validProps;
  }

  // Triggers this function by observing the previous changes
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[name] = newValue

      if (!this.shadowRoot) {
        this.build()
      }
    }
  }

  // Triggers every time a custom element enters the DOM/page
  connectedCallback () {
    if (!this.shadowRoot) {
      this.start();
    }
  }

  // Triggers whenever a custom element leaves the DOM/page
  disconnectedCallback () {
    console.log('WebComponent remove from page')
  }

	/*
		* Other component methods and properties
	*/
	setConsoleMessage (type) {
		const validTypes = ['success', 'errorProps']
		const docLink = "https://nimbus.tec.br/web-components/github-stars-button"
    const defaultType = (type && validTypes.includes(type)) ? type : 'error'
    const componentName = 'Github Stars Button'
		const consoleMessage = {
			errorProps: {
				icon: '\u26A0',
        type: 'warning',
				msg: `The properties are required and were not specified in the component, check the documentation for more information: ${docLink}.`,
				bgCompName: '#00DC82',
				colorCompName: 'black',
				bgType: '#fffb00',
				colorType: 'black',
      },
			success: {
        icon: '\u2728',
        type: 'success',
				msg: 'Web Component successfully installed.',
				bgCompName: '#00DC82',
				colorCompName: 'black',
				bgType: '#00DC8220',
				colorType: 'white',
			}
    }

		const current = consoleMessage[defaultType]

		console.log(
			`%c${componentName} %c ${current.icon} ${current.type} %c ${current.msg}`,
			`color: ${current.colorCompName}; border-radius: 3px 0 0 3px; padding: 2px 2px 1px 10px; background: ${current.bgCompName}`,
			`color: ${current.colorType}; border-radius: 0 3px 3px 0; padding: 2px 10px 1px 2px; background: ${current.bgType}`,
			""
		);
	}
}

// Register Web Component
customElements.define('github-stars-button', StarRate);
