let worker = null
let readyPromise = null
let requestId = 0
const pending = new Map()

function destroyWorker() {
  if (worker) worker.terminate()
  worker = null
  readyPromise = null
  pending.forEach(({ reject, timer }) => {
    clearTimeout(timer)
    reject(new Error('El motor de Python se reinició. Intenta ejecutar otra vez.'))
  })
  pending.clear()
}

function createWorker() {
  worker = new Worker(new URL('../workers/pythonWorker.js', import.meta.url), { type: 'module' })
  readyPromise = new Promise((resolve, reject) => {
    worker.addEventListener('message', function bootHandler(event) {
      if (event.data?.type === 'ready') {
        worker.removeEventListener('message', bootHandler)
        resolve()
      } else if (event.data?.type === 'boot-error') {
        worker.removeEventListener('message', bootHandler)
        reject(new Error('No fue posible cargar Pyodide. Revisa tu conexión a internet.'))
      }
    })
  })
  worker.addEventListener('message', (event) => {
    const data = event.data
    if (data?.type !== 'result') return
    const item = pending.get(data.id)
    if (!item) return
    clearTimeout(item.timer)
    pending.delete(data.id)
    if (data.ok) item.resolve(data)
    else item.reject(new Error(data.error || 'Error al ejecutar Python.'))
  })
  worker.addEventListener('error', destroyWorker)
}

async function ensureWorker() {
  if (!worker) createWorker()
  await readyPromise
}

function request(type, code, inputs = []) {
  return ensureWorker().then(() => {
    const id = ++requestId
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        pending.delete(id)
        destroyWorker()
        reject(new Error('El programa tardó demasiado y fue detenido. Revisa si existe un bucle infinito.'))
      }, 10000)
      pending.set(id, { resolve, reject, timer })
      worker.postMessage({ type, id, code, inputs })
    })
  })
}

export async function runPython(code, inputs = []) {
  const data = await request('run', code, inputs)
  return [data.output, data.stderr].filter(Boolean).join('\n')
}

export async function runWorldPython(code) {
  const data = await request('world', code, [])
  return { output: [data.output, data.stderr].filter(Boolean).join('\n'), events: data.events ?? [] }
}

export async function runPythonTrace(code, inputs = []) {
  const data = await request('trace', code, inputs)
  return { output: [data.output, data.stderr].filter(Boolean).join('\n'), trace: data.trace ?? [] }
}

export async function analyzePython(code) {
  const data = await request('analyze', code, [])
  return data.analysis ?? {}
}

export function warmupPython() {
  return ensureWorker().catch(() => undefined)
}
