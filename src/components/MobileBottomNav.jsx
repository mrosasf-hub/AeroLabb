import AppIcon from './AppIcon.jsx'

const items = [
  ['home','home','Inicio'],
  ['kids','spark','Infantil'],
  ['codeworld','layers','3D'],
  ['route','map','Ruta'],
  ['progress','chart','Progreso'],
]

export default function MobileBottomNav({ screen, onNavigate }) {
  return <nav className="mobile-bottom-nav" aria-label="Navegación móvil">
    {items.map(([target, icon, label]) => <button key={target} className={screen === target ? 'active' : ''} onClick={() => onNavigate(target)}>
      <AppIcon name={icon} size={21}/><span>{label}</span>
    </button>)}
  </nav>
}
