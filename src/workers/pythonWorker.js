import { loadPyodide } from 'https://cdn.jsdelivr.net/pyodide/v314.0.7/full/pyodide.mjs'

const PYODIDE_BASE = 'https://cdn.jsdelivr.net/pyodide/v314.0.7/full/'
const pyodideReady = loadPyodide({ indexURL: PYODIDE_BASE })

pyodideReady
  .then(() => self.postMessage({ type: 'ready' }))
  .catch((error) => self.postMessage({ type: 'boot-error', error: String(error) }))

async function prepareInput(pyodide, inputs) {
  pyodide.globals.set('_aeropy_inputs_js', inputs)
  await pyodide.runPythonAsync(`
import builtins
_aeropy_inputs = iter(_aeropy_inputs_js.to_py())
def _aeropy_input(prompt=''):
    try:
        return str(next(_aeropy_inputs))
    except StopIteration:
        return ''
builtins.input = _aeropy_input
`)
}

self.onmessage = async (event) => {
  const { type, id, code, inputs = [] } = event.data ?? {}
  if (!['run', 'trace', 'analyze', 'world'].includes(type)) return

  try {
    const pyodide = await pyodideReady

    if (type === 'analyze') {
      pyodide.globals.set('_aeropy_user_code', code)
      const analysisJson = await pyodide.runPythonAsync(`
import ast, json

tree = ast.parse(_aeropy_user_code)
constructs = set()
calls = set()
operators = set()
modules = set()
features = set()

for node in ast.walk(tree):
    constructs.add(type(node).__name__)
    if isinstance(node, ast.Call):
        if isinstance(node.func, ast.Name):
            calls.add(node.func.id)
        elif isinstance(node.func, ast.Attribute):
            calls.add(node.func.attr)
    if isinstance(node, (ast.Import, ast.ImportFrom)):
        if isinstance(node, ast.Import):
            for alias in node.names:
                modules.add(alias.name.split('.')[0])
        elif node.module:
            modules.add(node.module.split('.')[0])
    if isinstance(node, ast.operator):
        operators.add(type(node).__name__)
    if isinstance(node, ast.cmpop):
        operators.add(type(node).__name__)
    if isinstance(node, ast.boolop):
        operators.add(type(node).__name__)
    if isinstance(node, ast.AugAssign):
        constructs.add('AugAssign')
        operators.add(type(node.op).__name__)
    if isinstance(node, ast.Assign):
        constructs.add('Assign')
    if isinstance(node, ast.JoinedStr):
        constructs.add('JoinedStr')
    if isinstance(node, ast.Subscript):
        features.add('subscript')
    if isinstance(node, ast.Constant) and isinstance(node.value, bool):
        features.add('boolean')
    if isinstance(node, ast.ClassDef):
        for base in node.bases:
            features.add('inheritance')
        for item in node.body:
            if isinstance(item, (ast.FunctionDef, ast.AsyncFunctionDef)):
                features.add('class-method')
    if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)):
        if node.args.defaults or node.args.kw_defaults and any(x is not None for x in node.args.kw_defaults):
            features.add('default-argument')
    if isinstance(node, ast.ExceptHandler) and node.type is not None:
        features.add('exception-type')

json.dumps({
    'constructs': sorted(constructs),
    'calls': sorted(calls),
    'operators': sorted(operators),
    'modules': sorted(modules),
    'features': sorted(features),
})
`)
      self.postMessage({ type: 'result', id, ok: true, analysis: JSON.parse(analysisJson) })
      return
    }

    const stdout = []
    const stderr = []
    pyodide.setStdout({ batched: (text) => stdout.push(text) })
    pyodide.setStderr({ batched: (text) => stderr.push(text) })
    await prepareInput(pyodide, inputs)

    if (type === 'world') {
      pyodide.globals.set('_aeropy_user_code', code)
      const worldJson = await pyodide.runPythonAsync(`
import json
_aeropy_world_events = []

def _world(type_name, **payload):
    _aeropy_world_events.append({'type': type_name, **payload})

def activar_comunicaciones(): _world('comms')
def encender_generador(nivel=1): _world('generator', nivel=nivel)
def abrir_puerta(nombre='principal'): _world('door', nombre=nombre)
def activar_planta(indice=0): _world('plant', indice=indice)
def encender_motores(): _world('motors')
def subir(altura=1): _world('rise', altura=altura)
def escanear(): _world('scan')
def patrullar(sector=None): _world('patrol', sector=sector)
def regresar(): _world('return')
def iluminar(nombre='dato'): _world('light', nombre=str(nombre))
def activar_torre(seccion=None): _world('tower', seccion=seccion)
def sincronizar(sistema='sistema'): _world('sync', sistema=str(sistema))
def activar_nucleo(): _world('core')

_world_env = {
    '__builtins__': __builtins__,
    'activar_comunicaciones': activar_comunicaciones,
    'encender_generador': encender_generador,
    'abrir_puerta': abrir_puerta,
    'activar_planta': activar_planta,
    'encender_motores': encender_motores,
    'subir': subir,
    'escanear': escanear,
    'patrullar': patrullar,
    'regresar': regresar,
    'iluminar': iluminar,
    'activar_torre': activar_torre,
    'sincronizar': sincronizar,
    'activar_nucleo': activar_nucleo,
}
exec(compile(_aeropy_user_code, '<codeworld_user>', 'exec'), _world_env, _world_env)
json.dumps(_aeropy_world_events)
`)
      self.postMessage({ type: 'result', id, ok: true, output: stdout.join('\n'), stderr: stderr.join('\n'), events: JSON.parse(worldJson) })
      return
    }

    if (type === 'run') {
      await pyodide.runPythonAsync(code)
      self.postMessage({ type: 'result', id, ok: true, output: stdout.join('\n'), stderr: stderr.join('\n') })
      return
    }

    pyodide.globals.set('_aeropy_user_code', code)
    const traceJson = await pyodide.runPythonAsync(`
import sys, json
_aeropy_trace = []

def _aeropy_safe_repr(value):
    try:
        text = repr(value)
        return text if len(text) <= 120 else text[:117] + '...'
    except Exception:
        return '<valor>'

def _aeropy_tracer(frame, event, arg):
    if frame.f_code.co_filename == '<aeropy_user>' and event == 'line' and len(_aeropy_trace) < 180:
        visible = {k: _aeropy_safe_repr(v) for k, v in frame.f_locals.items() if not k.startswith('_')}
        _aeropy_trace.append({'line': frame.f_lineno, 'locals': visible})
    return _aeropy_tracer

sys.settrace(_aeropy_tracer)
try:
    exec(compile(_aeropy_user_code, '<aeropy_user>', 'exec'), {})
finally:
    sys.settrace(None)
json.dumps(_aeropy_trace)
`)
    self.postMessage({ type: 'result', id, ok: true, output: stdout.join('\n'), stderr: stderr.join('\n'), trace: JSON.parse(traceJson) })
  } catch (error) {
    self.postMessage({ type: 'result', id, ok: false, error: error?.message ?? String(error) })
  }
}
