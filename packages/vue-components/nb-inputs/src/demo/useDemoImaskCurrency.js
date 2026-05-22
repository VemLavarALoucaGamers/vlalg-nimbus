import { ref, onUnmounted } from 'vue'
import IMask from 'imask'

/**
 * Exemplo de moeda BR/EN com IMask + NbInput `input-mask-external`.
 * Não é publicado no pacote — copie para o seu app (`npm i imask`).
 *
 * Documentação: `apps/nimbus-docs/content/3.vue-components/7.nb-inputs/2.nb-input.md`
 *   (seção “External mask (`input-mask-external`)”).
 * Demo: `src/App.vue` → “dois modos de máscara” → 2) External.
 */
export function useDemoImaskCurrency(locale = 'br') {
  const maskedDisplay = ref('')
  const cleanValue = ref('')

  /** @type {import('imask').InputMask | null} */
  let imaskInstance = null

  const prefix = locale === 'en' ? '$ ' : 'R$ '
  /** `,` e `.` podem iniciar/continuar a parte decimal (BR: vírgula; EN: ponto). */
  const separators =
    locale === 'en'
      ? { thousandsSeparator: ',', radix: '.', mapToRadix: ['.', ','] }
      : { thousandsSeparator: '.', radix: ',', mapToRadix: ['.', ','] }

  let skipRegisterSync = false

  const maskedToImaskValue = (masked) => {
    if (!masked || !String(masked).trim()) return ''
    const clean = formatMaskCleanForCurrency(masked, locale)
    if (!clean) return ''
    const num = Number(clean)
    return Number.isNaN(num) ? '' : num
  }

  const formatMaskCleanForCurrency = (value, loc) => {
    const masked = String(value ?? '').trim()
    if (!masked) return ''
    const decSep = loc === 'en' ? '.' : ','
    const decIdx = masked.lastIndexOf(decSep)
    if (decIdx !== -1) {
      const intPart = masked.slice(0, decIdx).replace(/[^\d-]/g, '')
      const decPart = masked.slice(decIdx + 1).replace(/\D/g, '')
      if (!intPart && !decPart) return ''
      if (!decPart) return intPart || ''
      return `${intPart || '0'}.${decPart}`
    }
    const digits = masked.replace(/[^\d-]/g, '')
    return digits || ''
  }

  let setMaskedValueOnInput = null

  const syncFromImask = () => {
    if (!imaskInstance) return
    const display = imaskInstance.displayValue
    const masked = display ? `${prefix}${display}` : ''
    const typed = imaskInstance.typedValue
    const clean =
      typed === '' || typed == null || Number.isNaN(Number(typed))
        ? ''
        : Number(typed).toFixed(2)

    skipRegisterSync = true
    maskedDisplay.value = masked
    cleanValue.value = clean
    setMaskedValueOnInput?.(display)
    queueMicrotask(() => {
      skipRegisterSync = false
    })
  }

  /**
   * @param {{
   *   inputEl: HTMLInputElement
   *   registerSync?: (fn: (masked: string) => void) => void
   *   setMaskedValue?: (masked: string) => void
   * }} payload
   */
  const attach = ({ inputEl, registerSync, setMaskedValue }) => {
    if (!inputEl) return

    setMaskedValueOnInput = typeof setMaskedValue === 'function' ? setMaskedValue : null

    imaskInstance?.destroy()
    imaskInstance = IMask(inputEl, {
      mask: Number,
      scale: 2,
      signed: false,
      normalizeZeros: true,
      padFractionalZeros: false,
      ...separators,
    })

    registerSync?.((masked) => {
      if (!imaskInstance || skipRegisterSync) return
      const next = maskedToImaskValue(masked)
      if (next === '') {
        imaskInstance.value = ''
      } else {
        imaskInstance.updateValue(next)
      }
      syncFromImask()
    })

    imaskInstance.on('accept', syncFromImask)
    syncFromImask()
  }

  const destroy = () => {
    imaskInstance?.destroy()
    imaskInstance = null
  }

  onUnmounted(destroy)

  return {
    maskedDisplay,
    cleanValue,
    attach,
    destroy,
  }
}
