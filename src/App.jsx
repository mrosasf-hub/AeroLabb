import { lazy, Suspense, useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import LoadingScreen from './components/LoadingScreen.jsx'
import MobileBottomNav from './components/MobileBottomNav.jsx'
import AppIcon from './components/AppIcon.jsx'
import Onboarding from './components/Onboarding.jsx'
import PlacementTest from './components/PlacementTest.jsx'
import { getActivity, getLesson, getLessonsByLevel, levels, lessons, specialActivities } from './data/course.js'
import { getKidsActivity } from './data/kidsCourse.js'
import { useProgress } from './hooks/useProgress.js'
import { useKidsProgress } from './hooks/useKidsProgress.js'
import { useCodeWorldProgress } from './hooks/useCodeWorldProgress.js'
import GlossaryPage from './pages/GlossaryPage.jsx'
import HomePage from './pages/HomePage.jsx'
import KidsHubPage from './pages/KidsHubPage.jsx'
import KidsGamePage from './pages/KidsGamePage.jsx'
import LabPage from './pages/LabPage.jsx'
import LessonPage from './pages/LessonPage.jsx'
import LevelPage from './pages/LevelPage.jsx'
import ProgressPage from './pages/ProgressPage.jsx'
import ReviewPage from './pages/ReviewPage.jsx'
import RoutePage from './pages/RoutePage.jsx'
const CodeWorldPage = lazy(() => import('./pages/CodeWorldPage.jsx'))
import { getReviewDue } from './utils/learningEngine.js'
import { warmupPython } from './services/pythonService.js'

const PROFILE_KEY = 'aeropy-v2-profile'
const PREFS_KEY = 'aeropy-v3-preferences'
const PLACEMENT_SKIP_KEY = 'aeropy-v2-placement-skipped'

export default function App() {
  const { progress, completeActivity, touchActivity, recordHint, recordAttempt, savePlacement, completeReview, resetProgress, totalPercent, evalPercent } = useProgress()
  const { kidsProgress, completeKidsActivity, recordKidsAttempt, resetKidsProgress, percent: kidsPercent } = useKidsProgress()
  const { worldProgress, completeWorldMission, touchWorldMission, resetCodeWorld, percent: worldPercent } = useCodeWorldProgress()
  const [screen, setScreen] = useState({ name: 'home' })
  const [booting, setBooting] = useState(true)
  const [profile, setProfile] = useState(() => localStorage.getItem(PROFILE_KEY))
  const [placementSkipped, setPlacementSkipped] = useState(() => localStorage.getItem(PLACEMENT_SKIP_KEY) === 'true')
  const [settings, setSettings] = useState(false)
  const [prefs, setPrefs] = useState(() => {
    try { return JSON.parse(localStorage.getItem(PREFS_KEY)) || { animations: true, largeText: false } }
    catch { return { animations: true, largeText: false } }
  })

  useEffect(() => {
    warmupPython().catch(() => {})
    const timer = setTimeout(() => setBooting(false), 1150)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('reduce-motion', !prefs.animations)
    document.documentElement.classList.toggle('large-text', prefs.largeText)
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs))
  }, [prefs])

  const scrollTop = () => window.scrollTo({ top: 0, behavior: prefs.animations ? 'smooth' : 'auto' })
  const navigate = (name) => { setScreen({ name }); scrollTop() }
  const goLevel = (levelId) => { setScreen({ name: 'level', levelId }); scrollTop() }
  const goActivity = (activityId) => { if (!getActivity(activityId)) return; setScreen({ name: 'lesson', activityId }); scrollTop() }
  const goKidsActivity = (activityId) => { if (!getKidsActivity(activityId)) return; setScreen({ name: 'kids-game', activityId }); scrollTop() }
  const openReview = (milestone = getReviewDue(progress)) => { if (milestone) setScreen({ name: 'review', milestone }); scrollTop() }

  const continueAdventure = () => {
    const due = getReviewDue(progress)
    if (due) return openReview(due)
    if (progress.lastActivityId && getActivity(progress.lastActivityId)) {
      const last = getLesson(progress.lastActivityId)
      if (!last || !progress.completedLessons.includes(last.id)) return goActivity(progress.lastActivityId)
      const list = getLessonsByLevel(last.levelId)
      const idx = list.findIndex((x) => x.id === last.id)
      if (list[idx + 1]) return goActivity(list[idx + 1].id)
    }
    const recommended = progress.placement?.recommendedLevel
    const orderedLevels = recommended ? [levels.find((x) => x.id === recommended), ...levels.filter((x) => x.id !== recommended)].filter(Boolean) : levels
    for (const level of orderedLevels) {
      const pending = getLessonsByLevel(level.id).find((x) => !progress.completedLessons.includes(x.id))
      if (pending) return goActivity(pending.id)
    }
    navigate('progress')
  }

  const selectProfile = (value) => {
    localStorage.setItem(PROFILE_KEY, value)
    setProfile(value)
    if (value === 'kids') navigate('kids')
  }
  const skipPlacement = () => { localStorage.setItem(PLACEMENT_SKIP_KEY, 'true'); setPlacementSkipped(true) }
  const finishPlacement = (result) => { savePlacement(result); localStorage.removeItem(PLACEMENT_SKIP_KEY); setPlacementSkipped(false) }
  const resetAll = () => {
    if (!confirm('¿Seguro que quieres reiniciar XP, estrellas y actividades completadas?')) return
    resetProgress(); localStorage.removeItem(PLACEMENT_SKIP_KEY); setPlacementSkipped(false); navigate('home')
  }
  const resetKids = () => {
    if (!confirm('¿Seguro que quieres reiniciar todo el progreso de la Zona Infantil?')) return
    resetKidsProgress()
  }

  const searchCourse = (query) => {
    const q = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    const all = [...lessons, ...specialActivities]
    const match = all.find((item) => {
      const text = `${item.title || ''} ${item.subtitle || ''} ${item.topic || ''} ${(item.objectives || []).join(' ')}`.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      return text.includes(q)
    })
    if (match) goActivity(match.id)
    else navigate('route')
  }

  const activeNav = ['level','lesson','review'].includes(screen.name) ? 'route' : screen.name === 'kids-game' ? 'kids' : screen.name

  return <div className="app-shell app-v3">
    <Header screen={activeNav} progress={progress} onNavigate={navigate} onSettings={() => setSettings(true)} onSearch={searchCourse} />
    {screen.name === 'home' && <HomePage progress={progress} totalPercent={totalPercent} kidsProgress={kidsProgress} kidsPercent={kidsPercent} worldProgress={worldProgress} worldPercent={worldPercent} onNavigate={navigate} onLevel={goLevel} onContinue={continueAdventure} onActivity={goActivity} onReview={openReview} onKids={() => navigate('kids')} onCodeWorld={() => navigate('codeworld')} />}
    {screen.name === 'kids' && <KidsHubPage progress={kidsProgress} percent={kidsPercent} onActivity={goKidsActivity} onPythonRoute={() => navigate('route')} onReset={resetKids} />}
    {screen.name === 'kids-game' && <KidsGamePage activityId={screen.activityId} progress={kidsProgress} onBack={() => navigate('kids')} onComplete={completeKidsActivity} onAttempt={recordKidsAttempt} onNext={goKidsActivity} onPythonRoute={() => navigate('route')} />}
    {screen.name === 'route' && <RoutePage progress={progress} totalPercent={totalPercent} onActivity={goActivity} onReview={openReview} />}
    {screen.name === 'level' && <LevelPage levelId={screen.levelId} progress={progress} onBack={() => navigate('route')} onActivity={goActivity} />}
    {screen.name === 'lesson' && <LessonPage activityId={screen.activityId} progress={progress} onBack={() => navigate('route')} onComplete={completeActivity} onNext={goActivity} onTouch={touchActivity} onHint={recordHint} onAttempt={recordAttempt} />}
    {screen.name === 'lab' && <LabPage />}
    {screen.name === 'glossary' && <GlossaryPage />}
    {screen.name === 'review' && <ReviewPage milestone={screen.milestone} onComplete={(milestone, score) => { completeReview(milestone, score); navigate('route') }} onBack={() => navigate('route')} />}
    {screen.name === 'progress' && <ProgressPage progress={progress} totalPercent={totalPercent} evalPercent={evalPercent} onContinue={continueAdventure} onReset={resetAll} />}
    {screen.name === 'codeworld' && <Suspense fallback={<main className="codeworld-loading"><div><AppIcon name="layers" size={42}/><h2>Cargando CodeWorld 3D…</h2><p>Preparando el campus interactivo.</p></div></main>}><CodeWorldPage progress={worldProgress} percent={worldPercent} onComplete={completeWorldMission} onTouch={touchWorldMission} onBack={() => navigate('home')} onReset={resetCodeWorld} /></Suspense>}

    <MobileBottomNav screen={activeNav} onNavigate={navigate} />
    {!profile && <Onboarding onSelect={selectProfile} />}
    {profile && profile !== 'kids' && !progress.placement && !placementSkipped && <PlacementTest onComplete={finishPlacement} onSkip={skipPlacement} />}
    {settings && <div className="modal-backdrop"><section className="settings-card"><button className="modal-close" onClick={() => setSettings(false)}>×</button><p className="eyebrow">PREFERENCIAS</p><h2><AppIcon name="settings" size={24}/> Configuración</h2><label><span><AppIcon name="spark" size={18}/> Animaciones</span><input type="checkbox" checked={prefs.animations} onChange={(e)=>setPrefs({...prefs,animations:e.target.checked})}/></label><label><span><AppIcon name="info" size={18}/> Texto más grande</span><input type="checkbox" checked={prefs.largeText} onChange={(e)=>setPrefs({...prefs,largeText:e.target.checked})}/></label><div className="settings-profile"><b>Experiencia inicial</b><div>{[['kids','Zona Infantil'],['starter','Empezando'],['some','Conozco un poco'],['challenge','Quiero desafío']].map(([id,label])=><button className={profile===id?'active':''} onClick={()=>selectProfile(id)} key={id}>{label}</button>)}</div></div>{profile !== 'kids' && <button className="btn btn-secondary settings-placement" onClick={() => { setPlacementSkipped(false); localStorage.removeItem(PLACEMENT_SKIP_KEY); savePlacement(null); setSettings(false) }}><AppIcon name="map" size={18}/> Repetir prueba de inicio</button>}<p className="settings-note">La plataforma no requiere cuenta. Tus preferencias, progreso, intentos y proyectos se almacenan en este navegador.</p></section></div>}
    <LoadingScreen visible={booting} />
  </div>
}
