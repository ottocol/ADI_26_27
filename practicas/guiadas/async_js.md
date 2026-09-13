## Código asíncrono

Javascript es un lenguaje *monohilo* por diseño. Eso quiere decir que cuando queremos ejecutar una operación que puede tardar un tiempo no podemos hacerlo en un hilo adicional nativo JS, para que se ejecute en paralelo con el código principal. Un ejemplo es si hacemos una petición HTTP, ya que no sabemos lo que puede tardar el servidor.  Lo que haremos es usar código asíncrono, lanzando la operación y típicamente esperando el resultado, no obstante el hilo queda libre mientras esperamos para hacer otras cosas, en un navegador, por ejemplo, atender a los eventos del usuario: pulsaciones de botones y otras interacciones.

> Decir que Javascript sea monohilo no es totalmente correcto desde que existen los *workers*, que son como hilos secundarios, pero de momento no trabajaremos con ellos.

En Javascript se pueden usar tres métodos para escribir código asíncrono:

- *Callbacks*: es el más antiguo y que genera un código más complicado y tiende a no usarse demasiado salvo en APIs antiguos. Un *callback* es un bloque de código en forma de función que se le pasa a un método asíncrono para indicarle que lo llame cuando la operación haya terminado.
- *Promesas*: una promesa es un objeto que representa una operación asíncrona. Puede estar en varios estados: pendiente/*pending*, cumplida/*fulfilled* (ha acabado con éxito) o rechazada/*rejected* (ha acabado con error).
- *async/await*: aunque internamente usa promesas es una forma de escribir código asíncrono lo más parecido a como si fuera síncrono, por lo que la estructura queda mucho más "limpia".

### Callbacks

Los APIs asíncronos más antiguos de Javascript se basan en *callbacks*. Algunos se usan todavía en la actualidad de modo común. Por ejemplo. `setTimeout` permite ejecutar una función transcurrido un determinado número de milisegundos. El primer parámetro de la función precisamente es el *callback* a ejecutar transcurrido ese tiempo:

```javascript
setTimeout(()=>console.log("Ya!"), 1000)
console.log("yo aparezco enseguida")
```

El problema de los *callbacks* es que cuando encadenamos varias operaciones asíncronas seguidas generan código difícil de leer, ya que dentro del *callback* de la primera operación tenemos que definir el *callback* de la segunda, con lo que acabamos con código anidado varios niveles (lo que se conoce popularmente como "[callback hell](https://callbackhell.com)"). 

Siguiendo con el ejemplo del `setTimeout`, si transcurrido el primer temporizador quisiéramos ejecutar otro tendríamos que hacer algo como:

```javascript
setTimeout(()=>{
  console.log("Ya 1!")
  setTimeout(()=>{
    console.log("Ya 2!")
  }, 1000)
}, 1000)
```

### Promesas. Uso con `.then`

Estaba claro que hacía falta un mecanismo más práctico para manejar el código asíncrono que los simples *callbacks*. La mayoría de APIs modernos en Javascript usan las promesas para manejar el código asíncrono. Veremos primero la forma clásica, que genera código un poco "embarullado" (aunque mucho más legible que con los *callbacks*) y luego la que usa "async/await".

Por ejemplo tanto en node como en el navegador existe un método llamado `fetch` que permite hacer peticiones HTTP. Dicho método devuelve una promesa, que como ya hemos dicho va pasando por varios estados, inicialmente estará pendiente y luego puede acabar en "cumplida con éxito" / *fulfilled* o en "fallada" / *rejected*.

`then` es un método de la clase `Promise` al que le pasamos una función a ejecutar cuando la promesa termine con éxito.

```javascript
fetch("https://www.ua.es").then(()=>{
  console.log("petición acabada con éxito")
})
```

> Nótese que la función que le pasamos a `then` en realidad es lo que antes llamábamos callback. Pero `then` tiene algo que veremos en un momento y que hace **que no sea necesario anidar los callbacks**, que es lo que hacía el código ilegible

Cuando se cumpla con éxito la promesa que devuelve `fetch` se ejecutará la función que le pasamos a `then`. En realidad esta función recibirá automáticamente como parámetro un objeto o dato con el contenido de la promesa "cumplida". Para saber exactamente de qué tipo es ese parámetro hay que mirar la documentación de la función asíncrona que estamos llamando, en este caso si leemos la de `fetch` veremos que devuelve un objeto del tipo `Response`, que tiene datos diversos sobre la respuesta HTTP (aunque no directamente el contenido):

```javascript
fetch("https://www.ua.es").then((resp)=>{
  console.log(resp)
})
```

Pero la "gracia" de `then` es que nos permite encadenar operaciones asíncronas, ya que devuelve lo que devuelva la función que le pasamos envuelto en una promesa (que por tanto podemos encadenar otra vez con `then`). Por ejemplo, decodificar el contenido de una respuesta HTTP en javascript es asíncrono, por lo que exige concatenar 2 operaciones asíncronas: hacer la petición + decodificar el contenido. Con .then resulta más natural de lo que sería con *callbacks* "puros":

```javascript
fetch("https://www.ua.es")
  // 1º then: convierte la respuesta en texto
  .then(response => response.text())
  // 2º then: imprime los 100 primeros caracteres
  .then(texto => {
    console.log(texto.slice(0, 100)); 
  })
```

Si la promesa acabara con error, podríamos detectarlo con un método especial `.catch` que se encadena con el resultado del `.then`

```javascript
fetch("https://www.ua.es")
  .then(response => response.text())
  .then(texto => {
    console.log(texto.slice(0, 100)); 
  })
  .catch(error => {
    console.error("Error en la petición:", error);
  });
```

### async/await

Aunque la sintaxis del `.then` es una mejora considerable con respecto al uso de *callbacks* (¡creedme!), sigue siendo tediosa y algo confusa. La funcionalidad de `await`, que se introdujo en Javascript algunos años después que el `.then`, nos permite escribir código asíncrono de forma mucho más limpia:

```javascript
try {
    const response = await fetch("https://www.ua.es");
    if (!response.ok) {
        throw new Error(`Error HTTP ${response.status}`);
    }
    const texto = await response.text();
    console.log(texto.slice(0, 100));
  } catch (error) {
    console.error("Error en la petición:", error);
  }
```

típicamente pondremos `await` delante de cada método que devuelva una promesa para esperar al resultado. Esto asegura que la función actual no va a continuar hasta que la promesa termine, una vez hecho esto nos devolverá el resultado. En caso de terminar con error, para detectarlo ya podemos usar un `catch` estándar de Javascript en lugar de tener que usar el `.catch` especial para las promesas.

Es muy importante destacar que poner `await` delante de una llamada asíncrona no la convierte en síncrona, sigue siendo código asíncrono y sigue teniendo sus peculiaridades. Por ejemplo si envolviéramos el código anterior en una función para poder llamarlo desde donde queramos habría que marcar la función como `async` para indicar que contiene código asíncrono. Y si llamamos a la función debemos hacerlo con `await` para esperar el resultado.


```javascript
async function mostrarUA() {
    const response = await fetch("https://www.ua.es");
    if (!response.ok) {
        throw new Error(`Error HTTP ${response.status}`);
    }
    const texto = await response.text();
    return texto.slice(0, 100);
}

try {
  texto = await mostrarUA()
  console.log(texto)
}
catch(error) {
  console.error(error.message);
}
```

