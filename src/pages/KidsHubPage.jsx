import AppIcon from '../components/AppIcon.jsx'
import ProgressBar from '../components/ProgressBar.jsx'
import { kidsWorlds } from '../data/kidsCourse.js'

const worldIcon = { ordenes:'play', variables:'folder', decisiones:'map', bucles:'reset' }

export default function KidsHubPage({ progress, percent, onActivity, onPythonRoute, onReset }) {
  const completedSet = new Set(progress.completed)
  const nextActivity = kidsWorlds.flatMap((w) => w.activities).find((a) => !completedSet.has(a.id))
  return <main className="kids-page">
    <section className="kids-hero">
      <div className="kids-hero-copy">
        <p className="kids-kicker">ZONA INFANTIL · APRENDER JUGANDO</p>
        <h1>Descubre Python<br/><span>con minijuegos</span></h1>
        <p>Una ruta visual para aprender secuencias, variables, decisiones y repeticiones antes de escribir programas completos.</p>
        <div className="kids-hero-actions">
          <button className="kids-primary" onClick={() => nextActivity && onActivity(nextActivity.id)}><AppIcon name="play" size={20}/> {progress.completed.length ? 'Continuar jugando' : 'Comenzar aventura'}</button>
          <button className="kids-secondary" onClick={onPythonRoute}><AppIcon name="code" size={20}/> Ir a Ruta Python</button>
        </div>
        <div className="kids-stats-inline">
          <span><b>{progress.completed.length}</b><small>de 36 juegos</small></span>
          <span><b>{progress.stars}</b><small>estrellas</small></span>
          <span><b>{progress.xp}</b><small>puntos</small></span>
        </div>
      </div>
      <div className="kids-hero-art" aria-hidden="true">
        <div className="kids-anime-frame"><img src={`${import.meta.env.BASE_URL}hero/anime-python.jpg`} alt="" /></div>
        <div className="kids-code-card"><code>print("¡Hola!")</code><span>Tu primera instrucción</span></div>
      </div>
      <aside className="kids-progress-card">
        <div><span className="kids-progress-icon"><AppIcon name="star" size={24}/></span><div><small>Tu aventura</small><b>{percent}% completado</b></div></div>
        <ProgressBar value={percent} label="Progreso infantil" />
        <p>{percent === 100 ? 'Ya estás listo para entrar a Explorador.' : 'Cada mundo desbloquea una idea nueva de programación.'}</p>
      </aside>
    </section>

    <section className="kids-worlds-section">
      <div className="kids-section-heading"><div><p>4 MUNDOS · 36 MINIJUEGOS</p><h2>Tu mapa de aprendizaje</h2></div><span>Primero entiendes la idea. Después descubres cómo se escribe en Python.</span></div>
      <div className="kids-world-grid">
        {kidsWorlds.map((world, worldIndex) => {
          const done = world.activities.filter((a) => completedSet.has(a.id)).length
          const unlocked = worldIndex === 0 || kidsWorlds[worldIndex - 1].activities.every((a) => completedSet.has(a.id))
          const firstPending = world.activities.find((a) => !completedSet.has(a.id)) ?? world.activities[0]
          return <article className={`kids-world-card kids-${world.accent} ${!unlocked ? 'locked' : ''}`} key={world.id}>
            <div className="kids-world-top"><span><AppIcon name={worldIcon[world.id]} size={27}/></span><small>MUNDO {worldIndex + 1}</small></div>
            <h3>{world.title}</h3><p>{world.subtitle}</p>
            <div className="kids-world-concept">{world.concept}</div>
            <div className="kids-world-progress"><div><span style={{width:`${Math.round(done / world.activities.length * 100)}%`}}/></div><b>{done}/{world.activities.length}</b></div>
            <div className="kids-world-dots">{world.activities.map((a) => <span key={a.id} className={completedSet.has(a.id) ? 'done' : a.id === firstPending.id && unlocked ? 'current' : ''}/>)}</div>
            <button disabled={!unlocked} onClick={() => onActivity(firstPending.id)}>{unlocked ? (done === world.activities.length ? 'Volver a jugar' : 'Entrar al mundo') : 'Completa el mundo anterior'} <AppIcon name={unlocked ? 'play' : 'lock'} size={17}/></button>
          </article>
        })}
      </div>
    </section>

    <section className="kids-method-section">
      <div><AppIcon name="grid" size={26}/><h3>Juega</h3><p>Ordena, elige, completa y guía personajes.</p></div>
      <div><AppIcon name="brain" size={26}/><h3>Entiende</h3><p>Descubre qué idea de programación acabas de usar.</p></div>
      <div><AppIcon name="code" size={26}/><h3>Conecta con Python</h3><p>La misma idea aparece después escrita como código real.</p></div>
      <div><AppIcon name="rocket" size={26}/><h3>Da el salto</h3><p>Al terminar, continúa en Explorador con una base sólida.</p></div>
    </section>

    <div className="kids-footer-actions"><button className="text-button" onClick={onReset}>Reiniciar progreso infantil</button></div>
  </main>
}
