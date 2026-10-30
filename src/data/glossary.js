export const glossaryTerms = [
  { term: 'variable', icon: '📦', simple: 'Una caja con nombre donde guardamos información.', example: 'edad = 10', category: 'Fundamentos' },
  { term: 'string', icon: '💬', simple: 'Texto que Python guarda entre comillas.', example: 'nombre = "Aero"', category: 'Datos' },
  { term: 'integer', alias: 'int', icon: '🔢', simple: 'Un número entero, sin decimales.', example: 'vidas = 3', category: 'Datos' },
  { term: 'float', icon: '📏', simple: 'Un número que puede tener decimales.', example: 'altura = 1.45', category: 'Datos' },
  { term: 'boolean', alias: 'bool', icon: '🔘', simple: 'Un valor que solo puede ser True o False.', example: 'listo = True', category: 'Datos' },
  { term: 'print', icon: '🖥️', simple: 'Muestra información en la pantalla.', example: 'print("Hola")', category: 'Fundamentos' },
  { term: 'input', icon: '⌨️', simple: 'Pide información al usuario y la recibe como texto.', example: 'nombre = input("Nombre: ")', category: 'Fundamentos' },
  { term: 'condicional', alias: 'if', icon: '🚦', simple: 'Permite que el programa tome una decisión.', example: 'if edad >= 10:\n    print("Puedes pasar")', category: 'Control' },
  { term: 'bucle', alias: 'loop', icon: '🔁', simple: 'Repite instrucciones varias veces.', example: 'for i in range(3):\n    print(i)', category: 'Control' },
  { term: 'for', icon: '🔄', simple: 'Un tipo de bucle para recorrer elementos o repetir una cantidad conocida de veces.', example: 'for planeta in planetas:\n    print(planeta)', category: 'Control' },
  { term: 'while', icon: '♻️', simple: 'Repite instrucciones mientras una condición sea verdadera.', example: 'while energia > 0:\n    energia -= 1', category: 'Control' },
  { term: 'range', icon: '🧮', simple: 'Genera una secuencia de números. range(5) produce 0, 1, 2, 3 y 4.', example: 'for i in range(5):\n    print(i)', category: 'Control' },
  { term: 'lista', alias: 'list', icon: '🧺', simple: 'Una colección ordenada de varios valores.', example: 'planetas = ["Marte", "Luna"]', category: 'Colecciones' },
  { term: 'diccionario', alias: 'dict', icon: '🗂️', simple: 'Guarda datos usando pares de clave y valor.', example: 'alumno = {"nombre": "Luna", "edad": 10}', category: 'Colecciones' },
  { term: 'función', alias: 'def', icon: '🧩', simple: 'Un bloque de instrucciones con nombre que puedes reutilizar.', example: 'def saludar():\n    print("Hola")', category: 'Funciones' },
  { term: 'parámetro', icon: '🎛️', simple: 'Un dato que una función recibe para poder trabajar.', example: 'def saludar(nombre):\n    print(nombre)', category: 'Funciones' },
  { term: 'return', icon: '↩️', simple: 'Devuelve un resultado desde una función.', example: 'def sumar(a, b):\n    return a + b', category: 'Funciones' },
  { term: 'error', icon: '🛠️', simple: 'Una señal de que Python no pudo completar algo. Leer el mensaje ayuda a corregirlo.', example: 'SyntaxError, NameError, TypeError', category: 'Depuración' },
  { term: 'clase', alias: 'class', icon: '🏗️', simple: 'Una plantilla para crear objetos con datos y comportamientos.', example: 'class Robot:\n    pass', category: 'Objetos' },
  { term: 'objeto', icon: '🤖', simple: 'Una instancia creada a partir de una clase.', example: 'aero = Robot()', category: 'Objetos' },
]

export function findGlossaryTerm(text = '') {
  const clean = text.toLowerCase().replace(/[^a-záéíóúñ_]/g, '')
  return glossaryTerms.find((item) => item.term === clean || item.alias === clean)
}
