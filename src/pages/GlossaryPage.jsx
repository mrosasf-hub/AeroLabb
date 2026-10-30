import { useMemo, useState } from 'react'
import { glossaryTerms } from '../data/glossary.js'
import AppIcon from '../components/AppIcon.jsx'

export default function GlossaryPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Todos')
  const categories = ['Todos', ...new Set(glossaryTerms.map((item) => item.category))]
  const filtered = useMemo(() => glossaryTerms.filter((item) => {
    const matchesText = `${item.term} ${item.alias ?? ''} ${item.simple}`.toLowerCase().includes(query.toLowerCase())
    return matchesText && (category === 'Todos' || item.category === category)
  }), [query, category])

  return <main className="section-pad glossary-page">
    <section className="glossary-hero"><div><p className="eyebrow">DICCIONARIO PYTHON</p><h1>Palabras difíciles, explicadas <span>fácil</span></h1><p>Toca un concepto para recordar qué significa y ver un ejemplo corto.</p></div><div className="glossary-anime"><img src={`${import.meta.env.BASE_URL}hero/anime-python.jpg`} alt="Guía visual de Python"/><span>“No memorices todo. Entiende la idea y vuelve aquí cuando lo necesites.”</span></div></section>
    <section className="glossary-tools"><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar variable, bucle, función…"/><div>{categories.map((item) => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div></section>
    <div className="glossary-grid">{filtered.map((item) => <article key={item.term} className="glossary-card"><span className="glossary-icon"><AppIcon name="code" size={24}/></span><div><small>{item.category}</small><h3>{item.term}{item.alias ? <em> · {item.alias}</em> : null}</h3><p>{item.simple}</p><pre><code>{item.example}</code></pre></div></article>)}</div>
  </main>
}
