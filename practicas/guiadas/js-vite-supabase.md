## Ejemplo de proyecto de *frontend* con Vite

Cuando en un proyecto *frontend* usamos librerías de terceros estas se suelen gestionar usando `npm` para descargarlas y un *bundler* que entre otras cosas hace que el navegador pueda cargarlas. Vamos a ver cómo adaptar el proyecto de la lista de la compra en JS *vanilla* a este formato, usando Supabase como *backend*.

### Crear el proyecto con Vite

Vite es el *bundler* más usado en la actualidad, aunque hay muchos otros (rollup, parcel, webpack,...). Para crear un proyecto con Vite, teclear en una terminal:

```bash
npm create vite@latest
```

Nos hará varias preguntas, en este caso queremos usar JS Vanilla y Javascript. Aunque estamos en *frontend* creará un proyecto de Node con el `package.json`. Esto nos permite instalar las librerías que necesitemos con la misma herramienta que usamos en Node como *backend*, `npm`.

Tras crear la estructura del proyecto e instalar las dependencias lo primero que hará vite es poner en marcha un servidor de desarrollo típicamente por el puerto 5173. Si abrimos un navegador en `http://localhost:5173` veremos la página de bienvenida de Vite.

Para tener la lista de la compra con backend Supabase:

- Copiad el `index.html` y la carpeta `src` del proyecto que ya tenéis hecho sin Vite y con *backend* Express.
- Copiad el nuevo [`api.js`](api.js) en `src`, que ahora conecta con el *backend* supabase. Tal cual está usa  el proyecto del profesor en Supabase. Hay un usuario creado para cada uno de vosotros con vuestro correo de alu.ua.es como login y vuestro DNI o NIE como password. También podéis cambiar la URL y la *publishable key* para conectar con vuestro propio *backend*.
- Instalad la librería JS de Supabase con `npm i @supabase/supabase-js`

Con respecto a la versión con Express cambia:

- El archivo `api.js`.
- Unas pocas líneas al hacer login y logout. Al hacer login ya no hace falta guardar el token JWT en el local storage, ya lo guarda Supabase por nosotros. Además el email del usuario estará en el objeto `user`y no `usuario`. El logout pasa a ser asíncrono ya que el `signOut()` de Supabase lo es, así que es aconsejable usar la llamada con `await` (en este caso concreto no habría gran diferencia ya que tras el logout no hacemos nada, así que da igual esperarlo o no).

## Ejecutar y desplegar el proyecto

Cuando se crea el proyecto se ejecuta automáticamente pero podemos ponerlo en marcha manualmente con `npm run dev`. 

Para generar una versión del sitio que podamos dejar en algún proveedor de *hosting* podemos ejecutar `npm run build`, que la generará en la carpeta `dist`.