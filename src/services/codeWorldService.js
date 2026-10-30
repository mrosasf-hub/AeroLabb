import { analyzePython, runWorldPython } from './pythonService.js'

function countEvents(events){
  return events.reduce((acc,event)=>{ acc[event.type]=(acc[event.type]||0)+1; return acc },{})
}

export async function executeCodeWorldMission(code,mission){
  // Pyodide lives in a single Web Worker. Run and analyze sequentially so
  // two interpreter jobs never compete for the same runtime.
  const { events, output } = await runWorldPython(code)
  const analysis = await analyzePython(code)
  const missing=[]
  const constructs=new Set(analysis.constructs||[])
  const calls=new Set(analysis.calls||[])
  for(const item of mission.validate?.constructs||[]) if(!constructs.has(item)) missing.push(`estructura ${item}`)
  for(const item of mission.validate?.calls||[]) if(!calls.has(item)) missing.push(`llamada ${item}()`)
  const counts=countEvents(events)
  for(const [type,min] of Object.entries(mission.validate?.events||{})) if((counts[type]||0)<min) missing.push(`${min} acción(es) ${type}`)
  return { ok:missing.length===0, missing, events, output, analysis, counts }
}
