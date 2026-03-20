# `nbFileValidation.js` — internal file validation helper

> **Scope:** This module is **internal** to `@vlalg-nimbus/nb-inputs`. Published npm packages only ship the `dist/` bundle: source files under `src/helpers/` are **not** redistributed as importable entry points.  
> **Intended consumers:** Vue components inside this package (e.g. `NbInputFile`, future drag-and-drop upload components).  
> **Do not** import from applications or from other packages in the monorepo unless you own this package and accept coupling to its private implementation.

---

## Table of contents

1. [Responsibilities](#responsibilities)
2. [Validation order (`validateIncomingFile`)](#validation-order-validateincomingfile)
3. [Public API reference](#public-api-reference)
4. [Locale & messages](#locale--messages)
5. [HTML `accept` semantics](#html-accept-semantics)
6. [Duplicate detection](#duplicate-detection)
7. [GIF dimension validation](#gif-dimension-validation)
8. [Video metadata validation](#video-metadata-validation)
9. [Usage pattern (batch selection)](#usage-pattern-batch-selection)
10. [Testing](#testing)
11. [Maintenance](#maintenance)

---

## Responsibilities

The helper centralises:

| Concern | Description |
|--------|-------------|
| **Accept / MIME** | Match `File.type` and filename extension against a comma-separated string compatible with the HTML `accept` attribute. |
| **Explicit extensions** | Optional stricter list (e.g. `['.png', '.jpg']`) applied **in addition** to `accept` when non-empty. |
| **Size** | Reject files larger than a byte limit (when limit is a positive number). |
| **Duplicates** | Optional block on same `name + size` against an existing list and/or a `Set` of keys for the current picker batch. |
| **GIF** | Async check of pixel dimensions for `image/gif` when width/height pair arrays are configured. |
| **Video** | Async check of aspect ratio and/or max duration from `<video>` metadata. |
| **i18n messages** | English defaults with merge-friendly `locale` object and `{placeholder}` replacement. |

It does **not** perform uploads, persistence, or UI.

---

## Validation order (`validateIncomingFile`)

When you call `validateIncomingFile(file, options)`, checks run in this **fixed** order (short-circuit on first failure):

1. `fileMatchesAccept(file, accept)`
2. `fileMatchesAllowedExtensions(file.name, allowedExtensions)` — skipped effectively if `allowedExtensions` is empty
3. `fileExceedsMaxSize(file, maxFileSizeBytes)`
4. `isDuplicateOfList(file, existingFiles, allowDuplicates)`
5. `isDuplicateInBatchKeySet(file, batchKeySet, allowDuplicates)`
6. `validateGifDimensions(file, gifWidth, gifHeight, locale)`
7. `validateVideoMetadata(file, { videoRatio, videoMaxDuration, aspectTolerance, locale })`

Each synchronous failure returns `{ ok: false, error: string }`. Async steps wrap failures in the same shape; thrown `Error` messages are surfaced as `error`.

---

## Public API reference

### `DEFAULT_FILE_VALIDATION_LOCALE`

Constant object of English template strings. Keys are listed under [Locale & messages](#locale--messages). Safe to spread and override partially.

---

### `formatLocaleMessage(template, vars = {})`

- **template** — String containing `{placeholder}` tokens (single word inside braces: `{fileName}`, `{max}`, etc.).
- **vars** — Map of placeholder name → value (string or number coerced with `String()`).
- **Returns** — Fully substituted string. Missing keys become empty segments. `null` / empty template returns `''`.

Used by all user-facing error strings and by `filesCounter` in the parent component.

---

### `resolveFileValidationLocale(partial = {})`

Returns `{ ...DEFAULT_FILE_VALIDATION_LOCALE, ...partial }`. Convenience for components that keep a `locale` prop.

---

### `getFileExtension(filename)`

Returns the substring after the **last** `.`, lowercased, or `''` if none. Does not include the dot.

---

### `normalizeExtension(ext)`

Normalises a user-supplied extension to lowercase and ensures a leading `.` (e.g. `png` → `.png`).

---

### `fileMatchesAccept(file, accept)`

- **file** — Browser `File` instance.
- **accept** — Comma-separated tokens (trimmed, lowercased). Empty / null → **always** `true` (no restriction from this function).

**Supported tokens:**

| Token pattern | Behaviour |
|---------------|-----------|
| `*/*` | Any file. |
| Exact MIME, e.g. `image/png` | Must equal `file.type` (case-insensitive). |
| Wildcard MIME, e.g. `image/*` | `file.type` must start with `image/`. |
| Extension, e.g. `.pdf` | Must match `file.name` extension. |

If **no** token matches → `false`.

---

### `fileMatchesAllowedExtensions(filename, allowedExtensions)`

- **allowedExtensions** — Array of strings (`'.png'` or `'jpg'` both work). Empty / null → `true`.
- Compares normalized extension of `filename` against each entry.

---

### `fileExceedsMaxSize(file, maxBytes)`

- `maxBytes` null, undefined, or `<= 0` → **never** exceeds (function returns `false`).
- Otherwise compares `file.size > maxBytes`.

---

### `duplicateKey(file)`

Returns a stable string key: `` `${file.name}\0${file.size}` `` (NUL separator — not meant for display). Used for `Set` lookups.

---

### `isDuplicateOfList(file, existingFiles, allowDuplicates)`

- **existingFiles** — Array of `File` (or objects with `name` and `size`).
- If `allowDuplicates === true` → always `false`.
- Else `true` if any existing entry has the same `name` **and** `size`.

---

### `isDuplicateInBatchKeySet(file, batchKeySet, allowDuplicates)`

- **batchKeySet** — `Set` of `duplicateKey` values for files already accepted in the **current** selection pass.
- If `allowDuplicates` or falsy `batchKeySet` → `false`.
- Else `true` if `batchKeySet.has(duplicateKey(file))`.

---

### `validateGifDimensions(file, gifWidth, gifHeight, locale = {})`

**Async** (`Promise<void>`).

- If `gifWidth` / `gifHeight` are missing, length 0, or **length mismatch** → resolves immediately (no GIF rule).
- If `file.type !== 'image/gif'` → resolves immediately (rule only applies to GIFs).
- Otherwise loads the file via `Image` + `URL.createObjectURL`, then:
  - **resolve** if `(width, height)` equals **any** pair `(gifWidth[i], gifHeight[i])`.
  - **reject** with `Error` message built from `locale.gifDimensionsInvalid` / `gifLoadError`.

Object URLs are revoked on load or error.

---

### `validateVideoMetadata(file, options)`

**Async** (`Promise<void>`).

**options:**

| Field | Type | Effect |
|-------|------|--------|
| `videoRatio` | `string` | e.g. `'16:9'`. Empty → skip aspect check. |
| `videoMaxDuration` | `number` | Seconds; null / ≤ 0 → skip duration check. |
| `aspectTolerance` | `number` | Default `0.01`. Compared to `abs(videoAspect - targetAspect)`. |
| `locale` | `object` | Merged with defaults for `videoAspectInvalid`, `videoDurationInvalid`, `videoLoadError`. |

- Non-video files resolve immediately.
- If **neither** ratio nor duration is required, resolves immediately.
- Loads metadata via temporary `<video>`, then may **reject** with formatted aspect/duration/load errors.

---

### `validateIncomingFile(file, options)`

**Async** — returns `Promise<{ ok: true } | { ok: false, error: string }>`.

**options:**

| Field | Description |
|-------|-------------|
| `accept` | String passed to `fileMatchesAccept`. |
| `allowedExtensions` | Array for `fileMatchesAllowedExtensions`. |
| `maxFileSizeBytes` | Positive number enables size cap. |
| `allowDuplicates` | Default `false`. |
| `existingFiles` | Array of already committed `File`s for duplicate check. |
| `batchKeySet` | `Set` of keys for in-batch duplicate check (see above). |
| `gifWidth` / `gifHeight` | Arrays of allowed dimension pairs for GIF. |
| `videoRatio` / `videoMaxDuration` / `videoAspectTolerance` | Passed through to video validation. |
| `locale` | Plain object merged over `DEFAULT_FILE_VALIDATION_LOCALE`. |

---

## Locale & messages

Templates use **curly** placeholders only: `{fileName}`, `{max}`, etc. Literal braces in text should be avoided or escaped outside this mechanism.

| Key | Placeholders | Purpose |
|-----|--------------|---------|
| `typeNotAllowed` | `fileType`, `accept` | MIME / accept mismatch. |
| `extensionNotAllowed` | `fileName`, `list` | `allowedExtensions` mismatch. |
| `sizeExceeded` | `fileName` | File too large. |
| `duplicateInList` | `fileName` | Already in `existingFiles`. |
| `duplicateInBatch` | `fileName` | Duplicate in same batch / picker dialog. |
| `gifDimensionsInvalid` | `width`, `height`, `allowedPairs` | GIF pixel size not in allowlist. |
| `gifLoadError` | — | Failed to decode GIF for measurement. |
| `videoAspectInvalid` | `width`, `height`, `aspect`, `ratio` | Aspect ratio out of tolerance. |
| `videoDurationInvalid` | `duration`, `maxDuration` | Video too long. |
| `videoLoadError` | — | Failed to read video metadata. |
| `maxFilesReached` | `max` | Used by `NbInputFile` when cap is hit (not emitted from this function directly; same locale object). |
| `filesCounter` | `current`, `max` | Display string for “N / M” style counter in the component UI. |

Any omitted key falls back to `DEFAULT_FILE_VALIDATION_LOCALE`.

---

## HTML `accept` semantics

The helper mirrors common browser behaviour:

- Token list is **comma-separated**; whitespace around tokens is trimmed.
- Matching is **case-insensitive** for MIME and extensions derived from the filename.
- **Either** a MIME rule **or** an extension rule matching is enough for that token; the file must match **at least one** token when `accept` is non-empty.

`allowedExtensions` is a **second** gate: if the array is non-empty, the extension must appear in it **even** when `accept` already matched.

---

## Duplicate detection

- Identity is **name + size** (not inode, not content hash).
- Two different files with the same name are distinguished by size; two identical re-selections of the same path typically yield the same `File` identity and are blocked when duplicates are disabled.
- **Batch** `Set` prevents the user from selecting the same file twice in one native multi-select or one drop operation before parent state merges the array.

---

## GIF dimension validation

- Arrays must be the **same length**; index `i` defines pair `(gifWidth[i], gifHeight[i])`.
- Only **exact** pixel matches pass (no tolerance).
- Non-GIF files never trigger dimension errors from this helper.

---

## Video metadata validation

- **Aspect:** `videoRatio` is parsed as `w:h` (two positive numbers). Target aspect = `w/h`. Compared to `video.videoWidth / video.videoHeight` with `aspectTolerance`.
- **Duration:** Compared only when `video.duration` is finite and `videoMaxDuration > 0`.
- Browser codecs and security rules may prevent metadata load on some files → `videoLoadError`.

---

## Usage pattern (batch selection)

```javascript
import {
  validateIncomingFile,
  duplicateKey,
} from '@helpers/nbFileValidation.js'

const batchKeys = new Set()
const valid = []

for (const file of Array.from(input.files)) {
  const result = await validateIncomingFile(file, {
    accept: 'image/*',
    allowedExtensions: ['.png', '.jpg'],
    maxFileSizeBytes: 5 * 1024 * 1024,
    allowDuplicates: false,
    existingFiles: committedFiles,
    batchKeySet: batchKeys,
    gifWidth: [],
    gifHeight: [],
    videoRatio: '',
    videoMaxDuration: null,
    videoAspectTolerance: 0.01,
    locale: {}, // optional partial overrides
  })

  if (!result.ok) {
    // surface result.error
    continue
  }
  batchKeys.add(duplicateKey(file))
  valid.push(file)
}
```

After this loop, apply your own `maxFiles` cap / merge into `committedFiles`.

---

## Testing

Unit tests live next to the module: `nbFileValidation.spec.js` (Vitest, jsdom). Extend them when adding new rules or locale keys.

---

## Maintenance

- Keep this document in sync when:
  - Adding/removing exported functions or options.
  - Changing validation order or accept semantics.
  - Adding locale keys (update `DEFAULT_FILE_VALIDATION_LOCALE`, this file, and the user-facing `6.nb-input-file.md` in nimbus-docs).
- Cross-reference: `../components/NbInputFile.vue` and `../../../apps/nimbus-docs/content/3.vue-components/7.nb-inputs/6.nb-input-file.md`.
