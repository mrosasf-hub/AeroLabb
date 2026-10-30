const levelRank = { explorador: 0, creador: 1, developer: 2 }

export function recommendedStartFromScore(score, total) {
  const ratio = total ? score / total : 0
  if (ratio >= 0.84) return { levelId: 'developer', label: 'Developer', message: 'Ya dominas muchas bases. Puedes comenzar con retos intermedios y volver a cualquier tema cuando lo necesites.' }
  if (ratio >= 0.5) return { levelId: 'creador', label: 'Creador', message: 'Tienes una buena base. Aero recomienda empezar en Creador y repasar Explorador cuando aparezca una duda.' }
  return { levelId: 'explorador', label: 'Explorador', message: 'Empezaremos desde los fundamentos, con actividades visuales y poco código al principio.' }
}

export function canAccessLevel(levelId, placement, previousComplete) {
  if (previousComplete) return true
  if (!placement?.recommendedLevel) return false
  return levelRank[placement.recommendedLevel] >= levelRank[levelId]
}

export function getReviewDue(progress) {
  const count = progress.completedLessons?.length ?? 0
  const milestone = Math.floor(count / 5) * 5
  if (milestone < 5) return null
  if ((progress.reviewCompletions ?? []).includes(milestone)) return null
  return milestone
}

export function getAdaptiveRecommendation(progress, getActivity) {
  const attempts = progress.attempts ?? {}
  const hints = progress.hintsUsed ?? {}
  const lastId = progress.lastActivityId
  const last = lastId ? getActivity(lastId) : null
  if (last && (attempts[lastId]?.failed ?? 0) >= 2) {
    return { type: 'practice', icon: '🧩', title: `Practica de nuevo: ${last.title}`, message: 'Aero notó varios intentos. Repetir ahora te ayudará a fijar el concepto.', activityId: lastId }
  }
  if (last && (hints[lastId] ?? 0) >= 3 && !(progress.completedLessons ?? []).includes(lastId)) {
    return { type: 'support', icon: '💡', title: 'Repaso recomendado', message: 'Usaste varias pistas. Revisa el ejemplo y prueba una versión más pequeña del problema.', activityId: lastId }
  }
  const recent = Object.entries(attempts).slice(-4)
  const fast = recent.length >= 3 && recent.every(([, data]) => data.success >= 1 && data.failed === 0)
  if (fast) return { type: 'challenge', icon: '⚡', title: 'Vas muy rápido', message: 'Has resuelto varias actividades sin errores. Prueba el desafío opcional de tu próxima misión.' }
  return { type: 'normal', icon: '🛰️', title: 'Continúa tu ruta', message: 'Aero irá ajustando recomendaciones según tus intentos, pistas y actividades completadas.' }
}

export function getStory(activity) {
  if (!activity) return null
  const order = activity.order ?? 1
  const block = order <= 7 ? 1 : order <= 14 ? 2 : 3
  const stories = {
    explorador: [
      ['Activación de Aero', 'Ayuda a Aero a encender su sistema aprendiendo las primeras instrucciones de Python.'],
      ['Base lunar', 'La base necesita decisiones y repeticiones para funcionar sin ayuda.'],
      ['Misión de exploración', 'Combina lo aprendido para preparar una expedición y resolver problemas reales.'],
    ],
    creador: [
      ['Inventario de la estación', 'Organiza datos y colecciones para administrar los recursos de la tripulación.'],
      ['Taller de programas', 'Construye funciones reutilizables para automatizar tareas de la estación.'],
      ['Proyecto de creador', 'Conecta varias herramientas de Python para construir programas propios.'],
    ],
    developer: [
      ['Centro de control', 'Aprende a organizar código más grande y a manejar situaciones inesperadas.'],
      ['Sistemas inteligentes', 'Modela objetos y componentes de una estación usando estructuras más avanzadas.'],
      ['Proyecto de graduación', 'Diseña una solución completa y demuestra que puedes programar con autonomía.'],
    ],
  }
  const [title, text] = stories[activity.levelId]?.[block - 1] ?? ['Misión AeroLab Python', 'Cada actividad forma parte de una historia de aprendizaje.']
  return { block, title, text }
}

export function bossIdForBoundary(levelId, order) {
  const prefix = levelId === 'explorador' ? 'exp' : levelId === 'creador' ? 'cre' : 'dev'
  if (order === 7) return `${prefix}-s1`
  if (order === 14) return `${prefix}-s2`
  if (order === 20) return `${prefix}-s3`
  return null
}

export function blockBossForLesson(levelId, order) {
  const prefix = levelId === 'explorador' ? 'exp' : levelId === 'creador' ? 'cre' : 'dev'
  if (order >= 8 && order <= 14) return `${prefix}-s1`
  if (order >= 15) return `${prefix}-s2`
  return null
}

export function getProjectStages(activity) {
  if (!activity || !['mini-project', 'final-project'].includes(activity.kind)) return []
  return [
    'Entiende qué debe hacer el programa y escribe un plan corto.',
    'Construye la entrada de datos y prueba valores sencillos.',
    'Implementa la lógica principal en partes pequeñas.',
    'Prueba casos distintos y corrige errores.',
    activity.kind === 'final-project' ? 'Personaliza, mejora y explica tu solución final.' : 'Personaliza una parte del proyecto y vuelve a probar.',
  ]
}

export function getCreativeChallenge(activity) {
  const title = activity?.title?.toLowerCase() ?? ''
  if (title.includes('variable')) return 'Crea un programa con tres variables sobre algo que te guste y muéstralas con print().'
  if (title.includes('condicion') || title.includes('if')) return 'Inventa una decisión con al menos un if y un else. Puede ser sobre un juego, una nave o una regla de tu escuela.'
  if (title.includes('bucle') || title.includes('for') || title.includes('while')) return 'Crea un patrón o cuenta regresiva usando un bucle. Intenta que produzca al menos cinco líneas.'
  if (title.includes('lista')) return 'Crea una lista con cinco cosas que te gusten y recórrela para mostrarlas una por una.'
  if (title.includes('func')) return 'Crea una función con al menos un parámetro y úsala dos veces con datos diferentes.'
  if (activity?.levelId === 'developer') return 'Crea una variante del ejercicio usando una función o clase adicional. Tú decides cómo organizarla.'
  return 'Cambia el ejemplo para contar una historia diferente y agrega al menos una instrucción nueva que hayas aprendido.'
}

export function explainPythonLine(line = '') {
  const text = line.trim()
  if (!text) return 'Esta línea está vacía. Python simplemente continúa con la siguiente.'
  if (text.startsWith('#')) return 'Es un comentario: sirve para dejar una nota para las personas y Python no lo ejecuta.'
  if (text.startsWith('print(')) return 'print() muestra información en la salida del programa.'
  if (text.includes('input(')) return 'input() detiene el programa para pedir un dato al usuario. El dato llega como texto.'
  if (/^if\s/.test(text)) return 'Esta línea crea una decisión. El bloque indentado se ejecuta solo cuando la condición es verdadera.'
  if (/^elif\s/.test(text)) return 'elif prueba otra condición cuando las anteriores no se cumplieron.'
  if (/^else\s*:/.test(text)) return 'else cubre el caso contrario: se ejecuta cuando las condiciones anteriores fueron falsas.'
  if (/^for\s/.test(text)) return 'Este for repite el bloque para cada elemento de una colección o secuencia.'
  if (/^while\s/.test(text)) return 'Este while repite el bloque mientras su condición siga siendo verdadera.'
  if (/^def\s/.test(text)) return 'def crea una función: un bloque con nombre que puedes reutilizar.'
  if (/^return\b/.test(text)) return 'return termina la función y devuelve un resultado al lugar desde donde se llamó.'
  if (/^class\s/.test(text)) return 'class define una plantilla para crear objetos con datos y comportamientos.'
  if (text.includes('range(')) return 'range() genera una secuencia de números. Por ejemplo, range(5) usa 0, 1, 2, 3 y 4.'
  if (/^[A-Za-z_]\w*\s*=/.test(text)) {
    const name = text.split('=')[0].trim()
    return `Aquí guardas un valor en la variable “${name}”. Si la variable ya existía, su valor se actualiza.`
  }
  if (text.endsWith(':')) return 'Los dos puntos indican que comienza un bloque de código indentado.'
  return 'Python ejecuta esta instrucción cuando llega a ella. Observa los nombres, operadores y funciones que aparecen para entender qué cambia.'
}

export function conceptsFromCode(code = '') {
  const concepts = []
  if (/\bprint\s*\(/.test(code)) concepts.push('salida con print()')
  if (/\binput\s*\(/.test(code)) concepts.push('entrada con input()')
  if (/^[A-Za-z_]\w*\s*=/m.test(code)) concepts.push('variables')
  if (/\bif\b/.test(code)) concepts.push('condiciones')
  if (/\b(for|while)\b/.test(code)) concepts.push('bucles')
  if (/\bdef\b/.test(code)) concepts.push('funciones')
  if (/\bclass\b/.test(code)) concepts.push('clases y objetos')
  if (/\btry\b/.test(code)) concepts.push('manejo de errores')
  if (/\bopen\s*\(/.test(code)) concepts.push('archivos')
  return concepts
}
