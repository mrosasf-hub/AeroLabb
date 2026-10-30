const W = (id, title, subtitle, concept, accent, activities) => ({ id, title, subtitle, concept, accent, activities })
const A = (id, order, title, type, prompt, payload = {}) => ({ id, order, title, type, prompt, xp: payload.xp ?? 20, stars: payload.stars ?? 1, ...payload })

export const kidsWorlds = [
  W('ordenes', 'Primeras órdenes', 'Aprende a dar instrucciones en el orden correcto.', 'Secuencias y print()', 'cyan', [
    A('kid-01',1,'Saluda a la computadora','choice','¿Qué instrucción muestra un mensaje en Python?',{options:['print("Hola")','input("Hola")','Hola = print'],correct:0,explanation:'print() sirve para mostrar texto o valores en la pantalla.'}),
    A('kid-02',2,'Arma tu primer print','order','Ordena las piezas para mostrar Hola.',{tokens:['print','(','"Hola"',')'],answer:['print','(','"Hola"',')'],code:'print("Hola")',explanation:'Primero escribimos print, luego abrimos paréntesis, colocamos el texto y cerramos.'}),
    A('kid-03',3,'¿Qué aparecerá?','predict','Observa el código y elige lo que aparecerá.',{code:'print("AeroLab")',options:['Python','AeroLab','print'],correct:1,explanation:'Python muestra exactamente el texto que está entre comillas.'}),
    A('kid-04',4,'Completa el mensaje','fill','Elige la pieza que completa el código.',{before:'print(',after:')',choices:['"Hola"','Hola','print'],correct:'"Hola"',explanation:'El texto se escribe entre comillas.'}),
    A('kid-05',5,'Caza del bug','bug','¿Qué le falta a este código?',{code:'print("Hola"',options:['Un paréntesis )','Un signo =','La palabra if'],correct:0,explanation:'Abrimos un paréntesis y también debemos cerrarlo.'}),
    A('kid-06',6,'Dos mensajes','order','Ordena las líneas para que primero salude y después se despida.',{tokens:['print("Adiós")','print("Hola")'],answer:['print("Hola")','print("Adiós")'],code:'print("Hola")\nprint("Adiós")',explanation:'Python ejecuta las instrucciones de arriba hacia abajo.'}),
    A('kid-07',7,'Robot mensajero','sequence','Lleva al personaje hasta la estrella usando flechas.',{grid:{rows:3,cols:4,start:[2,0],goal:[0,3],blocks:[[1,1]]},maxMoves:6,explanation:'Programar también es crear una secuencia de instrucciones.'}),
    A('kid-08',8,'Mensaje secreto','fill','Elige el texto correcto para que la pantalla diga Misión lista.',{before:'print(',after:')',choices:['"Misión lista"','Misión lista','"Misión" +'],correct:'"Misión lista"',explanation:'Las comillas indican que estamos trabajando con texto.'}),
    A('kid-09',9,'Jefe: Activa a Aero','boss','Completa los tres pasos para activar el sistema.',{stages:[{type:'choice',prompt:'¿Qué función muestra texto?',options:['print()','range()','if'],correct:0},{type:'predict',prompt:'¿Qué muestra print("Listo")?',options:['Listo','print','Nada'],correct:0},{type:'choice',prompt:'¿En qué orden ejecuta Python?',options:['De arriba hacia abajo','Al azar','De abajo hacia arriba'],correct:0}],xp:60,stars:3,explanation:'Ya dominas secuencias y tus primeros mensajes en Python.'}),
  ]),
  W('variables', 'Cajas mágicas', 'Guarda nombres, números y datos para usarlos después.', 'Variables y datos', 'orange', [
    A('kid-10',1,'Una caja llamada nombre','choice','¿Cuál guarda Ana en una variable llamada nombre?',{options:['nombre = "Ana"','"Ana" = nombre','nombre == "Ana"'],correct:0,explanation:'Usamos = para guardar un valor dentro de una variable.'}),
    A('kid-11',2,'Guarda una edad','fill','Elige el valor para guardar diez en edad.',{before:'edad = ',after:'',choices:['10','"10 años"','edad'],correct:'10',explanation:'Los números pueden guardarse sin comillas.'}),
    A('kid-12',3,'Abre la caja','predict','¿Qué mostrará este programa?',{code:'mascota = "Luna"\nprint(mascota)',options:['mascota','Luna','Nada'],correct:1,explanation:'print(mascota) muestra el valor guardado en la variable.'}),
    A('kid-13',4,'Cambia el contenido','choice','Si puntos vale 3 y luego hacemos puntos = 5, ¿cuánto vale al final?',{options:['3','5','8'],correct:1,explanation:'Una variable puede cambiar de valor durante el programa.'}),
    A('kid-14',5,'Une nombre y edad','order','Ordena las líneas para guardar primero los datos y después mostrarlos.',{tokens:['print(nombre)','edad = 8','nombre = "Leo"','print(edad)'],answer:['nombre = "Leo"','edad = 8','print(nombre)','print(edad)'],explanation:'Primero guardamos los datos y luego podemos utilizarlos.'}),
    A('kid-15',6,'Caza del bug','bug','¿Qué problema tiene este código?',{code:'nombre = Luna\nprint(nombre)',options:['Luna necesita comillas','Falta un if','No se puede usar print'],correct:0,explanation:'Luna es texto, así que debe escribirse entre comillas.'}),
    A('kid-16',7,'Recolecta datos','sequence','Llega a la estrella evitando el obstáculo.',{grid:{rows:4,cols:4,start:[3,0],goal:[0,3],blocks:[[2,1],[1,1]]},maxMoves:8,explanation:'Las variables nos ayudan a recordar datos mientras seguimos una secuencia.'}),
    A('kid-17',8,'Mi ficha','fill','Completa una variable que guarde tu color favorito.',{before:'color = ',after:'',choices:['"azul"','azul','print'],correct:'"azul"',explanation:'Los textos se almacenan entre comillas.'}),
    A('kid-18',9,'Jefe: El inventario','boss','Demuestra que sabes guardar y recuperar datos.',{stages:[{type:'choice',prompt:'¿Qué símbolo guarda un valor?',options:['=','>','+'],correct:0},{type:'predict',prompt:'x = 4; print(x) muestra...',options:['x','4','Nada'],correct:1},{type:'choice',prompt:'¿Cuál es texto?',options:['"robot"','12','3.5'],correct:0}],xp:60,stars:3,explanation:'Ya sabes usar variables como cajas de información.'}),
  ]),
  W('decisiones', 'Elige el camino', 'Haz que el programa tome decisiones según lo que ocurre.', 'if, else y comparaciones', 'violet', [
    A('kid-19',1,'Una pregunta para Python','choice','¿Qué palabra usamos para preguntar si algo se cumple?',{options:['if','print','for'],correct:0,explanation:'if significa “si” y permite tomar decisiones.'}),
    A('kid-20',2,'Mayor o menor','predict','¿Qué mostrará este programa?',{code:'edad = 10\nif edad >= 8:\n    print("Entra")',options:['Entra','No entra','Error'],correct:0,explanation:'10 es mayor o igual que 8, así que la condición es verdadera.'}),
    A('kid-21',3,'El camino contrario','choice','¿Qué palabra usamos cuando la condición NO se cumple?',{options:['else','print','input'],correct:0,explanation:'else indica qué hacer en el caso contrario.'}),
    A('kid-22',4,'Semáforo','choice','Si luz = "verde", ¿qué acción tiene sentido?',{options:['Avanzar','Detenerse siempre','Borrar el programa'],correct:0,explanation:'Las condiciones permiten que el programa reaccione a los datos.'}),
    A('kid-23',5,'Completa la condición','fill','Elige el operador para comprobar si energía es mayor que 5.',{before:'if energia ',after:' 5:',choices:['>','=', 'print'],correct:'>',explanation:'> significa “mayor que”.'}),
    A('kid-24',6,'Caza del bug','bug','¿Qué falta al final de la línea if?',{code:'if puntos > 10\n    print("Premio")',options:['Dos puntos :','Un paréntesis','Comillas'],correct:0,explanation:'En Python las condiciones terminan con dos puntos.'}),
    A('kid-25',7,'Puertas de colores','sequence','Llega a la meta. Imagina que cada obstáculo es una decisión.',{grid:{rows:4,cols:5,start:[3,0],goal:[0,4],blocks:[[3,2],[2,2],[1,3]]},maxMoves:9,explanation:'Una decisión cambia el camino que sigue un programa.'}),
    A('kid-26',8,'¿Verdadero o falso?','choice','¿Es verdadero 7 > 3?',{options:['Sí','No','Solo a veces'],correct:0,explanation:'7 es mayor que 3, así que la comparación es verdadera.'}),
    A('kid-27',9,'Jefe: Control de acceso','boss','Resuelve tres decisiones para abrir la estación.',{stages:[{type:'choice',prompt:'¿Qué inicia una condición?',options:['if','for','print'],correct:0},{type:'predict',prompt:'x=2; if x>5: print("A") ¿se imprime A?',options:['No','Sí','Siempre'],correct:0},{type:'choice',prompt:'¿Qué usa el caso contrario?',options:['else','range','input'],correct:0}],xp:60,stars:3,explanation:'Ya puedes construir programas que toman decisiones.'}),
  ]),
  W('bucles', 'Repite la misión', 'Descubre cómo repetir instrucciones sin escribirlas muchas veces.', 'for, while y repetición', 'green', [
    A('kid-28',1,'Repetir sin copiar','choice','¿Qué palabra puede repetir una acción varias veces?',{options:['for','else','print'],correct:0,explanation:'for permite repetir instrucciones de forma controlada.'}),
    A('kid-29',2,'Cuenta con range','predict','¿Cuántas veces se ejecuta este print?',{code:'for i in range(3):\n    print("Hola")',options:['1','3','4'],correct:1,explanation:'range(3) produce tres pasos: 0, 1 y 2.'}),
    A('kid-30',3,'Completa el bucle','fill','Elige la cantidad para repetir cuatro veces.',{before:'for i in range(',after:'):',choices:['4','1','"4"'],correct:'4',explanation:'range(4) crea cuatro iteraciones.'}),
    A('kid-31',4,'Ordena el bucle','order','Ordena las partes principales.',{tokens:['print(i)','for i in range(3):'],answer:['for i in range(3):','print(i)'],explanation:'Primero declaramos el bucle y dentro colocamos lo que se repite.'}),
    A('kid-32',5,'Caza del bug','bug','¿Qué necesita la segunda línea?',{code:'for i in range(3):\nprint(i)',options:['Sangría','Comillas','Un else'],correct:0,explanation:'El código que pertenece al bucle debe estar indentado.'}),
    A('kid-33',6,'Mientras haya energía','choice','¿Qué bucle significa “mientras se cumpla algo”?',{options:['while','if','print'],correct:0,explanation:'while repite mientras una condición siga siendo verdadera.'}),
    A('kid-34',7,'Ruta repetitiva','sequence','Llega a la meta con la menor cantidad de movimientos.',{grid:{rows:3,cols:6,start:[1,0],goal:[1,5],blocks:[[0,2],[2,3]]},maxMoves:5,explanation:'Cuando una acción se repite, un bucle puede simplificar el programa.'}),
    A('kid-35',8,'Detecta el patrón','choice','Si avanzas 5 veces, ¿qué es más claro?',{options:['Un bucle de 5 repeticiones','Escribir 5 programas distintos','No usar instrucciones'],correct:0,explanation:'Los bucles reducen repetición y hacen el código más claro.'}),
    A('kid-36',9,'Jefe final: Despegue','boss','Combina secuencias, variables, decisiones y repetición.',{stages:[{type:'choice',prompt:'¿Qué guarda información?',options:['Variable','else','print'],correct:0},{type:'choice',prompt:'¿Qué toma decisiones?',options:['if','range','comentario'],correct:0},{type:'choice',prompt:'¿Qué repite?',options:['for','str','input'],correct:0}],xp:100,stars:5,explanation:'Terminaste la Zona Infantil. Ya tienes las ideas clave para entrar a Explorador.'}),
  ]),
]

export const kidsActivities = kidsWorlds.flatMap((world) => world.activities.map((activity) => ({ ...activity, worldId: world.id })))
export const getKidsWorld = (id) => kidsWorlds.find((world) => world.id === id)
export const getKidsActivity = (id) => kidsActivities.find((activity) => activity.id === id)
export const getNextKidsActivity = (id) => {
  const index = kidsActivities.findIndex((activity) => activity.id === id)
  return index >= 0 ? kidsActivities[index + 1] ?? null : null
}
