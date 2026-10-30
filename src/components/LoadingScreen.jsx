import { useEffect, useState } from 'react'
import AppIcon from './AppIcon.jsx'

const STEPS = [
  'Preparando tu ruta de aprendizaje',
  'Cargando misiones y proyectos',
  'Activando el laboratorio Python',
]

export default function LoadingScreen({ visible }) {
  const [step, setStep] = useState(0)
  useEffect(() => {
    if (!visible) return undefined
    const id = setInterval(() => setStep((value) => (value + 1) % STEPS.length), 520)
    return () => clearInterval(id)
  }, [visible])
  if (!visible) return null
  return <div className="boot-screen" role="status" aria-live="polite">
    <div className="boot-bg" />
    <section className="boot-card">
      <img className="boot-logo" src={`${import.meta.env.BASE_URL}brand/aerolab-logo.png`} alt="Aerolab Center" />
      <div className="boot-anime"><img src={`${import.meta.env.BASE_URL}hero/anime-python.jpg`} alt="Estudiante de Python" /></div>
      <div className="boot-copy">
        <span className="boot-kicker"><AppIcon name="code" size={18}/> Plataforma de aprendizaje Python</span>
        <h1>Preparando tu experiencia</h1>
        <p>{STEPS[step]}</p>
        <div className="boot-progress"><span /></div>
        <small>Aerolab Center · Creative Minds</small>
      </div>
    </section>
  </div>
}
