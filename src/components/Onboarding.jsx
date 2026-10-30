import AppIcon from './AppIcon.jsx'

const OPTIONS = [
  { id: 'kids', icon: 'spark', title: 'Quiero aprender jugando', text: 'Zona Infantil con minijuegos visuales y muy poco teclado al principio.', featured: true },
  { id: 'starter', icon: 'book', title: 'Estoy empezando Python', text: 'Nunca he programado. Quiero ir paso a paso.' },
  { id: 'some', icon: 'rocket', title: 'Ya conozco un poco', text: 'He visto variables, decisiones o bloques.' },
  { id: 'challenge', icon: 'bolt', title: 'Quiero un desafío', text: 'Ya he escrito algunos programas.' },
]

export default function Onboarding({ onSelect }) {
  return <div className="modal-backdrop"><section className="onboarding-card onboarding-anime onboarding-v3"><div className="onboarding-visual"><img src={`${import.meta.env.BASE_URL}hero/anime-python.jpg`} alt="Estudiante aprendiendo Python" /></div><div className="onboarding-copy"><p className="eyebrow">BIENVENIDO A AEROLAB CENTER</p><h1>Elige cómo quieres comenzar</h1><p>No necesitas una cuenta. Puedes cambiar de experiencia después y todo se guarda en este dispositivo.</p><div className="onboarding-options">{OPTIONS.map((option) => <button className={option.featured ? 'featured' : ''} key={option.id} onClick={() => onSelect(option.id)}><span><AppIcon name={option.icon} size={22}/></span><div><b>{option.title}</b><small>{option.text}</small></div><em>→</em></button>)}</div></div></section></div>
}
