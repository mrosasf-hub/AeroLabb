import { useEffect, useRef, useState } from 'react'
import AppIcon from './AppIcon.jsx'

function Icon({ name }) {
  const common = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.9, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }
  const paths = {
    home: <><path d="M3 10.5 12 3l9 7.5"/><path d="M5.5 9.5V21h13V9.5"/><path d="M9.5 21v-6h5v6"/></>,
    kids: <><path d="M8 4h8l1 4 3 2-2 8-6 3-6-3-2-8 3-2Z"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><path d="M9 16c1.5 1 4.5 1 6 0"/></>,
    route: <><path d="M4 6.5 9 4l6 2.5L20 4v13.5L15 20l-6-2.5L4 20Z"/><path d="M9 4v13.5M15 6.5V20"/></>,
    world: <><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9Z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9"/></>,
    missions: <><path d="M6 3v18"/><path d="M6 5h11l-2 3 2 3H6"/></>,
    lab: <><path d="M9 3h6"/><path d="M10 3v5l-5.5 9.2A2.5 2.5 0 0 0 6.6 21h10.8a2.5 2.5 0 0 0 2.1-3.8L14 8V3"/><path d="M7.5 15h9"/></>,
    progress: <><path d="M5 20v-7"/><path d="M12 20V8"/><path d="M19 20V4"/></>,
    achievements: <><path d="M8 4h8v4a4 4 0 0 1-8 0Z"/><path d="M6 5H4v2a4 4 0 0 0 4 4M18 5h2v2a4 4 0 0 1-4 4"/><path d="M12 12v5M9 21h6M10 17h4"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1V21h-4v-.08a1.7 1.7 0 0 0-1.1-1.52 1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1-.4H3v-4h.08A1.7 1.7 0 0 0 4.6 8.5a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1V3h4v.08A1.7 1.7 0 0 0 15.5 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9a1.7 1.7 0 0 0 .6 1 1.7 1.7 0 0 0 1 .4h.08v4H21a1.7 1.7 0 0 0-1.6.6Z"/></>,
  }
  return <svg {...common}>{paths[name] ?? paths.home}</svg>
}

export default function Header({ screen, progress, onNavigate, onSettings, onSearch }) {
  const [query, setQuery] = useState('')
  const searchRef = useRef(null)
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); searchRef.current?.focus() }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])
  const recommended = progress.placement?.recommendedLevel === 'developer' ? 'Developer' : progress.placement?.recommendedLevel === 'creador' ? 'Creador' : 'Explorador'
  const items = [
    ['home', 'home', 'Inicio', 'home'],
    ['kids', 'kids', 'Zona Infantil', 'kids'],
    ['codeworld', 'world', 'CodeWorld 3D', 'codeworld'],
    ['route', 'route', 'Ruta Python', 'route'],
    ['missions', 'missions', 'Misiones', 'route'],
    ['lab', 'lab', 'Laboratorio', 'lab'],
    ['progress', 'progress', 'Progreso', 'progress'],
    ['achievements', 'achievements', 'Logros', 'progress'],
  ]
  const submit = (e) => { e.preventDefault(); const value = query.trim(); if (!value) return; onSearch?.(value); setQuery('') }
  return <>
    <aside className="app-sidebar" aria-label="Navegación lateral">
      <button className="aerolab-brand" onClick={() => onNavigate('home')} aria-label="Ir al inicio"><img src={`${import.meta.env.BASE_URL}brand/aerolab-logo.png`} alt="Aerolab Center Creative Minds" /></button>
      <nav className="side-nav">{items.map(([key, icon, label, target]) => <button key={key} className={screen === key ? 'active' : ''} onClick={() => onNavigate(target)}><Icon name={icon}/><span>{label}</span></button>)}</nav>
      <button className="sidebar-settings" onClick={onSettings}><Icon name="settings"/><span>Configuración</span></button>
    </aside>
    <header className="app-topbar">
      <button className="mobile-brand" onClick={() => onNavigate('home')}><img src={`${import.meta.env.BASE_URL}brand/aerolab-logo.png`} alt="Aerolab Center" /></button>
      <form className="global-search" onSubmit={submit}><AppIcon name="info" size={18}/><input ref={searchRef} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar lecciones o temas..." aria-label="Buscar" /><kbd>Ctrl K</kbd></form>
      <div className="topbar-user"><button className="notification-button" aria-label="Notificaciones"><AppIcon name="bell" size={20}/><i /></button><button className="profile-button" onClick={onSettings}><span className="profile-avatar profile-avatar-anime"><img src={`${import.meta.env.BASE_URL}hero/anime-python.jpg`} alt="Avatar del estudiante" /></span><span className="profile-copy"><b>{recommended}</b><small>{progress.xp} XP · Nivel {Math.max(1, Math.floor(progress.xp / 250) + 1)}</small></span><span>⌄</span></button></div>
    </header>
  </>
}
