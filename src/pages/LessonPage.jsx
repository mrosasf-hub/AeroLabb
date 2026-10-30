import { useEffect, useMemo, useState } from 'react'
import Mascot from '../components/Mascot.jsx'
import AppIcon from '../components/AppIcon.jsx'
import AchievementModal from '../components/AchievementModal.jsx'
import PythonEditor from '../components/PythonEditor.jsx'
import StepVisualizer from '../components/StepVisualizer.jsx'
import { glossaryTerms } from '../data/glossary.js'
import { getActivity, getLessonsByLevel, getSpecialsByLevel, levels, specialActivities } from '../data/course.js'
import { analyzePython, runPython, warmupPython } from '../services/pythonService.js'
import { validateExercise } from '../services/validationService.js'
import { conceptsFromCode, explainPythonLine, getCreativeChallenge, getProjectStages, getStory } from '../utils/learningEngine.js'

function friendlyError(error) {
  const raw = error?.message || String(error)
  if (raw.includes('SyntaxError')) return `AeroLab detectó un error de sintaxis. Revisa paréntesis, comillas, dos puntos y sangría.\n\n${raw}`
  if (raw.includes('IndentationError')) return `La sangría no está alineada. En Python los espacios indican qué instrucciones pertenecen a un bloque.\n\n${raw}`
  if (raw.includes('NameError')) return `Python encontró un nombre que todavía no existe. Revisa cómo escribiste tus variables.\n\n${raw}`
  if (raw.includes('TypeError')) return `Estás combinando tipos de datos incompatibles. Revisa si necesitas int(), float() o str().\n\n${raw}`
  return raw
}

function nextActivityId(activity, isSpecial) {
  if (!activity) return null
  if (!isSpecial) {
    const prefix = activity.levelId === 'explorador' ? 'exp' : activity.levelId === 'creador' ? 'cre' : 'dev'
    if ([7, 14, 20].includes(activity.order)) return `${prefix}-s${activity.order === 7 ? 1 : activity.order === 14 ? 2 : 3}`
    const items = getLessonsByLevel(activity.levelId)
    return items.find((item) => item.order === activity.order + 1)?.id ?? null
  }
  const specials = getSpecialsByLevel(activity.levelId)
  if (activity.order === 1) return getLessonsByLevel(activity.levelId).find((item) => item.order === 8)?.id ?? null
  if (activity.order === 2) return getLessonsByLevel(activity.levelId).find((item) => item.order === 15)?.id ?? null
  if (activity.order === 3) return specials.find((item) => item.order === 4)?.id ?? null
  return specials.find((item) => item.order === activity.order + 1)?.id ?? null
}

export default function LessonPage({ activityId, progress, onBack, onComplete, onNext, onTouch, onHint, onAttempt }) {
  const activity = getActivity(activityId)
  const isSpecial = specialActivities.some((x) => x.id === activityId)
  const level = levels.find((x) => x.id === activity?.levelId)
  const [code, setCode] = useState(activity?.exercise?.starterCode ?? '')
  const [output, setOutput] = useState('')
  const [inputText, setInputText] = useState((activity?.exercise?.inputs ?? []).join('\n'))
  const [running, setRunning] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const [hintCount, setHintCount] = useState(progress.hintsUsed?.[activityId] ?? 0)
  const [cursorLine, setCursorLine] = useState(1)
  const [showExplain, setShowExplain] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [showSteps, setShowSteps] = useState(false)
  const [activeGlossary, setActiveGlossary] = useState(null)
  const [projectSteps, setProjectSteps] = useState([])
  const [learnTab, setLearnTab] = useState('learn')
  const [achievement, setAchievement] = useState(null)
  const completed = isSpecial ? progress.completedSpecials.includes(activityId) : progress.completedLessons.includes(activityId)

  useEffect(() => {
    if (!activity) return
    setCode(activity.exercise?.starterCode ?? '')
    setInputText((activity.exercise?.inputs ?? []).join('\n'))
    setOutput('')
    setFeedback(null)
    setHintCount(progress.hintsUsed?.[activityId] ?? 0)
    setCursorLine(1)
    setShowExplain(false)
    setShowSteps(false)
    setProjectSteps([])
    setLearnTab('learn')
    setAchievement(null)
    onTouch(activityId)
    warmupPython()
  }, [activityId])

  const nextId = useMemo(() => nextActivityId(activity, isSpecial), [activityId, isSpecial])
  const story = useMemo(() => getStory(activity), [activityId])
  const guidedStages = useMemo(() => getProjectStages(activity), [activityId])
  const creativeChallenge = useMemo(() => getCreativeChallenge(activity), [activityId])
  const selectedLine = code.split('\n')[Math.max(0, cursorLine - 1)] ?? ''
  const lineExplanation = explainPythonLine(selectedLine)
  const history = progress.attemptHistory?.[activityId] ?? []
  const relatedGlossary = useMemo(() => {
    const source = `${activity?.title ?? ''} ${activity?.summary ?? ''} ${(activity?.theory ?? []).join(' ')}`.toLowerCase()
    return glossaryTerms.filter((item) => source.includes(item.term) || (item.alias && source.includes(item.alias))).slice(0, 5)
  }, [activityId])

  if (!activity) return null

  const execute = async () => {
    setRunning(true)
    setFeedback(null)
    try {
      const result = await runPython(code, inputText.split('\n').filter((x) => x.length > 0))
      setOutput(result || '✓ El programa terminó sin mostrar texto.')
      return result
    } catch (error) {
      const message = friendlyError(error)
      setOutput(message)
      setFeedback({ ok: false, message: 'Encontramos un error. Lee la consola, corrige lo necesario y vuelve a intentarlo.' })
      return null
    } finally {
      setRunning(false)
    }
  }

  const check = async () => {
    const result = await execute()
    if (result === null) {
      onAttempt(activity.id, { code, output: 'Error de ejecución', ok: false })
      return
    }

    let analysis = {}
    try {
      analysis = await analyzePython(code)
    } catch {
      // Si el análisis estructural no está disponible, la ejecución sigue siendo válida.
    }

    const validation = validateExercise(code, result, activity.exercise.validation, analysis)
    setFeedback(validation)
    onAttempt(activity.id, { code, output: result, ok: validation.ok })
    if (validation.ok && !completed) {
      onComplete(activity.id)
      const type = !isSpecial ? 'mission' : activity.order < 3 ? 'block' : activity.order === 3 ? 'level' : 'project'
      const typeMessage = type === 'level'
        ? `Completaste ${level?.name}. Has demostrado los conceptos principales de esta ruta.`
        : type === 'block'
          ? `Superaste el Jefe del bloque ${activity.order}. Ya puedes continuar con el siguiente bloque.`
          : type === 'project'
            ? 'Tu proyecto cumple los requisitos. Sigue experimentando y hazlo tuyo.'
            : `Completaste “${activity.title}”. Tu solución funciona y puedes seguir avanzando.`
      setAchievement({ type, xp: activity.xp ?? 0, stars: activity.stars ?? 1, message: typeMessage })
    }
  }

  const revealHint = () => {
    const max = activity.exercise.hints?.length ?? 0
    const next = Math.min(max, hintCount + 1)
    setHintCount(next)
    onHint(activity.id, next)
  }

  const speak = () => {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(`${activity.title}. ${activity.summary}. ${activity.exercise.instructions}`))
  }

  const theory = activity.theory ?? ['Este desafío usa conceptos de las misiones anteriores.', 'Primero diseña una solución pequeña y después mejora tu programa.']
  const example = activity.exampleCode ?? '# El ejemplo solo enseña la idea.\nprint("Prueba una solución propia")'
  const learnedConcepts = conceptsFromCode(code)

  return <main className="lesson-page lesson-page-v24 grid-stars">
    <div className="lesson-inner-v24">
      <div className="lesson-topbar">
        <button className="back-btn" onClick={onBack}>← Ruta</button>
        <div className="crumb"><AppIcon name={level?.id === 'explorador' ? 'rocket' : level?.id === 'creador' ? 'spark' : 'code'} size={16}/> {level?.name} <span>›</span> {isSpecial ? (activity.order <= 3 ? `Jefe ${activity.order}` : 'Actividad especial') : `Misión ${activity.order}`}</div>
        <button className="listen-btn" onClick={speak}><AppIcon name="headphones" size={17}/> Escuchar</button>
      </div>

      <section className="lesson-hero lesson-hero-v24">
        <div className="lesson-hero-copy">
          <p className="eyebrow">{isSpecial ? (activity.order <= 3 ? `JEFE DEL BLOQUE ${activity.order}` : activity.kind?.toUpperCase()) : `MISIÓN ${activity.order} · ${completed ? 'COMPLETADA' : activity.activityType?.toUpperCase()}`}</p>
          <h1><span className="mission-title-icon"><AppIcon name={isSpecial ? 'boss' : 'code'} size={34}/></span>{activity.title}</h1>
          <p>{activity.summary}</p>
        </div>
        <Mascot compact message={completed ? 'Misión completada. Ahora puedo explicarte qué conceptos utilizaste.' : 'El ejemplo es una guía. Puedes resolver la misión de otra manera.'} />
        <aside className="mission-meta mission-meta-v24">
          <div className="mission-meta-title"><AppIcon name={completed ? 'check' : 'target'} size={17}/> {completed ? 'Tu progreso en esta misión' : 'Recompensa de la misión'}</div>
          <span><AppIcon name="bolt" size={18}/> <b>+{activity.xp} XP</b></span>
          <span><AppIcon name="star" size={18}/> <b>+{activity.stars ?? 1}</b></span>
          <span><AppIcon name="chart" size={18}/> <b>{activity.difficulty ?? 'Reto'}</b></span>
        </aside>
      </section>

      {story && <section className="story-strip story-strip-v24"><span><AppIcon name="book" size={22}/></span><div><small>HISTORIA · BLOQUE {story.block}</small><b>{story.title}</b><p>{story.text}</p></div><span className="story-arrow">›</span></section>}

      {guidedStages.length > 0 && <section className="guided-project glass"><div><p className="eyebrow">PROYECTO GUIADO POR ETAPAS</p><h2>Construye sin intentar hacerlo todo de golpe</h2></div><div className="project-stage-list">{guidedStages.map((stage, index) => <button key={stage} className={projectSteps.includes(index) ? 'done' : ''} onClick={() => setProjectSteps((current) => current.includes(index) ? current.filter((x) => x !== index) : [...current, index])}><span>{projectSteps.includes(index) ? '✓' : index + 1}</span><p>{stage}</p></button>)}</div></section>}

      <div className="lesson-workspace lesson-workspace-v24">
        <section className="learn-panel learn-panel-v24 glass">
          <div className="learn-tabs" role="tablist" aria-label="Contenido de la misión">
            <button className={learnTab === 'learn' ? 'active' : ''} onClick={() => setLearnTab('learn')}><AppIcon name="book" size={17}/> Aprende</button>
            <button className={learnTab === 'theory' ? 'active' : ''} onClick={() => setLearnTab('theory')}><AppIcon name="file" size={17}/> Teoría breve</button>
            <button className={learnTab === 'example' ? 'active' : ''} onClick={() => setLearnTab('example')}><AppIcon name="code" size={17}/> Ejemplo</button>
          </div>

          {learnTab === 'learn' && <div className="learn-tab-content">
            <div className="concept-card"><span><AppIcon name="bulb" size={19}/></span><div><h3>{activity.title.includes('print') ? '¿Qué es print()?' : 'Idea principal'}</h3><p>{theory[0]}</p></div></div>
            <div className="key-points"><b><AppIcon name="target" size={17}/> Objetivo</b><p>{activity.exercise.instructions}</p></div>
            {story && <div className="lesson-story-card"><span><AppIcon name="book" size={18}/></span><div><b>Historia</b><p>{story.text}</p></div></div>}
            <div className="freedom-note"><b><AppIcon name="brain" size={17}/> Importante</b><p>No tienes que copiar el ejemplo. Puedes cambiar nombres de variables y organizar tu código de otra forma mientras cumpla el objetivo.</p></div>
          </div>}

          {learnTab === 'theory' && <div className="learn-tab-content theory-list">
            {theory.map((text, idx) => <div className="theory-row" key={idx}><span>{idx + 1}</span><p>{text}</p></div>)}
            {relatedGlossary.length > 0 && <div className="lesson-glossary"><b><AppIcon name="book" size={17}/> Conceptos de esta misión</b><div>{relatedGlossary.map((term) => <button key={term.term} onClick={() => setActiveGlossary(activeGlossary === term.term ? null : term.term)}><AppIcon name="code" size={15}/> {term.term}</button>)}</div>{activeGlossary && (() => { const term = relatedGlossary.find((x) => x.term === activeGlossary); return term ? <aside><b>{term.term}</b><p>{term.simple}</p><code>{term.example}</code></aside> : null })()}</div>}
          </div>}

          {learnTab === 'example' && <div className="learn-tab-content">
            <div className="example-notice">Este código <b>no es la única respuesta correcta</b>. Úsalo para entender el concepto y crea tu propia solución.</div>
            <div className="example-box"><div><b>⌘ Ejemplo relacionado</b><small>Observa la idea, no memorices el código</small></div><pre><code>{example}</code></pre></div>
            {activity.projectIdeas && <div className="ideas-box"><b><AppIcon name="bulb" size={17}/> Ideas de proyecto</b>{activity.projectIdeas.map((idea) => <span key={idea}>{idea}</span>)}</div>}
          </div>}
        </section>

        <section className="coding-panel coding-panel-v24 glass">
          <div className="coding-head-v24"><div><span><AppIcon name="code" size={22}/></span><h2>Editor de Python</h2></div><small>Python 3 · AeroLab</small></div>
          <div className="validation-banner"><span>✓</span><p><b>Validación flexible:</b> revisamos lo que hace tu programa y los conceptos que utilizaste, no si copiaste el ejemplo.</p></div>
          <div className="editor-tools editor-tools-v24">
            <button className={showExplain ? 'active' : ''} onClick={() => setShowExplain(!showExplain)}><AppIcon name="info" size={16}/> ¿Qué hace esta línea?</button>
            <button className={showSteps ? 'active' : ''} onClick={() => setShowSteps(!showSteps)}><AppIcon name="play" size={16}/> Paso a paso</button>
            <button className={showHistory ? 'active' : ''} onClick={() => setShowHistory(!showHistory)}>▥ Intentos ({history.length})</button>
            <button onClick={() => { setCode(activity.exercise?.starterCode ?? ''); setOutput(''); setFeedback(null) }}>↻ Reiniciar</button>
          </div>
          <PythonEditor code={code} onChange={setCode} onCursorLineChange={setCursorLine} minHeight="300px" />
          {showExplain && <div className="explain-line"><div><span><AppIcon name="info" size={17}/></span><b>Explicación de la línea {cursorLine}</b></div><code>{selectedLine || 'línea vacía'}</code><p>{lineExplanation}</p></div>}
          <div className="input-run-row input-run-row-v24">
            <label><span><AppIcon name="terminal" size={16}/> Entrada de prueba</span><textarea value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Una entrada por línea. Solo se usa si tu código llama input()." /></label>
          </div>
          <div className="console-box console-box-v24"><div><b>⌁ Consola de salida</b><span className="console-actions"><button onClick={() => setOutput('')}>Limpiar</button><button className="execute-inline" disabled={running} onClick={execute}><AppIcon name="play" size={16}/>{running ? 'Ejecutando…' : 'Ejecutar código'}</button></span></div><pre>{output || 'Ejecuta tu código para ver el resultado aquí…'}</pre></div>
          {showSteps && <StepVisualizer code={code} inputs={inputText.split('\n').filter(Boolean)} />}
          {showHistory && <div className="attempt-history"><div><b><AppIcon name="history" size={17}/> Historial de intentos</b><small>Se guardan los últimos 10 intentos en este dispositivo.</small></div>{history.length ? [...history].reverse().map((item, idx) => <details key={`${item.at}-${idx}`}><summary><span className={item.ok ? 'ok' : 'bad'}>{item.ok ? '✓ Correcto' : '× A revisar'}</span><time>{new Date(item.at).toLocaleString()}</time></summary><pre><code>{item.code}</code></pre><small>Salida</small><pre>{item.output}</pre></details>) : <p>Todavía no has comprobado esta misión.</p>}</div>}
        </section>
      </div>

      {hintCount > 0 && <section className="hints-strip glass"><b><AppIcon name="bulb" size={17}/> Ayuda progresiva</b><div>{activity.exercise.hints.slice(0, hintCount).map((hint, i) => <p key={i}><span>{i+1}</span>{hint}</p>)}</div></section>}

      <section className={`mission-check mission-check-v24 ${feedback ? (feedback.ok ? 'success' : 'error') : ''}`}>
        <div><span className="target-icon"><AppIcon name="target" size={30}/></span><div><p className="eyebrow">TU MISIÓN</p><h3>{activity.exercise.title}</h3><p>{feedback?.message ?? 'Resuélvela a tu manera. Cuando estés listo, AeroLab comprobará el comportamiento y los conceptos.'}</p></div></div>
        <div className="check-actions">
          <button className="btn btn-hint" onClick={revealHint}><AppIcon name="bulb" size={17}/> Pista {Math.min(3, hintCount + 1)}</button>
          {completed && nextId && <button className="btn btn-secondary" onClick={() => onNext(nextId)}>{!isSpecial && [7,14,20].includes(activity.order) ? 'Ir al Jefe' : 'Siguiente →'}</button>}
          <button className="btn btn-primary" onClick={check} disabled={running}>{completed ? '✓ Comprobar otra vez' : '✓ Comprobar misión'}</button>
        </div>
      </section>

      {feedback?.ok && <section className="after-solve-grid">
        <article className="after-solve-card learned"><span><AppIcon name="brain" size={28}/></span><div><p className="eyebrow">QUÉ ACABAS DE USAR</p><h3>Tu solución tiene ideas importantes</h3><p>{learnedConcepts.length ? `Utilizaste ${learnedConcepts.join(', ')}. Estas herramientas se pueden combinar para construir programas cada vez más completos.` : 'Resolviste el problema siguiendo una secuencia lógica. Explicar tu solución es una buena forma de comprobar que la entendiste.'}</p></div></article>
        <article className="after-solve-card creative"><span><AppIcon name="star" size={28}/></span><div><p className="eyebrow">DESAFÍO OPCIONAL · MODO CREATIVO</p><h3>¿Quieres ir un paso más allá?</h3><p>{creativeChallenge}</p><button className="text-button" onClick={() => setCode(`${code}\n\n# Desafío creativo:\n# ${creativeChallenge}`)}>Añadir reto al editor →</button></div></article>
      </section>}
    </div>
    <AchievementModal achievement={achievement} onClose={() => setAchievement(null)} onContinue={nextId ? () => { setAchievement(null); onNext(nextId) } : null} />
  </main>
}
