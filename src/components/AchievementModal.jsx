import AppIcon from './AppIcon.jsx'

const copy = {
  mission: { eyebrow: 'MISIÓN SUPERADA', title: '¡Lo lograste!', icon: 'check' },
  block: { eyebrow: 'BLOQUE SUPERADO', title: '¡Bloque completado!', icon: 'trophy' },
  level: { eyebrow: 'NIVEL SUPERADO', title: '¡Nivel completado!', icon: 'trophy' },
  project: { eyebrow: 'PROYECTO COMPLETADO', title: '¡Proyecto terminado!', icon: 'spark' },
}

export default function AchievementModal({ achievement, onClose, onContinue }) {
  if (!achievement) return null
  const ui = copy[achievement.type] ?? copy.mission
  return <div className="achievement-backdrop" role="dialog" aria-modal="true" aria-label={ui.title}>
    <section className={`achievement-modal achievement-${achievement.type}`}>
      <div className="achievement-glow" />
      <div className="achievement-anime"><img src={`${import.meta.env.BASE_URL}hero/anime-python.jpg`} alt="Personaje celebrando el aprendizaje de Python" /></div>
      <div className="achievement-content">
        <span className="achievement-mark"><AppIcon name={ui.icon} size={30}/></span>
        <p className="eyebrow">{ui.eyebrow}</p>
        <h2>{ui.title}</h2>
        <p>{achievement.message}</p>
        <div className="achievement-rewards">
          <span><AppIcon name="bolt" size={20}/><b>+{achievement.xp}</b><small>XP</small></span>
          <span><AppIcon name="star" size={20}/><b>+{achievement.stars}</b><small>Estrellas</small></span>
        </div>
        {achievement.type === 'level' && <div className="achievement-level-note">Tu siguiente ruta ya está disponible. Puedes continuar o revisar lo aprendido antes de avanzar.</div>}
        <div className="achievement-actions">
          <button className="btn btn-secondary" onClick={onClose}>Quedarme aquí</button>
          {onContinue && <button className="btn btn-primary" onClick={onContinue}>Continuar <span>→</span></button>}
        </div>
      </div>
    </section>
  </div>
}
