import { useEffect, useMemo, useState } from 'react'
import AppIcon from '../components/AppIcon.jsx'
import { getKidsActivity, getKidsWorld, getNextKidsActivity } from '../data/kidsCourse.js'

const same = (a,b) => JSON.stringify(a) === JSON.stringify(b)
const dirs = { up:[-1,0], down:[1,0], left:[0,-1], right:[0,1] }
const dirLabel = { up:'Arriba',down:'Abajo',left:'Izquierda',right:'Derecha' }

function Success({ activity, isFinal, onContinue, onStay, onPythonRoute }) {
  return <div className="kids-success-backdrop"><section className="kids-success-card">
    <div className="kids-success-art"><img src={`${import.meta.env.BASE_URL}hero/anime-python.jpg`} alt="Personaje celebrando el logro" /></div>
    <div className="kids-success-copy"><p>{isFinal ? 'ZONA INFANTIL COMPLETADA' : 'MINIJUEGO SUPERADO'}</p><h2>{isFinal ? 'Ya estás listo para programar' : '¡Lo lograste!'}</h2><span>{activity.explanation}</span>
      <div className="kids-reward-row"><div><AppIcon name="bolt" size={21}/><b>+{activity.xp}</b><small>puntos</small></div><div><AppIcon name="star" size={21}/><b>+{activity.stars}</b><small>estrellas</small></div></div>
      <div className="kids-success-actions"><button className="kids-secondary" onClick={onStay}>Revisar</button>{isFinal ? <button className="kids-primary" onClick={onPythonRoute}><AppIcon name="rocket" size={18}/> Entrar a Explorador</button> : <button className="kids-primary" onClick={onContinue}>Continuar <AppIcon name="play" size={18}/></button>}</div>
    </div>
  </section></div>
}

export default function KidsGamePage({ activityId, progress, onBack, onComplete, onAttempt, onNext, onPythonRoute }) {
  const activity = getKidsActivity(activityId)
  const world = getKidsWorld(activity?.worldId)
  const next = getNextKidsActivity(activityId)
  const [selected, setSelected] = useState(null)
  const [ordered, setOrdered] = useState([])
  const [feedback, setFeedback] = useState(null)
  const [position, setPosition] = useState(activity?.grid?.start ?? [0,0])
  const [moves, setMoves] = useState([])
  const [bossStage, setBossStage] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)
  const completed = progress.completed.includes(activityId)

  useEffect(() => {
    setSelected(null); setOrdered([]); setFeedback(null); setMoves([]); setBossStage(0); setShowSuccess(false)
    setPosition(activity?.grid?.start ?? [0,0])
  }, [activityId])

  const worldIndex = useMemo(() => ['ordenes','variables','decisiones','bucles'].indexOf(activity?.worldId), [activity?.worldId])
  if (!activity || !world) return null

  const succeed = () => {
    if (!completed) onComplete(activity)
    setFeedback({ ok:true, text:activity.explanation })
    setShowSuccess(true)
  }
  const fail = (text='Casi. Observa la pista visual e inténtalo otra vez.') => { onAttempt(activity.id); setFeedback({ok:false,text}) }

  const checkBasic = () => {
    if (activity.type === 'choice' || activity.type === 'predict' || activity.type === 'bug') return selected === activity.correct ? succeed() : fail()
    if (activity.type === 'fill') return selected === activity.correct ? succeed() : fail('Esa pieza todavía no completa correctamente el código.')
    if (activity.type === 'order') return same(ordered, activity.answer) ? succeed() : fail('El orden aún no representa la secuencia correcta.')
    if (activity.type === 'sequence') return same(position, activity.grid.goal) ? succeed() : fail('Todavía no llegas a la meta. Puedes reiniciar la ruta y probar otra secuencia.')
  }

  const move = (direction) => {
    if (moves.length >= activity.maxMoves) return
    const [dr,dc] = dirs[direction]
    const nextPos = [position[0]+dr, position[1]+dc]
    const blocked = activity.grid.blocks.some((b) => same(b,nextPos))
    const outside = nextPos[0] < 0 || nextPos[0] >= activity.grid.rows || nextPos[1] < 0 || nextPos[1] >= activity.grid.cols
    if (blocked || outside) { setFeedback({ok:false,text:'Ese movimiento no es posible. Busca otro camino.'}); return }
    setPosition(nextPos); setMoves((m)=>[...m,direction]); setFeedback(null)
  }

  const chooseBoss = (index) => {
    const stage = activity.stages[bossStage]
    if (index !== stage.correct) return fail('Esa respuesta no abre el siguiente paso. Observa el concepto y vuelve a intentarlo.')
    if (bossStage === activity.stages.length - 1) succeed()
    else { setBossStage((s)=>s+1); setFeedback({ok:true,text:'Paso correcto. Continúa con el siguiente desafío.'}) }
  }

  const resetGame = () => { setSelected(null); setOrdered([]); setFeedback(null); setMoves([]); setBossStage(0); setPosition(activity.grid?.start ?? [0,0]) }
  const speak = () => {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(`${activity.title}. ${activity.prompt}`)
    utterance.lang = 'es-MX'
    utterance.rate = .92
    window.speechSynthesis.speak(utterance)
  }
  const isFinal = activity.id === 'kid-36'

  return <main className={`kids-game-page kids-theme-${world.accent}`}>
    <div className="kids-game-shell">
      <header className="kids-game-header">
        <button onClick={onBack}><AppIcon name="map" size={18}/> Mundos</button>
        <div><small>MUNDO {worldIndex+1}</small><b>{world.title}</b></div>
        <span>{activity.order}/9</span>
      </header>
      <div className="kids-game-progress"><span style={{width:`${activity.order/9*100}%`}}/></div>

      <section className="kids-game-intro">
        <div><p>MINIJUEGO {activity.order}</p><h1>{activity.title}</h1><span>{activity.prompt}</span></div>
        <aside><img src={`${import.meta.env.BASE_URL}hero/anime-python.jpg`} alt="Guía visual de AeroLab"/><div><p>{feedback?.text ?? 'Observa, prueba y aprende. Puedes volver a intentarlo todas las veces que quieras.'}</p><button className="kids-listen" onClick={speak}><AppIcon name="headphones" size={15}/> Escuchar instrucción</button></div></aside>
      </section>

      <section className="kids-game-board">
        {(activity.type === 'choice' || activity.type === 'predict' || activity.type === 'bug') && <div className="kids-quiz-game">
          {activity.code && <pre><code>{activity.code}</code></pre>}
          <div className="kids-option-grid">{activity.options.map((option,index)=><button key={option} className={selected===index?'selected':''} onClick={()=>setSelected(index)}><span>{String.fromCharCode(65+index)}</span><b>{option}</b></button>)}</div>
        </div>}

        {activity.type === 'fill' && <div className="kids-fill-game"><div className="kids-code-builder"><code>{activity.before}</code><span className={selected ? 'filled':''}>{selected ?? 'elige una pieza'}</span><code>{activity.after}</code></div><div className="kids-chip-row">{activity.choices.map(choice=><button key={choice} className={selected===choice?'selected':''} onClick={()=>setSelected(choice)}>{choice}</button>)}</div></div>}

        {activity.type === 'order' && <div className="kids-order-game"><div className="kids-order-target">{ordered.length ? ordered.map((token,index)=><button key={`${token}-${index}`} onClick={()=>setOrdered((list)=>list.filter((_,i)=>i!==index))}><span>{index+1}</span><code>{token}</code></button>) : <p>Toca las piezas en el orden correcto.</p>}</div><div className="kids-chip-row">{activity.tokens.filter((token)=>!ordered.includes(token)).map(token=><button key={token} onClick={()=>setOrdered((list)=>[...list,token])}><code>{token}</code></button>)}</div>{activity.code && <div className="kids-python-preview"><small>Cuando lo logres se verá así en Python</small><pre>{activity.code}</pre></div>}</div>}

        {activity.type === 'sequence' && <div className="kids-sequence-game"><div className="kids-grid" style={{gridTemplateColumns:`repeat(${activity.grid.cols},1fr)`}}>{Array.from({length:activity.grid.rows*activity.grid.cols},(_,i)=>{const cell=[Math.floor(i/activity.grid.cols),i%activity.grid.cols]; const blocked=activity.grid.blocks.some((b)=>same(b,cell)); const here=same(position,cell); const goal=same(activity.grid.goal,cell); return <div key={i} className={`${blocked?'blocked':''} ${goal?'goal':''} ${here?'here':''}`}>{here?<span className="kid-player"><AppIcon name="rocket" size={24}/></span>:goal?<span><AppIcon name="star" size={22}/></span>:blocked?<span className="kid-block"/>:null}</div>})}</div><div className="kids-controls"><button onClick={()=>move('up')}>↑<small>Arriba</small></button><div><button onClick={()=>move('left')}>←<small>Izquierda</small></button><button onClick={()=>move('down')}>↓<small>Abajo</small></button><button onClick={()=>move('right')}>→<small>Derecha</small></button></div></div><div className="kids-move-list">{moves.map((move,index)=><span key={`${move}-${index}`}>{index+1}. {dirLabel[move]}</span>)}<small>{moves.length}/{activity.maxMoves} movimientos</small></div></div>}

        {activity.type === 'boss' && <div className="kids-boss-game"><div className="kids-boss-stage"><span>DESAFÍO {bossStage+1} DE {activity.stages.length}</span><h2>{activity.stages[bossStage].prompt}</h2></div><div className="kids-option-grid">{activity.stages[bossStage].options.map((option,index)=><button key={option} onClick={()=>chooseBoss(index)}><span>{index+1}</span><b>{option}</b></button>)}</div></div>}
      </section>

      <footer className="kids-game-actions"><button className="kids-secondary" onClick={resetGame}><AppIcon name="reset" size={18}/> Reiniciar</button>{activity.type !== 'boss' && <button className="kids-primary" onClick={checkBasic}>Comprobar <AppIcon name="check" size={18}/></button>}</footer>
    </div>
    {showSuccess && <Success activity={activity} isFinal={isFinal} onStay={()=>setShowSuccess(false)} onContinue={()=>{setShowSuccess(false); next ? onNext(next.id) : onBack()}} onPythonRoute={onPythonRoute}/>} 
  </main>
}
