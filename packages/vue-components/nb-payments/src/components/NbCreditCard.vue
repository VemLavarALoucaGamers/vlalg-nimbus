<template>
	<div class="nb-wrapper">
		<div
			v-if="nbId"
			:id="nbId"
			class="nb-credit-card nb-reset"
			:style="[verticalAlign]"
		>
			<NbCreditCardCards
				:vg-id="`${nbId}-card`"
				:chip-model="chipModel"
				:card-number="cdNumber"
				:card-name="cdName"
				:card-exp-month="cdExpMonth"
				:card-exp-year="cdExpYear"
				:card-ccv="cdCcv"
				:format-mode="formatMode"
				:flip-card="flipCardCcvTrigger"
				:flip-on-hover="flipOnHover"
				:card-background="cardBackground"
				:card-color="cardColor"
				:card-radius="cardRadius"
				:card-shadow="cardShadow"
				:card-ccv-color="cardCcvColor"
				:card-holder-text="cardHolderText"
				:card-expiration-text="cardExpirationText"
				:card-ccv-text="cardCcvText"
				:show-form="showForm"
				@updated-card-config="changeCardConfig"
			/>

			<div
				v-if="showForm"
				:nb-id="`${nbId}-form`"
				:style="[formStyleBg, formStyleColor, formStyleBorderRadius, formStyleShadow]"
				class="nb-credit-card__form nb-reset"
			>
				<div class="nb-credit-card__form-items">
					<span class="nb-credit-card__form-items--text">{{ formNumberText }}</span>
					<input
						v-model="cdNumber"
						v-mask="getCardMask"
						type="text"
						:maxlength="getMaxCardNumber"
						:style="[inputStyle, isActiveInputNumber]"
						class="nb-credit-card__form-items--input"
						autocomplete="off"
						@active="activeNumber = true"
						@focus="activeNumber = true"
						@blur="activeNumber = false"
					/>
				</div>

				<div class="nb-credit-card__form-items">
					<span class="nb-credit-card__form-items--text">{{ formHolderText }}</span>
					<input
						v-model="cdName"
						type="text"
						:style="[inputStyle, isActiveInputName]"
						class="nb-credit-card__form-items--input"
						autocomplete="off"
						@focus="activeName = true"
						@blur="activeName = false"
					/>
				</div>

				<div class="nb-credit-card__form-flexbox">
					<div class="nb-credit-card__form-items">
						<span class="nb-credit-card__form-items--text">{{ formExpMonthText }}</span>
						<select
							id=""
							v-model="cdExpMonth"
							name=""
							:style="[inputStyle, isActiveInputMonth]"
							class="nb-credit-card__form-items--select"
							@focus="activeMonth = true"
							@blur="activeMonth = false"
						>
							<option
								value="month"
								selected
								disabled
							>
								{{ formExpMonthDefaultText }}
							</option>
							<option
								v-for="(item, index) in monthsList"
								:key="index"
								:value="item"
							>
								{{ item }}
							</option>
						</select>
					</div>

					<div class="nb-credit-card__form-items">
						<span class="nb-credit-card__form-items--text">{{ formExpYearText }}</span>
						<select
							id=""
							v-model="cdExpYear"
							name=""
							:style="[inputStyle, isActiveInputYear]"
							class="nb-credit-card__form-items--select"
							@focus="activeYear = true"
							@blur="activeYear = false"
						>
							<option
								value="year"
								selected
								disabled
							>
								{{ formExpYearDefaultText }}
							</option>
							<option
								v-for="(item, index) in yearsList"
								:key="index"
								:value="item.toString()"
							>
								{{ item }}
							</option>
						</select>
					</div>

					<div class="nb-credit-card__form-items">
						<span class="nb-credit-card__form-items--text">{{ formCcvText }}</span>
						<input
							v-model="cdCcv"
							type="text"
							maxlength="4"
							:style="[inputStyle, isActiveInputCcv]"
							class="nb-credit-card__form-items--input"
							@click="updateCcv(true)"
							@blur="updateCcv(false)"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {
	computed,
	defineComponent,
	reactive,
	ref,
	defineAsyncComponent,
	toRefs,
	watch,
	onMounted
} from 'vue'
import { mask } from 'vue-the-mask'
import MasterTool from '@vlalg-nimbus/master-tool'

const generateYearList = () => {
	const currentYear = new Date().getFullYear()
	const yearStart = currentYear - 5
	const defaultList = []
	const nextYears = 15

	for (let i = 0; i <= nextYears; i++) {
		defaultList.push(yearStart + i)
	}

	return defaultList
}

const defaultFormStyle = {
	bg: '#fff',
	color: '#999',
	radius: '5',
	shadow: '0 -1px 15px rgba(0,0,0,.1)',
	input: {
		bg: '#fff',
		border: 'rgba(0,0,0,.3)',
		color: '#444',
		radius: '10',
		activeBorder: 'rgba(0,0,0,.3)'
	}
}

const defaultCardStyle = {
	bg: 'linear-gradient(45deg, blueviolet, deeppink)',
	color: '#fff',
	radius: '6',
	shadow: true,
	ccvColor: '#333'
}

export default defineComponent({
	name: 'NbCreditCard',
	components: {
		NbCreditCardCards: defineAsyncComponent(() => import('./NbCreditCardCards.vue'))
	},
	directives: { mask },
	inheritAttrs: false,
	emits: ['card-values'],
	props: {
		nbId: {
			type: String,
			required: true
		},
		showForm: {
			type: Boolean,
			default: false
		},
		chipModel: {
			type: String,
			default: 'two',
			validator: value => {
				return ['one', 'two'].includes(value)
			}
		},
		cardNumber: {
			type: String,
			default: ''
		},
		cardName: {
			type: String,
			default: ''
		},
		cardExpMonth: {
			type: String,
			default: ''
		},
		cardExpYear: {
			type: [String, Number],
			default: ''
		},
		years: {
			type: Array,
			default: () => generateYearList()
		},
		cardCcv: {
			type: String,
			default: ''
		},
		formatMode: {
			type: String,
			default: 'two',
			validator: value => {
				return ['one', 'two'].includes(value)
			}
		},
		flipOnHover: {
			type: Boolean,
			default: false
		},
		formNumberText: {
			type: String,
			default: 'card number'
		},
		formHolderText: {
			type: String,
			default: 'card holder'
		},
		formExpMonthText: {
			type: String,
			default: 'expiration mm'
		},
		formExpMonthDefaultText: {
			type: String,
			default: 'month'
		},
		formExpYearText: {
			type: String,
			default: 'expiration yy'
		},
		formExpYearDefaultText: {
			type: String,
			default: 'year'
		},
		formCcvText: {
			type: String,
			default: 'ccv'
		},
		cardHolderText: {
			type: String,
			default: 'cardholder name'
		},
		cardExpirationText: {
			type: String,
			default: 'expiration'
		},
		cardCcvText: {
			type: String,
			default: 'ccv'
		},
		formBackground: {
			type: String,
			default: defaultFormStyle.bg
		},
		formColor: {
			type: String,
			default: defaultFormStyle.color
		},
		formRadius: {
			type: [String, Number],
			default: defaultFormStyle.radius
		},
		formShadow: {
			type: Boolean,
			default: false
		},
		formInputBackground: {
			type: String,
			default: defaultFormStyle.input.bg
		},
		formInputColor: {
			type: String,
			default: defaultFormStyle.input.color
		},
		formInputActiveColor: {
			type: String,
			default: defaultFormStyle.input.activeBorder
		},
		formInputBorder: {
			type: String,
			default: defaultFormStyle.input.border
		},
		formInputRadius: {
			type: [String, Number],
			default: defaultFormStyle.input.radius
		},
		cardBackground: {
			type: String,
			default: defaultCardStyle.bg
		},
		cardColor: {
			type: String,
			default: defaultCardStyle.color
		},
		cardRadius: {
			type: [String, Number],
			default: defaultCardStyle.radius
		},
		cardShadow: {
			type: Boolean,
			default: defaultCardStyle.shadow
		},
		cardCcvColor: {
			type: String,
			default: defaultCardStyle.ccvColor
		}
	},
	setup(props, { emit }) {
		const {
			showForm,
			cardNumber,
			cardName,
			cardExpMonth,
			cardExpYear,
			cardCcv,
			years,
			formBackground,
			formColor,
			formInputActiveColor,
			formRadius,
			formShadow,
			formInputBackground,
			formInputColor,
			formInputBorder,
			formInputRadius
		} = toRefs(props)

		onMounted(() => {
			cdNumber.value = cardNumber.value
			cdName.value = cardName.value
			cdExpMonth.value = cardExpMonth.value
			cdExpYear.value = fixYear(cardExpYear.value)
			cdCcv.value = cardCcv.value
		})

		const cdNumber = ref('')
		const cdName = ref('')
		const cdExpMonth = ref('')
		const cdExpYear = ref('')
		const cdCcv = ref('')
		const flipCardCcvTrigger = ref(false)

		const activeNumber = ref(false)
		const activeName = ref(false)
		const activeMonth = ref(false)
		const activeYear = ref(false)
		const activeCcv = ref(false)

		const cardConfig = ref({
			mask: '################',
			minMask: 0,
			maxMask: 0,
			maxNumber: 0
		})

		const monthsList = reactive([
			'01',
			'02',
			'03',
			'04',
			'05',
			'06',
			'07',
			'08',
			'09',
			'10',
			'11',
			'12'
		])

		const $masterTool = MasterTool()

		const yearsList = computed(() => {
			return !years.value.length ? generateYearList() : years.value
		})

		const getMaxCardNumber = computed(() => {
			return cardConfig.value.maxNumber
		})

		const getCardMask = computed(() => {
			return cardConfig.value.mask
		})

		const getHolderName = computed(() => {
			if (!cardName.value) return ''

			return cardName.value.substring(0, 16)
		})

		const verticalAlign = computed(() => {
			let alignType = ''

			if (showForm.value) alignType = 'bottom'

			return {
				verticalAlign: alignType
			}
		})

		const cardInfos = computed(() => {
			return {
				number: cdNumber.value,
				name: cdName.value,
				expMonth: cdExpMonth.value,
				expYear: cdExpYear.value,
				ccv: cdCcv.value
			}
		})

		const formStyleBg = computed(() => {
			const background = formBackground.value ? formBackground.value : defaultFormStyle.bg

			return { background }
		})
		const formStyleColor = computed(() => {
			const color = formColor.value ? formColor.value : defaultFormStyle.color
			return { color }
		})

		const formStyleBorderRadius = computed(() => {
			const valueIsNumber = $masterTool.isNumber(parseInt(formRadius.value, 10))
			const isValid = !!(
				formRadius.value &&
				valueIsNumber &&
				formRadius.value >= 1 &&
				formRadius.value <= 30
			)

			const borderRadius = isValid ? formRadius.value : defaultFormStyle.radius
			return {
				borderRadius: `${borderRadius}px`
			}
		})

		const formStyleShadow = computed(() => {
			const boxShadow = formShadow.value ? defaultFormStyle.shadow : 'none'
			return { boxShadow }
		})

		const inputStyle = computed(() => {
			const radiusIsNumber = $masterTool.isNumber(parseInt(formInputRadius.value, 10))
			const isValid = !!(
				formInputRadius.value &&
				radiusIsNumber &&
				formInputRadius.value >= 1 &&
				formInputRadius.value <= 30
			)
			const radius = isValid ? formInputRadius.value : defaultFormStyle.input.radius
			const color = formInputColor.value ? formInputColor.value : defaultFormStyle.input.color
			const bg = formInputBackground.value ? formInputBackground.value : defaultFormStyle.input.bg

			return {
				borderRadius: `${radius}px`,
				color: color,
				background: bg
			}
		})

		const activeColor = computed(() => {
			return formInputActiveColor.value
				? formInputActiveColor.value
				: defaultFormStyle.input.activeBorder
		})
		const isActiveInputNumber = computed(() => {
			const color = activeColor.value
			const border = formInputBorder.value ? formInputBorder.value : defaultFormStyle.input.border
			const borderColor = activeNumber.value ? color : border

			return {
				borderColor
			}
		})
		const isActiveInputName = computed(() => {
			const color = activeColor.value
			const border = formInputBorder.value ? formInputBorder.value : defaultFormStyle.input.border
			const borderColor = activeName.value ? color : border

			return {
				borderColor
			}
		})
		const isActiveInputMonth = computed(() => {
			const color = activeColor.value
			const border = formInputBorder.value ? formInputBorder.value : defaultFormStyle.input.border
			const borderColor = activeMonth.value ? color : border

			return {
				borderColor
			}
		})
		const isActiveInputYear = computed(() => {
			const color = activeColor.value
			const border = formInputBorder.value ? formInputBorder.value : defaultFormStyle.input.border
			const borderColor = activeYear.value ? color : border

			return {
				borderColor
			}
		})
		const isActiveInputCcv = computed(() => {
			const color = activeColor.value
			const border = formInputBorder.value ? formInputBorder.value : defaultFormStyle.input.border
			const borderColor = activeCcv.value ? color : border

			return {
				borderColor
			}
		})

		const changeCardConfig = $event => {
			cardConfig.value.mask = $event.mask
			cardConfig.value.minMask = $event.minMask
			cardConfig.value.maxMask = $event.maxMask
			cardConfig.value.maxNumber = $event.maxNumber
		}

		const fixYear = value => {
			const currentNumber = parseInt(value, 10)

			return yearsList.value.includes(currentNumber)
				? value.toString()
				: yearsList.value[0].toString()
		}

		const sendValues = () => {
			emit('card-values', cardInfos.value)
		}

		const updateCcv = value => {
			flipCardCcvTrigger.value = value
			activeCcv.value = value
		}

		watch(cardNumber, value => {
			cdNumber.value = value
			sendValues()
		})

		watch(cardName, value => {
			cdName.value = value
			sendValues()
		})

		watch(cardExpMonth, value => {
			cdExpMonth.value = value
			sendValues()
		})

		watch(cardExpYear, value => {
			cdExpYear.value = fixYear(value)
			sendValues()
		})

		watch(cardCcv, value => {
			cdCcv.value = value
			sendValues()
		})

		watch(cardInfos, () => {
			sendValues()
		})

		return {
			cdNumber,
			cdName,
			cdExpMonth,
			cdExpYear,
			cdCcv,
			yearsList,
			monthsList,
			flipCardCcvTrigger,
			getMaxCardNumber,
			getCardMask,
			getHolderName,
			verticalAlign,
			cardConfig,
			formStyleBg,
			formStyleColor,
			formStyleBorderRadius,
			formStyleShadow,
			inputStyle,
			isActiveInputNumber,
			isActiveInputName,
			isActiveInputMonth,
			isActiveInputYear,
			isActiveInputCcv,
			activeNumber,
			activeName,
			activeMonth,
			activeYear,
			activeCcv,
			changeCardConfig,
			updateCcv
		}
	}
})
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');

.nb-wrapper {
	margin: 0;
	padding: 0;
	font-size: 62.5%;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}

.nb-reset {
	font-size: 16px;
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

.nb-credit-card {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	line-height: 1.42857143;
	font-family: 'Lato', sans-serif;
	text-align: center;
	display: inline-block;
}
.nb-credit-card .nb-credit-card__form {
	padding: 20px;
	width: 100%;
	max-width: 600px;
	margin: 0 auto;
	margin-top: -25px;
	margin-bottom: 10px;
	display: block;
	overflow: hidden;
}

@media screen and (min-width: 768px) {
	.nb-credit-card .nb-credit-card__form {
	}
}

.nb-credit-card__form .nb-credit-card__form-items {
	margin-top: 20px;
}

.nb-credit-card__form-items .nb-credit-card__form-items--text {
	display: block;
	padding-bottom: 5px;
	height: 30px;
	overflow: hidden;
	text-align: left;
}

.nb-credit-card__form-items .nb-credit-card__form-items--input,
.nb-credit-card__form-items .nb-credit-card__form-items--select {
	width: 100%;
	padding: 10px;
	border-width: 1px;
	border-style: solid;
	outline: none;
}

.nb-credit-card__form .nb-credit-card__form-flexbox {
	display: flex;
	gap: 15px;
}

.nb-credit-card__form .nb-credit-card__form-flexbox .nb-credit-card__form-items {
	flex: 1 1 150px;
}
</style>
