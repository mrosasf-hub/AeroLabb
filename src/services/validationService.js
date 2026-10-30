function normalizeOutput(value = '') {
  return String(value)
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join('\n')
    .trim()
}

function plainText(value = '') {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9.+-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function isIdentifierLike(token = '') {
  return /^[A-Za-z_]\w*$/.test(token)
}

function flexibleLineMatch(actual, expected) {
  const a = plainText(actual)
  const e = plainText(expected)
  if (!e) return true
  if (a === e || a.includes(e)) return true

  const expectedWords = e.split(' ').filter(Boolean)
  if (!expectedWords.length) return true
  return expectedWords.every((word) => a.includes(word))
}

function flexibleOutputMatch(actual, expected) {
  const cleanActual = normalizeOutput(actual)
  const cleanExpected = normalizeOutput(expected)
  if (cleanActual === cleanExpected) return true
  if (!cleanExpected) return true

  const actualLines = cleanActual.split('\n').filter(Boolean)
  const expectedLines = cleanExpected.split('\n').filter(Boolean)
  const used = new Set()

  return expectedLines.every((expectedLine) => {
    const index = actualLines.findIndex((actualLine, i) => !used.has(i) && flexibleLineMatch(actualLine, expectedLine))
    if (index === -1) return false
    used.add(index)
    return true
  })
}

const callTokens = new Set([
  'print', 'input', 'int', 'float', 'str', 'len', 'range', 'sum', 'max', 'min', 'sorted',
  'append', 'strip', 'upper', 'lower', 'split', 'join', 'replace', 'open', 'read', 'write',
  'sqrt', 'mean',
])

const constructTokens = {
  if: 'If',
  elif: 'If',
  else: 'If',
  for: 'For',
  while: 'While',
  def: 'FunctionDef',
  return: 'Return',
  class: 'ClassDef',
  try: 'Try',
  except: 'Try',
  finally: 'Try',
  import: 'Import',
}

function describeRequirement(token) {
  const labels = {
    print: 'mostrar una salida con print()',
    input: 'pedir un dato con input()',
    int: 'convertir un valor con int()',
    for: 'usar un bucle for',
    while: 'usar un bucle while',
    if: 'usar una condición if',
    elif: 'usar una condición adicional',
    else: 'considerar un caso alternativo',
    def: 'crear una función',
    return: 'devolver un valor con return',
    class: 'crear una clase',
    try: 'manejar posibles errores',
    except: 'capturar un error',
    import: 'importar un módulo',
    open: 'trabajar con un archivo',
    append: 'agregar un elemento a una colección',
    range: 'generar una secuencia con range()',
    len: 'usar len()',
    sorted: 'ordenar datos',
    sum: 'sumar una colección',
  }
  return labels[token] || `usar el concepto “${token}”`
}

function requirementSatisfied(token, code, analysis = {}) {
  const constructs = new Set(analysis.constructs ?? [])
  const calls = new Set(analysis.calls ?? [])
  const operators = new Set(analysis.operators ?? [])
  const features = new Set(analysis.features ?? [])

  if (callTokens.has(token)) {
    const callPattern = new RegExp(`(?:\\b|\\.)${token}\\s*\\(`)
    return calls.has(token) || callPattern.test(code)
  }
  if (constructTokens[token]) {
    const keywordPattern = new RegExp(`\\b${token}\\b`)
    return constructs.has(constructTokens[token]) || keywordPattern.test(code)
  }

  if (token === '#') return /(^|\n)\s*#/.test(code)
  if (token === '[' || token === ']') return constructs.has('List') || features.has('subscript')
  if (token === '{') return constructs.has('Dict') || constructs.has('Set')
  if (token === 'f"' || token === "f'") return constructs.has('JoinedStr')
  if (token === 'self' || token === '__init__') return features.has('class-method')
  if (token === 'class Nave(Vehiculo)') return features.has('inheritance')
  if (token === 'saludo=') return features.has('default-argument')
  if (token === 'and') return operators.has('And')
  if (token === 'or') return operators.has('Or')
  if (token === 'in') return operators.has('In') || /\bin\b/.test(code)

  const operatorMap = {
    '+': 'Add', '-': 'Sub', '*': 'Mult', '/': 'Div', '%': 'Mod',
    '==': 'Eq', '>=': 'GtE', '<=': 'LtE', '>': 'Gt', '<': 'Lt',
    '+=': 'AugAssign', '-=': 'AugAssign', '=': 'Assign',
  }
  if (operatorMap[token]) return constructs.has(operatorMap[token]) || operators.has(operatorMap[token]) || code.includes(token)

  if (token === '(' || token === ')' || token === ':') return true
  if (token === 'True') return features.has('boolean')
  if (token === 'ValueError' || token === 'ZeroDivisionError') return features.has('exception-type') || code.includes(token)
  if (token === 'math' || token === 'statistics') return (analysis.modules ?? []).includes(token)

  // Los nombres de variables, funciones, clases y textos literales NO se exigen de forma exacta.
  // Así un alumno puede resolver el mismo problema con nombres diferentes.
  if (isIdentifierLike(token)) return true

  return code.includes(token)
}

export function validateExercise(code, output, rules = {}, analysis = {}) {
  const cleanOutput = normalizeOutput(output)
  const requiredTokens = rules.requireConcepts ?? rules.codeIncludes ?? []
  const missing = requiredTokens.filter((token) => !requirementSatisfied(token, code, analysis))

  if (missing.length > 0) {
    return {
      ok: false,
      message: `Tu solución puede ser diferente al ejemplo, pero todavía falta demostrar este concepto: ${missing.map(describeRequirement).join(', ')}.`,
      missing,
    }
  }

  if (rules.outputAny === true) {
    if (!cleanOutput) {
      return { ok: false, message: 'Tu programa se ejecutó, pero todavía no mostró ningún resultado.' }
    }
  } else if (typeof rules.outputExact === 'string') {
    const expected = normalizeOutput(rules.outputExact)
    if (!flexibleOutputMatch(cleanOutput, expected)) {
      return {
        ok: false,
        message: `Tu forma de resolverlo puede ser distinta. Revisa solamente el comportamiento del programa: el resultado debe incluir correctamente:\n${expected}`,
      }
    }
  }

  if (Array.isArray(rules.outputIncludes)) {
    const missingOutput = rules.outputIncludes.filter((item) => !plainText(cleanOutput).includes(plainText(item)))
    if (missingOutput.length > 0) {
      return {
        ok: false,
        message: `La estructura de tu solución es válida, pero en la salida todavía falta: ${missingOutput.join(', ')}.`,
      }
    }
  }

  return {
    ok: true,
    message: '¡Misión completada! No necesitas copiar el ejemplo: AeroLab comprobó el comportamiento y los conceptos de tu solución.',
  }
}
