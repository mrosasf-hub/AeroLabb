import { useMemo, useState } from 'react'
import { placementQuestions } from '../data/placement.js'
import { recommendedStartFromScore } from '../utils/learningEngine.js'
import AppIcon from './AppIcon.jsx'

export default function PlacementTest({ onComplete, onSkip }) {
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [done, setDone] = useState(false)
  const score = useMemo(() => answers.reduce((total, value, i) => total + (value === placementQuestions[i]?.answer ? 1 : 0), 0), [answers])
  const recommendation = recommendedStartFromScore(score, placementQuestions.length)

  const choose = (answer) => {
    const next = [...answers]
    next[index] = answer
    setAnswers(next)
    if (index === placementQuestions.length - 1) setDone(true)
    else setIndex(index + 1)
  }

  if (done) {
    return <div className="modal-backdrop placement-backdrop">
      <section className="placement-card placement-result">
        <span className="placement-icon"><AppIcon name="map" size={34}/></span>
        <p className="eyebrow">RUTA RECOMENDADA</p>
        <h2>{recommendation.label}</h2>
        <p>{recommendation.message}</p>
        <div className="placement-score"><b>{score}/{placementQuestions.length}</b><span>respuestas correctas</span></div>
        <button className="btn btn-primary" onClick={() => onComplete({ score, total: placementQuestions.length, recommendedLevel: recommendation.levelId, completedAt: new Date().toISOString() })}>Usar esta recomendación →</button>
      </section>
    </div>
  }

  const q = placementQuestions[index]
  return <div className="modal-backdrop placement-backdrop">
    <section className="placement-card">
      <div className="placement-head"><div><p className="eyebrow">PRUEBA DE INICIO · NO ES EXAMEN</p><h2>Queremos conocerte</h2></div><button className="text-button" onClick={onSkip}>Omitir por ahora</button></div>
      <p className="placement-copy">Son 8 preguntas rápidas para recomendarte el mejor punto de inicio. No pierdes puntos por equivocarte.</p>
      <div className="placement-progress"><span style={{ width: `${((index + 1) / placementQuestions.length) * 100}%` }} /></div>
      <small>Pregunta {index + 1} de {placementQuestions.length} · {q.concept}</small>
      <pre className="placement-question">{q.question}</pre>
      <div className="placement-options">{q.options.map((option, i) => <button key={option} onClick={() => choose(i)}><span>{String.fromCharCode(65 + i)}</span>{option}</button>)}</div>
    </section>
  </div>
}
