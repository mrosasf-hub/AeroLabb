import { useEffect, useMemo, useRef, useState } from 'react'
import CodeWorldScene from '../components/CodeWorldScene.jsx'
import PythonEditor from '../components/PythonEditor.jsx'
import AppIcon from '../components/AppIcon.jsx'
import { codeWorldMissions, codeWorldZones, getCodeWorldMission, getCodeWorldZone, isCodeWorldUnlocked } from '../data/codeWorld.js'
import { executeCodeWorldMission } from '../services/codeWorldService.js'
import './codeworld.css'

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const EVENT_LABELS = {
  comms: 'Antena enlazada', generator: 'Generador encendido', door: 'Compuerta abierta', plant: 'Cultivo activado',
  motors: 'Motores encendidos', rise: 'Dron ascendiendo', scan: 'Escaneo completado', patrol: 'Sector patrullado',
  return: 'Dron regresando', light: 'Dato iluminado', tower: 'Torre sincronizada', sync: 'Sistema conectado', core: 'Núcleo central activado',
}

function playUiSound(kind = 'tap') {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return
    const ctx = new AudioCtx()
    const now = ctx.currentTime
    const sequence = kind === 'success' ? [[523, 0], [659, .09], [784, .18]] : kind === 'event' ? [[440, 0], [660, .06]] : [[520, 0]]
    sequence.forEach(([freq, offset], index) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = index % 2 ? 'triangle' : 'sine'
      osc.frequency.value = freq
      gain.gain.setValueAtTime(.0001, now + offset)
      gain.gain.exponentialRampToValueAtTime(kind === 'success' ? .07 : .035, now + offset + .015)
      gain.gain.exponentialRampToValueAtTime(.0001, now + offset + .16)
      osc.connect(gain); gain.connect(ctx.destination)
      osc.start(now + offset); osc.stop(now + offset + .18)
    })
    setTimeout(() => ctx.close(), 700)
  } catch { /* audio is optional */ }
}

export default function CodeWorldPage({ progress, percent, onComplete, onTouch, onBack, onReset }) {
  const [nearMissionId, setNearMissionId] = useState(null)
  const [terminalMissionId, setTerminalMissionId] = useState(null)
  const [code, setCode] = useState('')
  const [running, setRunning] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const [liveEvent, setLiveEvent] = useState(null)
  const [eventLog, setEventLog] = useState([])
  const [mobileControls, setMobileControls] = useState({ up: false, down: false, left: false, right: false })
  const [showMap, setShowMap] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [playerInfo, setPlayerInfo] = useState({ x: 0, z: 9, nearestMissionId: 'cw-01', distance: 0 })
  const detectQuality = () => {
    const width = window.innerWidth
    const cores = navigator.hardwareConcurrency || 8
    const memory = navigator.deviceMemory || 8
    if (width < 560 || cores <= 2 || memory <= 2) return 'low'
    if (width < 1024 || cores <= 4 || memory <= 4) return 'medium'
    return 'high'
  }
  const [quality, setQuality] = useState(detectQuality)
  const terminalMission = getCodeWorldMission(terminalMissionId)
  const nextMission = codeWorldMissions.find((m) => !progress.completed.includes(m.id)) ?? codeWorldMissions.at(-1)
  const currentMissionId = terminalMissionId || nextMission?.id
  const finalDone = progress.completed.includes('cw-12')
  const currentZone = nextMission ? getCodeWorldZone(nextMission.zone) : getCodeWorldZone('core')
  const nearest = getCodeWorldMission(playerInfo.nearestMissionId)

  useEffect(() => {
    const onResize = () => setQuality(detectQuality())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if ((e.key === 'e' || e.key === 'E') && nearMissionId && !terminalMissionId) { e.preventDefault(); openTerminal(nearMissionId) }
      if (e.key === 'Escape' && terminalMissionId) closeTerminal()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [nearMissionId, terminalMissionId, running])

  const openTerminal = (id) => {
    if (!isCodeWorldUnlocked(id, progress.completed)) return
    const mission = getCodeWorldMission(id)
    if (!mission) return
    if (soundEnabled) playUiSound('tap')
    setTerminalMissionId(id)
    setCode(mission.starterCode)
    setFeedback(null)
    setEventLog([])
    onTouch(id)
  }

  const closeTerminal = () => {
    if (running) return
    setTerminalMissionId(null)
    setFeedback(null)
    setLiveEvent(null)
  }

  const playEvents = async (events) => {
    setEventLog([])
    for (const event of events) {
      setLiveEvent(event)
      setEventLog((current) => [...current, event])
      if (soundEnabled) playUiSound('event')
      await sleep(620)
    }
    await sleep(280)
    setLiveEvent(null)
  }

  const runMission = async () => {
    if (!terminalMission) return
    setRunning(true)
    setFeedback(null)
    try {
      const result = await executeCodeWorldMission(code, terminalMission)
      await playEvents(result.events)
      if (result.ok) {
        const fresh = !progress.completed.includes(terminalMission.id)
        if (fresh) onComplete(terminalMission)
        if (soundEnabled) playUiSound('success')
        setFeedback({
          ok: true,
          title: fresh ? 'Sistema restaurado' : 'Solución validada',
          message: fresh ? `“${terminalMission.title}” ya forma parte del campus restaurado. Sal de la terminal para ver el cambio completo.` : 'Tu solución sigue funcionando. Puedes experimentar con otra forma de resolverla.',
        })
      } else {
        setFeedback({ ok: false, title: 'El mundo respondió, pero falta algo', message: `Revisa: ${result.missing.join(', ')}. No necesitas copiar el ejemplo: AeroLab valida el comportamiento y los conceptos.` })
      }
    } catch (error) {
      setFeedback({ ok: false, title: 'Python detuvo la ejecución', message: error?.message || String(error) })
    } finally { setRunning(false) }
  }

  const zoneStats = useMemo(() => codeWorldZones.map((zone) => {
    const missions = codeWorldMissions.filter((m) => m.zone === zone.id)
    const done = missions.filter((m) => progress.completed.includes(m.id)).length
    return { ...zone, done, total: missions.length }
  }), [progress.completed])

  const setMove = (key, value) => setMobileControls((current) => ({ ...current, [key]: value }))
  const mapPosition = (zone) => ({ left: `${((zone.x + 34) / 68) * 100}%`, top: `${((34 - zone.z) / 68) * 100}%` })

  return <main className={`codeworld-page ${terminalMission ? 'terminal-open' : ''}`}>
    <section className="cw-hud">
      <button className="cw-back" onClick={onBack}><AppIcon name="home" size={18} /> <span>AeroLab</span></button>
      <div className="cw-title"><small>AVENTURA 3D</small><b>CodeWorld</b><span>Programa un mundo</span></div>
      <div className="cw-progress"><div><span style={{ width: `${percent}%` }} /></div><b>{progress.completed.length}/12</b><small>{percent}% restaurado</small></div>
      <div className="cw-hud-actions">
        <button className={`cw-sound ${soundEnabled ? 'on' : ''}`} onClick={() => setSoundEnabled((value) => !value)} aria-label={soundEnabled ? 'Desactivar sonido' : 'Activar sonido'}>{soundEnabled ? '♪' : '×♪'}</button>
        <button className="cw-map-btn" onClick={() => setShowMap((value) => !value)}><AppIcon name="map" size={18} /><span>Mapa</span></button>
      </div>
    </section>

    <section className="cw-stage" aria-label="Campus tridimensional de AeroLab">
      <CodeWorldScene
        completed={progress.completed}
        currentMissionId={currentMissionId}
        onOpenMission={openTerminal}
        mobileControls={mobileControls}
        onNearMission={setNearMissionId}
        onPlayerPosition={setPlayerInfo}
        liveEvent={liveEvent}
        quality={quality}
        lowPower={quality === 'low'}
      />

      <aside className="cw-mission-card" style={{ '--mission-accent': currentZone?.accent || '#55ddff' }}>
        <div className="cw-mission-card-top"><small>MISIÓN {finalDone ? 'FINALIZADA' : `${nextMission?.order ?? 12}/12`}</small><span>{currentZone?.short}</span></div>
        <b>{finalDone ? 'Centro restaurado' : nextMission?.title}</b>
        <p>{finalDone ? 'Has programado un mundo. El campus permanece abierto para experimentar con todas las terminales.' : nextMission?.summary}</p>
        {!finalDone && <div className="cw-mission-meta"><span>{nextMission?.concept}</span><span>{nextMission?.difficulty}</span></div>}
      </aside>

      {!terminalMission && !finalDone && <aside className="cw-navigation-chip">
        <span className="cw-nav-pulse" />
        <div><small>SIGUIENTE SISTEMA</small><b>{nextMission?.title}</b><span>{nearest?.id === nextMission?.id ? `${Math.max(0, Math.round(playerInfo.distance))} m aprox.` : currentZone?.name}</span></div>
      </aside>}

      <div className={`cw-quality ${quality}`}><i /> {quality === 'low' ? 'Calidad ligera' : quality === 'medium' ? 'Equilibrado' : 'Detalle premium'}</div>

      {liveEvent && <div className="cw-cinematic-status"><span /><small>EJECUTANDO EN EL CAMPUS</small><b>{EVENT_LABELS[liveEvent.type] || liveEvent.type}</b></div>}

      {nearMissionId && !terminalMission && <button className="cw-interact" onClick={() => openTerminal(nearMissionId)}><kbd>E</kbd><span>Usar terminal</span><b>{getCodeWorldMission(nearMissionId)?.title}</b></button>}

      <div className="cw-touch" aria-label="Controles táctiles">
        <button className="up" onPointerDown={() => setMove('up', true)} onPointerUp={() => setMove('up', false)} onPointerCancel={() => setMove('up', false)} onPointerLeave={() => setMove('up', false)} aria-label="Avanzar">▲</button>
        <button className="left" onPointerDown={() => setMove('left', true)} onPointerUp={() => setMove('left', false)} onPointerCancel={() => setMove('left', false)} onPointerLeave={() => setMove('left', false)} aria-label="Izquierda">◀</button>
        <button className="down" onPointerDown={() => setMove('down', true)} onPointerUp={() => setMove('down', false)} onPointerCancel={() => setMove('down', false)} onPointerLeave={() => setMove('down', false)} aria-label="Retroceder">▼</button>
        <button className="right" onPointerDown={() => setMove('right', true)} onPointerUp={() => setMove('right', false)} onPointerCancel={() => setMove('right', false)} onPointerLeave={() => setMove('right', false)} aria-label="Derecha">▶</button>
      </div>
      <div className="cw-help"><span>WASD / flechas</span><i />Explorar <i /><span>E</span> Usar terminal</div>
    </section>

    {showMap && <aside className="cw-map-drawer">
      <div className="cw-map-head"><div><small>HOLOGRAMA DEL CAMPUS</small><h2>Estado de CodeWorld</h2><p>{percent}% de los sistemas responde a Python.</p></div><button onClick={() => setShowMap(false)}>×</button></div>
      <div className="cw-holo-map">
        <div className="cw-map-gridlines" />
        {zoneStats.map((zone) => <button key={zone.id} className={`cw-map-node ${zone.done === zone.total && zone.total ? 'done' : ''}`} style={{ ...mapPosition(zone), '--zone': zone.accent }} onClick={() => {
          const mission = codeWorldMissions.find((item) => item.zone === zone.id && isCodeWorldUnlocked(item.id, progress.completed) && !progress.completed.includes(item.id)) || codeWorldMissions.find((item) => item.zone === zone.id && isCodeWorldUnlocked(item.id, progress.completed))
          if (mission) { openTerminal(mission.id); setShowMap(false) }
        }}>
          <i /><span>{zone.short}</span><small>{zone.done}/{zone.total}</small>
        </button>)}
        <div className="cw-map-you" style={{ left: `${((playerInfo.x + 34) / 68) * 100}%`, top: `${((34 - playerInfo.z) / 68) * 100}%` }}><span>↑</span><small>TÚ</small></div>
      </div>
      <div className="cw-zone-grid">{zoneStats.map((zone) => <article key={zone.id} style={{ '--zone': zone.accent }}><span>{zone.done}/{zone.total}</span><b>{zone.short}</b><p>{zone.description}</p></article>)}</div>
      <div className="cw-terminal-list">{codeWorldMissions.map((mission) => {
        const unlocked = isCodeWorldUnlocked(mission.id, progress.completed)
        const done = progress.completed.includes(mission.id)
        return <button key={mission.id} disabled={!unlocked} className={done ? 'done' : ''} onClick={() => { openTerminal(mission.id); setShowMap(false) }}><span>{String(mission.order).padStart(2, '0')}</span><div><b>{mission.title}</b><small>{mission.concept}</small></div><em>{done ? 'Restaurada' : unlocked ? 'Abrir' : 'Bloqueada'}</em></button>
      })}</div>
      <button className="cw-reset" onClick={onReset}>Reiniciar únicamente CodeWorld</button>
    </aside>}

    {terminalMission && <div className="cw-terminal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) closeTerminal() }}>
      <section className="cw-terminal-panel">
        <header>
          <div className="cw-terminal-title"><span className="cw-terminal-number">{String(terminalMission.order).padStart(2, '0')}</span><div><small>TERMINAL · {getCodeWorldZone(terminalMission.zone)?.name}</small><h2>{terminalMission.title}</h2><p>{terminalMission.summary}</p></div></div>
          <button onClick={closeTerminal} aria-label="Cerrar terminal">×</button>
        </header>
        <div className="cw-terminal-grid">
          <aside className="cw-terminal-brief">
            <div className="cw-objective"><AppIcon name="target" size={20} /><div><small>OBJETIVO</small><p>{terminalMission.objective}</p></div></div>
            <div className="cw-concept"><small>CONCEPTO PYTHON</small><b>{terminalMission.concept}</b><p>{terminalMission.hint}</p></div>
            <div className="cw-world-api"><small>API DEL MUNDO</small><code>activar_comunicaciones()</code><code>encender_generador(nivel)</code><code>abrir_puerta(nombre)</code><code>activar_planta(indice)</code><code>encender_motores()</code><code>subir(altura)</code><code>escanear()</code><code>patrullar(sector)</code><code>iluminar(nombre)</code><code>activar_torre(seccion)</code><code>sincronizar(sistema)</code><code>activar_nucleo()</code></div>
          </aside>
          <div className="cw-code-area">
            <div className="cw-code-head"><div><span>Python controla el campus</span><small>No evaluamos si copiaste: evaluamos lo que hace tu programa.</small></div><div className="cw-live-dot"><i /> PYTHON 3</div></div>
            <PythonEditor code={code} onChange={setCode} minHeight="360px" />
            <div className="cw-run-row"><button onClick={runMission} disabled={running}><AppIcon name="play" size={18} />{running ? 'Ejecutando en CodeWorld…' : 'Ejecutar en el mundo'}</button><span>{terminalMission.reward}</span></div>
            {eventLog.length > 0 && <div className="cw-event-log"><small>SECUENCIA DEL MUNDO</small>{eventLog.slice(-8).map((event, i) => <span key={`${event.type}-${i}`}><i />{EVENT_LABELS[event.type] || event.type}</span>)}</div>}
            {feedback && <div className={`cw-feedback ${feedback.ok ? 'ok' : 'bad'}`}><b>{feedback.title}</b><p>{feedback.message}</p>{feedback.ok && <div className="cw-feedback-actions"><button onClick={closeTerminal}>Volver al campus</button>{terminalMission.order < 12 && <button onClick={() => { closeTerminal(); setShowMap(true) }}>Ver mapa</button>}</div>}</div>}
          </div>
        </div>
      </section>
    </div>}

    {finalDone && !terminalMission && <section className="cw-final-banner"><div className="cw-final-orb" /><small>SISTEMA RESTAURADO</small><h2>Has programado un mundo.</h2><p>El campus de AeroLab responde a las decisiones, ciclos, datos y funciones que programaste.</p><div><button onClick={() => setShowMap(true)}>Revisar campus</button><button className="secondary" onClick={onBack}>Volver a AeroLab</button></div></section>}
  </main>
}
