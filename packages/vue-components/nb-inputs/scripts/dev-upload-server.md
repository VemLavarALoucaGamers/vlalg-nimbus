# dev-upload-server (NbFileUpload)

Servidor HTTP de teste para o componente `NbFileUpload` (queue de uploads).

Ele expõe endpoints no `http://127.0.0.1:PORT`:
- `GET /health`
- `POST /upload` (espera multipart com o campo `file`)

## Como correr

No diretório `packages/vue-components/nb-inputs`:

```bash
npm run dev:upload-server
```

O app de demo do Vite faz proxy de `"/__nb-upload"` para este servidor, para evitar CORS.

## Variáveis de ambiente

- `UPLOAD_SERVER_PORT` (default `8787`)
- `UPLOAD_DIR` (opcional; default grava em `packages/vue-components/nb-inputs/.uploads-dev`)
- `UPLOAD_DELAY_MS` (default `0`)
  - Adiciona atraso antes de responder (não cria muitos eventos de `onprogress`).
- `DELETE_ON_CLIENT_ABORT` (default `true`)
  - Se o cliente abortar (cancelar no front), o servidor tenta apagar o ficheiro já guardado.

## Comportamento de cancelamento

Quando o front faz `xhr.abort()`:
- a UI do `NbFileUpload` muda o estado para `cancelled`
- este servidor tenta deletar o ficheiro em disco para que o teste reflita “cancelou, não ficou”.

Se o cancel acontecer depois do upload já ter sido concluído/confirmado na rede, pode ser tarde para apagar. Por isso, usar `UPLOAD_DELAY_MS` ajuda a tornar o teste mais determinístico.

