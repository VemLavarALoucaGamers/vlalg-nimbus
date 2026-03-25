/**
 * Shared file validation utilities for components in this package only.
 *
 * Full narrative documentation: **nbFileValidation.md** (English).
 *
 * @internal Not part of the public API of `@vlalg-nimbus/nb-inputs`. Published
 * packages ship only `dist/`; this source is not a supported import path for
 * applications or sibling packages. Use only from `src/components/*`.
 */

/**
 * Default English message templates for validation errors and UI strings.
 * Placeholders use single braces, e.g. {fileName}, {max}.
 * Components may pass a partial object via a `locale` prop; missing keys keep these defaults.
 *
 * Keys: typeNotAllowed, extensionNotAllowed, sizeExceeded, duplicateInList, duplicateInBatch,
 * gifDimensionsInvalid, gifLoadError, videoAspectInvalid, videoDurationInvalid, videoLoadError,
 * maxFilesReached, filesCounter.
 */
/**
 * Tipos estáveis para erros de validação de ficheiro (uso em UI, analytics, i18n condicional).
 * Valores em SCREAMING_SNAKE_CASE; compara com `payload.errorType` nos eventos do componente.
 */
export const FileValidationErrorType = Object.freeze({
  TYPE_NOT_ALLOWED: 'TYPE_NOT_ALLOWED',
  EXTENSION_NOT_ALLOWED: 'EXTENSION_NOT_ALLOWED',
  SIZE_EXCEEDED: 'SIZE_EXCEEDED',
  DUPLICATE_IN_LIST: 'DUPLICATE_IN_LIST',
  DUPLICATE_IN_BATCH: 'DUPLICATE_IN_BATCH',
  GIF_DIMENSIONS_INVALID: 'GIF_DIMENSIONS_INVALID',
  GIF_LOAD_ERROR: 'GIF_LOAD_ERROR',
  VIDEO_ASPECT_INVALID: 'VIDEO_ASPECT_INVALID',
  VIDEO_DURATION_INVALID: 'VIDEO_DURATION_INVALID',
  VIDEO_LOAD_ERROR: 'VIDEO_LOAD_ERROR',
  MAX_FILES_REACHED: 'MAX_FILES_REACHED',
  UNKNOWN: 'UNKNOWN',
})

/**
 * Objeto normalizado para `errors` internos e eventos `validation-error` / `validation-errors`.
 *
 * @param {File | null} file
 * @param {string} msg
 * @param {string} errorType - Um valor de {@link FileValidationErrorType}.
 * @returns {{ file: File | null, fileName: string, msg: string, errorType: string }}
 */
export function buildFileValidationErrorPayload(file, msg, errorType) {
  return {
    file: file ?? null,
    fileName: file?.name ?? '',
    msg,
    errorType,
  }
}

/**
 * @param {string} message
 * @param {string} errorType
 * @returns {Error & { code: string }}
 */
export function createFileValidationError(message, errorType) {
  const err = new Error(message)
  err.code = errorType
  return err
}

export const DEFAULT_FILE_VALIDATION_LOCALE = {
  typeNotAllowed: 'File type not allowed ({fileType}). Accept: {accept}',
  extensionNotAllowed: 'Extension not allowed for \'{fileName}\'. Allowed: {list}',
  sizeExceeded: 'File \'{fileName}\' exceeds maximum allowed size.',
  duplicateInList: 'File \'{fileName}\' is already added.',
  duplicateInBatch: 'Duplicate file \'{fileName}\' in the same selection.',
  gifDimensionsInvalid: 'Invalid GIF dimensions: {width}x{height}. Allowed: {allowedPairs}',
  gifLoadError: 'Could not load GIF for dimension validation',
  videoAspectInvalid: 'Invalid video aspect: {width}x{height} ({aspect}). Expected ratio {ratio}',
  videoDurationInvalid: 'Invalid video duration: {duration}s. Max allowed: {maxDuration}s',
  videoLoadError: 'Could not load video for validation',
  /** Shown by the parent when the user tries to add files but `maxFiles` is already reached. */
  maxFilesReached: 'Limit of {max} files reached.',
  /** Counter under the field; placeholders `{current}` and `{max}` (e.g. "3/5" or "3 of 5"). */
  filesCounter: '{current}/{max}',
}

/**
 * Replaces `{key}` tokens in `template` with string values from `vars`.
 * Unknown or empty values become an empty string for that token.
 *
 * @param {string | null | undefined} template - Message with `{word}` placeholders (word = alphanumeric key).
 * @param {Record<string, string | number>} [vars] - Map of key → value coerced with `String()`.
 * @returns {string} Substituted string; `''` if template is null/empty.
 */
export function formatLocaleMessage(template, vars = {}) {
  if (template == null || String(template) === '') return ''
  return String(template).replace(/\{(\w+)\}/g, (_, key) => {
    const v = vars[key]
    return v != null && v !== '' ? String(v) : ''
  })
}

/**
 * Merges user-provided locale strings over the English defaults.
 *
 * @param {Record<string, string>} [partial] - Partial override of `DEFAULT_FILE_VALIDATION_LOCALE` keys.
 * @returns {Record<string, string>} Full locale map for validation / UI.
 */
export function resolveFileValidationLocale(partial = {}) {
  return { ...DEFAULT_FILE_VALIDATION_LOCALE, ...partial }
}

/**
 * Returns the file extension without the dot, lowercased.
 *
 * @param {string} filename - Basename or path (only the last `.` segment is used).
 * @returns {string} Lowercase extension, or `''` if there is no `.` or input is invalid.
 */
export function getFileExtension(filename) {
  if (!filename || typeof filename !== 'string') return ''
  const dot = filename.lastIndexOf('.')
  if (dot < 0) return ''
  return filename.slice(dot + 1).toLowerCase()
}

/**
 * Normalises an extension token to a leading-dot, lowercase form (e.g. `PNG` → `.png`).
 *
 * @param {string} ext - Extension with or without `.`
 * @returns {string} Normalised extension or `''` if empty after trim.
 */
export function normalizeExtension(ext) {
  const s = String(ext).trim().toLowerCase()
  if (!s) return ''
  return s.startsWith('.') ? s : `.${s}`
}

/**
 * Whether the given `File` matches an HTML `accept`-style comma-separated list.
 * Empty or whitespace-only `accept` means no restriction (always `true`).
 *
 * Supported tokens (case-insensitive after trim): full wildcard MIME, exact MIME (e.g. image/png),
 * subtype wildcard (e.g. image with any subtype), file extension (e.g. .pdf).
 *
 * @param {File} file
 * @param {string | null | undefined} accept - Comma-separated tokens, same idea as `<input accept="...">`.
 * @returns {boolean} `true` if `accept` is empty or any token matches.
 */
export function fileMatchesAccept(file, accept) {
  if (accept == null || String(accept).trim() === '') return true

  const fileType = (file.type || '').toLowerCase()
  const fileExtension = `.${getFileExtension(file.name)}`

  const tokens = String(accept)
    .split(',')
    .map(t => t.trim().toLowerCase())
    .filter(Boolean)

  for (const token of tokens) {
    if (token === '*/*') return true
    if (token === fileType) return true
    if (token.endsWith('/*')) {
      const base = token.slice(0, -2)
      if (fileType.startsWith(`${base}/`)) return true
    }
    if (token.startsWith('.') && token === fileExtension) return true
  }
  return false
}

/**
 * Whether `filename`'s extension is in the allow-list.
 * Empty `allowedExtensions` means no restriction (always `true`).
 *
 * @param {string} filename
 * @param {string[]} allowedExtensions - Items may include or omit the dot (e.g. `['.png', 'jpg']`).
 * @returns {boolean}
 */
export function fileMatchesAllowedExtensions(filename, allowedExtensions) {
  if (!allowedExtensions || allowedExtensions.length === 0) return true
  const ext = `.${getFileExtension(filename)}`
  return allowedExtensions.some(a => normalizeExtension(a) === ext)
}

/**
 * @param {File} file
 * @param {number | null | undefined} maxBytes - If null/undefined or `<= 0`, size is never considered exceeded.
 * @returns {boolean} `true` if `file.size > maxBytes`.
 */
export function fileExceedsMaxSize(file, maxBytes) {
  if (maxBytes == null || maxBytes <= 0) return false
  return file.size > maxBytes
}

/**
 * Stable key for duplicate checks: name + NUL + size (not for human display).
 *
 * @param {File | { name: string, size: number }} file
 * @returns {string}
 */
export function duplicateKey(file) {
  return `${file.name}\0${file.size}`
}

/**
 * Whether `file` already exists in `existingFiles` (same `name` and `size`).
 * If `allowDuplicates` is true, always returns false.
 *
 * @param {File | { name: string, size: number }} file
 * @param {Array<{ name: string, size: number }>} existingFiles
 * @param {boolean} allowDuplicates
 * @returns {boolean}
 */
export function isDuplicateOfList(file, existingFiles, allowDuplicates) {
  if (allowDuplicates) return false
  return existingFiles.some(
    f => f.name === file.name && f.size === file.size,
  )
}

/**
 * Whether `file`'s key is already present in `batchKeySet` (same selection batch).
 * No-op if `allowDuplicates` is true or `batchKeySet` is falsy.
 *
 * @param {File | { name: string, size: number }} file
 * @param {Set<string> | undefined} batchKeySet - Set of `duplicateKey` values already accepted in this batch.
 * @param {boolean} allowDuplicates
 * @returns {boolean}
 */
export function isDuplicateInBatchKeySet(file, batchKeySet, allowDuplicates) {
  if (allowDuplicates || !batchKeySet) return false
  return batchKeySet.has(duplicateKey(file))
}

/**
 * Validates GIF pixel dimensions when `gifWidth` / `gifHeight` define at least one matching pair.
 * Resolves immediately (no-op) if arrays are missing, length mismatch, empty, or file is not `image/gif`.
 * Uses `Image` + `URL.createObjectURL`; revokes the URL after load/error.
 *
 * @param {File} file
 * @param {number[] | undefined} gifWidth - Allowed widths; index `i` pairs with `gifHeight[i]`.
 * @param {number[] | undefined} gifHeight - Same length as `gifWidth` when rules apply.
 * @param {Record<string, string>} [locale] - Merged with defaults; uses `gifDimensionsInvalid`, `gifLoadError`.
 * @returns {Promise<void>} Resolves if valid or skipped; rejects with `Error` message on failure.
 */
export function validateGifDimensions(file, gifWidth, gifHeight, locale = {}) {
  const L = { ...DEFAULT_FILE_VALIDATION_LOCALE, ...locale }
  return new Promise((resolve, reject) => {
    const widths = gifWidth || []
    const heights = gifHeight || []
    if (!widths.length || !heights.length || widths.length !== heights.length) {
      resolve()
      return
    }
    if (file.type !== 'image/gif') {
      resolve()
      return
    }

    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(url)
      const w = img.width
      const h = img.height
      let ok = false
      for (let i = 0; i < widths.length; i++) {
        if (w === widths[i] && h === heights[i]) {
          ok = true
          break
        }
      }
      if (ok) resolve()
      else {
        const pairs = widths.map((gw, i) => `${gw}x${heights[i]}`).join(' or ')
        reject(createFileValidationError(formatLocaleMessage(L.gifDimensionsInvalid, {
          width: w,
          height: h,
          allowedPairs: pairs,
        }), FileValidationErrorType.GIF_DIMENSIONS_INVALID))
      }
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(createFileValidationError(L.gifLoadError, FileValidationErrorType.GIF_LOAD_ERROR))
    }
    img.src = url
  })
}

/**
 * Validates video aspect ratio and/or max duration using `<video>` metadata.
 * Resolves immediately for non-video files, or when neither ratio nor duration rule is active.
 *
 * @param {File} file
 * @param {object} [options]
 * @param {string} [options.videoRatio] - Target aspect as `width:height` (e.g. `16:9`). Empty skips ratio check.
 * @param {number | null} [options.videoMaxDuration] - Max seconds; null or `<= 0` skips duration check.
 * @param {number} [options.aspectTolerance=0.01] - Allowed deviation from target `width/height` ratio.
 * @param {Record<string, string>} [options.locale] - Merged with defaults for video error strings.
 * @returns {Promise<void>} Resolves if valid or skipped; rejects with `Error` on validation/load failure.
 */
export function validateVideoMetadata(file, options = {}) {
  const {
    videoRatio,
    videoMaxDuration,
    aspectTolerance = 0.01,
    locale = {},
  } = options

  const L = { ...DEFAULT_FILE_VALIDATION_LOCALE, ...locale }

  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('video/')) {
      resolve()
      return
    }

    const needRatio = videoRatio != null && String(videoRatio).trim() !== ''
    const needDuration = videoMaxDuration != null && videoMaxDuration > 0

    if (!needRatio && !needDuration) {
      resolve()
      return
    }

    const video = document.createElement('video')
    const url = URL.createObjectURL(file)
    video.preload = 'metadata'
    video.muted = true

    video.onloadedmetadata = () => {
      URL.revokeObjectURL(url)

      if (needRatio) {
        const targetParts = String(videoRatio).split(':').map(Number)
        if (targetParts.length === 2 && targetParts.every(n => !Number.isNaN(n) && n > 0)) {
          const targetAspect = targetParts[0] / targetParts[1]
          const vw = video.videoWidth
          const vh = video.videoHeight
          if (vh > 0) {
            const videoAspect = vw / vh
            if (Math.abs(videoAspect - targetAspect) > aspectTolerance) {
              reject(createFileValidationError(formatLocaleMessage(L.videoAspectInvalid, {
                width: vw,
                height: vh,
                aspect: videoAspect.toFixed(2),
                ratio: videoRatio,
              }), FileValidationErrorType.VIDEO_ASPECT_INVALID))
              return
            }
          }
        }
      }

      if (needDuration && Number.isFinite(video.duration) && video.duration > videoMaxDuration) {
        reject(createFileValidationError(formatLocaleMessage(L.videoDurationInvalid, {
          duration: video.duration.toFixed(2),
          maxDuration: videoMaxDuration,
        }), FileValidationErrorType.VIDEO_DURATION_INVALID))
        return
      }

      resolve()
    }

    video.onerror = () => {
      URL.revokeObjectURL(url)
      reject(createFileValidationError(L.videoLoadError, FileValidationErrorType.VIDEO_LOAD_ERROR))
    }

    video.src = url
  })
}

/**
 * Runs all validation steps in order: accept, extensions, size, list duplicate,
 * batch duplicate, GIF dimensions, video metadata.
 * Returns a discriminated result instead of throwing for synchronous rules; async failures are caught and mapped to `{ ok: false, error, errorType }`.
 *
 * @param {File} file
 * @param {object} options
 * @param {string} [options.accept] - `accept` string for `fileMatchesAccept`.
 * @param {string[]} [options.allowedExtensions] - Extra extension allow-list; empty skips.
 * @param {number} [options.maxFileSizeBytes] - Max bytes; non-positive skips size check.
 * @param {boolean} [options.allowDuplicates=false] - If true, duplicate checks are skipped.
 * @param {File[]} [options.existingFiles=[]] - Already committed files (same name+size = duplicate).
 * @param {Set<string>} [options.batchKeySet] - Keys already accepted in the current picker batch.
 * @param {number[]} [options.gifWidth] - GIF width allow-list pairs.
 * @param {number[]} [options.gifHeight] - GIF height allow-list pairs.
 * @param {string} [options.videoRatio] - e.g. `16:9`.
 * @param {number | null} [options.videoMaxDuration] - Seconds.
 * @param {number} [options.videoAspectTolerance=0.01]
 * @param {Record<string, string>} [options.locale] - Partial override of `DEFAULT_FILE_VALIDATION_LOCALE`.
 * @returns {Promise<{ ok: true } | { ok: false, error: string, errorType: string }>}
 */
export async function validateIncomingFile(file, {
  accept,
  allowedExtensions,
  maxFileSizeBytes,
  allowDuplicates = false,
  existingFiles = [],
  batchKeySet,
  gifWidth,
  gifHeight,
  videoRatio,
  videoMaxDuration,
  videoAspectTolerance = 0.01,
  locale = {},
}) {
  const L = { ...DEFAULT_FILE_VALIDATION_LOCALE, ...locale }

  try {
    if (!fileMatchesAccept(file, accept)) {
      return {
        ok: false,
        error: formatLocaleMessage(L.typeNotAllowed, {
          fileType: file.type || 'unknown',
          accept: accept || 'any',
        }),
        errorType: FileValidationErrorType.TYPE_NOT_ALLOWED,
      }
    }
    if (!fileMatchesAllowedExtensions(file.name, allowedExtensions)) {
      const list = (allowedExtensions || []).map(normalizeExtension).filter(Boolean).join(', ')
      return {
        ok: false,
        error: formatLocaleMessage(L.extensionNotAllowed, {
          fileName: file.name,
          list,
        }),
        errorType: FileValidationErrorType.EXTENSION_NOT_ALLOWED,
      }
    }
    if (fileExceedsMaxSize(file, maxFileSizeBytes)) {
      return {
        ok: false,
        error: formatLocaleMessage(L.sizeExceeded, { fileName: file.name }),
        errorType: FileValidationErrorType.SIZE_EXCEEDED,
      }
    }
    if (isDuplicateOfList(file, existingFiles, allowDuplicates)) {
      return {
        ok: false,
        error: formatLocaleMessage(L.duplicateInList, { fileName: file.name }),
        errorType: FileValidationErrorType.DUPLICATE_IN_LIST,
      }
    }
    if (isDuplicateInBatchKeySet(file, batchKeySet, allowDuplicates)) {
      return {
        ok: false,
        error: formatLocaleMessage(L.duplicateInBatch, { fileName: file.name }),
        errorType: FileValidationErrorType.DUPLICATE_IN_BATCH,
      }
    }

    await validateGifDimensions(file, gifWidth, gifHeight, L)
    await validateVideoMetadata(file, {
      videoRatio,
      videoMaxDuration,
      aspectTolerance: videoAspectTolerance,
      locale: L,
    })

    return { ok: true }
  } catch (e) {
    const msg = e && typeof e.message === 'string' ? e.message : String(e)
    const errorType = e && typeof e.code === 'string' && e.code ? e.code : FileValidationErrorType.UNKNOWN
    return { ok: false, error: msg, errorType }
  }
}
