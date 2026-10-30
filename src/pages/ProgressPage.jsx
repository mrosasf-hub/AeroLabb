import Mascot from '../components/Mascot.jsx'
import ProgressBar from '../components/ProgressBar.jsx'
import AppIcon from '../components/AppIcon.jsx'
import { achievements, getLessonsByLevel, levels } from '../data/course.js'

function achieved(item, stats) { const [key, raw] = item.test.split('>='); return (stats[key] ?? 0) >= Number(raw) }
function streakFromDays(days = []) { const set = new Set(days); let streak = 0; const d = new Date(); for (let i=0;i<45;i+=1){const key=d.toISOString().slice(0,10);if(set.has(key)) streak+=1;else if(i>0)break;d.setDate(d.getDate()-1)} return Math.max(streak, days.length ? 1 : 0) }

export default function ProgressPage({ progress, totalPercent, evalPercent, onContinue, onReset }) {
  const counts = Object.fromEntries(levels.map((level) => [level.id, getLessonsByLevel(level.id).filter((x) => progress.completedLessons.includes(x.id)).length]))
  const stats = { lessons: progress.completedLessons.length, specials: progress.completedSpecials.length, xp: progress.xp, ...counts }
  const streak = streakFromDays(progress.activeDays)
  const unlocked = achievements.filter((a) => achieved(a, stats))
  const levelIcon = (id) => id === 'explorador' ? 'rocket' : id === 'creador' ? 'spark' : 'code'
  return <main className="section-pad progress-page grid-stars">
    <section className="progress-hero"><div><p className="eyebrow">TU AVENTURA CONTINÚA</p><h1>Tu <span>progreso</span></h1><p>Mira todo lo que has aprendido. Cada misión te acerca a crear programas por tu cuenta.</p></div><Mascot compact message="Has logrado grandes avances. Sigue construyendo tu ruta." /><aside className="summary-card glass"><div className="donut" style={{'--pct':`${evalPercent*3.6}deg`}}><div><b>{evalPercent}%</b><small>Completado</small></div></div><div className="summary-stats"><span><AppIcon name="bolt"/><b>{progress.xp}</b><small>XP</small></span><span><AppIcon name="star"/><b>{progress.stars}</b><small>Estrellas</small></span><span><AppIcon name="flag"/><b>{progress.completedLessons.length}</b><small>Misiones</small></span><span><AppIcon name="trophy"/><b>{progress.completedSpecials.length}</b><small>Especiales</small></span></div></aside></section>
    <section className="progress-block glass"><div className="section-heading"><div><p className="eyebrow">RUTAS</p><h2>Tu avance por niveles</h2></div><span className="counter-badge">60 misiones totales</span></div><div className="progress-routes">{levels.map((level) => <article key={level.id} className={`route-progress-card level-${level.accent}`}><span className="route-big-icon"><AppIcon name={levelIcon(level.id)} size={38}/></span><div><h3>{level.name}</h3><p>{counts[level.id]} de 20 misiones</p><ProgressBar value={Math.round(counts[level.id]/20*100)} /><small>{level.subtitle}</small></div></article>)}</div></section>
    <div className="progress-two-col">
      <section className="progress-block glass"><div className="section-heading"><div><p className="eyebrow">LOGROS</p><h2>Tus insignias</h2></div><span>{unlocked.length}/{achievements.length}</span></div><div className="badge-grid">{achievements.map((badge) => {const ok=achieved(badge,stats); return <article className={ok?'unlocked':'locked'} key={badge.id}><div><AppIcon name={ok?'trophy':'lock'} size={30}/></div><b>{badge.name}</b><p>{badge.description}</p></article>})}</div></section>
      <section className="progress-side-stack"><article className="glass streak-card"><div className="section-heading"><div><p className="eyebrow">CONSTANCIA</p><h2>Racha de aprendizaje</h2></div><b>{streak} días</b></div><div className="week-row">{['L','M','M','J','V','S','D'].map((d,i)=><span className={i < Math.min(7,streak)?'active':''} key={i}>{i < Math.min(7,streak)?'•':d}</span>)}</div><p>La racha es motivacional y no bloquea contenido.</p></article><article className="glass next-card"><span><AppIcon name="map" size={34}/></span><div><p className="eyebrow">¿QUÉ SIGUE?</p><h2>Continúa tu aventura</h2><p>Retoma la última misión o avanza al siguiente destino disponible.</p><button className="btn btn-primary" onClick={onContinue}>Continuar →</button></div></article><button className="reset-link" onClick={onReset}>Reiniciar progreso</button></section>
    </div>
  </main>
}
