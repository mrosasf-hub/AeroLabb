import { useMemo, useState } from 'react'
import AppIcon from '../components/AppIcon.jsx'

const bank = [
  { q: '¿Qué instrucción muestra información?', options: ['input()', 'print()', 'range()'], answer: 1 },
  { q: '¿Qué operador usamos normalmente para guardar un valor en una variable?', options: ['=', '==', '>='], answer: 0 },
  { q: '¿Qué estructura permite tomar decisiones?', options: ['if', 'for', 'def'], answer: 0 },
  { q: '¿Qué estructura repite instrucciones?', options: ['class', 'for', 'return'], answer: 1 },
  { q: '¿Qué palabra crea una función?', options: ['func', 'def', 'make'], answer: 1 },
  { q: '¿Qué símbolo inicia un comentario?', options: ['#', '$', '&'], answer: 0 },
  { q: '¿Qué tipo de dato devuelve input() inicialmente?', options: ['Texto', 'Entero', 'Booleano'], answer: 0 },
  { q: '¿Qué colección usa corchetes [ ]?', options: ['Lista', 'Diccionario', 'Clase'], answer: 0 },
]

export default function ReviewPage({ milestone, onComplete, onBack }) {
  const questions = useMemo(() => bank.slice(0, 5), [milestone])
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const choose = (answer) => {
    const nextScore = score + (answer === questions[index].answer ? 1 : 0)
    setScore(nextScore)
    if (index === questions.length - 1) setFinished(true)
    else setIndex(index + 1)
  }

  if (finished) return <main className="section-pad review-page"><section className="review-card review-result"><span><AppIcon name="map" size={46}/></span><p className="eyebrow">REVISIÓN DE VUELO COMPLETADA</p><h1>{score >= 4 ? '¡Listo para continuar!' : 'Buen intento. Conviene repasar un poco.'}</h1><p>Acertaste {score} de {questions.length}. Esta revisión mezcla conceptos anteriores para fortalecer la memoria.</p><div><button className="btn btn-primary" onClick={() => onComplete(milestone, score)}>Guardar revisión +40 XP</button><button className="btn btn-secondary" onClick={onBack}>Volver a la ruta</button></div></section></main>

  const item = questions[index]
  return <main className="section-pad review-page"><section className="review-card"><p className="eyebrow">REVISIÓN DE VUELO · DESPUÉS DE {milestone} MISIONES</p><h1>Repaso inteligente</h1><p>No es un examen. Aero mezcla conceptos anteriores para que no se te olviden mientras avanzas.</p><div className="review-progress"><span style={{ width: `${((index + 1) / questions.length) * 100}%` }}/></div><small>Pregunta {index + 1} de {questions.length}</small><h2>{item.q}</h2><div className="review-options">{item.options.map((option, i) => <button key={option} onClick={() => choose(i)}><span>{String.fromCharCode(65 + i)}</span>{option}</button>)}</div></section></main>
}
