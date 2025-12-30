/* eslint-disable @typescript-eslint/no-explicit-any */
export type DebounceOptions<T extends (...args: any[]) => any> = {
  wait?: number
  callback: T
  firstClickOnly?: boolean
}

export type DebounceReturn<T extends (...args: any[]) => any> = {
  debouncedFunction: (...args: Parameters<T>) => Promise<ReturnType<T>>
  cancel: () => void
}
/* eslint-enable @typescript-eslint/no-explicit-any */
