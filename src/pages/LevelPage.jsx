import ProgressBar from '../components/ProgressBar.jsx'
import AppIcon from '../components/AppIcon.jsx'
import { getLessonsByLevel, getSpecialsByLevel, levels } from '../data/course.js'

const prefixFor = (id) => id === 'explorador' ? 'exp' : id === 'creador' ? 'cre' : 'dev'
const levelIcon = (id) => id === 'explorador' ? 'rocket' : id === 'creador' ? 'spark' : 'code'

export default function LevelPage({ levelId, progress, onBack, onActivity }) {
  const level = levels.find((x) => x.id === levelId)
  const missions = getLessonsByLevel(levelId)
  const specials = getSpecialsByLevel(levelId)
  const completed = missions.filter((x) => progress.completedLessons.includes(x.id)).length
  const prefix = prefixFor(levelId)
  if (!level) return null
  const unlockedMission = (lesson, idx) => { if (idx === 0) return true; if (lesson.order === 8) return progress.completedSpecials.includes(`${prefix}-s1`); if (lesson.order === 15) return progress.completedSpecials.includes(`${prefix}-s2`); return progress.completedLessons.includes(missions[idx-1].id) }
  const blockDone = (bossOrder) => { const range = bossOrder === 1 ? [1,7] : bossOrder === 2 ? [8,14] : [15,20]; return missions.filter((x) => x.order >= range[0] && x.order <= range[1]).every((x) => progress.completedLessons.includes(x.id)) }
  return <main className="section-pad level-page level-page-v25 grid-stars">
    <button className="back-btn" onClick={onBack}>← Volver</button>
    <section className={`level-banner level-${level.accent}`}><div className="level-planet huge"><AppIcon name={levelIcon(level.id)} size={50}/></div><div><span className="pill">{level.badge}</span><h1>{level.name}</h1><p>{level.description}</p><ProgressBar value={Math.round(completed/20*100)} label={`${completed} de 20 misiones`} /></div><img className="level-anime" src={`${import.meta.env.BASE_URL}hero/anime-python.jpg`} alt="Estudiante aprendiendo Python"/></section>
    <div className="block-explainer"><div><b>Bloque 1</b><span>Misiones 1–7</span></div><span>→ Jefe 1 →</span><div><b>Bloque 2</b><span>Misiones 8–14</span></div><span>→ Jefe 2 →</span><div><b>Bloque 3</b><span>Misiones 15–20</span></div><span>→ Jefe 3</span></div>
    <div className="lesson-list">{missions.map((lesson, idx) => { const done = progress.completedLessons.includes(lesson.id); const unlocked = unlockedMission(lesson, idx); return <button className={`lesson-list-card ${done ? 'done' : ''}`} disabled={!unlocked} onClick={() => onActivity(lesson.id)} key={lesson.id}><span className="lesson-num">{done ? <AppIcon name="check" size={18}/> : unlocked ? lesson.order : <AppIcon name="lock" size={18}/>}</span><span className="lesson-icon"><AppIcon name="code" size={22}/></span><div><small>{lesson.activityType.toUpperCase()} · {lesson.duration}</small><b>{lesson.title}</b><p>{lesson.summary}</p></div><span className="lesson-reward">+{lesson.xp} XP · {lesson.stars} estrella{lesson.stars === 1 ? '' : 's'}</span><em>→</em></button> })}</div>
    <section className="special-panel"><div><p className="eyebrow">JEFES Y PROYECTOS</p><h2>Demuestra lo que aprendiste</h2><p>Los tres primeros retos son Jefes de bloque. Después se abren proyectos guiados y el proyecto final.</p></div><div className="special-grid">{specials.map((item) => { const isBoss = item.order <= 3; const unlocked = isBoss ? blockDone(item.order) : progress.completedSpecials.includes(`${prefix}-s3`) && (item.order === 4 || progress.completedSpecials.includes(`${prefix}-s${item.order - 1}`)); return <button key={item.id} disabled={!unlocked} onClick={() => onActivity(item.id)}><span><AppIcon name={isBoss ? 'boss' : 'code'} size={24}/></span><b>{isBoss ? `Jefe ${item.order}: ${item.title.replace(/^Reto \d+:\s*/, '')}` : item.title}</b><small>+{item.xp} XP · {item.stars} estrella{item.stars === 1 ? '' : 's'}</small></button> })}</div></section>
  </main>
}
