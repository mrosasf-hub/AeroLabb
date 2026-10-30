import Mascot from '../components/Mascot.jsx'
import ProgressBar from '../components/ProgressBar.jsx'
import AppIcon from '../components/AppIcon.jsx'
import { getActivity, getLessonsByLevel, getSpecialsByLevel, levels } from '../data/course.js'
import { canAccessLevel, getAdaptiveRecommendation, getReviewDue } from '../utils/learningEngine.js'

const levelPrefix = (id) => id === 'explorador' ? 'exp' : id === 'creador' ? 'cre' : 'dev'
const levelIcon = (id) => id === 'explorador' ? 'rocket' : id === 'creador' ? 'spark' : 'code'

function MissionNode({ lesson, state, onOpen }) {
  const icon = state === 'done' ? 'check' : state === 'locked' ? 'lock' : 'code'
  return <button className={`mission-node ${state}`} onClick={onOpen} disabled={state === 'locked'} title={lesson.title}>
    <span className="node-icon"><AppIcon name={icon} size={18}/></span>
    <small>{lesson.order}</small><b>{lesson.title}</b>
  </button>
}

function isBlockOpen(levelId, order, progress, levelAccessible, items) {
  if (!levelAccessible) return false
  if (order === 1) return true
  const prefix = levelPrefix(levelId)
  if (order === 8) return progress.completedSpecials.includes(`${prefix}-s1`)
  if (order === 15) return progress.completedSpecials.includes(`${prefix}-s2`)
  const previous = items.find((item) => item.order === order - 1)
  return previous ? progress.completedLessons.includes(previous.id) : false
}

export default function RoutePage({ progress, totalPercent, onActivity, onReview }) {
  const reviewDue = getReviewDue(progress)
  const adaptive = getAdaptiveRecommendation(progress, getActivity)
  return <main className="section-pad route-page route-page-v25 grid-stars">
    <section className="route-hero route-hero-v25">
      <div><p className="eyebrow">MAPA DE APRENDIZAJE</p><h1>Tu ruta de <span>aprendizaje</span></h1><p>Completa misiones, supera los jefes de cada bloque y desbloquea nuevos destinos. Las recomendaciones se ajustan a tu progreso.</p></div>
      <Mascot compact message="Al final de cada bloque encontrarás un desafío que combina lo aprendido." />
      <div className="route-stats"><div><span><AppIcon name="bolt"/></span><b>{progress.xp}</b><small>XP</small></div><div><span><AppIcon name="star"/></span><b>{progress.stars}</b><small>Estrellas</small></div><div><span><AppIcon name="chart"/></span><b>{totalPercent}%</b><small>Progreso</small></div></div>
    </section>

    <section className="route-recommendation glass"><div><span><AppIcon name={reviewDue ? 'map' : 'spark'} size={28}/></span><div><p className="eyebrow">RECOMENDACIÓN ADAPTATIVA</p><h3>{reviewDue ? `Revisión de vuelo después de ${reviewDue} misiones` : adaptive.title}</h3><p>{reviewDue ? 'Mezcla conceptos anteriores antes de continuar para fortalecer lo aprendido.' : adaptive.message}</p></div></div>{reviewDue ? <button className="btn btn-primary" onClick={() => onReview(reviewDue)}>Hacer revisión →</button> : adaptive.activityId ? <button className="btn btn-secondary" onClick={() => onActivity(adaptive.activityId)}>Practicar →</button> : null}</section>

    <div className="route-zones">
      {levels.map((level, levelIndex) => {
        const items = getLessonsByLevel(level.id)
        const completed = items.filter((item) => progress.completedLessons.includes(item.id)).length
        const prefix = levelPrefix(level.id)
        const prevLevel = levels[levelIndex - 1]
        const previousComplete = levelIndex === 0 || (getLessonsByLevel(prevLevel.id).every((x) => progress.completedLessons.includes(x.id)) && progress.completedSpecials.includes(`${levelPrefix(prevLevel.id)}-s3`))
        const levelAccessible = canAccessLevel(level.id, progress.placement, previousComplete)
        const specials = getSpecialsByLevel(level.id)
        const block1Done = items.filter((x) => x.order <= 7).every((x) => progress.completedLessons.includes(x.id))
        const block2Done = items.filter((x) => x.order >= 8 && x.order <= 14).every((x) => progress.completedLessons.includes(x.id))
        const block3Done = items.filter((x) => x.order >= 15).every((x) => progress.completedLessons.includes(x.id))
        const bossUnlock = { 1: block1Done, 2: block2Done, 3: block3Done }
        return <section key={level.id} className={`route-zone zone-${level.accent}`}>
          <div className="zone-head"><div className="zone-icon"><AppIcon name={levelIcon(level.id)} size={34}/></div><div><span className="pill">{level.badge}</span><h2>{level.name}</h2><p>{level.description}</p></div><div className="zone-progress"><b>{completed}/20</b><ProgressBar value={Math.round(completed/20*100)} /></div></div>
          {!levelAccessible && <div className="zone-lock"><AppIcon name="lock" size={18}/> Completa el nivel anterior o alcanza esta ruta en la prueba inicial para abrir esta zona.</div>}
          {progress.placement?.recommendedLevel === level.id && <div className="placement-route-note"><AppIcon name="map" size={18}/> La prueba inicial recomienda comenzar aquí. Puedes volver a los niveles anteriores cuando quieras.</div>}
          <div className="block-labels"><span>Bloque 1 · Fundamentos</span><span>Bloque 2 · Aplicación</span><span>Bloque 3 · Integración</span></div>
          <div className="mission-path">{items.map((lesson) => { const done = progress.completedLessons.includes(lesson.id); const unlocked = isBlockOpen(level.id, lesson.order, progress, levelAccessible, items); const state = done ? 'done' : unlocked ? 'current' : 'locked'; return <MissionNode key={lesson.id} lesson={lesson} state={state} onOpen={() => onActivity(lesson.id)} /> })}</div>
          <div className="boss-row">{[1,2,3].map((bossOrder) => { const boss = specials.find((item) => item.order === bossOrder); if (!boss) return null; const unlocked = levelAccessible && bossUnlock[bossOrder]; const done = progress.completedSpecials.includes(boss.id); return <button key={boss.id} className={`boss-card ${done ? 'done' : ''}`} disabled={!unlocked} onClick={() => onActivity(boss.id)}><span><AppIcon name={done ? 'check' : unlocked ? 'boss' : 'lock'} size={24}/></span><div><small>JEFE DEL BLOQUE {bossOrder}</small><b>{boss.title.replace(/^Reto \d+:\s*/, '')}</b><em>{done ? 'Superado' : unlocked ? 'Listo para enfrentar' : 'Completa el bloque'}</em></div></button> })}</div>
          <div className="special-row"><div><b>Proyectos y desafío avanzado</b><small>1 reto extra · 2 mini‑proyectos · 1 proyecto final</small></div><div className="special-buttons">{specials.filter((item) => item.order >= 4).map((item) => { const unlocked = levelAccessible && progress.completedSpecials.includes(`${prefix}-s3`) && (item.order === 4 || progress.completedSpecials.includes(`${prefix}-s${item.order - 1}`)); const done = progress.completedSpecials.includes(item.id); return <button key={item.id} disabled={!unlocked} className={done ? 'done' : ''} onClick={() => onActivity(item.id)}><span><AppIcon name={done ? 'check' : unlocked ? 'code' : 'lock'} size={18}/></span>{item.title}</button> })}</div></div>
        </section>
      })}
    </div>
  </main>
}
