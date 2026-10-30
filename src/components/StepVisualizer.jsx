import { useMemo, useState } from 'react'
import { runPythonTrace } from '../services/pythonService.js'
import AppIcon from './AppIcon.jsx'

export default function StepVisualizer({ code, inputs = [] }) {
  const [trace, setTrace] = useState([])
  const [index, setIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const lines = useMemo(() => code.split('\n'), [code])
  const step = trace[index]

  const buildTrace = async () => {
    setLoading(true); setError('')
    try { const result = await runPythonTrace(code, inputs); setTrace(result.trace ?? []); setIndex(0) }
    catch (err) { setError(err.message || String(err)) }
    finally { setLoading(false) }
  }

  return <section className="step-visualizer">
    <div className="step-head"><div><b><AppIcon name="map" size={18}/> Ejecución paso a paso</b><small>Mira qué línea ejecuta Python y cómo cambian las variables.</small></div><button className="btn btn-secondary" onClick={buildTrace} disabled={loading}><AppIcon name="play" size={17}/> {loading ? 'Preparando…' : 'Ejecutar paso a paso'}</button></div>
    {error && <p className="step-error">{error}</p>}
    {!trace.length && !error && <p className="step-empty">Pulsa “Ejecutar paso a paso” para crear una explicación visual de esta ejecución.</p>}
    {step && <div className="step-body">
      <div className="step-code"><small>Línea {step.line}</small><code>{lines[step.line - 1] ?? ''}</code></div>
      <div className="step-vars"><small>Variables en este momento</small>{Object.keys(step.locals ?? {}).length ? Object.entries(step.locals).map(([key, value]) => <div key={key}><span><AppIcon name="layers" size={16}/> {key}</span><b>{value}</b></div>) : <p>Todavía no hay variables visibles.</p>}</div>
      <div className="step-controls"><button disabled={index === 0} onClick={() => setIndex(index - 1)}>← Anterior</button><span>Paso {index + 1} de {trace.length}</span><button disabled={index >= trace.length - 1} onClick={() => setIndex(index + 1)}>Siguiente →</button></div>
    </div>}
  </section>
}
