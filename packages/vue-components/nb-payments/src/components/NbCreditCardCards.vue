<template>
	<div class="nb-wrapper">
		<div
			:id="nbId"
			class="nb-credit-card__card nb-reset"
		>
			<div
				class="nb-credit-card__card-faces"
				@mouseover="flipCardOnHover('over')"
				@mouseleave="flipCardOnHover('leave')"
			>
				<div
					ref="front"
					:style="[cardStyleBg, cardStyleColor, cardStyleBorderRadius, cardStyleShadow]"
					class="nb-credit-card__card-faces--front"
				>
					<div class="nb-credit-card__front-images">
						<img
							:src="getCardChipImage"
							alt=""
							class="nb-credit-card__front-images--chip"
						/>
						<img
							:src="getCardTypeImage"
							alt=""
							class="nb-credit-card__front-images--brand"
						/>
					</div>

					<div
						:class="[
							'nb-credit-card__front-number',
							hasNumber ? 'has-number' : 'without-number',
							hasAllNumbers ? 'has-all-numbers' : ''
						]"
					>
						{{ getMaskedCardNumber }}
					</div>

					<div class="nb-credit-card__front-infos">
						<div class="nb-credit-card__front-column nb-credit-card__front-column--name">
							<span class="nb-credit-card__front-column-title">{{ textCardHolder }}</span>
							<div class="nb-credit-card__front-column-value--name">
								{{ getHolderName }}
							</div>
						</div>

						<div class="nb-credit-card__front-column nb-credit-card__front-column--expiration">
							<span class="nb-credit-card__front-column-title">{{ textCardExpiration }}</span>
							<div class="nb-credit-card__front-column-value">
								{{ formatedExpiration }}
							</div>
						</div>
					</div>
				</div>

				<div
					ref="back"
					:style="[cardStyleBg, cardStyleColor, cardStyleBorderRadius, cardStyleShadow]"
					class="nb-credit-card__card-faces--back"
				>
					<div class="nb-credit-card__back-stripe"></div>
					<div class="nb-credit-card__back-column">
						<span class="nb-credit-card__back-column-title">{{ textCardCcv }}</span>
						<div class="nb-credit-card__back-column-info">
							<span
								:style="[cardCcvStyleColor]"
								class="nb-credit-card__back-column-info--value"
							>
								{{ cardCcv }}
							</span>

							<img
								src="../images/pattern.png"
								alt=""
								class="nb-credit-card__back-column-info--image"
								style="position: absolute; z-index: 0; left: 0; top: 0; right: 0"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { computed, defineComponent, reactive, ref, watch, toRefs, onMounted } from 'vue'
import MasterTool from '@vlalg-nimbus/master-tool'

import imagesChipOne from '../images/chip_one.png'
import imagesChipTwo from '../images/chip_two.png'

import imagesBrandsVisa from '../images/visa.png'
import imagesBrandsAmex from '../images/amex.png'
import imagesBrandsMastercard from '../images/mastercard.png'
import imagesBrandsDiscover from '../images/discover.png'
import imagesBrandsTroy from '../images/troy.png'

const defaultCardStyle = {
	bg: 'linear-gradient(45deg, blueviolet, deeppink)',
	color: '#fff',
	radius: '6',
	shadow: '0px 5px 8px rgba(0,0,0,.2)',
	ccvColor: '#333'
}

export default defineComponent({
	name: 'NbCreditCardCards',
	inheritAttrs: false,
	emits: ['updated-card-config'],
	props: {
		nbId: {
			type: String,
			required: true
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
			default: '',
			required: true
		},
		cardName: {
			type: String,
			default: '',
			required: true
		},
		cardExpMonth: {
			type: String,
			default: '',
			required: true
		},
		cardExpYear: {
			type: [String, Number],
			default: '',
			required: true
		},
		cardCcv: {
			type: String,
			default: '',
			required: true
		},
		formatMode: {
			type: String,
			default: 'two',
			validator: value => {
				return ['one', 'two'].includes(value)
			}
		},
		flipCard: {
			type: Boolean,
			default: false
		},
		flipOnHover: {
			type: Boolean,
			default: false
		},
		cardHolderText: {
			type: String
		},
		cardExpirationText: {
			type: String
		},
		cardCcvText: {
			type: String
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
			default: true
		},
		cardCcvColor: {
			type: String,
			default: defaultCardStyle.ccvColor
		},
		showForm: {
			type: Boolean,
			default: false
		}
	},
	setup(props, { emit }) {
		onMounted(() => {
			updateCardConfig()
		})

		const {
			chipModel,
			cardNumber,
			cardName,
			cardExpMonth,
			cardExpYear,
			flipCard,
			flipOnHover,
			cardBackground,
			cardColor,
			cardRadius,
			cardShadow,
			cardCcvColor,
			cardHolderText,
			cardExpirationText,
			cardCcvText,
			showForm
		} = toRefs(props)

		const front = ref('')
		const back = ref('')
		const cardValidChipModel = ['one', 'two']
		const formatMode = ref('two')
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

		const imagesChip = reactive({
			one: imagesChipOne,
			two: imagesChipTwo
		})

		const imagesBrands = reactive({
			visa: imagesBrandsVisa,
			amex: imagesBrandsAmex,
			mastercard: imagesBrandsMastercard,
			discover: imagesBrandsDiscover,
			troy: imagesBrandsTroy
		})

		const amexConfig = reactive({
			mask: '#### ###### #####',
			minMask: 4,
			maxMask: 13,
			maxNumber: 17
		})
		const otherConfig = reactive({
			mask: '#### #### #### ####',
			minMask: 4,
			maxMask: 14,
			maxNumber: 19
		})

		const $masterTool = MasterTool()

		const getConfig = computed(() => {
			return getCardType.value === 'amex' ? amexConfig : otherConfig
		})

		const getCardType = computed(() => {
			const number = cardNumber.value
			let typeName = 'visa'
			let reg = new RegExp('^4')

			if (number.match(reg) != null) typeName = 'visa'

			reg = new RegExp('^(34|37)')
			if (number.match(reg) != null) typeName = 'amex'

			reg = new RegExp('^5[1-5]')
			if (number.match(reg) != null) typeName = 'mastercard'

			reg = new RegExp('^6011')
			if (number.match(reg) != null) typeName = 'discover'

			reg = new RegExp('^9792')
			if (number.match(reg) != null) typeName = 'troy'

			return typeName
		})
		const getCardTypeImage = computed(() => {
			return imagesBrands[getCardType.value]
		})

		const getCardChipImage = computed(() => {
			const chip = chipModel.value
			const hasChip = !!(chip && cardValidChipModel.includes(chip))

			const model = hasChip && chip === 'two' ? 'two' : 'one'

			return imagesChip[model]
		})

		const getMaskedCardNumber = computed(() => {
			return formatMode.value !== 'one' ? formatMaskModeTwo() : formatMaskModeOne()
		})

		const getMaxCardNumber = computed(() => {
			return getConfig.value.maxNumber
		})

		const getCardMask = computed(() => {
			return getConfig.value.mask
		})

		const getHolderName = computed(() => {
			if (!cardName.value) return ''

			return cardName.value.substring(0, 16)
		})

		const hasAllNumbers = computed(() => {
			return !!(cardNumber.value.length === getMaxCardNumber.value)
		})

		const hasNumber = computed(() => {
			return /\d/.test(cardNumber.value)
		})

		const formatedExpiration = computed(() => {
			const separator = cardExpMonth.value && cardExpYear.value ? '/' : ''
			return `${cardExpMonth.value}${separator}${cardExpYear.value}`
		})

		const cardStyleBg = computed(() => {
			const background = cardBackground.value ? cardBackground.value : defaultCardStyle.bg

			return { background }
		})
		const cardStyleColor = computed(() => {
			const color = cardColor.value ? cardColor.value : defaultCardStyle.color
			return { color }
		})

		const cardStyleBorderRadius = computed(() => {
			const valueIsNumber = $masterTool.isNumber(parseInt(cardRadius.value, 10))
			const isValid = !!(
				cardRadius.value &&
				valueIsNumber &&
				cardRadius.value >= 1 &&
				cardRadius.value <= 30
			)

			const borderRadius = isValid ? cardRadius.value : defaultCardStyle.radius

			return {
				borderRadius: `${borderRadius}px`
			}
		})

		const cardStyleShadow = computed(() => {
			const boxShadow = cardShadow.value ? defaultCardStyle.shadow : 'none'
			return { boxShadow }
		})

		const cardCcvStyleColor = computed(() => {
			const color = cardCcvColor.value ? cardCcvColor.value : defaultCardStyle.ccvColor
			return { color }
		})

		const textCardHolder = computed(() => {
			return cardHolderText.value ? cardHolderText.value : 'cardholder name'
		})

		const textCardExpiration = computed(() => {
			return cardExpirationText.value ? cardExpirationText.value : 'expiration'
		})

		const textCardCcv = computed(() => {
			return cardCcvText.value ? cardCcvText.value : 'ccv'
		})

		const updateCardConfig = () => {
			emit('updated-card-config', getConfig.value)
		}

		const flipCardOnHover = type => {
			if (type === 'over' && flipOnHover.value) onMouseEnterCvv()
			if (type === 'leave' && flipOnHover.value) onMouseLeaveCvv()
		}

		const onMouseEnterCvv = () => {
			front.value.style.transform =
				'perspective(1000px) rotateY(-180deg) rotateX(0deg) rotateZ(0deg)'
			back.value.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) rotateZ(0deg)'
		}

		const onMouseLeaveCvv = () => {
			front.value.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) rotateZ(0deg)'
			back.value.style.transform = 'perspective(1000px) rotateY(180deg) rotateX(0deg) rotateZ(0deg)'
		}

		const formatMaskModeOne = () => {
			if (!cardNumber.value) return getCardMask.value

			const min = getConfig.value.minMask
			const max = getConfig.value.maxMask
			const splitedCardNumber = []

			cardNumber.value.split('').forEach((i, index) => {
				if (index >= min && index <= max && i.trim() !== '') {
					splitedCardNumber.push('*')
				} else {
					splitedCardNumber.push(i)
				}
			})

			return splitedCardNumber.join('')
		}

		const formatMaskModeTwo = () => {
			if (!cardNumber.value) return getCardMask.value

			const newMask = getCardMask.value
			const min = getConfig.value.minMask
			const max = getConfig.value.maxMask
			const splitedMask = newMask.split('')

			cardNumber.value.split('').forEach((i, index) => {
				if (onlyNumber(i) || i !== '#') {
					if (index >= min && index <= max && i.trim() !== '') {
						splitedMask[index] = '*'
					} else {
						splitedMask[index] = i
					}
				}
			})

			return splitedMask.join('')
		}

		const onlyNumber = value => {
			return typeof value === 'number' && !isNaN(value)
		}

		watch(flipCard, value => {
			if (value) onMouseEnterCvv()
			if (!value) onMouseLeaveCvv()
		})

		return {
			hasNumber,
			hasAllNumbers,
			front,
			back,
			monthsList,
			getCardType,
			getCardTypeImage,
			getCardChipImage,
			getMaskedCardNumber,
			getMaxCardNumber,
			getCardMask,
			getHolderName,
			formatedExpiration,
			cardStyleBg,
			cardStyleColor,
			cardStyleBorderRadius,
			cardStyleShadow,
			cardCcvStyleColor,
			textCardHolder,
			textCardExpiration,
			textCardCcv,
			flipCardOnHover,
			onMouseEnterCvv,
			onMouseLeaveCvv
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
.nb-credit-card__card {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	line-height: 1.42857143;
	font-family: 'Lato', sans-serif;
	background-color: transparent;
	height: 200px;
	width: 95%;
	min-width: 260px;
	max-width: 295px;
	padding-top: 13px;
	display: inline-block;
}

@media screen and (min-width: 768px) {
	.nb-credit-card__card {
		width: 95%;
	}
}

.nb-credit-card__card-faces {
	position: relative;
	width: 100%;
	height: 100%;
}

.nb-credit-card__card-faces--front,
.nb-credit-card__card-faces--back {
	position: absolute;
	width: 100%;
	height: 100%;
	backface-visibility: hidden;
	transition: transform 0.4s ease-out;
}

.nb-credit-card__card-faces .nb-credit-card__card-faces--front {
	padding: 15px;
	transform: perspective(1000px) rotateY(0deg);
}

.nb-credit-card__card-faces .nb-credit-card__card-faces--back {
	text-align: right;
	transform: perspective(1000px) rotateY(180deg);
}

.nb-credit-card__card-faces--front .nb-credit-card__front-images {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 45px;
}

.nb-credit-card__card-faces--front .nb-credit-card__front-images img {
	height: 100%;
	display: block;
}

.nb-credit-card__front-images .nb-credit-card__front-images--brand {
	height: 80%;
}
.nb-credit-card__card-faces--front .nb-credit-card__front-number {
	width: 100%;
	word-spacing: 15px;
	height: 54px;
	overflow: hidden;
	margin-bottom: 14px;
	padding: 19px 0;
	padding: 19px 0;
	font-weight: 900;
	font-size: 14px;
}
.nb-credit-card__front-number.without-number {
	letter-spacing: -1px;
}
.nb-credit-card__front-number.has-number {
	padding: 20px 0;
}
.nb-credit-card__front-number.has-all-numbers {
	font-size: 20px !important;
}
.nb-credit-card__card-faces--front .nb-credit-card__front-infos {
	display: flex;
	text-align: left;
}
.nb-credit-card__front-infos .nb-credit-card__front-column {
	font-size: 15px;
}
.nb-credit-card__front-column.nb-credit-card__front-column--name {
	margin-right: auto;
}
.nb-credit-card__front-column.nb-credit-card__front-column--expiration {
	width: 62px;
}
.nb-credit-card__card-faces--front
	.nb-credit-card__front-column
	.nb-credit-card__front-column-title,
.nb-credit-card__card-faces--back .nb-credit-card__back-column .nb-credit-card__back-column-title {
	font-size: 9px;
	font-style: italic;
	letter-spacing: 1px;
}
.nb-credit-card__front-column-value--name {
	width: 180px;
	overflow: hidden;
}
.nb-credit-card__card-faces--back .nb-credit-card__back-stripe {
	background: #000;
	width: 100%;
	margin: 10px 0;
	height: 40px;
}
.nb-credit-card__card-faces--back .nb-credit-card__back-column {
	padding: 0 20px;
}
.nb-credit-card__back-column .nb-credit-card__back-column-info {
	height: 40px;
	width: 67px;
	padding: 10px;
	width: 100%;
	position: relative;
	overflow: hidden;
}
.nb-credit-card__back-column-info .nb-credit-card__back-column-info--value {
	position: absolute;
	z-index: 1;
	right: 0px;
	top: 0;
	height: 100%;
	padding: 10px;
	width: 67px;
	background: #fff;
}

.nb-credit-card__back-column-info .nb-credit-card__back-column-info--image {
	height: 40px;
}
</style>
