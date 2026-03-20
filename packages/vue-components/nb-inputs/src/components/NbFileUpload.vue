<template>
  <div
    :id="nbId"
    class="nb-file-upload"
    role="region"
    :aria-label="ariaLabel"
  >
    <div v-if="!uploadUrl" class="nb-file-upload__warn">
      {{ locale.missingUploadUrl }}
    </div>

    <div
      v-else-if="showStartButton && (hasPending || hasErrors || items.length)"
      class="nb-file-upload__toolbar"
    >
      <p v-if="batchLockedHint" class="nb-file-upload__hint">{{ locale.lockedUntilClear }}</p>
      <button
        type="button"
        class="nb-file-upload__start"
        :disabled="startButtonDisabled"
        @click="startUpload"
      >
        {{ isUploadingBatch ? locale.uploading : locale.startUpload }}
      </button>
      <button
        v-if="hasErrors"
        type="button"
        class="nb-file-upload__retry-all"
        :disabled="disabled"
        @click="retryAllErrors"
      >
        {{ locale.retryAllErrors }}
      </button>
      <button
        v-if="showCancelAll"
        type="button"
        class="nb-file-upload__cancel-all"
        :disabled="disabled || !hasActive"
        @click="cancelAllActive"
      >
        {{ locale.cancelAll }}
      </button>
      <button
        v-if="showCancelAll"
        type="button"
        class="nb-file-upload__cancel-all"
        :disabled="disabled || !hasPendingOrUploading"
        @click="cancelAllItems"
      >
        {{ locale.cancelAllItems }}
      </button>
      <button
        v-if="showClearAll && items.length && !hasActive"
        type="button"
        class="nb-file-upload__clear-all"
        :disabled="disabled"
        @click="clearAll"
      >
        {{ locale.clearAll }}
      </button>
    </div>

    <ul v-if="items.length" class="nb-file-upload__list" role="list">
      <li
        v-for="(row, index) in items"
        :key="entryKey(row, index)"
        class="nb-file-upload__item"
        :class="`nb-file-upload__item--${row.state}`"
        role="listitem"
      >
        <div class="nb-file-upload__meta">
          <span class="nb-file-upload__name" :title="row.file.name">{{ row.file.name }}</span>
          <span class="nb-file-upload__size">({{ formatFileSize(row.file.size) }})</span>
          <span class="nb-file-upload__badge" :data-state="row.state">{{ stateLabel(row.state) }}</span>
        </div>

        <div class="nb-file-upload__progress-wrap">
          <progress
            class="nb-file-upload__progress"
            :value="progressValue(row)"
            max="100"
            :aria-valuenow="progressValue(row)"
            aria-valuemin="0"
            aria-valuemax="100"
          />
          <span class="nb-file-upload__percent">{{ progressValue(row) }}%</span>
        </div>

        <p v-if="row.error" class="nb-file-upload__error" role="alert">{{ row.error }}</p>
        <p
          v-if="row.state === 'cancelled'"
          class="nb-file-upload__note"
        >
          {{ locale.cancelMayStillSave }}
        </p>

        <div class="nb-file-upload__row-actions">
          <button
            v-if="row.state === 'uploading'"
            type="button"
            class="nb-file-upload__cancel-one"
            :disabled="disabled"
            @click="cancelRow(row)"
          >
            {{ locale.cancel }}
          </button>
          <button
            v-if="row.state === 'error'"
            type="button"
            class="nb-file-upload__retry-one"
            :disabled="disabled"
            @click="retryRow(row)"
          >
            {{ locale.retry }}
          </button>
          <button
            type="button"
            class="nb-file-upload__remove-one"
            :disabled="disabled"
            @click="removeQueueItem(row)"
          >
            {{ locale.remove }}
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onUnmounted, defineOptions } from 'vue'
import { duplicateKey } from '@helpers/nbFileValidation.js'

defineOptions({
  name: 'NbFileUpload',
})

const props = defineProps({
  nbId: {
    type: String,
    required: true,
  },
  /** `File[]` from e.g. `NbInputFile` @changed — this component never opens a file picker. */
  files: {
    type: Array,
    default: () => [],
  },
  /** POST endpoint; if empty, upload buttons are disabled and a static warning is shown. */
  uploadUrl: {
    type: String,
    default: '',
  },
  /** Max parallel uploads (worker pool). */
  concurrent: {
    type: Number,
    default: 2,
    validator: v => typeof v === 'number' && v >= 1,
  },
  maxRetries: {
    type: Number,
    default: 2,
    validator: v => typeof v === 'number' && v >= 0,
  },
  retryDelayMs: {
    type: Number,
    default: 1000,
    validator: v => typeof v === 'number' && v >= 0,
  },
  formFieldName: {
    type: String,
    default: 'file',
  },
  uploadMethod: {
    type: String,
    default: 'POST',
  },
  requestHeaders: {
    type: Object,
    default: () => ({}),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  showStartButton: {
    type: Boolean,
    default: true,
  },
  showCancelAll: {
    type: Boolean,
    default: true,
  },
  showClearAll: {
    type: Boolean,
    default: true,
  },
  /** If true, new `pending` items are uploaded as soon as they appear (no Start click). */
  autoStart: {
    type: Boolean,
    default: false,
  },
  ariaLabel: {
    type: String,
    default: 'File upload queue',
  },
  /** UI strings — English defaults; merge your own keys. */
  uiLocale: {
    type: Object,
    default: () => ({}),
  },
  /**
   * Duração mínima (ms) para a barra subir até ~92% enquanto o XHR ainda envia.
   * Ficheiros muito pequenos disparam quase sempre 0→100 num único evento; isto torna o progresso visível.
   * 0 = só progresso real do browser.
   */
  minProgressDisplayMs: {
    type: Number,
    default: 0,
    validator: v => typeof v === 'number' && v >= 0,
  },
  /**
   * Depois de uma rodada de uploads terminar:
   * - `default` — não mexe na política extra (use `reuploadOnStart` para voltar a enviar).
   * - `clear-on-success` — se **todas** as linhas ficarem `success`, limpa tudo e `update:files` → `[]`.
   * - `lock-until-clear-all` — se **tudo** estiver terminado (success/erro/cancelado) e houve **pelo menos um** success, bloqueia o Start até «Limpar tudo» / lista vazia.
   */
  afterUploadMode: {
    type: String,
    default: 'default',
    validator: v =>
      ['default', 'clear-on-success', 'lock-until-clear-all'].includes(
        String(v || '').trim(),
      ),
  },
  /**
   * Ao clicar em Start: repõe `success`, `error` e `cancelled` → `pending` para enviar **todos** de novo.
   * Com `false`, só sobem linhas que já estavam `pending`.
   */
  reuploadOnStart: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits([
  'upload-progress',
  'upload-complete',
  'upload-error',
  'upload-all-complete',
  'update:files',
])

const defaultUiLocale = {
  missingUploadUrl: 'Configure uploadUrl to enable uploads.',
  startUpload: 'Start upload',
  uploading: 'Uploading…',
  cancel: 'Cancel',
  cancelAll: 'Cancel active',
  cancelAllItems: 'Cancel all (active + pending)',
  clearAll: 'Clear all',
  retry: 'Retry',
  retryAllErrors: 'Retry all failed',
  remove: 'Remove',
  lockedUntilClear:
    'Envio concluído: use «Limpar tudo» ou remova os itens para voltar a enviar.',
  cancelMayStillSave:
    'Se o envio já tinha terminado na rede, o servidor pode mesmo assim guardar o ficheiro.',
  statePending: 'Pending',
  stateUploading: 'Uploading',
  stateSuccess: 'Done',
  stateError: 'Error',
  stateCancelled: 'Cancelled',
}

const locale = computed(() => ({ ...defaultUiLocale, ...props.uiLocale }))

const items = ref([])
const isUploadingBatch = ref(false)
/** Só usado com `afterUploadMode === 'lock-until-clear-all'`. */
const batchLocked = ref(false)

function entryKey(row, index) {
  return `${duplicateKey(row.file)}-${index}`
}

function stateLabel(state) {
  const L = locale.value
  const map = {
    pending: L.statePending,
    uploading: L.stateUploading,
    success: L.stateSuccess,
    error: L.stateError,
    cancelled: L.stateCancelled,
  }
  return map[state] || state
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), sizes.length - 1)
  const value = bytes / Math.pow(k, i)
  return `${value >= 10 ? value.toFixed(0) : value.toFixed(1)} ${sizes[i]}`
}

function progressValue(row) {
  if (row.state === 'success') return 100
  return Number.isFinite(row.progress) ? row.progress : 0
}

function clearProgressTicker(row) {
  if (row._progressIntervalId != null) {
    clearInterval(row._progressIntervalId)
    row._progressIntervalId = null
  }
}

function startProgressTicker(row) {
  clearProgressTicker(row)
  if (!props.minProgressDisplayMs || row.state !== 'uploading') return
  row._realProgress = 0
  row._uploadT0 = Date.now()
  row._progressIntervalId = setInterval(() => {
    if (row.state !== 'uploading') {
      clearProgressTicker(row)
      return
    }
    const elapsed = Date.now() - row._uploadT0
    const smooth = Math.min(
      92,
      Math.round((elapsed / props.minProgressDisplayMs) * 92),
    )
    const real = Number.isFinite(row._realProgress) ? row._realProgress : 0
    row.progress = Math.max(real, smooth)
  }, 40)
}

function emitFilesUpdate(nextList) {
  const list = Array.isArray(nextList) ? nextList.filter(f => f instanceof File) : []
  emit('update:files', list)
}

/** success | error | cancelled → pending (para novo Start enviar tudo outra vez). */
function resetFinishedRowsToPending() {
  items.value.forEach((row) => {
    if (!['success', 'error', 'cancelled'].includes(row.state)) return
    row.state = 'pending'
    row.progress = 0
    row.error = null
    row.xhr = null
    clearProgressTicker(row)
  })
}

function unlockBatchIfEmptyOrCleared() {
  if (items.value.length === 0) batchLocked.value = false
}

function syncItemsFromFiles(newFiles) {
  const list = Array.isArray(newFiles) ? newFiles.filter(f => f instanceof File) : []
  const keySet = new Set(list.map(duplicateKey))

  items.value = items.value.filter(row => keySet.has(duplicateKey(row.file)))

  const existing = new Set(items.value.map(row => duplicateKey(row.file)))
  for (const file of list) {
    const k = duplicateKey(file)
    if (!existing.has(k)) {
      items.value.push({
        file,
        progress: 0,
        state: 'pending',
        error: null,
        xhr: null,
      })
      existing.add(k)
    }
  }
}

watch(
  () => props.files,
  (v) => {
    syncItemsFromFiles(v)
    const list = Array.isArray(v) ? v.filter(f => f instanceof File) : []
    if (list.length === 0 && !items.value.some(r => r.state === 'uploading')) {
      isUploadingBatch.value = false
      batchLocked.value = false
    }
    unlockBatchIfEmptyOrCleared()
  },
  { deep: true, immediate: true },
)

watch(
  () => items.value.length,
  () => unlockBatchIfEmptyOrCleared(),
)

// Deixa `clear-on-success` mais robusto contra pequenas corridas de eventos.
watch(
  () => items.value.map(r => r.state).join('|'),
  () => {
    if (props.afterUploadMode !== 'clear-on-success') return
    if (items.value.length === 0) return
    if (isUploadingBatch.value) return
    if (items.value.every(r => r.state === 'success')) {
      clearAll({ force: true })
    }
  },
)

const hasPending = computed(() => items.value.some(r => r.state === 'pending'))
const hasActive = computed(() => items.value.some(r => r.state === 'uploading'))
const hasErrors = computed(() => items.value.some(r => r.state === 'error'))
const hasSuccess = computed(() => items.value.some(r => r.state === 'success'))
const hasPendingOrUploading = computed(() =>
  items.value.some(
    r => r.state === 'pending' || r.state === 'uploading',
  ),
)

const batchLockedHint = computed(
  () =>
    props.afterUploadMode === 'lock-until-clear-all'
    && batchLocked.value
    && items.value.length > 0,
)

const startButtonDisabled = computed(
  () =>
    props.disabled
    || isUploadingBatch.value
    || (props.afterUploadMode === 'lock-until-clear-all' && batchLocked.value),
)

function runSingleXhrAttempt(row, index) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    row.xhr = xhr
    row._uploadUserCancelled = false
    row.state = 'uploading'
    row.progress = 0
    row._realProgress = 0
    row.error = null
    clearProgressTicker(row)
    startProgressTicker(row)

    const formData = new FormData()
    formData.append(props.formFieldName, row.file)

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        row._realProgress = Math.round((e.loaded / e.total) * 100)
        row.progress =
          props.minProgressDisplayMs > 0
            ? Math.max(row._realProgress, row.progress)
            : row._realProgress
        emit('upload-progress', {
          file: row.file,
          progress: row.progress,
          index,
        })
      }
    }

    xhr.onload = () => {
      row.xhr = null
      clearProgressTicker(row)
      if (row._uploadUserCancelled) {
        reject(new Error('aborted'))
        return
      }
      if (xhr.status === 0) {
        reject(new Error('aborted'))
        return
      }
      if (xhr.status >= 200 && xhr.status < 300) {
        row.state = 'success'
        row.progress = 100
        row.error = null
        emit('upload-complete', {
          file: row.file,
          response: xhr.responseText,
          index,
        })
        resolve(xhr.responseText)
      } else {
        reject(new Error(`HTTP ${xhr.status} ${xhr.statusText || 'error'}`))
      }
    }

    xhr.onerror = () => {
      row.xhr = null
      clearProgressTicker(row)
      if (row._uploadUserCancelled) {
        reject(new Error('aborted'))
        return
      }
      reject(new Error('Network error'))
    }

    xhr.onabort = () => {
      row._uploadUserCancelled = true
      row.xhr = null
      clearProgressTicker(row)
      row.state = 'cancelled'
      row.error = locale.value.stateCancelled
      emit('upload-error', {
        file: row.file,
        error: 'Aborted',
        index,
      })
      reject(new Error('aborted'))
    }

    xhr.open(props.uploadMethod, props.uploadUrl)
    Object.entries(props.requestHeaders || {}).forEach(([key, val]) => {
      if (val != null) xhr.setRequestHeader(key, String(val))
    })
    xhr.send(formData)
  })
}

async function uploadRowWithRetries(row, index) {
  let lastErr = new Error('Upload failed')
  for (let attempt = 0; attempt <= props.maxRetries; attempt++) {
    if (attempt > 0) {
      await new Promise(r => setTimeout(r, props.retryDelayMs))
    }
    try {
      await runSingleXhrAttempt(row, index)
      return
    } catch (e) {
      if (e && e.message === 'aborted') return
      if (row.state === 'cancelled') return
      lastErr = e
      row.state = 'pending'
      row.progress = 0
    }
  }
  row.state = 'error'
  row.error = lastErr.message || 'Upload failed'
  row.progress = 0
  emit('upload-error', {
    file: row.file,
    error: row.error,
    index,
  })
}

async function startUpload() {
  if (!props.uploadUrl || props.disabled || isUploadingBatch.value) return
  if (props.afterUploadMode === 'lock-until-clear-all' && batchLocked.value) return

  if (
    props.reuploadOnStart
    && !(props.afterUploadMode === 'lock-until-clear-all' && batchLocked.value)
  ) {
    resetFinishedRowsToPending()
  }
  if (!hasPending.value) return

  isUploadingBatch.value = true
  try {
    /** Processa enquanto houver `pending` (inclui novos após cada rodada). */
    while (true) {
      const queue = items.value
        .map((item, index) => ({ item, index }))
        .filter(({ item }) => item.state === 'pending')

      if (!queue.length) break

      const workers = Math.min(props.concurrent, queue.length)
      const workerFns = Array.from({ length: workers }, async () => {
        while (queue.length) {
          const next = queue.shift()
          if (!next) break
          const { item, index } = next
          if (item.state !== 'pending') continue
          try {
            await uploadRowWithRetries(item, index)
          } catch {
            // erros / abort em uploadRowWithRetries
          }
        }
      })

      await Promise.all(workerFns.map(fn => fn()))

      const allSettled = items.value.every(r =>
        ['success', 'error', 'cancelled'].includes(r.state),
      )
      const allSuccess =
        items.value.length > 0 && items.value.every(r => r.state === 'success')
      const anySuccess = items.value.some(r => r.state === 'success')

      emit('upload-all-complete', {
        items: items.value.map((r, index) => ({
          file: r.file,
          state: r.state,
          index,
        })),
        allSuccess,
        allSettled,
      })

      if (props.afterUploadMode === 'clear-on-success' && allSuccess && items.value.length > 0) {
        await nextTick()
        clearAll({ force: true })
      } else if (
        props.afterUploadMode === 'lock-until-clear-all'
        && allSettled
        && items.value.length > 0
        && anySuccess
      ) {
        batchLocked.value = true
      }

      await nextTick()
    }
  } finally {
    isUploadingBatch.value = false
  }
}

function cancelRow(row) {
  row._uploadUserCancelled = true
  if (row.xhr && typeof row.xhr.abort === 'function') {
    row.xhr.abort()
  }
}

function cancelAllActive() {
  items.value.forEach((row) => {
    if (row.state === 'uploading') cancelRow(row)
  })
}

function cancelAllItems() {
  // Cancela ativos (abort) e também os que ainda não começaram (pending).
  items.value.forEach((row) => {
    if (row.state === 'uploading') {
      cancelRow(row)
      return
    }
    if (row.state === 'pending') {
      row._uploadUserCancelled = true
      row.state = 'cancelled'
      row.progress = 0
      row.error = null
      clearProgressTicker(row)
    }
  })
}

function retryRow(row) {
  if (props.disabled || row.state !== 'error') return
  row.error = null
  row.progress = 0
  row.state = 'pending'
  if (!isUploadingBatch.value) startUpload()
}

function retryAllErrors() {
  if (props.disabled) return
  let hasAny = false
  items.value.forEach((row) => {
    if (row.state === 'error') {
      row.error = null
      row.progress = 0
      row.state = 'pending'
      hasAny = true
    }
  })
  if (hasAny && !isUploadingBatch.value) startUpload()
}

function clearAll(options = {}) {
  const force = options.force === true
  if (props.disabled) return
  if (!force && hasActive.value) return
  items.value.forEach(clearProgressTicker)
  isUploadingBatch.value = false
  batchLocked.value = false
  items.value = []
  emitFilesUpdate([])
}

function removeQueueItem(row) {
  if (props.disabled) return
  if (row.state === 'uploading') {
    cancelRow(row)
  }
  clearProgressTicker(row)
  const key = duplicateKey(row.file)
  const next = (props.files || []).filter(f => duplicateKey(f) !== key)
  items.value = items.value.filter(r => duplicateKey(r.file) !== key)
  emitFilesUpdate(next)
}

onUnmounted(() => {
  items.value.forEach(clearProgressTicker)
})

watch(
  () => [props.files, props.autoStart, props.uploadUrl, props.disabled],
  async () => {
    if (!props.autoStart || !props.uploadUrl || props.disabled) return
    await nextTick()
    if (hasPending.value && !isUploadingBatch.value) startUpload()
  },
  { deep: true },
)

defineExpose({
  startUpload,
  cancelRow,
  cancelAllActive,
  cancelAllItems,
  clearAll,
  removeQueueItem,
  retryRow,
  retryAllErrors,
  /** Alias alinhado ao padrão “cancelAllUploads” de filas XHR. */
  cancelAllUploads: cancelAllActive,
})
</script>

<style lang="scss" scoped>
.nb-file-upload {
  font-family: 'Lato', sans-serif;
  font-size: 1.4em;
  max-width: 560px;
}

.nb-file-upload__warn {
  padding: 10px 12px;
  border-radius: 6px;
  background: #fff3cd;
  color: #856404;
  margin-bottom: 12px;
}

.nb-file-upload__toolbar {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 14px;
}

.nb-file-upload__hint {
  flex: 1 0 100%;
  margin: 0 0 4px;
  font-size: 0.78em;
  color: #5c4d00;
  line-height: 1.35;
}

.nb-file-upload__start,
.nb-file-upload__cancel-all,
.nb-file-upload__cancel-one,
.nb-file-upload__retry-all,
.nb-file-upload__retry-one,
.nb-file-upload__clear-all {
  cursor: pointer;
  border: none;
  border-radius: 6px;
  padding: 8px 14px;
  font-size: 0.95em;
  font-family: inherit;
}

.nb-file-upload__start {
  background: #353734;
  color: #f8f8f2;
  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
}

.nb-file-upload__cancel-all,
.nb-file-upload__cancel-one {
  background: #e0e0e0;
  color: #333;
}

.nb-file-upload__retry-all,
.nb-file-upload__retry-one {
  background: #dbeafe;
  color: #1e3a8a;
}

.nb-file-upload__clear-all {
  background: #fee2e2;
  color: #7f1d1d;
}

.nb-file-upload__list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.nb-file-upload__item {
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 10px 12px;
  margin-bottom: 10px;
  background: #fafafa;

  &--success {
    border-left: 4px solid #27ae60;
  }
  &--error {
    border-left: 4px solid #e74c3c;
  }
  &--uploading {
    border-left: 4px solid #f39c12;
  }
  &--pending {
    border-left: 4px solid #95a5a6;
  }
  &--cancelled {
    border-left: 4px solid #7f8c8d;
  }
}

.nb-file-upload__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 10px;
  margin-bottom: 6px;
}

.nb-file-upload__name {
  font-weight: 600;
  color: #222;
  max-width: 260px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.nb-file-upload__size {
  color: #666;
  font-size: 0.9em;
}

.nb-file-upload__badge {
  font-size: 0.75em;
  padding: 2px 8px;
  border-radius: 999px;
  background: #eee;
  color: #333;
}

.nb-file-upload__progress-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 6px;
}

.nb-file-upload__progress {
  flex: 1;
  height: 8px;
}

.nb-file-upload__percent {
  font-weight: 600;
  color: #353734;
  min-width: 42px;
  text-align: right;
  font-size: 0.9em;
}

.nb-file-upload__error {
  margin: 6px 0 0;
  font-size: 0.85em;
  color: #c0392b;
}

.nb-file-upload__note {
  margin: 6px 0 0;
  font-size: 0.72em;
  color: #555;
  line-height: 1.35;
}

.nb-file-upload__row-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
  align-items: center;
}

.nb-file-upload__cancel-one,
.nb-file-upload__retry-one {
  padding: 6px 12px;
  font-size: 0.85em;
}

.nb-file-upload__remove-one {
  cursor: pointer;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 0.85em;
  font-family: inherit;
  background: #f3f4f6;
  color: #374151;
  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
}
</style>
