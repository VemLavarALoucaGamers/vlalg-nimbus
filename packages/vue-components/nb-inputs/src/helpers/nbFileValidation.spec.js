import { describe, it, expect } from 'vitest'
import {
  fileMatchesAccept,
  fileMatchesAllowedExtensions,
  fileExceedsMaxSize,
  duplicateKey,
  isDuplicateInBatchKeySet,
  formatLocaleMessage,
  validateIncomingFile,
} from './nbFileValidation.js'

function file(name, type, size = 100) {
  const f = new File(['x'], name, { type })
  Object.defineProperty(f, 'size', { value: size })
  return f
}

describe('nbFileValidation', () => {
  it('fileMatchesAccept wildcard image', () => {
    const f = file('a.png', 'image/png')
    expect(fileMatchesAccept(f, 'image/*')).toBe(true)
    expect(fileMatchesAccept(f, 'video/*')).toBe(false)
  })

  it('fileMatchesAccept extension token', () => {
    const f = file('a.pdf', 'application/pdf')
    expect(fileMatchesAccept(f, '.pdf')).toBe(true)
    expect(fileMatchesAccept(f, '.png')).toBe(false)
  })

  it('fileMatchesAllowedExtensions', () => {
    expect(fileMatchesAllowedExtensions('a.PNG', ['.png', 'jpg'])).toBe(true)
    expect(fileMatchesAllowedExtensions('a.gif', ['.png'])).toBe(false)
  })

  it('fileExceedsMaxSize', () => {
    const f = file('a.txt', 'text/plain', 200)
    expect(fileExceedsMaxSize(f, 100)).toBe(true)
    expect(fileExceedsMaxSize(f, 300)).toBe(false)
  })

  it('duplicate batch key', () => {
    const f = file('a.txt', 'text/plain', 42)
    const set = new Set()
    expect(isDuplicateInBatchKeySet(f, set, false)).toBe(false)
    set.add(duplicateKey(f))
    expect(isDuplicateInBatchKeySet(f, set, false)).toBe(true)
  })

  it('formatLocaleMessage replaces placeholders', () => {
    expect(formatLocaleMessage('{a} {b}', { a: 1, b: 'x' })).toBe('1 x')
  })

  it('validateIncomingFile uses locale overrides', async () => {
    const f = file('x.bin', 'application/octet-stream', 10)
    const r = await validateIncomingFile(f, {
      accept: 'image/*',
      allowDuplicates: false,
      existingFiles: [],
      locale: { typeNotAllowed: 'PT: {fileType}' },
    })
    expect(r.ok).toBe(false)
    expect(r.error).toContain('PT:')
    expect(r.error).toContain('application/octet-stream')
  })
})
