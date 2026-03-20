/**
 * Servidor HTTP mínimo para testar NbFileUpload no app de demo.
 *
 * Uso: na pasta do pacote `nb-inputs`, rode `npm run dev:upload-server`
 * (e em outro terminal `npm run dev`). O Vite encaminha `/__nb-upload/*` → aqui.
 *
 * Env:
 * - UPLOAD_SERVER_PORT (default 8787)
 * - UPLOAD_DIR (opcional, absoluto ou rel. ao pacote)
 * - UPLOAD_DELAY_MS (default 0) pausa **após** receber o multipart (resposta mais tardia).
 *   Não aumenta eventos `xhr.upload.onprogress` — para barra gradual em ficheiros pequenos use
 *   `minProgressDisplayMs` no `NbFileUpload` ou ficheiros maiores / Throttle na rede (DevTools).
 */
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import formidable from 'formidable'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PKG_ROOT = path.join(__dirname, '..')

const PORT = Number(process.env.UPLOAD_SERVER_PORT || 8787)
const UPLOAD_DELAY_MS = Number(process.env.UPLOAD_DELAY_MS || 0)
const DELETE_ON_CLIENT_ABORT = String(process.env.DELETE_ON_CLIENT_ABORT ?? 'true') === 'true'
const UPLOAD_ROOT = process.env.UPLOAD_DIR
  ? path.resolve(process.cwd(), process.env.UPLOAD_DIR)
  : path.join(PKG_ROOT, '.uploads-dev')

fs.mkdirSync(UPLOAD_ROOT, { recursive: true })

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
}

function sendJson(res, status, data) {
  cors(res)
  const body = JSON.stringify(data)
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' })
  res.end(body)
}

function normalizeFilesEntry(raw) {
  if (!raw) return []
  return Array.isArray(raw) ? raw : [raw]
}

function wait(ms) {
  if (!ms || ms <= 0) return Promise.resolve()
  return new Promise(resolve => setTimeout(resolve, ms))
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    cors(res)
    res.writeHead(204)
    res.end()
    return
  }

  const pathname = (req.url || '').split('?')[0]

  if (req.method === 'GET' && pathname === '/health') {
    sendJson(res, 200, {
      ok: true,
      port: PORT,
      uploadsDir: UPLOAD_ROOT,
    })
    return
  }

  if (req.method === 'POST' && pathname === '/upload') {
    let abortedByClient = false
    req.on('aborted', () => {
      abortedByClient = true
    })

    const form = formidable({
      uploadDir: UPLOAD_ROOT,
      keepExtensions: true,
      maxFileSize: 200 * 1024 * 1024,
    })
    try {
      const [, files] = await form.parse(req)
      const list = normalizeFilesEntry(files.file)
      if (!list.length) {
        sendJson(res, 400, { ok: false, error: 'Campo multipart "file" ausente ou vazio' })
        return
      }
      const f = list[0]
      const savedFilePath =
        f.filepath ||
        (f.newFilename ? path.join(UPLOAD_ROOT, f.newFilename) : null)
      await wait(UPLOAD_DELAY_MS)
      if (DELETE_ON_CLIENT_ABORT && abortedByClient) {
        if (savedFilePath) {
          try {
            fs.unlinkSync(savedFilePath)
          } catch {
            // ignora falha ao apagar (arquivo pode já ter sido movido/limpo)
          }
        }
        // Fecha a request evitando deixar o browser pendurado.
        try {
          res.writeHead(499, { 'Content-Type': 'application/json; charset=utf-8' })
          res.end(JSON.stringify({ ok: false, aborted: true }))
        } catch {
          // ignora se o socket já fechou
        }
        return
      }
      sendJson(res, 200, {
        ok: true,
        storedPath: path.basename(f.filepath || f.newFilename || ''),
        originalFilename: f.originalFilename || null,
        mimeType: f.mimetype || null,
        size: f.size,
      })
    } catch (e) {
      sendJson(res, 500, { ok: false, error: String(e?.message || e) })
    }
    return
  }

  sendJson(res, 404, { ok: false, error: 'Não encontrado: use POST /upload ou GET /health' })
})

server.listen(PORT, '127.0.0.1', () => {
  // eslint-disable-next-line no-console
  console.log(`[nb-inputs dev-upload-server] http://127.0.0.1:${PORT}`)
  console.log(`  GET  /health`)
  console.log(`  POST /upload  (field: file, como NbFileUpload padrão)`)
  console.log(`  Delay artificial: ${UPLOAD_DELAY_MS}ms`)
  console.log(`  Grava em: ${UPLOAD_ROOT}`)
})
