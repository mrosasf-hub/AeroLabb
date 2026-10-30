import { useEffect, useState } from 'react'
import Mascot from '../components/Mascot.jsx'
import AppIcon from '../components/AppIcon.jsx'
import PythonEditor from '../components/PythonEditor.jsx'
import { deleteProject, listProjects, saveProject } from '../services/projectService.js'
import { runPython, warmupPython } from '../services/pythonService.js'

const starter = `# Mi proyecto en Aerolab\n# Experimenta: aquí no hay una única respuesta correcta.\n\ndef saludar(nombre):\n    return f"¡Hola, {nombre}!"\n\nprint(saludar("Explorador"))`

function makeProject(title='Nuevo proyecto') {
  return { id: crypto.randomUUID(), title, code: starter, input: '', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), difficulty: 'Principiante' }
}

export default function LabPage() {
  const [projects, setProjects] = useState([])
  const [active, setActive] = useState(null)
  const [output, setOutput] = useState('')
  const [running, setRunning] = useState(false)

  useEffect(() => {
    warmupPython()
    listProjects().then(async (items) => {
      if (items.length) { setProjects(items); setActive(items[0]) }
      else { const first = { ...makeProject('Mi primer proyecto'), id: 'aeropy-starter-project' }; await saveProject(first); setProjects([first]); setActive(first) }
    })
  }, [])

  const refresh = async (id) => { const items = await listProjects(); setProjects(items); if (id) setActive(items.find((x) => x.id === id) ?? items[0] ?? null) }
  const update = (field, value) => setActive((current) => ({ ...current, [field]: value }))
  const create = async () => { const project=makeProject(); await saveProject(project); await refresh(project.id) }
  const save = async () => { if (!active) return; await saveProject(active); await refresh(active.id) }
  const duplicate = async () => { if (!active) return; const p={...active,id:crypto.randomUUID(),title:`${active.title} copia`,createdAt:new Date().toISOString()}; await saveProject(p); await refresh(p.id) }
  const remove = async () => { if (!active || !confirm('¿Eliminar este proyecto?')) return; await deleteProject(active.id); await refresh() }
  const execute = async () => { if (!active) return; setRunning(true); try { setOutput(await runPython(active.code, (active.input||'').split('\n').filter(Boolean)) || 'Programa terminado.') } catch(e) { setOutput(e.message) } finally { setRunning(false) } }

  return <main className="section-pad lab-page lab-page-v25 grid-stars">
    <section className="lab-hero"><div><p className="eyebrow">EXPERIMENTA · CREA · APRENDE</p><h1><AppIcon name="code" size={42}/> Laboratorio <span>Python</span></h1><p>Un espacio libre para probar ideas, practicar y crear mini‑proyectos. Tus proyectos se guardan en este dispositivo.</p></div><Mascot compact message="Aquí puedes crear lo que imagines y probar diferentes soluciones." /></section>
    <div className="lab-layout">
      <aside className="projects-panel glass"><div className="panel-title"><span><AppIcon name="folder"/></span><h2>Mis proyectos</h2><button onClick={create}>＋</button></div><button className="new-project" onClick={create}>＋ Nuevo proyecto</button><div className="project-list">{projects.map((p) => <button className={active?.id===p.id?'active':''} onClick={() => {setActive(p);setOutput('')}} key={p.id}><span><AppIcon name="code" size={18}/></span><div><b>{p.title}</b><small>{new Date(p.updatedAt).toLocaleDateString()}</small></div></button>)}</div><div className="save-note"><AppIcon name="save" size={20}/><div><b>Sin cuenta</b><small>Se guarda con IndexedDB en este navegador.</small></div></div></aside>
      <section className="lab-editor glass">
        {active ? <><div className="lab-toolbar"><input value={active.title} onChange={(e)=>update('title',e.target.value)} /><div><button onClick={duplicate}><AppIcon name="duplicate" size={16}/> Duplicar</button><button onClick={save}><AppIcon name="save" size={16}/> Guardar</button><button className="run-lab" onClick={execute}><AppIcon name="play" size={16}/>{running?'Ejecutando…':'Ejecutar'}</button></div></div><PythonEditor code={active.code} onChange={(v)=>update('code',v)} minHeight="430px" /><div className="lab-console-row"><label><b><AppIcon name="terminal" size={16}/> Entrada</b><textarea value={active.input||''} onChange={(e)=>update('input',e.target.value)} placeholder="Una entrada por línea" /></label><div className="console-box"><div><b>Consola</b><button onClick={()=>setOutput('')}>Limpiar</button></div><pre>{output||'Ejecuta tu proyecto para ver el resultado.'}</pre></div></div></> : <p>No hay proyecto seleccionado.</p>}
      </section>
      <aside className="lab-side"><section className="glass detail-card"><p className="eyebrow">DETALLES</p><h3><AppIcon name="code" size={18}/> {active?.title}</h3><p>Practica libremente sin alterar el progreso de tus misiones.</p><div className="tags"><span>Python 3</span><span>Local</span><span>{active?.difficulty}</span></div><button className="danger-link" onClick={remove}>Eliminar proyecto</button></section><section className="glass ideas-card"><h3><AppIcon name="bulb" size={18}/> Ideas para crear</h3>{['Adivina el número','Calculadora','Juego de preguntas','Aventura espacial','Conversor de unidades'].map((x)=><button key={x}><AppIcon name="spark" size={16}/><span>{x}</span> →</button>)}</section></aside>
    </div>
  </main>
}
