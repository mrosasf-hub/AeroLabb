export const levels = [
  {
    "id": "explorador",
    "name": "Explorador",
    "badge": "Nivel 1",
    "icon": "🚀",
    "accent": "cyan",
    "subtitle": "Empieza desde cero",
    "description": "Fundamentos visuales y progresivos para aprender a pensar como programador.",
    "minAge": "Primaria y principiantes"
  },
  {
    "id": "creador",
    "name": "Creador",
    "badge": "Nivel 2",
    "icon": "🎨",
    "accent": "violet",
    "subtitle": "Construye programas",
    "description": "Combina datos, bucles y funciones para resolver problemas y crear programas propios.",
    "minAge": "Principiantes con bases"
  },
  {
    "id": "developer",
    "name": "Developer",
    "badge": "Nivel 3",
    "icon": "💻",
    "accent": "amber",
    "subtitle": "Piensa como desarrollador",
    "description": "Organiza proyectos, controla errores y conoce Python de nivel intermedio.",
    "minAge": "Alumnos preparados y jóvenes"
  }
]

export const lessons = [
  {
    "id": "exp-1",
    "levelId": "explorador",
    "order": 1,
    "title": "¿Qué es programar?",
    "icon": "🧠",
    "xp": 44,
    "stars": 1,
    "duration": "10 min",
    "difficulty": "Inicial",
    "activityType": "choose",
    "summary": "Descubre cómo dar instrucciones a una computadora.",
    "objectives": [
      "Descubre cómo dar instrucciones a una computadora.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "Un programa es una secuencia de instrucciones que la computadora sigue en orden.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "print(\"¡Misión iniciada!\")",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Descubre cómo dar instrucciones a una computadora. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "# Ejecuta tu primera instrucción\nprint(\"¡Misión iniciada!\")",
      "expectedOutput": "¡Misión iniciada!",
      "validation": {
        "outputAny": true,
        "outputExact": "¡Misión iniciada!",
        "codeIncludes": [
          "print"
        ]
      },
      "hints": [
        "Busca la instrucción que muestra texto.",
        "En Python usamos print().",
        "La línea correcta comienza con print y lleva el mensaje entre comillas."
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "exp-2",
    "levelId": "explorador",
    "order": 2,
    "title": "Tu primer print()",
    "icon": "👋",
    "xp": 48,
    "stars": 1,
    "duration": "13 min",
    "difficulty": "Inicial",
    "activityType": "complete",
    "summary": "Haz que Python muestre un mensaje.",
    "objectives": [
      "Haz que Python muestre un mensaje.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "print() muestra texto o valores en la pantalla.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "print(\"Hola, AeroLab Python\")",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Haz que Python muestre un mensaje. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "# Cambia el mensaje\nprint(\"Hola\")",
      "expectedOutput": "Hola, AeroLab Python",
      "validation": {
        "outputAny": true,
        "outputExact": "Hola, AeroLab Python",
        "codeIncludes": [
          "print"
        ]
      },
      "hints": [
        "Usa print().",
        "El texto va entre comillas.",
        "Escribe: print(\"Hola, AeroLab Python\")"
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "exp-3",
    "levelId": "explorador",
    "order": 3,
    "title": "Texto y comentarios",
    "icon": "💬",
    "xp": 52,
    "stars": 1,
    "duration": "16 min",
    "difficulty": "Inicial",
    "activityType": "modify",
    "summary": "Distingue instrucciones y notas para humanos.",
    "objectives": [
      "Distingue instrucciones y notas para humanos.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "Los textos van entre comillas. Los comentarios empiezan con # y Python no los ejecuta.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "# Este comentario no aparece\nprint(\"Explorando\")",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Distingue instrucciones y notas para humanos. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "# Agrega un comentario y muestra Explorando\nprint(\"Explorando\")",
      "expectedOutput": "Explorando",
      "validation": {
        "outputAny": true,
        "outputExact": "Explorando",
        "codeIncludes": [
          "#",
          "print"
        ]
      },
      "hints": [
        "Un comentario empieza con #.",
        "Puedes escribir el comentario en una línea aparte.",
        "Añade una línea que empiece con # antes de print()."
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "exp-4",
    "levelId": "explorador",
    "order": 4,
    "title": "Variables: cajas con nombre",
    "icon": "📦",
    "xp": 56,
    "stars": 1,
    "duration": "19 min",
    "difficulty": "Inicial",
    "activityType": "complete",
    "summary": "Guarda datos para usarlos después.",
    "objectives": [
      "Guarda datos para usarlos después.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "Una variable es una caja con nombre. Se crea con nombre = valor.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "nave = \"Aero\"\nprint(nave)",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Guarda datos para usarlos después. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "nave = \"\"\nprint(nave)",
      "expectedOutput": "Aero",
      "validation": {
        "outputAny": true,
        "outputExact": "Aero",
        "codeIncludes": [
          "=",
          "print"
        ]
      },
      "hints": [
        "Guarda el texto Aero en nave.",
        "Usa nave = \"Aero\".",
        "Completa: nave = \"Aero\""
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "exp-5",
    "levelId": "explorador",
    "order": 5,
    "title": "Strings: palabras y mensajes",
    "icon": "🔤",
    "xp": 60,
    "stars": 1,
    "duration": "7 min",
    "difficulty": "Inicial",
    "activityType": "modify",
    "summary": "Trabaja con datos de texto.",
    "objectives": [
      "Trabaja con datos de texto.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "Los strings son cadenas de texto y se escriben entre comillas simples o dobles.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "nombre = \"Luna\"\nprint(\"Hola\", nombre)",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Trabaja con datos de texto. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "nombre = \"Luna\"\nprint(\"Hola\", nombre)",
      "expectedOutput": "Hola Luna",
      "validation": {
        "outputAny": true,
        "outputExact": "Hola Luna",
        "codeIncludes": [
          "=",
          "print"
        ]
      },
      "hints": [
        "Ya tienes el nombre guardado.",
        "print puede mostrar varios valores separados por coma.",
        "Usa print(\"Hola\", nombre)."
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "exp-6",
    "levelId": "explorador",
    "order": 6,
    "title": "Números en Python",
    "icon": "🔢",
    "xp": 64,
    "stars": 1,
    "duration": "10 min",
    "difficulty": "Inicial",
    "activityType": "choose",
    "summary": "Usa enteros y decimales.",
    "objectives": [
      "Usa enteros y decimales.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "Python puede trabajar con enteros y decimales sin comillas.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "edad = 9\ntemperatura = 21.5\nprint(edad)",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Usa enteros y decimales. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "edad = 9\nprint(edad)",
      "expectedOutput": "9",
      "validation": {
        "outputExact": "9",
        "codeIncludes": [
          "edad"
        ]
      },
      "hints": [
        "Los números no llevan comillas.",
        "Muestra la variable edad.",
        "La solución ya está casi lista: ejecuta print(edad)."
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "exp-7",
    "levelId": "explorador",
    "order": 7,
    "title": "Operaciones matemáticas",
    "icon": "➕",
    "xp": 68,
    "stars": 1,
    "duration": "13 min",
    "difficulty": "Inicial",
    "activityType": "complete",
    "summary": "Suma, resta, multiplica y divide.",
    "objectives": [
      "Suma, resta, multiplica y divide.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "Los operadores +, -, * y / permiten realizar cálculos.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "combustible = 7\nreserva = 8\nprint(combustible + reserva)",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Suma, resta, multiplica y divide. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "combustible = 7\nreserva = 8\n# Muestra la suma",
      "expectedOutput": "15",
      "validation": {
        "outputExact": "15",
        "codeIncludes": [
          "+",
          "combustible",
          "reserva"
        ]
      },
      "hints": [
        "Necesitas sumar dos variables.",
        "Usa el operador +.",
        "Prueba print(combustible + reserva)."
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "exp-8",
    "levelId": "explorador",
    "order": 8,
    "title": "Entrada de datos con input()",
    "icon": "⌨️",
    "xp": 72,
    "stars": 1,
    "duration": "16 min",
    "difficulty": "Inicial",
    "activityType": "guided",
    "summary": "Haz preguntas al usuario.",
    "objectives": [
      "Haz preguntas al usuario.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "input() permite recibir texto. En AeroLab Python puedes escribir la entrada en la caja Entrada del editor.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "nombre = input(\"¿Cómo te llamas? \")\nprint(\"Hola\", nombre)",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Haz preguntas al usuario. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "nombre = input(\"¿Cómo te llamas? \")\nprint(\"Hola\", nombre)",
      "expectedOutput": "Hola Luna",
      "validation": {
        "outputExact": "Hola Luna",
        "codeIncludes": [
          "input",
          "nombre"
        ]
      },
      "hints": [
        "input guarda lo que escribe el usuario.",
        "La entrada de prueba para esta misión es Luna.",
        "Usa input para guardar nombre y luego print para saludar."
      ],
      "inputs": [
        "Luna"
      ]
    },
    "isChallenge": false
  },
  {
    "id": "exp-9",
    "levelId": "explorador",
    "order": 9,
    "title": "Convertir datos",
    "icon": "🔄",
    "xp": 76,
    "stars": 1,
    "duration": "19 min",
    "difficulty": "Inicial",
    "activityType": "guided",
    "summary": "Convierte texto a números.",
    "objectives": [
      "Convierte texto a números.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "input() produce texto. int() y float() convierten ese texto a números.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "edad = int(input(\"Edad: \"))\nprint(edad + 1)",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Convierte texto a números. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "edad = int(input(\"Edad: \"))\nprint(edad + 1)",
      "expectedOutput": "10",
      "validation": {
        "outputExact": "10",
        "codeIncludes": [
          "int",
          "input"
        ]
      },
      "hints": [
        "La entrada llega como texto.",
        "Convierte con int().",
        "Usa edad = int(input(...)) y suma 1."
      ],
      "inputs": [
        "9"
      ]
    },
    "isChallenge": false
  },
  {
    "id": "exp-10",
    "levelId": "explorador",
    "order": 10,
    "title": "Comparaciones",
    "icon": "⚖️",
    "xp": 80,
    "stars": 1,
    "duration": "7 min",
    "difficulty": "Inicial",
    "activityType": "choose",
    "summary": "Compara valores y obtén True o False.",
    "objectives": [
      "Compara valores y obtén True o False.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "Los operadores ==, !=, >, <, >= y <= comparan datos.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "energia = 80\nprint(energia >= 50)",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Compara valores y obtén True o False. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "energia = 80\nprint(energia >= 50)",
      "expectedOutput": "True",
      "validation": {
        "outputExact": "True",
        "codeIncludes": [
          ">="
        ]
      },
      "hints": [
        "Pregunta si 80 es mayor o igual que 50.",
        "Usa >=.",
        "print(energia >= 50) produce True."
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "exp-11",
    "levelId": "explorador",
    "order": 11,
    "title": "Booleanos",
    "icon": "✅",
    "xp": 84,
    "stars": 1,
    "duration": "10 min",
    "difficulty": "Inicial",
    "activityType": "complete",
    "summary": "Conoce True y False.",
    "objectives": [
      "Conoce True y False.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "Los booleanos representan verdadero o falso y son la base de las decisiones.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "puerta_abierta = True\nprint(puerta_abierta)",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Conoce True y False. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "puerta_abierta = True\nprint(puerta_abierta)",
      "expectedOutput": "True",
      "validation": {
        "outputExact": "True",
        "codeIncludes": [
          "True"
        ]
      },
      "hints": [
        "Usa el valor booleano verdadero.",
        "En Python se escribe True con T mayúscula.",
        "Asigna True a puerta_abierta."
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "exp-12",
    "levelId": "explorador",
    "order": 12,
    "title": "Decisiones con if",
    "icon": "🚦",
    "xp": 88,
    "stars": 1,
    "duration": "13 min",
    "difficulty": "Inicial",
    "activityType": "complete",
    "summary": "Ejecuta código cuando una condición se cumple.",
    "objectives": [
      "Ejecuta código cuando una condición se cumple.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "if significa 'si'. El bloque debajo se ejecuta solo cuando la condición es verdadera.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "energia = 80\nif energia >= 50:\n    print(\"Puede despegar\")",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Ejecuta código cuando una condición se cumple. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "energia = 80\n# Crea la condición aquí",
      "expectedOutput": "Puede despegar",
      "validation": {
        "outputExact": "Puede despegar",
        "codeIncludes": [
          "if",
          ">="
        ]
      },
      "hints": [
        "Compara energia con 50.",
        "Empieza con if energia >= 50:",
        "Debajo y con sangría escribe print(\"Puede despegar\")."
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "exp-13",
    "levelId": "explorador",
    "order": 13,
    "title": "Dos caminos: if y else",
    "icon": "🛤️",
    "xp": 92,
    "stars": 1,
    "duration": "16 min",
    "difficulty": "Inicial",
    "activityType": "complete",
    "summary": "Elige entre dos resultados.",
    "objectives": [
      "Elige entre dos resultados.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "else define lo que ocurre cuando la condición del if no se cumple.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "edad = 8\nif edad >= 10:\n    print(\"Misión avanzada\")\nelse:\n    print(\"Misión inicial\")",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Elige entre dos resultados. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "edad = 8\nif edad >= 10:\n    print(\"Misión avanzada\")\n# Agrega el caso contrario",
      "expectedOutput": "Misión inicial",
      "validation": {
        "outputExact": "Misión inicial",
        "codeIncludes": [
          "else"
        ]
      },
      "hints": [
        "Necesitas un camino cuando edad no sea >= 10.",
        "Ese camino empieza con else:",
        "Añade else: y debajo print(\"Misión inicial\")."
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "exp-14",
    "levelId": "explorador",
    "order": 14,
    "title": "Más decisiones con elif",
    "icon": "🧭",
    "xp": 96,
    "stars": 1,
    "duration": "19 min",
    "difficulty": "Inicial",
    "activityType": "complete",
    "summary": "Crea tres o más caminos.",
    "objectives": [
      "Crea tres o más caminos.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "elif permite comprobar una nueva condición cuando la anterior no se cumplió.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "energia = 55\nif energia >= 80:\n    print(\"Alta\")\nelif energia >= 40:\n    print(\"Media\")\nelse:\n    print(\"Baja\")",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Crea tres o más caminos. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "energia = 55\nif energia >= 80:\n    print(\"Alta\")\n# Completa el nivel medio y bajo",
      "expectedOutput": "Media",
      "validation": {
        "outputExact": "Media",
        "codeIncludes": [
          "elif",
          "else"
        ]
      },
      "hints": [
        "55 no es alta pero sí es al menos 40.",
        "Usa elif energia >= 40:",
        "Después agrega else para el nivel bajo."
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "exp-15",
    "levelId": "explorador",
    "order": 15,
    "title": "Condiciones combinadas",
    "icon": "🔗",
    "xp": 100,
    "stars": 1,
    "duration": "7 min",
    "difficulty": "Inicial",
    "activityType": "complete",
    "summary": "Une condiciones con and y or.",
    "objectives": [
      "Une condiciones con and y or.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "and exige que dos condiciones sean verdaderas; or acepta que se cumpla al menos una.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "edad = 10\npermiso = True\nif edad >= 8 and permiso:\n    print(\"Acceso\")",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Une condiciones con and y or. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "edad = 10\npermiso = True\n# Comprueba las dos condiciones",
      "expectedOutput": "Acceso",
      "validation": {
        "outputExact": "Acceso",
        "codeIncludes": [
          "and",
          "if"
        ]
      },
      "hints": [
        "Deben cumplirse edad y permiso.",
        "Une ambas condiciones con and.",
        "if edad >= 8 and permiso:"
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "exp-16",
    "levelId": "explorador",
    "order": 16,
    "title": "Repeticiones con for",
    "icon": "🔁",
    "xp": 104,
    "stars": 1,
    "duration": "10 min",
    "difficulty": "Inicial",
    "activityType": "complete",
    "summary": "Repite una acción varias veces.",
    "objectives": [
      "Repite una acción varias veces.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "for recorre una secuencia y ejecuta el mismo bloque para cada elemento.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "for vuelta in range(3):\n    print(\"Vuelta\")",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Repite una acción varias veces. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "# Muestra Vuelta tres veces",
      "expectedOutput": "Vuelta\nVuelta\nVuelta",
      "validation": {
        "outputExact": "Vuelta\nVuelta\nVuelta",
        "codeIncludes": [
          "for",
          "range"
        ]
      },
      "hints": [
        "Usa un bucle for.",
        "range(3) repite tres veces.",
        "for vuelta in range(3): y debajo print(\"Vuelta\")."
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "exp-17",
    "levelId": "explorador",
    "order": 17,
    "title": "Secuencias con range()",
    "icon": "📏",
    "xp": 108,
    "stars": 1,
    "duration": "13 min",
    "difficulty": "Inicial",
    "activityType": "complete",
    "summary": "Genera series de números.",
    "objectives": [
      "Genera series de números.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "range(inicio, fin) genera números desde inicio hasta uno antes de fin.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "for numero in range(1, 6):\n    print(numero)",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Genera series de números. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "# Muestra 1, 2, 3, 4 y 5",
      "expectedOutput": "1\n2\n3\n4\n5",
      "validation": {
        "outputExact": "1\n2\n3\n4\n5",
        "codeIncludes": [
          "for",
          "range"
        ]
      },
      "hints": [
        "El final de range no se incluye.",
        "Para llegar al 5 usa 6 como final.",
        "range(1, 6) genera del 1 al 5."
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "exp-18",
    "levelId": "explorador",
    "order": 18,
    "title": "Mientras se cumpla: while",
    "icon": "⏳",
    "xp": 112,
    "stars": 1,
    "duration": "16 min",
    "difficulty": "Inicial",
    "activityType": "modify",
    "summary": "Repite mientras una condición sea verdadera.",
    "objectives": [
      "Repite mientras una condición sea verdadera.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "while repite un bloque mientras su condición siga siendo True.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "energia = 3\nwhile energia > 0:\n    print(energia)\n    energia -= 1",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Repite mientras una condición sea verdadera. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "energia = 3\nwhile energia > 0:\n    print(energia)\n    energia -= 1",
      "expectedOutput": "3\n2\n1",
      "validation": {
        "outputExact": "3\n2\n1",
        "codeIncludes": [
          "while",
          "-="
        ]
      },
      "hints": [
        "La energía debe bajar en cada vuelta.",
        "Usa energia -= 1 para evitar un bucle infinito.",
        "La estructura while energia > 0 funciona para esta cuenta regresiva."
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "exp-19",
    "levelId": "explorador",
    "order": 19,
    "title": "Bucles + decisiones",
    "icon": "🛰️",
    "xp": 116,
    "stars": 1,
    "duration": "19 min",
    "difficulty": "Inicial",
    "activityType": "complete",
    "summary": "Combina repetición y condiciones.",
    "objectives": [
      "Combina repetición y condiciones.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "Puedes colocar if dentro de un for para decidir qué hacer en cada repetición.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "for n in range(1, 5):\n    if n % 2 == 0:\n        print(n)",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Combina repetición y condiciones. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "for n in range(1, 5):\n    # Muestra solo los pares",
      "expectedOutput": "2\n4",
      "validation": {
        "outputExact": "2\n4",
        "codeIncludes": [
          "for",
          "if",
          "%"
        ]
      },
      "hints": [
        "Los pares tienen residuo 0 al dividir entre 2.",
        "Comprueba n % 2 == 0.",
        "Dentro del for agrega if n % 2 == 0: y luego print(n)."
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "exp-20",
    "levelId": "explorador",
    "order": 20,
    "title": "Misión Explorador",
    "icon": "🏁",
    "xp": 140,
    "stars": 3,
    "duration": "7 min",
    "difficulty": "Inicial",
    "activityType": "challenge",
    "summary": "Integra lo aprendido en un programa pequeño.",
    "objectives": [
      "Integra lo aprendido en un programa pequeño.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "Un programa combina variables, decisiones y bucles para resolver una tarea completa.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "puntos = 0\nfor respuesta in [True, True, False]:\n    if respuesta:\n        puntos += 1\nprint(\"Puntos\", puntos)",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Integra lo aprendido en un programa pequeño. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "puntos = 0\nfor respuesta in [True, True, False]:\n    if respuesta:\n        puntos += 1\nprint(\"Puntos\", puntos)",
      "expectedOutput": "Puntos 2",
      "validation": {
        "outputExact": "Puntos 2",
        "codeIncludes": [
          "for",
          "if",
          "+="
        ]
      },
      "hints": [
        "Cuenta solo las respuestas True.",
        "Aumenta puntos dentro del if.",
        "Usa puntos += 1 cuando respuesta sea True."
      ],
      "inputs": []
    },
    "isChallenge": true
  },
  {
    "id": "cre-1",
    "levelId": "creador",
    "order": 1,
    "title": "Strings a fondo",
    "icon": "🧵",
    "xp": 44,
    "stars": 1,
    "duration": "10 min",
    "difficulty": "Media",
    "activityType": "modify",
    "summary": "Combina y transforma texto.",
    "objectives": [
      "Combina y transforma texto.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "Los strings ofrecen operaciones para crear mensajes dinámicos.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "nombre = \"Aero\"\nprint(f\"Hola, {nombre}!\")",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Combina y transforma texto. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "nombre = \"Aero\"\nprint(f\"Hola, {nombre}!\")",
      "expectedOutput": "Hola, Aero!",
      "validation": {
        "outputExact": "Hola, Aero!",
        "codeIncludes": [
          "f\"",
          "nombre"
        ]
      },
      "hints": [
        "Usa un f-string.",
        "Coloca la variable entre llaves dentro del texto.",
        "print(f\"Hola, {nombre}!\")"
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "cre-2",
    "levelId": "creador",
    "order": 2,
    "title": "Métodos de texto",
    "icon": "🔠",
    "xp": 48,
    "stars": 1,
    "duration": "13 min",
    "difficulty": "Media",
    "activityType": "modify",
    "summary": "Cambia mayúsculas, minúsculas y espacios.",
    "objectives": [
      "Cambia mayúsculas, minúsculas y espacios.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "Los strings tienen métodos como upper(), lower(), strip() y replace().",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "mensaje = \"  hola  \"\nprint(mensaje.strip().upper())",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Cambia mayúsculas, minúsculas y espacios. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "mensaje = \"  hola  \"\nprint(mensaje.strip().upper())",
      "expectedOutput": "HOLA",
      "validation": {
        "outputExact": "HOLA",
        "codeIncludes": [
          "strip",
          "upper"
        ]
      },
      "hints": [
        "Primero elimina espacios.",
        "Después convierte a mayúsculas.",
        "Encadena strip().upper()."
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "cre-3",
    "levelId": "creador",
    "order": 3,
    "title": "Listas",
    "icon": "🧺",
    "xp": 52,
    "stars": 1,
    "duration": "16 min",
    "difficulty": "Media",
    "activityType": "choose",
    "summary": "Guarda varios elementos en orden.",
    "objectives": [
      "Guarda varios elementos en orden.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "Una lista se escribe con corchetes y puede contener muchos valores.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "planetas = [\"Mercurio\", \"Venus\", \"Tierra\"]\nprint(planetas[2])",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Guarda varios elementos en orden. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "planetas = [\"Mercurio\", \"Venus\", \"Tierra\"]\nprint(planetas[2])",
      "expectedOutput": "Tierra",
      "validation": {
        "outputExact": "Tierra",
        "codeIncludes": [
          "[",
          "]"
        ]
      },
      "hints": [
        "Las posiciones empiezan en 0.",
        "Tierra está en la posición 2.",
        "Usa planetas[2]."
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "cre-4",
    "levelId": "creador",
    "order": 4,
    "title": "Modificar listas",
    "icon": "🛠️",
    "xp": 56,
    "stars": 1,
    "duration": "19 min",
    "difficulty": "Media",
    "activityType": "complete",
    "summary": "Agrega y elimina elementos.",
    "objectives": [
      "Agrega y elimina elementos.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "append() agrega al final y remove() elimina por valor.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "equipo = [\"Aero\", \"Luna\"]\nequipo.append(\"Nova\")\nprint(equipo[-1])",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Agrega y elimina elementos. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "equipo = [\"Aero\", \"Luna\"]\n# Agrega Nova y muestra el último",
      "expectedOutput": "Nova",
      "validation": {
        "outputExact": "Nova",
        "codeIncludes": [
          "append"
        ]
      },
      "hints": [
        "Usa append para agregar.",
        "El último elemento se consulta con [-1].",
        "equipo.append(\"Nova\") y luego print(equipo[-1])."
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "cre-5",
    "levelId": "creador",
    "order": 5,
    "title": "Recorrer listas",
    "icon": "🚶",
    "xp": 60,
    "stars": 1,
    "duration": "7 min",
    "difficulty": "Media",
    "activityType": "complete",
    "summary": "Visita cada elemento con for.",
    "objectives": [
      "Visita cada elemento con for.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "for puede recorrer directamente los elementos de una lista.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "planetas = [\"Marte\", \"Júpiter\"]\nfor planeta in planetas:\n    print(planeta)",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Visita cada elemento con for. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "planetas = [\"Marte\", \"Júpiter\"]\n# Recorre y muestra cada planeta",
      "expectedOutput": "Marte\nJúpiter",
      "validation": {
        "outputExact": "Marte\nJúpiter",
        "codeIncludes": [
          "for",
          "in"
        ]
      },
      "hints": [
        "No necesitas índices.",
        "Usa for planeta in planetas:",
        "Dentro del bucle usa print(planeta)."
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "cre-6",
    "levelId": "creador",
    "order": 6,
    "title": "Tuplas",
    "icon": "🧊",
    "xp": 64,
    "stars": 1,
    "duration": "10 min",
    "difficulty": "Media",
    "activityType": "choose",
    "summary": "Usa colecciones que no cambian.",
    "objectives": [
      "Usa colecciones que no cambian.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "Una tupla es parecida a una lista, pero normalmente se usa para datos fijos.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "coordenadas = (10, 20)\nprint(coordenadas[0])",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Usa colecciones que no cambian. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "coordenadas = (10, 20)\nprint(coordenadas[0])",
      "expectedOutput": "10",
      "validation": {
        "outputExact": "10",
        "codeIncludes": [
          "(",
          ")"
        ]
      },
      "hints": [
        "La primera posición es 0.",
        "Consulta coordenadas[0].",
        "La salida esperada es 10."
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "cre-7",
    "levelId": "creador",
    "order": 7,
    "title": "Diccionarios",
    "icon": "🗂️",
    "xp": 68,
    "stars": 1,
    "duration": "13 min",
    "difficulty": "Media",
    "activityType": "modify",
    "summary": "Relaciona claves con valores.",
    "objectives": [
      "Relaciona claves con valores.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "Un diccionario guarda pares clave: valor entre llaves.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "nave = {\"nombre\": \"Aero-1\", \"energia\": 100}\nprint(nave[\"nombre\"])",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Relaciona claves con valores. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "nave = {\"nombre\": \"Aero-1\", \"energia\": 100}\nprint(nave[\"nombre\"])",
      "expectedOutput": "Aero-1",
      "validation": {
        "outputExact": "Aero-1",
        "codeIncludes": [
          "{",
          "nombre"
        ]
      },
      "hints": [
        "Consulta usando la clave.",
        "La clave nombre va entre corchetes.",
        "Usa nave[\"nombre\"]."
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "cre-8",
    "levelId": "creador",
    "order": 8,
    "title": "Actualizar diccionarios",
    "icon": "📝",
    "xp": 72,
    "stars": 1,
    "duration": "16 min",
    "difficulty": "Media",
    "activityType": "complete",
    "summary": "Cambia y añade información.",
    "objectives": [
      "Cambia y añade información.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "Puedes asignar un nuevo valor usando diccionario[clave] = valor.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "nave = {\"energia\": 80}\nnave[\"energia\"] = 100\nprint(nave[\"energia\"])",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Cambia y añade información. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "nave = {\"energia\": 80}\n# Actualiza a 100 y muestra el valor",
      "expectedOutput": "100",
      "validation": {
        "outputExact": "100",
        "codeIncludes": [
          "nave",
          "["
        ]
      },
      "hints": [
        "Asigna un nuevo valor a la clave energia.",
        "Usa nave[\"energia\"] = 100.",
        "Después imprime esa misma clave."
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "cre-9",
    "levelId": "creador",
    "order": 9,
    "title": "Sets: datos sin repetidos",
    "icon": "🧩",
    "xp": 76,
    "stars": 1,
    "duration": "19 min",
    "difficulty": "Media",
    "activityType": "choose",
    "summary": "Guarda valores únicos.",
    "objectives": [
      "Guarda valores únicos.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "Un set elimina duplicados y es útil cuando solo importa saber qué valores existen.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "colores = {\"azul\", \"azul\", \"morado\"}\nprint(len(colores))",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Guarda valores únicos. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "colores = {\"azul\", \"azul\", \"morado\"}\nprint(len(colores))",
      "expectedOutput": "2",
      "validation": {
        "outputExact": "2",
        "codeIncludes": [
          "{",
          "len"
        ]
      },
      "hints": [
        "Los repetidos cuentan una sola vez.",
        "len() dice cuántos elementos únicos hay.",
        "El resultado debe ser 2."
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "cre-10",
    "levelId": "creador",
    "order": 10,
    "title": "Crear funciones",
    "icon": "🧰",
    "xp": 80,
    "stars": 1,
    "duration": "7 min",
    "difficulty": "Media",
    "activityType": "modify",
    "summary": "Agrupa instrucciones reutilizables.",
    "objectives": [
      "Agrupa instrucciones reutilizables.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "def crea una función. El código de la función se ejecuta cuando la llamas.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "def saludar():\n    print(\"Hola\")\n\nsaludar()",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Agrupa instrucciones reutilizables. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "def saludar():\n    print(\"Hola\")\n\nsaludar()",
      "expectedOutput": "Hola",
      "validation": {
        "outputExact": "Hola",
        "codeIncludes": [
          "def",
          "saludar"
        ]
      },
      "hints": [
        "La función ya está definida.",
        "No olvides llamarla con paréntesis.",
        "saludar() ejecuta el bloque."
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "cre-11",
    "levelId": "creador",
    "order": 11,
    "title": "Parámetros",
    "icon": "📨",
    "xp": 84,
    "stars": 1,
    "duration": "10 min",
    "difficulty": "Media",
    "activityType": "complete",
    "summary": "Envía datos a una función.",
    "objectives": [
      "Envía datos a una función.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "Los parámetros permiten que la misma función trabaje con valores diferentes.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "def saludar(nombre):\n    print(\"Hola\", nombre)\n\nsaludar(\"Nova\")",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Envía datos a una función. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "def saludar(nombre):\n    # Completa\n    pass\n\nsaludar(\"Nova\")",
      "expectedOutput": "Hola Nova",
      "validation": {
        "outputExact": "Hola Nova",
        "codeIncludes": [
          "def",
          "nombre"
        ]
      },
      "hints": [
        "Usa el parámetro nombre dentro de print.",
        "print puede mostrar texto y la variable.",
        "Dentro escribe print(\"Hola\", nombre)."
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "cre-12",
    "levelId": "creador",
    "order": 12,
    "title": "Devolver con return",
    "icon": "↩️",
    "xp": 88,
    "stars": 1,
    "duration": "13 min",
    "difficulty": "Media",
    "activityType": "complete",
    "summary": "Haz que una función produzca un valor.",
    "objectives": [
      "Haz que una función produzca un valor.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "return entrega un resultado para usarlo fuera de la función.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "def doble(numero):\n    return numero * 2\n\nprint(doble(6))",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Haz que una función produzca un valor. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "def doble(numero):\n    # Devuelve el doble\n    pass\n\nprint(doble(6))",
      "expectedOutput": "12",
      "validation": {
        "outputExact": "12",
        "codeIncludes": [
          "return",
          "*"
        ]
      },
      "hints": [
        "No uses print dentro de la función.",
        "Devuelve numero * 2.",
        "Escribe return numero * 2."
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "cre-13",
    "levelId": "creador",
    "order": 13,
    "title": "Variables locales",
    "icon": "📍",
    "xp": 92,
    "stars": 1,
    "duration": "16 min",
    "difficulty": "Media",
    "activityType": "choose",
    "summary": "Comprende el alcance de los datos.",
    "objectives": [
      "Comprende el alcance de los datos.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "Las variables creadas dentro de una función son locales a esa función.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "def mision():\n    codigo = \"AX9\"\n    print(codigo)\n\nmision()",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Comprende el alcance de los datos. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "def mision():\n    codigo = \"AX9\"\n    print(codigo)\n\nmision()",
      "expectedOutput": "AX9",
      "validation": {
        "outputExact": "AX9",
        "codeIncludes": [
          "def",
          "codigo"
        ]
      },
      "hints": [
        "codigo vive dentro de mision.",
        "La función debe llamarse para ver el resultado.",
        "Ejecuta mision()."
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "cre-14",
    "levelId": "creador",
    "order": 14,
    "title": "Funciones con listas",
    "icon": "🧮",
    "xp": 96,
    "stars": 1,
    "duration": "19 min",
    "difficulty": "Media",
    "activityType": "modify",
    "summary": "Procesa colecciones dentro de funciones.",
    "objectives": [
      "Procesa colecciones dentro de funciones.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "Puedes recibir listas como parámetros y devolver resultados calculados.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "def promedio(notas):\n    return sum(notas) / len(notas)\n\nprint(promedio([8, 10, 9]))",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Procesa colecciones dentro de funciones. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "def promedio(notas):\n    return sum(notas) / len(notas)\n\nprint(promedio([8, 10, 9]))",
      "expectedOutput": "9.0",
      "validation": {
        "outputExact": "9.0",
        "codeIncludes": [
          "sum",
          "len",
          "return"
        ]
      },
      "hints": [
        "Suma las notas y divide entre su cantidad.",
        "sum() y len() ayudan.",
        "return sum(notas) / len(notas)."
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "cre-15",
    "levelId": "creador",
    "order": 15,
    "title": "Funciones integradas",
    "icon": "🧰",
    "xp": 100,
    "stars": 1,
    "duration": "7 min",
    "difficulty": "Media",
    "activityType": "choose",
    "summary": "Usa herramientas que Python ya incluye.",
    "objectives": [
      "Usa herramientas que Python ya incluye.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "len(), sum(), min(), max() y sorted() resuelven tareas frecuentes.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "datos = [4, 9, 2]\nprint(max(datos))",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Usa herramientas que Python ya incluye. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "datos = [4, 9, 2]\nprint(max(datos))",
      "expectedOutput": "9",
      "validation": {
        "outputExact": "9",
        "codeIncludes": [
          "max"
        ]
      },
      "hints": [
        "Busca la función para obtener el mayor.",
        "Se llama max().",
        "Usa max(datos)."
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "cre-16",
    "levelId": "creador",
    "order": 16,
    "title": "Errores y excepciones",
    "icon": "⚠️",
    "xp": 104,
    "stars": 1,
    "duration": "10 min",
    "difficulty": "Media",
    "activityType": "modify",
    "summary": "Entiende por qué falla un programa.",
    "objectives": [
      "Entiende por qué falla un programa.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "Las excepciones aparecen cuando Python encuentra un problema durante la ejecución.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "try:\n    numero = int(\"hola\")\nexcept ValueError:\n    print(\"Dato inválido\")",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Entiende por qué falla un programa. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "try:\n    numero = int(\"hola\")\nexcept ValueError:\n    print(\"Dato inválido\")",
      "expectedOutput": "Dato inválido",
      "validation": {
        "outputExact": "Dato inválido",
        "codeIncludes": [
          "try",
          "except"
        ]
      },
      "hints": [
        "La conversión fallará.",
        "Captura ValueError.",
        "En except ValueError muestra Dato inválido."
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "cre-17",
    "levelId": "creador",
    "order": 17,
    "title": "try / except",
    "icon": "🛡️",
    "xp": 108,
    "stars": 1,
    "duration": "13 min",
    "difficulty": "Media",
    "activityType": "choose",
    "summary": "Evita que un error detenga todo.",
    "objectives": [
      "Evita que un error detenga todo.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "try intenta ejecutar código; except maneja un error conocido.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "try:\n    print(10 / 0)\nexcept ZeroDivisionError:\n    print(\"No se puede dividir entre cero\")",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Evita que un error detenga todo. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "try:\n    print(10 / 0)\nexcept ZeroDivisionError:\n    print(\"No se puede dividir entre cero\")",
      "expectedOutput": "No se puede dividir entre cero",
      "validation": {
        "outputExact": "No se puede dividir entre cero",
        "codeIncludes": [
          "except",
          "ZeroDivisionError"
        ]
      },
      "hints": [
        "Dividir entre cero produce un error específico.",
        "Captura ZeroDivisionError.",
        "Muestra un mensaje dentro del except."
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "cre-18",
    "levelId": "creador",
    "order": 18,
    "title": "Archivos: escribir",
    "icon": "📄",
    "xp": 112,
    "stars": 1,
    "duration": "16 min",
    "difficulty": "Media",
    "activityType": "modify",
    "summary": "Guarda información en un archivo virtual.",
    "objectives": [
      "Guarda información en un archivo virtual.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "open() permite trabajar con archivos. En Pyodide los archivos viven en el sistema virtual de la sesión.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "with open(\"nota.txt\", \"w\") as archivo:\n    archivo.write(\"Misión completada\")\nprint(\"Guardado\")",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Guarda información en un archivo virtual. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "with open(\"nota.txt\", \"w\") as archivo:\n    archivo.write(\"Misión completada\")\nprint(\"Guardado\")",
      "expectedOutput": "Guardado",
      "validation": {
        "outputExact": "Guardado",
        "codeIncludes": [
          "open",
          "write"
        ]
      },
      "hints": [
        "Usa modo w para escribir.",
        "archivo.write guarda texto.",
        "La estructura with open(..., \"w\") ya hace el cierre automático."
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "cre-19",
    "levelId": "creador",
    "order": 19,
    "title": "Organizar un programa",
    "icon": "🧱",
    "xp": 116,
    "stars": 1,
    "duration": "19 min",
    "difficulty": "Media",
    "activityType": "modify",
    "summary": "Separa responsabilidades en funciones.",
    "objectives": [
      "Separa responsabilidades en funciones.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "Un programa claro divide tareas grandes en funciones pequeñas con nombres comprensibles.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "def calcular_total(a, b):\n    return a + b\n\ndef mostrar(total):\n    print(\"Total\", total)\n\nmostrar(calcular_total(4, 6))",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Separa responsabilidades en funciones. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "def calcular_total(a, b):\n    return a + b\n\ndef mostrar(total):\n    print(\"Total\", total)\n\nmostrar(calcular_total(4, 6))",
      "expectedOutput": "Total 10",
      "validation": {
        "outputExact": "Total 10",
        "codeIncludes": [
          "def",
          "return"
        ]
      },
      "hints": [
        "Cada función tiene una responsabilidad.",
        "calcular_total devuelve y mostrar imprime.",
        "Combina ambas en la última línea."
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "cre-20",
    "levelId": "creador",
    "order": 20,
    "title": "Misión Creador",
    "icon": "🏁",
    "xp": 140,
    "stars": 3,
    "duration": "7 min",
    "difficulty": "Media",
    "activityType": "challenge",
    "summary": "Construye un pequeño sistema usando funciones y colecciones.",
    "objectives": [
      "Construye un pequeño sistema usando funciones y colecciones.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "Resolver un problema completo requiere decidir qué estructuras y funciones son adecuadas.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "def promedio(notas):\n    return sum(notas) / len(notas)\n\nalumnos = {\"Luna\": [10, 9, 8]}\nprint(\"Luna\", promedio(alumnos[\"Luna\"]))",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Construye un pequeño sistema usando funciones y colecciones. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "def promedio(notas):\n    return sum(notas) / len(notas)\n\nalumnos = {\"Luna\": [10, 9, 8]}\nprint(\"Luna\", promedio(alumnos[\"Luna\"]))",
      "expectedOutput": "Luna 9.0",
      "validation": {
        "outputExact": "Luna 9.0",
        "codeIncludes": [
          "def",
          "{",
          "sum"
        ]
      },
      "hints": [
        "Usa un diccionario para relacionar alumno y notas.",
        "La función promedio recibe la lista.",
        "Llama promedio(alumnos[\"Luna\"])."
      ],
      "inputs": []
    },
    "isChallenge": true
  },
  {
    "id": "dev-1",
    "levelId": "developer",
    "order": 1,
    "title": "Módulos e import",
    "icon": "📦",
    "xp": 44,
    "stars": 1,
    "duration": "10 min",
    "difficulty": "Avanzada",
    "activityType": "modify",
    "summary": "Usa código organizado en módulos.",
    "objectives": [
      "Usa código organizado en módulos.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "import permite utilizar módulos de la biblioteca estándar o módulos propios.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "import math\nprint(math.sqrt(81))",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Usa código organizado en módulos. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "import math\nprint(math.sqrt(81))",
      "expectedOutput": "9.0",
      "validation": {
        "outputExact": "9.0",
        "codeIncludes": [
          "import",
          "math"
        ]
      },
      "hints": [
        "Necesitas el módulo math.",
        "sqrt calcula raíz cuadrada.",
        "math.sqrt(81) devuelve 9.0."
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "dev-2",
    "levelId": "developer",
    "order": 2,
    "title": "Biblioteca estándar",
    "icon": "🧰",
    "xp": 48,
    "stars": 1,
    "duration": "13 min",
    "difficulty": "Avanzada",
    "activityType": "choose",
    "summary": "Aprovecha herramientas incluidas con Python.",
    "objectives": [
      "Aprovecha herramientas incluidas con Python.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "Python incluye módulos para matemáticas, fechas, estadísticas, aleatoriedad y más.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "import statistics\nprint(statistics.mean([4, 6, 8]))",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Aprovecha herramientas incluidas con Python. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "import statistics\nprint(statistics.mean([4, 6, 8]))",
      "expectedOutput": "6",
      "validation": {
        "outputExact": "6",
        "codeIncludes": [
          "statistics",
          "mean"
        ]
      },
      "hints": [
        "Usa statistics.",
        "mean calcula la media.",
        "statistics.mean([4, 6, 8])."
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "dev-3",
    "levelId": "developer",
    "order": 3,
    "title": "Funciones con valores opcionales",
    "icon": "🎛️",
    "xp": 52,
    "stars": 1,
    "duration": "16 min",
    "difficulty": "Avanzada",
    "activityType": "modify",
    "summary": "Diseña funciones flexibles.",
    "objectives": [
      "Diseña funciones flexibles.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "Los parámetros pueden tener valores por defecto para hacer una función más fácil de usar.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "def saludar(nombre, saludo=\"Hola\"):\n    print(saludo, nombre)\n\nsaludar(\"Aero\")",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Diseña funciones flexibles. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "def saludar(nombre, saludo=\"Hola\"):\n    print(saludo, nombre)\n\nsaludar(\"Aero\")",
      "expectedOutput": "Hola Aero",
      "validation": {
        "outputExact": "Hola Aero",
        "codeIncludes": [
          "saludo="
        ]
      },
      "hints": [
        "El segundo parámetro ya tiene valor por defecto.",
        "Llama solo con el nombre.",
        "saludar(\"Aero\") usa Hola automáticamente."
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "dev-4",
    "levelId": "developer",
    "order": 4,
    "title": "Comprensiones de listas",
    "icon": "⚡",
    "xp": 56,
    "stars": 1,
    "duration": "19 min",
    "difficulty": "Avanzada",
    "activityType": "modify",
    "summary": "Crea listas de forma compacta.",
    "objectives": [
      "Crea listas de forma compacta.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "Una list comprehension combina transformación, recorrido y opcionalmente filtro.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "cuadrados = [n * n for n in range(1, 5)]\nprint(cuadrados)",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Crea listas de forma compacta. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "cuadrados = [n * n for n in range(1, 5)]\nprint(cuadrados)",
      "expectedOutput": "[1, 4, 9, 16]",
      "validation": {
        "outputExact": "[1, 4, 9, 16]",
        "codeIncludes": [
          "for",
          "[",
          "]"
        ]
      },
      "hints": [
        "Piensa en un for dentro de corchetes.",
        "Transforma cada n en n*n.",
        "[n * n for n in range(1, 5)]."
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "dev-5",
    "levelId": "developer",
    "order": 5,
    "title": "Excepciones con finally",
    "icon": "🧯",
    "xp": 60,
    "stars": 1,
    "duration": "7 min",
    "difficulty": "Avanzada",
    "activityType": "choose",
    "summary": "Limpia recursos pase lo que pase.",
    "objectives": [
      "Limpia recursos pase lo que pase.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "finally se ejecuta tanto si hubo error como si no.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "try:\n    print(\"Conectando\")\nfinally:\n    print(\"Cerrando\")",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Limpia recursos pase lo que pase. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "try:\n    print(\"Conectando\")\nfinally:\n    print(\"Cerrando\")",
      "expectedOutput": "Conectando\nCerrando",
      "validation": {
        "outputExact": "Conectando\nCerrando",
        "codeIncludes": [
          "finally"
        ]
      },
      "hints": [
        "finally siempre se ejecuta.",
        "Colócalo después de try.",
        "Dentro de finally muestra Cerrando."
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "dev-6",
    "levelId": "developer",
    "order": 6,
    "title": "Leer archivos",
    "icon": "📖",
    "xp": 64,
    "stars": 1,
    "duration": "10 min",
    "difficulty": "Avanzada",
    "activityType": "modify",
    "summary": "Recupera información guardada.",
    "objectives": [
      "Recupera información guardada.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "El modo r permite leer el contenido de un archivo.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "with open(\"datos.txt\", \"w\") as f:\n    f.write(\"AeroLab Python\")\nwith open(\"datos.txt\", \"r\") as f:\n    print(f.read())",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Recupera información guardada. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "with open(\"datos.txt\", \"w\") as f:\n    f.write(\"AeroLab Python\")\nwith open(\"datos.txt\", \"r\") as f:\n    print(f.read())",
      "expectedOutput": "AeroLab Python",
      "validation": {
        "outputExact": "AeroLab Python",
        "codeIncludes": [
          "read",
          "open"
        ]
      },
      "hints": [
        "Primero se crea el archivo.",
        "Después ábrelo en modo r.",
        "f.read() devuelve su contenido."
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "dev-7",
    "levelId": "developer",
    "order": 7,
    "title": "Algoritmos: contar",
    "icon": "🧮",
    "xp": 68,
    "stars": 1,
    "duration": "13 min",
    "difficulty": "Avanzada",
    "activityType": "algorithm",
    "summary": "Diseña pasos claros para resolver un problema.",
    "objectives": [
      "Diseña pasos claros para resolver un problema.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "Un algoritmo es una secuencia de pasos finitos que transforma datos en una respuesta.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "valores = [1, 4, 7, 8]\npares = 0\nfor valor in valores:\n    if valor % 2 == 0:\n        pares += 1\nprint(pares)",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Diseña pasos claros para resolver un problema. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "valores = [1, 4, 7, 8]\npares = 0\nfor valor in valores:\n    if valor % 2 == 0:\n        pares += 1\nprint(pares)",
      "expectedOutput": "2",
      "validation": {
        "outputExact": "2",
        "codeIncludes": [
          "for",
          "if",
          "%"
        ]
      },
      "hints": [
        "Cuenta solo los pares.",
        "Usa % 2 == 0.",
        "Aumenta pares dentro del if."
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "dev-8",
    "levelId": "developer",
    "order": 8,
    "title": "Búsqueda lineal",
    "icon": "🔎",
    "xp": 72,
    "stars": 1,
    "duration": "16 min",
    "difficulty": "Avanzada",
    "activityType": "algorithm",
    "summary": "Busca un elemento recorriendo una colección.",
    "objectives": [
      "Busca un elemento recorriendo una colección.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "La búsqueda lineal revisa elementos uno por uno hasta encontrar el objetivo.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "datos = [3, 8, 12, 20]\nobjetivo = 12\nencontrado = False\nfor dato in datos:\n    if dato == objetivo:\n        encontrado = True\nprint(encontrado)",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Busca un elemento recorriendo una colección. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "datos = [3, 8, 12, 20]\nobjetivo = 12\nencontrado = False\n# Busca el objetivo\nprint(encontrado)",
      "expectedOutput": "True",
      "validation": {
        "outputExact": "True",
        "codeIncludes": [
          "for",
          "if",
          "=="
        ]
      },
      "hints": [
        "Recorre datos.",
        "Si dato == objetivo cambia encontrado.",
        "Dentro del if asigna encontrado = True."
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "dev-9",
    "levelId": "developer",
    "order": 9,
    "title": "Ordenamiento",
    "icon": "📊",
    "xp": 76,
    "stars": 1,
    "duration": "19 min",
    "difficulty": "Avanzada",
    "activityType": "choose",
    "summary": "Comprende cómo ordenar datos.",
    "objectives": [
      "Comprende cómo ordenar datos.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "sorted() devuelve una nueva lista ordenada; conocer estas operaciones ayuda a pensar en algoritmos.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "datos = [9, 2, 5, 1]\nprint(sorted(datos))",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Comprende cómo ordenar datos. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "datos = [9, 2, 5, 1]\nprint(sorted(datos))",
      "expectedOutput": "[1, 2, 5, 9]",
      "validation": {
        "outputExact": "[1, 2, 5, 9]",
        "codeIncludes": [
          "sorted"
        ]
      },
      "hints": [
        "Python ya incluye una función para ordenar.",
        "Se llama sorted.",
        "Usa sorted(datos)."
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "dev-10",
    "levelId": "developer",
    "order": 10,
    "title": "Clases y objetos",
    "icon": "🤖",
    "xp": 80,
    "stars": 1,
    "duration": "7 min",
    "difficulty": "Avanzada",
    "activityType": "complete",
    "summary": "Modela cosas con datos y comportamiento.",
    "objectives": [
      "Modela cosas con datos y comportamiento.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "Una clase es un molde; un objeto es una instancia creada a partir de ese molde.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "class Robot:\n    pass\n\naero = Robot()\nprint(type(aero).__name__)",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Modela cosas con datos y comportamiento. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "class Robot:\n    pass\n\naero = Robot()\nprint(type(aero).__name__)",
      "expectedOutput": "Robot",
      "validation": {
        "outputExact": "Robot",
        "codeIncludes": [
          "class",
          "Robot"
        ]
      },
      "hints": [
        "Define una clase llamada Robot.",
        "Crea aero con Robot().",
        "type(aero).__name__ muestra el nombre de la clase."
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "dev-11",
    "levelId": "developer",
    "order": 11,
    "title": "Atributos",
    "icon": "🏷️",
    "xp": 84,
    "stars": 1,
    "duration": "10 min",
    "difficulty": "Avanzada",
    "activityType": "complete",
    "summary": "Guarda información dentro de objetos.",
    "objectives": [
      "Guarda información dentro de objetos.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "Los atributos son datos asociados a una instancia y se acceden con punto.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "class Robot:\n    def __init__(self, nombre):\n        self.nombre = nombre\n\naero = Robot(\"Aero\")\nprint(aero.nombre)",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Guarda información dentro de objetos. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "class Robot:\n    def __init__(self, nombre):\n        self.nombre = nombre\n\naero = Robot(\"Aero\")\nprint(aero.nombre)",
      "expectedOutput": "Aero",
      "validation": {
        "outputExact": "Aero",
        "codeIncludes": [
          "self",
          "__init__"
        ]
      },
      "hints": [
        "self representa el objeto actual.",
        "Guarda nombre en self.nombre.",
        "Después consulta aero.nombre."
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "dev-12",
    "levelId": "developer",
    "order": 12,
    "title": "Métodos",
    "icon": "🦾",
    "xp": 88,
    "stars": 1,
    "duration": "13 min",
    "difficulty": "Avanzada",
    "activityType": "modify",
    "summary": "Da comportamiento a tus objetos.",
    "objectives": [
      "Da comportamiento a tus objetos.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "Un método es una función definida dentro de una clase.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "class Robot:\n    def saludar(self):\n        print(\"Hola, explorador\")\n\naero = Robot()\naero.saludar()",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Da comportamiento a tus objetos. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "class Robot:\n    def saludar(self):\n        print(\"Hola, explorador\")\n\naero = Robot()\naero.saludar()",
      "expectedOutput": "Hola, explorador",
      "validation": {
        "outputExact": "Hola, explorador",
        "codeIncludes": [
          "def",
          "self"
        ]
      },
      "hints": [
        "El método recibe self.",
        "Se llama con objeto.metodo().",
        "aero.saludar() ejecuta el método."
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "dev-13",
    "levelId": "developer",
    "order": 13,
    "title": "Constructores",
    "icon": "🏗️",
    "xp": 92,
    "stars": 1,
    "duration": "16 min",
    "difficulty": "Avanzada",
    "activityType": "modify",
    "summary": "Inicializa objetos al crearlos.",
    "objectives": [
      "Inicializa objetos al crearlos.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "__init__ se ejecuta al crear una instancia y prepara sus atributos iniciales.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "class Nave:\n    def __init__(self, energia):\n        self.energia = energia\n\nnave = Nave(100)\nprint(nave.energia)",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Inicializa objetos al crearlos. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "class Nave:\n    def __init__(self, energia):\n        self.energia = energia\n\nnave = Nave(100)\nprint(nave.energia)",
      "expectedOutput": "100",
      "validation": {
        "outputExact": "100",
        "codeIncludes": [
          "__init__",
          "self"
        ]
      },
      "hints": [
        "El constructor recibe energia.",
        "Asigna self.energia = energia.",
        "Nave(100) crea el objeto con ese valor."
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "dev-14",
    "levelId": "developer",
    "order": 14,
    "title": "Herencia básica",
    "icon": "🧬",
    "xp": 96,
    "stars": 1,
    "duration": "19 min",
    "difficulty": "Avanzada",
    "activityType": "complete",
    "summary": "Reutiliza comportamiento entre clases.",
    "objectives": [
      "Reutiliza comportamiento entre clases.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "La herencia permite que una clase hija reciba métodos y atributos de una clase base.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "class Vehiculo:\n    def mover(self):\n        print(\"Moviendo\")\n\nclass Nave(Vehiculo):\n    pass\n\nNave().mover()",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Reutiliza comportamiento entre clases. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "class Vehiculo:\n    def mover(self):\n        print(\"Moviendo\")\n\nclass Nave(Vehiculo):\n    pass\n\nNave().mover()",
      "expectedOutput": "Moviendo",
      "validation": {
        "outputExact": "Moviendo",
        "codeIncludes": [
          "class Nave(Vehiculo)"
        ]
      },
      "hints": [
        "Nave hereda de Vehiculo.",
        "Escribe la clase base entre paréntesis.",
        "class Nave(Vehiculo): permite usar mover()."
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "dev-15",
    "levelId": "developer",
    "order": 15,
    "title": "Organización por capas",
    "icon": "🗃️",
    "xp": 100,
    "stars": 1,
    "duration": "7 min",
    "difficulty": "Avanzada",
    "activityType": "architecture",
    "summary": "Separa datos, lógica y presentación.",
    "objectives": [
      "Separa datos, lógica y presentación.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "Organizar responsabilidades mejora la claridad y facilita probar o cambiar el programa.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "def obtener_datos():\n    return [2, 4, 6]\n\ndef procesar(datos):\n    return sum(datos)\n\nprint(procesar(obtener_datos()))",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Separa datos, lógica y presentación. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "def obtener_datos():\n    return [2, 4, 6]\n\ndef procesar(datos):\n    return sum(datos)\n\nprint(procesar(obtener_datos()))",
      "expectedOutput": "12",
      "validation": {
        "outputExact": "12",
        "codeIncludes": [
          "def",
          "return"
        ]
      },
      "hints": [
        "Una función obtiene y otra procesa.",
        "No mezcles todas las responsabilidades.",
        "La última línea combina ambas funciones."
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "dev-16",
    "levelId": "developer",
    "order": 16,
    "title": "Buenas prácticas",
    "icon": "✨",
    "xp": 104,
    "stars": 1,
    "duration": "10 min",
    "difficulty": "Avanzada",
    "activityType": "refactor",
    "summary": "Escribe código legible.",
    "objectives": [
      "Escribe código legible.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "Nombres claros, funciones pequeñas y comentarios útiles hacen que el código sea más fácil de mantener.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "def calcular_distancia(velocidad, tiempo):\n    return velocidad * tiempo\n\nprint(calcular_distancia(5, 4))",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Escribe código legible. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "def calcular_distancia(velocidad, tiempo):\n    return velocidad * tiempo\n\nprint(calcular_distancia(5, 4))",
      "expectedOutput": "20",
      "validation": {
        "outputExact": "20",
        "codeIncludes": [
          "calcular_distancia",
          "return"
        ]
      },
      "hints": [
        "El nombre de la función explica su objetivo.",
        "Los parámetros también deben ser claros.",
        "Devuelve velocidad * tiempo."
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "dev-17",
    "levelId": "developer",
    "order": 17,
    "title": "Depuración con pruebas",
    "icon": "🧪",
    "xp": 108,
    "stars": 1,
    "duration": "13 min",
    "difficulty": "Avanzada",
    "activityType": "debug",
    "summary": "Comprueba casos antes de dar por terminado un programa.",
    "objectives": [
      "Comprueba casos antes de dar por terminado un programa.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "Probar con entradas diferentes ayuda a detectar errores y confirmar el comportamiento esperado.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "def es_par(n):\n    return n % 2 == 0\n\nprint(es_par(4))\nprint(es_par(5))",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Comprueba casos antes de dar por terminado un programa. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "def es_par(n):\n    return n % 2 == 0\n\nprint(es_par(4))\nprint(es_par(5))",
      "expectedOutput": "True\nFalse",
      "validation": {
        "outputExact": "True\nFalse",
        "codeIncludes": [
          "return",
          "%"
        ]
      },
      "hints": [
        "Prueba un número par y uno impar.",
        "La función debe devolver un booleano.",
        "return n % 2 == 0."
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "dev-18",
    "levelId": "developer",
    "order": 18,
    "title": "Datos estructurados",
    "icon": "🧾",
    "xp": 112,
    "stars": 1,
    "duration": "16 min",
    "difficulty": "Avanzada",
    "activityType": "modify",
    "summary": "Combina listas y diccionarios.",
    "objectives": [
      "Combina listas y diccionarios.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "Colecciones anidadas permiten representar datos más ricos, como una lista de alumnos.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "alumnos = [{\"nombre\": \"Luna\", \"nota\": 9}, {\"nombre\": \"Nova\", \"nota\": 10}]\nprint(alumnos[1][\"nombre\"])",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Combina listas y diccionarios. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "alumnos = [{\"nombre\": \"Luna\", \"nota\": 9}, {\"nombre\": \"Nova\", \"nota\": 10}]\nprint(alumnos[1][\"nombre\"])",
      "expectedOutput": "Nova",
      "validation": {
        "outputExact": "Nova",
        "codeIncludes": [
          "[",
          "{"
        ]
      },
      "hints": [
        "Primero selecciona el segundo diccionario.",
        "Después consulta la clave nombre.",
        "alumnos[1][\"nombre\"] devuelve Nova."
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "dev-19",
    "levelId": "developer",
    "order": 19,
    "title": "Menú de aplicación",
    "icon": "🧭",
    "xp": 116,
    "stars": 1,
    "duration": "19 min",
    "difficulty": "Avanzada",
    "activityType": "project",
    "summary": "Construye una navegación sencilla en consola.",
    "objectives": [
      "Construye una navegación sencilla en consola.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "Los menús combinan entrada, decisiones y funciones para organizar una aplicación.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "opcion = \"1\"\nif opcion == \"1\":\n    print(\"Nueva misión\")\nelse:\n    print(\"Salir\")",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Construye una navegación sencilla en consola. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "opcion = \"1\"\nif opcion == \"1\":\n    print(\"Nueva misión\")\nelse:\n    print(\"Salir\")",
      "expectedOutput": "Nueva misión",
      "validation": {
        "outputExact": "Nueva misión",
        "codeIncludes": [
          "if",
          "else"
        ]
      },
      "hints": [
        "Compara opcion con el texto 1.",
        "Las opciones de input suelen ser strings.",
        "if opcion == \"1\": muestra Nueva misión."
      ],
      "inputs": []
    },
    "isChallenge": false
  },
  {
    "id": "dev-20",
    "levelId": "developer",
    "order": 20,
    "title": "Misión Developer",
    "icon": "🏁",
    "xp": 140,
    "stars": 3,
    "duration": "7 min",
    "difficulty": "Avanzada",
    "activityType": "challenge",
    "summary": "Integra funciones, clases y datos en un pequeño sistema.",
    "objectives": [
      "Integra funciones, clases y datos en un pequeño sistema.",
      "Resolver una práctica con retroalimentación inmediata"
    ],
    "theory": [
      "El objetivo final es plantear una solución, dividirla y construirla de manera clara.",
      "AeroLab Python avanza de una explicación visual a código real y después a práctica."
    ],
    "exampleCode": "class Alumno:\n    def __init__(self, nombre, notas):\n        self.nombre = nombre\n        self.notas = notas\n    def promedio(self):\n        return sum(self.notas) / len(self.notas)\n\na = Alumno(\"Luna\", [10, 9, 8])\nprint(a.nombre, a.promedio())",
    "exercise": {
      "title": "Tu misión",
      "instructions": "Integra funciones, clases y datos en un pequeño sistema. Completa o modifica el código hasta obtener la salida esperada.",
      "starterCode": "class Alumno:\n    def __init__(self, nombre, notas):\n        self.nombre = nombre\n        self.notas = notas\n    def promedio(self):\n        return sum(self.notas) / len(self.notas)\n\na = Alumno(\"Luna\", [10, 9, 8])\nprint(a.nombre, a.promedio())",
      "expectedOutput": "Luna 9.0",
      "validation": {
        "outputExact": "Luna 9.0",
        "codeIncludes": [
          "class",
          "__init__",
          "return"
        ]
      },
      "hints": [
        "Modela un alumno con nombre y notas.",
        "El promedio pertenece al comportamiento del alumno.",
        "Crea un método promedio que use sum y len."
      ],
      "inputs": []
    },
    "isChallenge": true
  }
]

export const specialActivities = [
  {
    "id": "exp-s1",
    "levelId": "explorador",
    "order": 1,
    "title": "Reto 1: Señal perdida",
    "icon": "📡",
    "kind": "challenge",
    "xp": 110,
    "stars": 2,
    "duration": "20–45 min",
    "summary": "Recupera la señal guardando y mostrando el mensaje SOS.",
    "projectIdeas": [
      "Juego de preguntas",
      "Adivina el número",
      "Contador espacial"
    ],
    "exercise": {
      "title": "Reto 1: Señal perdida",
      "instructions": "Recupera la señal guardando y mostrando el mensaje SOS.",
      "starterCode": "mensaje = \"\"\nprint(mensaje)",
      "expectedOutput": "SOS",
      "validation": {
        "outputExact": "SOS",
        "codeIncludes": [
          "mensaje",
          "="
        ]
      },
      "hints": [
        "La señal es texto.",
        "Guárdala en mensaje.",
        "Usa mensaje = \"SOS\"."
      ],
      "inputs": []
    }
  },
  {
    "id": "exp-s2",
    "levelId": "explorador",
    "order": 2,
    "title": "Reto 2: Código averiado",
    "icon": "🧯",
    "kind": "challenge",
    "xp": 120,
    "stars": 2,
    "duration": "20–45 min",
    "summary": "Corrige el programa para que muestre Listo.",
    "projectIdeas": [
      "Juego de preguntas",
      "Adivina el número",
      "Contador espacial"
    ],
    "exercise": {
      "title": "Reto 2: Código averiado",
      "instructions": "Corrige el programa para que muestre Listo.",
      "starterCode": "combustible = 10\nif combustible > 5\nprint(\"Listo\")",
      "expectedOutput": "Listo",
      "validation": {
        "outputExact": "Listo",
        "codeIncludes": [
          "if",
          ":"
        ]
      },
      "hints": [
        "A un if le faltan dos cosas frecuentes.",
        "Revisa los dos puntos y la sangría.",
        "Debe quedar if combustible > 5: y el print indentado."
      ],
      "inputs": []
    }
  },
  {
    "id": "exp-s3",
    "levelId": "explorador",
    "order": 3,
    "title": "Reto 3: Ruta secreta",
    "icon": "🧭",
    "kind": "challenge",
    "xp": 130,
    "stars": 2,
    "duration": "20–45 min",
    "summary": "Usa un bucle para mostrar 1, 2 y 3, uno por línea.",
    "projectIdeas": [
      "Juego de preguntas",
      "Adivina el número",
      "Contador espacial"
    ],
    "exercise": {
      "title": "Reto 3: Ruta secreta",
      "instructions": "Usa un bucle para mostrar 1, 2 y 3, uno por línea.",
      "starterCode": "# Crea la ruta con un for",
      "expectedOutput": "1\n2\n3",
      "validation": {
        "outputExact": "1\n2\n3",
        "codeIncludes": [
          "for",
          "range"
        ]
      },
      "hints": [
        "Necesitas repetir tres números.",
        "range puede comenzar en 1.",
        "for n in range(1, 4): print(n)."
      ],
      "inputs": []
    }
  },
  {
    "id": "exp-s4",
    "levelId": "explorador",
    "order": 4,
    "title": "Reto 4: Jefe de sector",
    "icon": "👾",
    "kind": "challenge",
    "xp": 150,
    "stars": 3,
    "duration": "20–45 min",
    "summary": "Con energia = 70, muestra Acceso si la energía es suficiente (50 o más).",
    "projectIdeas": [
      "Juego de preguntas",
      "Adivina el número",
      "Contador espacial"
    ],
    "exercise": {
      "title": "Reto 4: Jefe de sector",
      "instructions": "Con energia = 70, muestra Acceso si la energía es suficiente (50 o más).",
      "starterCode": "energia = 70\n# Decide si hay acceso",
      "expectedOutput": "Acceso",
      "validation": {
        "outputExact": "Acceso",
        "codeIncludes": [
          "if",
          ">="
        ]
      },
      "hints": [
        "Compara energia con 50.",
        "Usa >=.",
        "if energia >= 50: print(\"Acceso\")."
      ],
      "inputs": []
    }
  },
  {
    "id": "exp-s5",
    "levelId": "explorador",
    "order": 5,
    "title": "Mini‑proyecto: Quiz espacial",
    "icon": "🧪",
    "kind": "mini-project",
    "xp": 180,
    "stars": 3,
    "duration": "20–45 min",
    "summary": "Construye un contador de respuestas correctas. Con [True, False, True] debe mostrar Puntos 2.",
    "projectIdeas": [
      "Juego de preguntas",
      "Adivina el número",
      "Contador espacial"
    ],
    "exercise": {
      "title": "Mini‑proyecto: Quiz espacial",
      "instructions": "Construye un contador de respuestas correctas. Con [True, False, True] debe mostrar Puntos 2.",
      "starterCode": "respuestas = [True, False, True]\npuntos = 0\n# Cuenta los True\nprint(\"Puntos\", puntos)",
      "expectedOutput": "Puntos 2",
      "validation": {
        "outputExact": "Puntos 2",
        "codeIncludes": [
          "for",
          "if",
          "+="
        ]
      },
      "hints": [
        "Recorre las respuestas.",
        "Suma solo cuando la respuesta sea True.",
        "Dentro de if respuesta: usa puntos += 1."
      ],
      "inputs": []
    }
  },
  {
    "id": "exp-s6",
    "levelId": "explorador",
    "order": 6,
    "title": "Mini‑proyecto: Adivina el planeta",
    "icon": "🪐",
    "kind": "mini-project",
    "xp": 200,
    "stars": 3,
    "duration": "20–45 min",
    "summary": "Compara intento y secreto. Con ambos en Marte debe mostrar Correcto.",
    "projectIdeas": [
      "Juego de preguntas",
      "Adivina el número",
      "Contador espacial"
    ],
    "exercise": {
      "title": "Mini‑proyecto: Adivina el planeta",
      "instructions": "Compara intento y secreto. Con ambos en Marte debe mostrar Correcto.",
      "starterCode": "secreto = \"Marte\"\nintento = \"Marte\"\n# Compara y responde",
      "expectedOutput": "Correcto",
      "validation": {
        "outputExact": "Correcto",
        "codeIncludes": [
          "if",
          "=="
        ]
      },
      "hints": [
        "Compara dos strings.",
        "Usa == dentro de if.",
        "if intento == secreto: print(\"Correcto\")."
      ],
      "inputs": []
    }
  },
  {
    "id": "exp-s7",
    "levelId": "explorador",
    "order": 7,
    "title": "Proyecto final Explorador",
    "icon": "🏆",
    "kind": "final-project",
    "xp": 300,
    "stars": 5,
    "duration": "20–45 min",
    "summary": "Crea una misión que cuente tres tareas y muestre Misión aprobada cuando se completen al menos dos.",
    "projectIdeas": [
      "Juego de preguntas",
      "Adivina el número",
      "Contador espacial"
    ],
    "exercise": {
      "title": "Proyecto final Explorador",
      "instructions": "Crea una misión que cuente tres tareas y muestre Misión aprobada cuando se completen al menos dos.",
      "starterCode": "tareas = [True, True, False]\ncompletadas = 0\n# Cuenta tareas y decide el resultado",
      "expectedOutput": "Misión aprobada",
      "validation": {
        "outputExact": "Misión aprobada",
        "codeIncludes": [
          "for",
          "if",
          ">="
        ]
      },
      "hints": [
        "Primero cuenta los True.",
        "Después compara completadas con 2.",
        "Usa un for para contar y un if final para aprobar."
      ],
      "inputs": []
    }
  },
  {
    "id": "cre-s1",
    "levelId": "creador",
    "order": 1,
    "title": "Reto 1: Inventario orbital",
    "icon": "📦",
    "kind": "challenge",
    "xp": 130,
    "stars": 2,
    "duration": "20–45 min",
    "summary": "Agrega Nova a la lista y muestra el último integrante.",
    "projectIdeas": [
      "Calculadora modular",
      "Agenda de tripulación",
      "Sistema de calificaciones"
    ],
    "exercise": {
      "title": "Reto 1: Inventario orbital",
      "instructions": "Agrega Nova a la lista y muestra el último integrante.",
      "starterCode": "equipo = [\"Aero\", \"Luna\"]\n# Agrega Nova y muestra el último",
      "expectedOutput": "Nova",
      "validation": {
        "outputExact": "Nova",
        "codeIncludes": [
          "append",
          "[-1]"
        ]
      },
      "hints": [
        "Usa append.",
        "El último índice puede ser -1.",
        "equipo.append(\"Nova\"); print(equipo[-1])."
      ],
      "inputs": []
    }
  },
  {
    "id": "cre-s2",
    "levelId": "creador",
    "order": 2,
    "title": "Reto 2: Ficha de nave",
    "icon": "🗂️",
    "kind": "challenge",
    "xp": 140,
    "stars": 2,
    "duration": "20–45 min",
    "summary": "Actualiza la energía del diccionario a 100 y muéstrala.",
    "projectIdeas": [
      "Calculadora modular",
      "Agenda de tripulación",
      "Sistema de calificaciones"
    ],
    "exercise": {
      "title": "Reto 2: Ficha de nave",
      "instructions": "Actualiza la energía del diccionario a 100 y muéstrala.",
      "starterCode": "nave = {\"nombre\": \"Aero-1\", \"energia\": 60}\n# Actualiza y muestra energia",
      "expectedOutput": "100",
      "validation": {
        "outputExact": "100",
        "codeIncludes": [
          "nave",
          "energia"
        ]
      },
      "hints": [
        "Accede por la clave energia.",
        "Puedes reasignar esa clave.",
        "nave[\"energia\"] = 100."
      ],
      "inputs": []
    }
  },
  {
    "id": "cre-s3",
    "levelId": "creador",
    "order": 3,
    "title": "Reto 3: Función de combustible",
    "icon": "⛽",
    "kind": "challenge",
    "xp": 150,
    "stars": 2,
    "duration": "20–45 min",
    "summary": "Crea una función doble que devuelva dos veces el valor. Para 8 debe mostrar 16.",
    "projectIdeas": [
      "Calculadora modular",
      "Agenda de tripulación",
      "Sistema de calificaciones"
    ],
    "exercise": {
      "title": "Reto 3: Función de combustible",
      "instructions": "Crea una función doble que devuelva dos veces el valor. Para 8 debe mostrar 16.",
      "starterCode": "def doble(valor):\n    pass\n\nprint(doble(8))",
      "expectedOutput": "16",
      "validation": {
        "outputExact": "16",
        "codeIncludes": [
          "def",
          "return",
          "*"
        ]
      },
      "hints": [
        "La función debe devolver algo.",
        "Multiplica valor por 2.",
        "return valor * 2."
      ],
      "inputs": []
    }
  },
  {
    "id": "cre-s4",
    "levelId": "creador",
    "order": 4,
    "title": "Reto 4: Código resistente",
    "icon": "🛡️",
    "kind": "challenge",
    "xp": 170,
    "stars": 3,
    "duration": "20–45 min",
    "summary": "Maneja una conversión inválida y muestra Entrada inválida.",
    "projectIdeas": [
      "Calculadora modular",
      "Agenda de tripulación",
      "Sistema de calificaciones"
    ],
    "exercise": {
      "title": "Reto 4: Código resistente",
      "instructions": "Maneja una conversión inválida y muestra Entrada inválida.",
      "starterCode": "try:\n    numero = int(\"Aero\")\nexcept ValueError:\n    # Responde al error\n    pass",
      "expectedOutput": "Entrada inválida",
      "validation": {
        "outputExact": "Entrada inválida",
        "codeIncludes": [
          "try",
          "except",
          "ValueError"
        ]
      },
      "hints": [
        "El error es ValueError.",
        "El except ya está listo.",
        "Reemplaza pass por print(\"Entrada inválida\")."
      ],
      "inputs": []
    }
  },
  {
    "id": "cre-s5",
    "levelId": "creador",
    "order": 5,
    "title": "Mini‑proyecto: Calculadora modular",
    "icon": "🧮",
    "kind": "mini-project",
    "xp": 220,
    "stars": 3,
    "duration": "20–45 min",
    "summary": "Crea sumar(a,b) y muestra Resultado 15 al sumar 7 y 8.",
    "projectIdeas": [
      "Calculadora modular",
      "Agenda de tripulación",
      "Sistema de calificaciones"
    ],
    "exercise": {
      "title": "Mini‑proyecto: Calculadora modular",
      "instructions": "Crea sumar(a,b) y muestra Resultado 15 al sumar 7 y 8.",
      "starterCode": "def sumar(a, b):\n    pass\n\nprint(\"Resultado\", sumar(7, 8))",
      "expectedOutput": "Resultado 15",
      "validation": {
        "outputExact": "Resultado 15",
        "codeIncludes": [
          "def",
          "return",
          "+"
        ]
      },
      "hints": [
        "La función debe devolver la suma.",
        "Usa return.",
        "return a + b."
      ],
      "inputs": []
    }
  },
  {
    "id": "cre-s6",
    "levelId": "creador",
    "order": 6,
    "title": "Mini‑proyecto: Calificaciones",
    "icon": "📊",
    "kind": "mini-project",
    "xp": 240,
    "stars": 3,
    "duration": "20–45 min",
    "summary": "Calcula el promedio de [10, 8, 9] y muestra Promedio 9.0.",
    "projectIdeas": [
      "Calculadora modular",
      "Agenda de tripulación",
      "Sistema de calificaciones"
    ],
    "exercise": {
      "title": "Mini‑proyecto: Calificaciones",
      "instructions": "Calcula el promedio de [10, 8, 9] y muestra Promedio 9.0.",
      "starterCode": "notas = [10, 8, 9]\n# Calcula usando sum y len",
      "expectedOutput": "Promedio 9.0",
      "validation": {
        "outputExact": "Promedio 9.0",
        "codeIncludes": [
          "sum",
          "len"
        ]
      },
      "hints": [
        "Suma y divide entre cantidad.",
        "len(notas) cuenta elementos.",
        "print(\"Promedio\", sum(notas) / len(notas))."
      ],
      "inputs": []
    }
  },
  {
    "id": "cre-s7",
    "levelId": "creador",
    "order": 7,
    "title": "Proyecto final Creador",
    "icon": "🏆",
    "kind": "final-project",
    "xp": 340,
    "stars": 5,
    "duration": "20–45 min",
    "summary": "Usa un diccionario de alumnos y una función promedio para mostrar Luna 9.0.",
    "projectIdeas": [
      "Calculadora modular",
      "Agenda de tripulación",
      "Sistema de calificaciones"
    ],
    "exercise": {
      "title": "Proyecto final Creador",
      "instructions": "Usa un diccionario de alumnos y una función promedio para mostrar Luna 9.0.",
      "starterCode": "alumnos = {\"Luna\": [10, 9, 8]}\n\ndef promedio(notas):\n    pass\n\nprint(\"Luna\", promedio(alumnos[\"Luna\"]))",
      "expectedOutput": "Luna 9.0",
      "validation": {
        "outputExact": "Luna 9.0",
        "codeIncludes": [
          "def",
          "return",
          "sum",
          "len"
        ]
      },
      "hints": [
        "La función recibe una lista.",
        "Promedio = suma / cantidad.",
        "return sum(notas) / len(notas)."
      ],
      "inputs": []
    }
  },
  {
    "id": "dev-s1",
    "levelId": "developer",
    "order": 1,
    "title": "Reto 1: Módulo de navegación",
    "icon": "🧭",
    "kind": "challenge",
    "xp": 160,
    "stars": 2,
    "duration": "20–45 min",
    "summary": "Usa math.sqrt para mostrar 12.0 a partir de 144.",
    "projectIdeas": [
      "Gestor de alumnos",
      "Aventura orientada a objetos",
      "Aplicación de consola organizada"
    ],
    "exercise": {
      "title": "Reto 1: Módulo de navegación",
      "instructions": "Usa math.sqrt para mostrar 12.0 a partir de 144.",
      "starterCode": "import math\n# Muestra la raíz de 144",
      "expectedOutput": "12.0",
      "validation": {
        "outputExact": "12.0",
        "codeIncludes": [
          "import",
          "math",
          "sqrt"
        ]
      },
      "hints": [
        "Ya importaste math.",
        "Usa sqrt.",
        "print(math.sqrt(144))."
      ],
      "inputs": []
    }
  },
  {
    "id": "dev-s2",
    "levelId": "developer",
    "order": 2,
    "title": "Reto 2: Filtrado rápido",
    "icon": "⚡",
    "kind": "challenge",
    "xp": 180,
    "stars": 2,
    "duration": "20–45 min",
    "summary": "Crea con comprensión la lista de pares de 1 a 6 y muéstrala.",
    "projectIdeas": [
      "Gestor de alumnos",
      "Aventura orientada a objetos",
      "Aplicación de consola organizada"
    ],
    "exercise": {
      "title": "Reto 2: Filtrado rápido",
      "instructions": "Crea con comprensión la lista de pares de 1 a 6 y muéstrala.",
      "starterCode": "pares = []\n# Usa una list comprehension\nprint(pares)",
      "expectedOutput": "[2, 4, 6]",
      "validation": {
        "outputExact": "[2, 4, 6]",
        "codeIncludes": [
          "for",
          "%",
          "[",
          "]"
        ]
      },
      "hints": [
        "Filtra números cuyo residuo sea 0.",
        "Recorre range(1, 7).",
        "pares = [n for n in range(1, 7) if n % 2 == 0]."
      ],
      "inputs": []
    }
  },
  {
    "id": "dev-s3",
    "levelId": "developer",
    "order": 3,
    "title": "Reto 3: Robot con energía",
    "icon": "🤖",
    "kind": "challenge",
    "xp": 200,
    "stars": 2,
    "duration": "20–45 min",
    "summary": "Crea una clase Robot con energia inicial y muestra 100.",
    "projectIdeas": [
      "Gestor de alumnos",
      "Aventura orientada a objetos",
      "Aplicación de consola organizada"
    ],
    "exercise": {
      "title": "Reto 3: Robot con energía",
      "instructions": "Crea una clase Robot con energia inicial y muestra 100.",
      "starterCode": "class Robot:\n    # Crea el constructor\n    pass\n\naero = Robot(100)\nprint(aero.energia)",
      "expectedOutput": "100",
      "validation": {
        "outputExact": "100",
        "codeIncludes": [
          "class",
          "__init__",
          "self"
        ]
      },
      "hints": [
        "Necesitas __init__.",
        "Guarda el parámetro en self.energia.",
        "def __init__(self, energia): self.energia = energia."
      ],
      "inputs": []
    }
  },
  {
    "id": "dev-s4",
    "levelId": "developer",
    "order": 4,
    "title": "Reto 4: Herencia orbital",
    "icon": "🧬",
    "kind": "challenge",
    "xp": 220,
    "stars": 3,
    "duration": "20–45 min",
    "summary": "Haz que Nave herede mover() de Vehiculo y muestre Moviendo.",
    "projectIdeas": [
      "Gestor de alumnos",
      "Aventura orientada a objetos",
      "Aplicación de consola organizada"
    ],
    "exercise": {
      "title": "Reto 4: Herencia orbital",
      "instructions": "Haz que Nave herede mover() de Vehiculo y muestre Moviendo.",
      "starterCode": "class Vehiculo:\n    def mover(self):\n        print(\"Moviendo\")\n\nclass Nave:\n    pass\n\nNave().mover()",
      "expectedOutput": "Moviendo",
      "validation": {
        "outputExact": "Moviendo",
        "codeIncludes": [
          "class Nave(Vehiculo)"
        ]
      },
      "hints": [
        "Nave debe heredar.",
        "Pon Vehiculo entre paréntesis.",
        "class Nave(Vehiculo):."
      ],
      "inputs": []
    }
  },
  {
    "id": "dev-s5",
    "levelId": "developer",
    "order": 5,
    "title": "Mini‑proyecto: Gestor de alumnos",
    "icon": "🎓",
    "kind": "mini-project",
    "xp": 280,
    "stars": 3,
    "duration": "20–45 min",
    "summary": "Crea Alumno con nombre y notas, método promedio, y muestra Luna 9.0.",
    "projectIdeas": [
      "Gestor de alumnos",
      "Aventura orientada a objetos",
      "Aplicación de consola organizada"
    ],
    "exercise": {
      "title": "Mini‑proyecto: Gestor de alumnos",
      "instructions": "Crea Alumno con nombre y notas, método promedio, y muestra Luna 9.0.",
      "starterCode": "class Alumno:\n    pass\n\n# Crea a Luna con [10, 9, 8] y muestra su promedio",
      "expectedOutput": "Luna 9.0",
      "validation": {
        "outputExact": "Luna 9.0",
        "codeIncludes": [
          "class",
          "__init__",
          "def",
          "return"
        ]
      },
      "hints": [
        "Crea atributos nombre y notas.",
        "promedio usa sum y len.",
        "Crea la instancia y usa print(alumno.nombre, alumno.promedio())."
      ],
      "inputs": []
    }
  },
  {
    "id": "dev-s6",
    "levelId": "developer",
    "order": 6,
    "title": "Mini‑proyecto: Persistencia local Python",
    "icon": "💾",
    "kind": "mini-project",
    "xp": 300,
    "stars": 3,
    "duration": "20–45 min",
    "summary": "Escribe Aero,120 en perfil.txt, léelo y muestra su contenido.",
    "projectIdeas": [
      "Gestor de alumnos",
      "Aventura orientada a objetos",
      "Aplicación de consola organizada"
    ],
    "exercise": {
      "title": "Mini‑proyecto: Persistencia local Python",
      "instructions": "Escribe Aero,120 en perfil.txt, léelo y muestra su contenido.",
      "starterCode": "# Escribe y lee perfil.txt",
      "expectedOutput": "Aero,120",
      "validation": {
        "outputExact": "Aero,120",
        "codeIncludes": [
          "open",
          "write",
          "read"
        ]
      },
      "hints": [
        "Usa with open en modo w.",
        "Después abre en modo r.",
        "Escribe \"Aero,120\" y luego print(f.read())."
      ],
      "inputs": []
    }
  },
  {
    "id": "dev-s7",
    "levelId": "developer",
    "order": 7,
    "title": "Proyecto final Developer",
    "icon": "🏆",
    "kind": "final-project",
    "xp": 420,
    "stars": 5,
    "duration": "20–45 min",
    "summary": "Construye un pequeño sistema Alumno con promedio y estado. Para Luna debe mostrar Luna 9.0 Aprobado.",
    "projectIdeas": [
      "Gestor de alumnos",
      "Aventura orientada a objetos",
      "Aplicación de consola organizada"
    ],
    "exercise": {
      "title": "Proyecto final Developer",
      "instructions": "Construye un pequeño sistema Alumno con promedio y estado. Para Luna debe mostrar Luna 9.0 Aprobado.",
      "starterCode": "class Alumno:\n    # Diseña constructor, promedio y estado\n    pass\n\na = Alumno(\"Luna\", [10, 9, 8])\nprint(a.nombre, a.promedio(), a.estado())",
      "expectedOutput": "Luna 9.0 Aprobado",
      "validation": {
        "outputExact": "Luna 9.0 Aprobado",
        "codeIncludes": [
          "class",
          "__init__",
          "return",
          "def"
        ]
      },
      "hints": [
        "Guarda nombre y notas.",
        "promedio usa sum/len.",
        "estado devuelve \"Aprobado\" si promedio >= 6."
      ],
      "inputs": []
    }
  }
]

export const achievements = [
  {
    "id": "first-code",
    "icon": "💻",
    "name": "Primer programa",
    "description": "Completa tu primera misión.",
    "test": "lessons>=1"
  },
  {
    "id": "five",
    "icon": "⭐",
    "name": "5 misiones seguidas",
    "description": "Completa cinco misiones.",
    "test": "lessons>=5"
  },
  {
    "id": "explorer",
    "icon": "🚀",
    "name": "Explorador completado",
    "description": "Termina las 20 misiones de Explorador.",
    "test": "explorador>=20"
  },
  {
    "id": "creator",
    "icon": "🎨",
    "name": "Creador completado",
    "description": "Termina las 20 misiones de Creador.",
    "test": "creador>=20"
  },
  {
    "id": "developer",
    "icon": "💻",
    "name": "Developer completado",
    "description": "Termina las 20 misiones de Developer.",
    "test": "developer>=20"
  },
  {
    "id": "special",
    "icon": "🏆",
    "name": "Cazador de retos",
    "description": "Completa una actividad especial.",
    "test": "specials>=1"
  },
  {
    "id": "xp1000",
    "icon": "⚡",
    "name": "Mil de experiencia",
    "description": "Alcanza 1000 XP.",
    "test": "xp>=1000"
  },
  {
    "id": "all",
    "icon": "🌌",
    "name": "Maestro AeroLab Python",
    "description": "Completa las 60 misiones.",
    "test": "lessons>=60"
  }
]


export const getLessonsByLevel = (levelId) => lessons.filter((lesson) => lesson.levelId === levelId).sort((a,b) => a.order-b.order)
export const getSpecialsByLevel = (levelId) => specialActivities.filter((item) => item.levelId === levelId).sort((a,b) => a.order-b.order)
export const getLesson = (id) => lessons.find((lesson) => lesson.id === id)
export const getSpecial = (id) => specialActivities.find((item) => item.id === id)
export const getActivity = (id) => getLesson(id) || getSpecial(id)
export const totalEvaluableActivities = lessons.length + specialActivities.length
