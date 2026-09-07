# Introducción a JavaScript

> **IMPORTANTE:** esto no es una introducción completa a JavaScript. Se trata de los **conocimientos mínimos necesarios para empezar las prácticas de ADI**. Pasaremos por alto muchos temas avanzados (¡y también algunos básicos!). Conforme avancemos en la asignatura iremos introduciendo lo que nos haga falta.

JavaScript nació dentro del navegador, pero también se utiliza en servidores y aplicaciones de escritorio. Aquí veremos el núcleo del lenguaje, sin entrar todavía en programación de frontend ni de backend.

> Los bloques de código son ejemplos independientes, salvo que se indique lo contrario. Podéis probarlos por separado en una consola JavaScript del navegador o con Node.js. Usaremos `console.log()` para mostrar resultados y `console.error()` para mostrar errores. Las líneas que producirían errores deliberadamente están comentadas: podéis descomentarlas para comprobar qué ocurre.

## Características básicas del lenguaje

- **No es una versión reducida de Java.** Comparten parte de la sintaxis, pero son lenguajes diferentes.
- **No es un lenguaje trivial.** Permite escribir desde pequeños programas hasta aplicaciones completas. Que los primeros ejemplos sean cortos no significa que el lenguaje no tenga sus sutilezas.
- **Aunque no es del todo correcto podemos decir que es interpretado, no compilado.** Normalmente entregamos código fuente al entorno de ejecución, sin un paso de compilación explícito como el habitual en C/C++. No obstante los motores JS modernos combinan interpretación y compilación interna, incluidas técnicas JIT (*Just In Time*), para ejecutar y optimizar ese código.
- **El lenguaje y el entorno son cosas distintas.** ECMAScript (o "ES") es el estándar que define el núcleo de JavaScript, incluidos elementos como los arrays y las promesas. El navegador y Node.js añaden sus propias APIs. Manipular HTML, por ejemplo, es una capacidad del navegador, no del núcleo del lenguaje.
- **En 2015 se cambió el sistema de numeración de versiones, ES6 pasó a ser ES2015**: Desde 2015 se publican revisiones anuales del lenguaje. No necesitamos aprender el lenguaje por versiones: usaremos directamente las construcciones modernas que necesitamos.

El código que una aplicación envía al navegador puede inspeccionarse, aunque esté minificado. Esto se debe a que se entrega al cliente; no es una consecuencia de que el lenguaje sea interpretado. El código ejecutado en un servidor no se entrega automáticamente al navegador.

> JavaScript tiene fama de ser un lenguaje «rarito». Algunas sorpresas vienen de sus conversiones automáticas y de decisiones históricas. Las iremos viendo con ejemplos, pero no hace falta memorizar una colección de rarezas para empezar a programar bien.

## Sintaxis básica: valores, tipos y variables

La sintaxis recuerda a C/Java: usamos llaves para agrupar sentencias y comentarios `// ...` o `/* ... */`. JavaScript distingue entre mayúsculas y minúsculas. El lenguaje puede insertar automáticamente ciertos puntos y coma, pero eso no significa que cualquier salto de línea sea válido: en estos apuntes escribiremos `;` al terminar las sentencias que lo admiten.

### `const` y `let`

> Siguiendo prácticas de programación modernas en cualquier lenguaje, **se recomienda usar `const` por defecto; `let` cuando necesitéis reasignar la variable.** Dejamos `var` para reconocer código antiguo, en la ampliación.

```javascript
const nombre = "Pepe";
let contador = 0;
contador = contador + 1;

console.log(nombre, contador); // Pepe 1
// nombre = "Ana"; // TypeError: no podemos reasignar una constante
```

`const` exige un valor inicial. `let` permite declarar una variable sin inicializarla. Las variables no tienen un tipo fijo declarado: **los valores tienen tipo**, y una variable declarada con `let` puede recibir valores de tipos diferentes.

```javascript
let dato;
console.log(dato); // undefined

dato = 1;
dato = "Hola"; // Cambiamos el tipo del valor. Y JS sin rechistar
dato = [1, 2]; // Ahora contiene una referencia a un array
```

Que el lenguaje lo permita no significa que convenga cambiar continuamente el significado de una variable. Los nombres y los tipos coherentes ayudan a entender el programa.

`let` y `const` tienen **ámbito de bloque**: una variable declarada dentro de unas llaves no está disponible fuera de ellas.

```javascript
if (true) {
    const mensaje = "Solo existo en este bloque";
    console.log(mensaje);
}
// console.log(mensaje); // ReferenceError
```

### Tipos y `typeof`

Distinguimos entre valores **primitivos** y **objetos**:

- Primitivos: `number`, `string`, `boolean`, `undefined`, `null`, `bigint` y `symbol`. Los dos últimos no los necesitaremos por ahora.
- Objetos: objetos que creamos nosotros, arrays, funciones, fechas, etc.

El operador `typeof` permite consultar el tipo de un valor, con alguna peculiaridad histórica:

```javascript
console.log(typeof 3);            // "number"
console.log(typeof 3.5);          // "number"
console.log(typeof "hola");       // "string"
console.log(typeof true);         // "boolean"
console.log(typeof undefined);    // "undefined"
console.log(typeof { nombre: "Pepe" }); // "object"
console.log(typeof [1, 2]);        // "object"
console.log(typeof function () {}); // "function"
console.log(typeof null);         // "object". ¡Una rareza histórica!
```

`null` es un primitivo, aunque `typeof null` devuelva `"object"`. Las funciones, por su parte, son objetos que se pueden invocar, aunque `typeof` las distinga con `"function"`.

Los números habituales usan el tipo `number`, representado en coma flotante de doble precisión: tanto `3` como `3.5` son de ese tipo. Esto implica límites de precisión; por ejemplo, `0.1 + 0.2 === 0.3` da `false`. `bigint` permite representar enteros de precisión arbitraria, pero lo dejamos para otro momento.

### `undefined` y `null`

No son lo mismo:

- `undefined` aparece, por ejemplo, al leer una variable declarada sin inicializar o una propiedad que no existe.
- `null` suele expresar una ausencia deliberada: «por ahora no hay un valor».

```javascript
let pendiente;
const usuarioSeleccionado = null;

console.log(pendiente === undefined);       // true
console.log(usuarioSeleccionado === null); // true
console.log(null === undefined);           // false
// console.log(variableInexistente); // ReferenceError: no se ha declarado
```

## Operadores y conversiones de tipos

Muchos operadores son los conocidos de C/Java: `+`, `-`, `*`, `/`, `%`, `<`, `>=`, `&&`, `||`, `!`, etc. El operador `+` también concatena cadenas. JavaScript puede convertir tipos automáticamente, y aquí empiezan algunas sorpresas:

```javascript
console.log(1 + 2);       // 3
console.log("1" + 2);     // "12"
console.log("6" - 2);     // 4
console.log(Number("6")); // 6: conversión explícita
console.log(String(42));  // "42"
console.log(Number("hola")); // NaN: resultado numérico no válido
```

### Igualdad: mejor `===` y `!==`

`==` y `!=` permiten conversiones de tipos. `===` y `!==` comparan sin convertirlos.

```javascript
console.log(1 == "1");          // true
console.log(false == "0");      // true: ambos acaban comparándose como 0
console.log(1 === "1");         // false
console.log(1 === true);        // false
console.log(null == undefined); // true
console.log(null === undefined); // false
```

> **Como regla práctica, usad `===` y `!==`.** Cuando haga falta una conversión, expresadla de forma explícita. Así se ve qué queréis comparar.

`NaN` tiene otra peculiaridad: no es igual a sí mismo. Para comprobarlo, usad `Number.isNaN(valor)`.

### Truthy y falsy

Una condición no exige que su expresión ya sea un booleano: convierte su resultado a booleano. Los valores que se convierten a `false` se llaman *falsy*; los que se convierten a `true`, *truthy*.

Los valores falsy que nos interesan son `false`, `0`, `-0`, `""`, `null`, `undefined` y `NaN`; también lo es `0n`, el cero de `bigint`. El resto de valores habituales son truthy, **incluidos los arrays y objetos vacíos**.

```javascript
if ("hola") {
    console.log("Esto se ejecuta");
}
if (0) {
    console.log("Esto no se ejecuta");
}
if ([]) {
    console.log("¡Esto sí se ejecuta!");
}

console.log(Boolean("false")); // true: es una cadena no vacía
console.log(Boolean("0"));     // true: también es una cadena no vacía
```

No confundáis «tiene un valor truthy» con «existe» o «contiene elementos». Si `0` es un dato válido, `if (dato)` no sirve para comprobar si se ha proporcionado. Para un array, comprobaremos `array.length > 0`.

## Cadenas y template literals

Las cadenas pueden delimitarse con comillas simples o dobles. Ambas formas son equivalentes; elegid la que resulte más legible.

```javascript
const frase = 'Homer dice "¡mosquis!"';
const saludo = "Hola, Pepe";
console.log(frase);
console.log(saludo.length); // 10
```

Los **template literals** usan acentos graves (*backticks*) y permiten insertar expresiones mediante `${...}`, además de escribir cadenas multilínea:

```javascript
const nombre = "Pepe";
const edad = 20;

console.log(`Hola, ${nombre}. El año que viene tendrás ${edad + 1} años.`);

const mensaje = `Primera línea
Segunda línea`;
console.log(mensaje);
```

Para construir mensajes, suelen resultar más cómodos que encadenar muchos `+`. Las cadenas son inmutables: métodos como `toUpperCase()` devuelven otra cadena.

```javascript
const texto = "hola";
console.log(texto.toUpperCase()); // "HOLA"
console.log(texto);               // "hola"
```

## Estructuras de control y errores

Encontraremos `if...else`, `switch`, `for`, `while`, `do...while`, `break` y `continue`, con una sintaxis familiar. Al llegar a los arrays veremos también `for...of`.

```javascript
for (let i = 0; i < 3; i++) {
    console.log(i); // 0, después 1, después 2
}
```

Los errores se pueden gestionar con `try...catch...finally`. Podemos lanzar nuestras propias excepciones con `throw`. Aunque JavaScript admite lanzar otros valores, **usaremos objetos `Error`**, que ofrecen un mensaje y facilitan el diagnóstico.

```javascript
try {
    const nota = -1;
    if (nota < 0 || nota > 10) {
        throw new Error("La nota debe estar entre 0 y 10");
    }
    console.log("Nota válida"); // No se ejecuta en este ejemplo
} catch (error) {
    console.error(`Error: ${error.message}`);
} finally {
    console.log("Terminamos la comprobación");
}
```

`finally` es opcional y se ejecuta tanto si el bloque termina normalmente como si se produce una excepción.

## Funciones

### Declaración y parámetros

Podemos declarar funciones con `function`. Los parámetros y el resultado no llevan un tipo declarado. Para devolver un valor usamos `return`; si no se devuelve uno, el resultado es `undefined`.

```javascript
function saludar(nombre) {
    return `Hola, ${nombre}`;
}

console.log(saludar("Pepe")); // "Hola, Pepe"
console.log(saludar(42));     // "Hola, 42"
```

Si omitimos un argumento, su parámetro vale `undefined`, salvo que hayamos definido un valor por defecto:

```javascript
function saludar(nombre = "visitante") {
    return `Hola, ${nombre}`;
}

console.log(saludar()); // "Hola, visitante"
```

Declarad las variables locales para no modificar por descuido una variable exterior:

```javascript
const mensaje = "Soy tu padre";

function aviso(nombre) {
    const mensaje = `Cuidado, ${nombre}, la ira conduce al odio`;
    return mensaje;
}

console.log(aviso("Pepe"));
console.log(mensaje); // "Soy tu padre": no lo hemos cambiado
```

### Las funciones también son valores

Las funciones son «ciudadanos de primera clase»: podemos asignarlas a variables, pasarlas como argumentos y devolverlas desde otras funciones.

```javascript
function suma(a, b) {
    return a + b;
}

function operar(a, b, operacion) {
    return operacion(a, b);
}

console.log(operar(2, 3, suma)); // 5
```

Fijaos en que pasamos `suma`, la función, y no `suma()`, que sería una llamada. `operar` decide cuándo invocarla.

Una expresión de función puede ser anónima y asignarse a una variable:

```javascript
const multiplicar = function (a, b) {
    return a * b;
};

console.log(multiplicar(2, 3)); // 6
```

### Funciones flecha

La sintaxis de flecha usa `=>` en lugar de `function`. Es como una "notación abreviada útil para funciones sencillas", aunque hay alguna diferencia adicional. A la izquierda ponemos los parámetros y a la derecha una expresión cuyo resultado se devuelve automáticamente:

```javascript
const suma = (a, b) => a + b;
const doble = x => x * 2; // Con un parámetro podemos omitir los paréntesis

console.log(suma(2, 3)); // 5
console.log(doble(4));  // 8
```

Si el cuerpo lleva llaves, necesitamos `return` para devolver un valor:

```javascript
const suma = (a, b) => {
    const resultado = a + b;
    return resultado;
};

console.log(suma(2, 3)); // 5
```

La sintaxis de flecha no incluye un nombre para la función: normalmente la asignamos a una variable o la pasamos como argumento. No es solo una abreviatura de `function`: entre otras diferencias, **no tiene un `this` propio**, sino que conserva el del contexto donde se define. Veremos las consecuencias con más detalle cuando lo necesitemos.

## Objetos

### Notación literal y propiedades

Para crear un objeto normalmente usaremos un literal: pares `propiedad: valor` entre llaves. Las propiedades pueden contener primitivos, arrays, otros objetos o funciones. Una función usada como propiedad es un método.

```javascript
const persona = {
    nombre: "Homer Simpson",
    edad: 34,
    casado: true,
    hijos: ["Bart", "Lisa", "Maggie"],
    profesion: {
        puesto: "técnico nuclear",
        lugar: "central de Springfield"
    },
    "nombre esposa": "Marge",
    saludar: function() {
        console.log(`Hola, soy ${this.nombre}`);
    }
};

console.log(persona.nombre);          // "Homer Simpson"
console.log(persona["nombre esposa"]); // "Marge"
console.log(persona.profesion.puesto); // "técnico nuclear"
persona.saludar();                    // "Hola, soy Homer Simpson"

const propiedad = "edad";
console.log(persona[propiedad]); // 34
console.log(persona.propiedad);  // undefined: busca literalmente "propiedad"
```

Los nombres que no son identificadores válidos, como `"nombre esposa"`, se escriben entre comillas y se consultan con corchetes. Los corchetes también permiten calcular el nombre de la propiedad.

En la llamada `persona.saludar()`, `this` es `persona`. No sustituyáis este método por una flecha esperando el mismo comportamiento: una flecha no recibe ese `this` del objeto que la llama.

### JSON: texto para intercambiar datos

JSON (*JavaScript Object Notation*) es muy similar a los literales de JavaScript, pero **es un formato de datos independiente, no exactamente código JavaScript**.

```json
{
    "nombre": "Homer Simpson",
    "nombre esposa": "Marge",
    "edad": 34,
    "casado": true,
    "hijos": ["Bart", "Lisa", "Maggie"],
    "jefe": null
}
```

En JSON:

- Los nombres de propiedades y las cadenas llevan **comillas dobles**. Los nombres sí pueden contener espacios y otros caracteres.
- Se admiten objetos, arrays, cadenas, números, booleanos y `null`.
- No se admiten funciones, `undefined`, `NaN` ni `Infinity`.
- No se admiten comentarios ni comas finales.

`JSON.stringify()` convierte un valor compatible a texto JSON y `JSON.parse()` interpreta ese texto:

```javascript
const persona = { nombre: "Homer", edad: 34 };
const texto = JSON.stringify(persona);
console.log(texto); // '{"nombre":"Homer","edad":34}'
console.log(typeof texto); // "string"

const recuperada = JSON.parse(texto);
console.log(recuperada.nombre); // "Homer"
```

JSON no define tipos específicos para fechas o expresiones regulares. Tampoco es una herramienta general para clonar objetos: por ejemplo, `stringify` omite propiedades con valor `undefined` y métodos; las fechas se serializan normalmente como cadenas. Más detalles en la [referencia de JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON).


### `const` no hace inmutable un objeto

Podemos añadir, modificar y eliminar propiedades de nuestros objetos:

```javascript
const persona = { nombre: "Pepe", edad: 20 };
persona.nombre = "Juan"; // Correcto: modificamos el objeto
persona.ciudad = "Alicante";
delete persona.edad;

console.log(persona.nombre); // "Juan"
console.log(persona.edad);   // undefined
// persona = {}; // TypeError: esto sí reasignaría la variable
```

**`const` impide reasignar la variable, no modificar el objeto al que apunta.** Lo mismo ocurre con los arrays.

`delete` elimina la propiedad. Al consultar una propiedad que no existe obtenemos `undefined`. 

### Primitivos y referencias a objetos

**JavaScript pasa los argumentos por valor.** Las asignaciones también copian valores. **PERO con un objeto, el valor que copiamos es una referencia, una dirección de memoria**: no se duplica el objeto.

```javascript
let numero = 1;
let otroNumero = numero;
otroNumero = 2;
console.log(numero); // 1

const a = { x: 1 };
const b = a; // Los dos apuntan al mismo objeto
b.x = 2;
console.log(a.x); // 2
console.log(a === b); // true: es el mismo objeto
console.log({ x: 2 } === { x: 2 }); // false: son objetos distintos porque son referencias distintas
```

Al pasar un objeto a una función, esta puede modificarlo a través de la referencia copiada. Pero reasignar el parámetro no cambia la variable del llamador:

```javascript
function modificar(objeto) {
    objeto.x = 2;
}

function sustituir(objeto) {
    objeto = { x: 100 }; // Solo cambiamos el parámetro local
}

const dato = { x: 1 };
modificar(dato);
console.log(dato.x); // 2
sustituir(dato);
console.log(dato.x); // Sigue siendo 2
```

Esta es la diferencia entre **modificar el objeto compartido** y **reasignar una variable**. Con los arrays ocurre lo mismo. Véase la [explicación de parámetros en MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions).


## Arrays

Son colecciones dinámicas indexadas desde cero. Pueden crecer o reducirse, y sus elementos pueden ser de tipos distintos, aunque normalmente trabajaremos con datos de una misma clase.

```javascript
const elementos = [33, "hola"];
elementos.push("el último");
console.log(elementos.length); // 3
console.log(elementos[0]);     // 33

const ultimo = elementos.pop(); // Quita y devuelve el último elemento
console.log(ultimo);             // "el último"
console.log(elementos.length);   // 2

elementos.splice(0, 1); // Quita un elemento desde la posición 0
console.log(elementos); // ["hola"]
```

`push`, `pop` y `splice` modifican el array. No reasignan la variable, por eso podemos usarlos con `const`.

> **No uséis `delete` para quitar posiciones de un array.** Deja un hueco y no reduce `length`. Para eliminar y desplazar los elementos, usad por ejemplo `splice`.

```javascript
const numeros = [10, 20, 30];
delete numeros[0];
console.log(numeros[0]);     // undefined: hemos dejado un hueco
console.log(numeros.length); // 3
```

En un array sin huecos, `length` coincide con el número de elementos, incluso si alguno vale `undefined`. Si creamos huecos, por ejemplo asignando directamente a una posición muy lejana, deja de ser un recuento de elementos presentes. Un hueco y un elemento cuyo valor es `undefined` no son lo mismo.

### Recorrer valores con `for...of`

```javascript
const nombres = ["Ana", "Luis", "Eva"];

for (const nombre of nombres) {
    console.log(nombre);
}
```

En cada vuelta hay una nueva variable `nombre`, por eso podemos declararla con `const`. Si necesitamos el índice, también podemos usar el `for` tradicional:

```javascript
const nombres = ["Ana", "Luis", "Eva"];

for (let i = 0; i < nombres.length; i++) {
    console.log(i, nombres[i]);
}
```

### No confundir `for...of` con `for...in`

`for...of` recorre los valores de un iterable, como un array. `for...in` recorre nombres de propiedades enumerables de un objeto, incluidas las heredadas. **No lo usaremos para recorrer los valores de un array.**

Para un objeto corriente, `Object.keys()` devuelve sus nombres de propiedades propias enumerables; `Object.values()`, sus valores; y `Object.entries()`, sus pares de nombre y valor.

```javascript
const persona = { nombre: "Homer", edad: 34 };

for (const propiedad of Object.keys(persona)) {
    console.log(propiedad, persona[propiedad]);
}
```

Así no incluimos propiedades heredadas. Un objeto literal corriente no se puede recorrer directamente con `for...of`: primero obtenemos, por ejemplo, ese array de claves.

### Transformar y seleccionar con `map` y `filter`

Podemos pasar funciones a métodos de arrays:

```javascript
const numeros = [1, 2, 3, 4];

const dobles = numeros.map(x => x * 2);
const pares = numeros.filter(x => x % 2 === 0);

console.log(dobles);  // [2, 4, 6, 8]
console.log(pares);   // [2, 4]
console.log(numeros); // [1, 2, 3, 4]
```

- `map` construye un nuevo array con el resultado de aplicar la función a cada elemento.
- `filter` construye un nuevo array con los elementos para los que la función devuelve un resultado truthy; normalmente escribiremos una condición booleana.

Estos métodos no modifican por sí mismos el array original. Eso no impide que la función que les pasemos modifique objetos: seguimos trabajando con referencias.

Un ejemplo más cercano al tipo de código que manejaremos en prácticas:

```javascript
const alumnos = [
    { nombre: "Ana", nota: 8 },
    { nombre: "Luis", nota: 4 },
    { nombre: "Eva", nota: 6 }
];

const aprobados = alumnos.filter(alumno => alumno.nota >= 5);
const nombres = aprobados.map(alumno => alumno.nombre);
console.log(nombres); // ["Ana", "Eva"]
```

Las funciones que pasamos como argumentos se suelen llamar **callbacks**. Aquí se ejecutan de forma **síncrona**, durante la llamada a `map` o `filter`. 

> Cuestión: Si modificáis `aprobados[0].nota` qué pasará con el objeto correspondiente de `alumnos`, ¿se modificará o no?

---

## Ampliación opcional: código antiguo, prototipos y clases

Estos apartados son material de consulta. No necesitamos dominarlos para empezar las prácticas.

### `var` y hoisting

En código antiguo encontraréis `var`. Dentro de una función, su ámbito es la función completa, no el bloque. Su declaración se procesa antes de ejecutar las sentencias y la variable se inicializa a `undefined`; la asignación se realiza donde aparece en el código. Este comportamiento suele explicarse con el término *hoisting*.

```javascript
function ejemploAntiguo() {
    console.log(valor); // undefined
    var valor = 3;
    console.log(valor); // 3
}
ejemploAntiguo();
```

Esto no significa que el motor mueva literalmente las líneas del archivo. Tampoco significa que podamos usar `let` o `const` antes de su declaración: acceder a ellas en su ámbito antes de inicializarlas produce `ReferenceError` (la llamada *zona muerta temporal*). Nuestra regla sigue siendo declarar antes de usar y preferir `const`/`let`.

### Prototipos

 Javascript es prácticamente el único lenguaje *mainstream* orientado a objetos que **originalmente no incluía la idea de clase ni de herencia basada en clases**, sino basada en **prototipos**.
 
 Cuando creamos un objeto podemos especificar cuál queremos que sea su *prototipo*. Si el objeto no tiene una propiedad, se buscará en el prototipo. Si la propiedad sigue sin encontrarse en el prototipo, se irá al prototipo del prototipo, y así sucesivamente hasta llegar a `Object.prototype`.
 
 Podemos ver esto como **una forma de herencia en la que un objeto concreto hereda de otro**, en lugar de una clase de otra.


```javascript
var original = {
  nombre: "original",
  saludar: function() {
    return "hola, qué tal";
  }
}

//El prototipo de "descendiente" es "original"
var descendiente = Object.create(original);
console.log(descendiente.nombre) //"original"
console.log(descendiente.hasOwnProperty("nombre")) //nos dice que la propiedad no está directamente en descendiente
console.log(descendiente.saludar()) //"hola, qué tal"
original.nombre = "original_2"
console.log(descendiente.nombre) //el mismo, el valor se comparte!!
descendiente.nombre = "descendiente"  //propiedad nueva en descendiente
console.log(descendiente.hasOwnProperty("nombre")) //Ahora será true
```


### Clases

La herencia orientada a prototipos es ajena a la experiencia del 99% de los desarrolladores, acostumbrados a la herencia basada en clases de lenguajes como Java o C++. Finalmente en ES2015 se añadieron clases al lenguaje, con una sintaxis similar a la de otros lenguajes más clásicos. Nos permite expresar constructores y métodos de una forma más familiar si venimos de Java o C++. No obstante internamente el lenguaje sigue usando prototipos para modelar objetos y herencia. Es decir, las clases son "azúcar sintáctico".

```javascript
class Persona {
    constructor(nombre) {
        this.nombre = nombre;
    }

    saludar() {
        console.log(`Hola, soy ${this.nombre}`);
    }
}

const persona = new Persona("Pepe");
persona.saludar(); // "Hola, soy Pepe"
```

Los métodos no se separan con comas. También existen getters y setters (`get`/`set`).

Para crear una clase que herede de otra la definimos con `extends`

```javascript
class StarWarsFan extends Persona {
    constructor(nombre) {
        super("Darth " + nombre)
    }

    saludar() {
        super.saludar()
        console.log("Yo soy tu padre")  
    }
}

let juan = new StarWarsFan("Juan")
juan.saludar()  //Hola, soy Darth Juan\n Yo soy tu padre
```

Como vemos, con `super` podemos invocar el constructor o los métodos de la clase base. 

Si no definimos constructor en la clase heredada, el intérprete Javascript define automáticamente uno que llama al de la clase base.

JavaScript no emplea los modificadores `public`/`private` de Java, pero sí permite declarar **campos y métodos privados con `#`**:

```javascript
class Contador {
    #valor = 0;

    incrementar() {
        this.#valor++;
        return this.#valor;
    }
}

const contador = new Contador();
console.log(contador.incrementar()); // 1
// console.log(contador.#valor); // SyntaxError: acceso privado desde fuera
```

> **Cuidado si lo probáis en la consola de Chrome:** DevTools permite acceder a campos privados desde fuera de la clase para facilitar la depuración. Por eso, allí `contador.#valor` puede mostrar `1`. Es una excepción de la consola: en un archivo JavaScript o un `<script>` de una página, ese acceso externo produce `SyntaxError`. Esta particularidad está documentada en [MDN: elementos privados](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_elements).

---