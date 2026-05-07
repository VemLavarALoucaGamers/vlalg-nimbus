import masker from 'vue-the-mask/src/masker'
import maskit from 'vue-the-mask/src/maskit'

/** Conta placeholders da máscara (`#`, `X`, `S`…), respeitando `!` escape do vue-the-mask. */
export function countMaskTokenSlots(maskStr, tokens) {
  // Se a máscara estiver vazia, retornar 0
	if (!maskStr) return 0

  // Se a máscara não estiver vazia, contar os placeholders
	let n = 0
	let i = 0
	
  // Percorrer a máscara e contar os placeholders
  while (i < maskStr.length) {
		const c = maskStr[i] // Caractere atual
		const def = tokens[c] // Definição do caractere

    // Se o caractere for um escape, pular o caractere de escape
		if (def?.escape) {
			i += 2 // Pular o caractere de escape

			continue
		}

    // Se o caractere for um placeholder, incrementar o contador
		if (def) n++
		
    i++ // Incrementar o contador
	}

  // Retornar o contador de placeholders
	return n
}

/** Padrão ativo para máscara dinâmica (array), alinhado a `vue-the-mask/src/dynamic-mask`. */
export function resolveActiveMaskString(masks, value, tokens) {
  // Ordenar as máscaras pelo tamanho
	const sorted = [...masks].sort((a, b) => a.length - b.length)

  // Percorrer as máscaras e encontrar a máscara ativa
	let i = 0
	while (i < sorted.length) {
		const currentMask = sorted[i] // Máscara atual
		i++ // Incrementar o contador
		const nextMask = sorted[i] // Máscara seguinte

    // Se a máscara seguinte for maior que a máscara ativa, retornar a máscara ativa
		if (!(nextMask && maskit(value, nextMask, true, tokens).length > currentMask.length)) {
      // Se a máscara seguinte for maior que a máscara ativa, retornar a máscara ativa
			return currentMask
		}
	}

  // Retornar a primeira máscara
	return sorted[0] || ''
}

/**
 * @param {string} maskedRaw
 * @param {string|string[]} directiveMask — mesmo binding que `v-mask` (array = cópia segura)
 * @param {Record<string, object>} tokens — ex.: `vueTheMask.tokens`
 */
export function getMaskCompletionState(maskedRaw, directiveMask, tokens) {
  // Se a máscara for um array, contar os placeholders
	const mask = directiveMask

  // Se a máscara for uma string, converter para string
	const value = String(maskedRaw ?? '')

  // Se a máscara for uma string, converter para string
	const clean = masker(value, mask, false, tokens)

  // Se a máscara não for um array, contar os placeholders
	if (!Array.isArray(mask)) {
    // Contar os placeholders
		const need = countMaskTokenSlots(mask, tokens)

    // Se o número de placeholders for 0, retornar true
		if (need === 0) {
			return { complete: true, clean, pattern: mask, requiredTokens: 0, filledTokens: clean.length }
		}

    // Retornar o estado da máscara
		return {
			complete: clean.length === need,
			clean,
			pattern: mask,
			requiredTokens: need,
			filledTokens: clean.length,
		}
	}

  // Encontrar a máscara ativa
	const pattern = resolveActiveMaskString(mask, value, tokens)

  // Contar os placeholders
	const need = countMaskTokenSlots(pattern, tokens)

  // Se o número de placeholders for 0, retornar true
	if (need === 0) {
		return { complete: true, clean, pattern, requiredTokens: 0, filledTokens: clean.length }
	}

  // Retornar o estado da máscara
	return {
		complete: clean.length === need,
		clean,
		pattern,
		requiredTokens: need,
		filledTokens: clean.length,
	}
}
