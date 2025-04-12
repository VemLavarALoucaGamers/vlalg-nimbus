import type { DebounceOptions, DebounceReturn } from './types'

/* eslint-disable @typescript-eslint/no-explicit-any */
function debounceFactory<T extends (...args: any[]) => any>(
  options: DebounceOptions<T>
): DebounceReturn<T> {
  const { wait = 1000, callback, firstClickOnly = false } = options

  let timerId: ReturnType<typeof setTimeout> | null = null

  const cancel = () => {
    if (timerId) {
      clearTimeout(timerId)
      timerId = null
    }
  }

  const debouncedFunction = (...args: Parameters<T>): Promise<ReturnType<T>> => {
    if (typeof callback !== 'function') {
      return Promise.reject(new Error('Callback must be a function'))
    }

    if (firstClickOnly && timerId) {
      return Promise.resolve(undefined as unknown as ReturnType<T>)
    }

    clearTimeout(timerId!)

    return new Promise((resolve) => {
      timerId = setTimeout(() => {
        const result = callback(...args)
        resolve(result)
      }, wait)
    })
  }

  return {
    debouncedFunction,
    cancel
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export default debounceFactory
