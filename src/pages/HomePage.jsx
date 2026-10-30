import ProgressBar from '../components/ProgressBar.jsx'
import AppIcon from '../components/AppIcon.jsx'
import { getActivity } from '../data/course.js'
import { getAdaptiveRecommendation, getReviewDue } from '../utils/learningEngine.js'

export default function HomePage({ progress, totalPercent, kidsProgress, kidsPercent, worldProgress, worldPercent, onNavigate, onContinue, onActivity, onReview, onKids, onCodeWorld }) {
  const reviewDue = getReviewDue(progress)
  const recommendation = getAdaptiveRecommendation(progress, getActivity)
  const level = progress.placement?.recommendedLevel === 'developer' ? 'Developer' : progress.placement?.recommendedLevel === 'creador' ? 'Creador' : 'Explorador'
  const nextLabel = reviewDue ? `Revisión de vuelo · ${reviewDue} misiones` : (recommendation.activityId ? recommendation.title : 'Continúa tu ruta')

  return <main className="home-v3">
    <section className="home-v3-hero">
      <div className="home-v3-copy">
        <p className="eyebrow">AEROLAB CENTER · APRENDIZAJE DE PYTHON</p>
        <h1>Aprende a programar<br/><span>a tu manera</span></h1>
        <p>Dos experiencias, un mismo objetivo: comprender la lógica, practicar con retos y avanzar hasta construir programas reales.</p>
        <div className="home-v3-actions"><button className="kids-primary" onClick={onContinue}><AppIcon name="play" size={20}/> Continuar mi aprendizaje</button><button className="kids-secondary" onClick={()=>onNavigate('route')}><AppIcon name="map" size={20}/> Ver ruta completa</button></div>
      </div>
      <div className="home-v3-character"><img src={`${import.meta.env.BASE_URL}hero/anime-python.jpg`} alt="Estudiante aprendiendo Python"/><div><code>print("Hola, futuro programador")</code></div></div>
      <aside className="home-v3-progress glass"><div className="home-v3-progress-head"><span><AppIcon name="chart" size={22}/></span><div><small>Ruta Python</small><b>{level}</b></div><em>{totalPercent}%</em></div><ProgressBar value={totalPercent} label="Progreso"/><div className="home-v3-stats"><span><b>{progress.xp}</b><small>XP</small></span><span><b>{progress.stars}</b><small>Estrellas</small></span><span><b>{progress.completedLessons.length}</b><small>Misiones</small></span></div><div className="home-v3-next"><small>SIGUIENTE</small><b>{nextLabel}</b>{reviewDue ? <button onClick={()=>onReview(reviewDue)}>Continuar</button> : recommendation.activityId ? <button onClick={()=>onActivity(recommendation.activityId)}>Continuar</button> : <button onClick={onContinue}>Continuar</button>}</div></aside>
    </section>

    <section className="mode-section">
      <div className="mode-section-head"><div><p className="eyebrow">ELIGE TU EXPERIENCIA</p><h2>¿Cómo quieres aprender hoy?</h2></div><p>Puedes cambiar entre ambas rutas cuando quieras. El progreso se guarda en este dispositivo.</p></div>
      <div className="mode-grid">
        <button className="mode-card mode-kids" onClick={onKids}>
          <div className="mode-art"><img src={`${import.meta.env.BASE_URL}hero/anime-python.jpg`} alt="Zona Infantil"/></div>
          <div className="mode-copy"><span className="mode-badge">PRIMARIA · VISUAL</span><h3>Zona Infantil</h3><p>Aprende secuencias, variables, decisiones y bucles con minijuegos, puzzles y desafíos visuales.</p><div className="mode-progress"><div><span style={{width:`${kidsPercent}%`}}/></div><small>{kidsProgress.completed.length}/36 minijuegos</small></div><b>Entrar a Zona Infantil <AppIcon name="play" size={17}/></b></div>
        </button>
        <button className="mode-card mode-python" onClick={()=>onNavigate('route')}>
          <div className="mode-art mode-code-art"><AppIcon name="code" size={62}/><code>def aprender():<br/>    practicar()<br/>    crear()</code></div>
          <div className="mode-copy"><span className="mode-badge">BÁSICO → INTERMEDIO</span><h3>Ruta Python</h3><p>Lecciones, editor real, retos, proyectos, depuración paso a paso y una ruta adaptativa.</p><div className="mode-progress"><div><span style={{width:`${totalPercent}%`}}/></div><small>{progress.completedLessons.length}/60 misiones</small></div><b>Continuar Ruta Python <AppIcon name="rocket" size={17}/></b></div>
        </button>
        <button className="mode-card mode-world" onClick={onCodeWorld}>
          <div className="mode-art mode-world-art"><div className="world-orb"><span></span><i></i></div><AppIcon name="layers" size={52}/></div>
          <div className="mode-copy"><span className="mode-badge">EXPERIENCIA 3D</span><h3>CodeWorld</h3><p>Explora un campus futurista y usa Python real para abrir puertas, activar jardines, drones, datos y el núcleo central.</p><div className="mode-progress"><div><span style={{width:`${worldPercent}%`}}/></div><small>{worldProgress.completed.length}/12 sistemas</small></div><b>Programar un mundo <AppIcon name="layers" size={17}/></b></div>
        </button>
      </div>
    </section>

    <section className="home-v3-features"><article><AppIcon name="brain" size={25}/><h3>Aprendizaje progresivo</h3><p>La ayuda disminuye a medida que el alumno gana autonomía.</p></article><article><AppIcon name="code" size={25}/><h3>Python real</h3><p>El código se ejecuta en el navegador con Pyodide.</p></article><article><AppIcon name="target" size={25}/><h3>Validación flexible</h3><p>Se evalúa el resultado y los conceptos, no una copia exacta.</p></article><article><AppIcon name="chart" size={25}/><h3>Progreso local</h3><p>Misiones, intentos, logros y proyectos quedan guardados.</p></article></section>
  </main>
}
