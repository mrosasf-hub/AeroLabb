export default function Mascot({ message = '¡Vamos a aprender Python!', compact = false }) {
  return <div className={`mascot-wrap character-guide ${compact ? 'mascot-compact' : ''}`} aria-label="Guía visual de aprendizaje">
    <div className="mascot-bubble">{message}</div>
    <div className="character-guide-frame">
      <img src={`${import.meta.env.BASE_URL}hero/anime-python.jpg`} alt="Personaje leyendo un libro de Python" />
    </div>
  </div>
}
