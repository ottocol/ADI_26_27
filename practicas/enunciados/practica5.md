# Práctica: Aplicaciones web en dispositivos móviles

El objetivo de esta práctica es convertir el *frontend* de la práctica 4 en una aplicación con aspecto y comportamiento de app móvil, aunque siga siendo HTML, CSS y JavaScript. Para ello usaremos [Ionic](https://ionicframework.com/) para Vue, que proporciona componentes de interfaz con aspecto similar al nativo en iOS y Android.

El desarrollo se realizará siguiendo la **metodología SDD de la asignatura**. Se permite el uso de IA en los términos descritos en esa metodología: las SPEC de las iteraciones las debéis escribir vosotros, aunque la IA puede revisarlas; el PLAN y el TEST_PLAN pueden ser propuestos por la IA, pero debéis revisarlos antes de implementar. También debéis revisar y entender el código que entregáis.

Pasar una aplicación de escritorio a móvil no consiste solo en cambiar las etiquetas HTML por las de Ionic. También cambia cómo se navega (pila de pantallas, botón "atrás", gestos), cómo se confirman las acciones y cómo se introducen los datos con un teclado virtual. **En esta práctica se valora sobre todo que las decisiones de cómo organizar la interfaz estén especificadas, justificadas y comprobadas**, más que el código.

## Punto de partida y organización del código

Partiréis del *frontend* de la práctica 4 y del *backend* de la práctica 1. Si alguna funcionalidad básica de la práctica 4 quedó sin completar, tendréis que implementarla aquí.

El proyecto debe ser **nuevo y distinto** del de la práctica 4. Creadlo con el CLI de Ionic como se describe en la [documentación](https://ionicframework.com/docs/vue/quickstart), partiendo de la plantilla `blank`. Podéis guardarlo en el mismo repositorio, en una carpeta `/frontend-ionic`, y continuar la documentación SDD con nuevas iteraciones en `docs/iterations/`.

Se debe mantener la separación de responsabilidades de la práctica 4:

- **Pantallas de la app:** en Ionic cada "pantalla" es un componente con `<ion-page>`. Es la parte que más cambiará con respecto a la práctica 4. De hecho lo habitual es tener en el proyecto un directorio `pages` con las pantallas además del clásico de `components`.
- **Componentes:** la lógica de los componentes debería ser reutilizable, no así las etiquetas HTML que cambiarán en su mayoría a las de Ionic si queréis dar aspecto de app móvil. Por ejemplo un formulario en lugar de etiquetas `<input>` usará `<IonInput>`.
- **Gestión del estado compartido (Pinia):** debería reutilizarse con pocos cambios o quizá ninguno.
- **Acceso al *backend*:** la capa de servicios o de llamadas al API debería reutilizarse prácticamente sin cambios. Los componentes no deberían depender directamente de Supabase ni de los detalles del API REST.

Documentad en `ARCHITECTURE.md` qué módulos de la práctica 4 habéis reutilizado sin cambios, cuáles habéis adaptado (y por qué) y cuáles son nuevos. Si al final tenéis que reescribir buena parte de la lógica, explicad qué lo ha provocado.

## Requerimientos básicos (hasta 7 puntos)

### Funcionalidades e interfaz (hasta 3 puntos)

La aplicación debe permitir, como mínimo, las mismas operaciones que la práctica 4 sobre el recurso principal: **login y logout, listado, detalle, creación, edición y borrado**, con las mismas reglas de permisos. La autorización debe seguir comprobándose en el *backend*.

Las pantallas deben estar organizadas para un dispositivo móvil:

- **Pantalla de login**, la inicial si no hay sesión, solo con el formulario de acceso.
- **Pantalla de listado** con [`<ion-list>`](https://ionicframework.com/docs/api/list), desde la que se pueda acceder al detalle, crear elementos y cerrar sesión.
- **Detalle y formularios de creación/edición** en pantallas, modales u otra solución coherente con una app móvil.

La forma concreta de cada operación queda a vuestra elección: botón flotante, elementos deslizables, *action sheet*, modales, etc. Consultad la [documentación de componentes](https://ionicframework.com/docs/components). Lo que sí se pide es que la elección esté descrita en la SPEC y que se cumpla lo siguiente:

- **Navegación.** Usad el *router* de Ionic. El botón "atrás" (el de la cabecera y el del navegador o el sistema) debe comportarse de forma coherente. Tras el logout no debe poder volverse a pantallas privadas, y una pantalla privada a la que se acceda sin sesión debe redirigir al login.
- **Listados en móvil.** Si el *backend* devuelve los datos paginados, la paginación debe adaptarse a un patrón móvil (por ejemplo [*infinite scroll*](https://ionicframework.com/docs/api/infinite-scroll) o un botón "cargar más"), sin limitarse a mostrar la primera página. Debe poder actualizarse el listado sin recargar la página, por ejemplo con [*pull to refresh*](https://ionicframework.com/docs/api/refresher).
- **Coherencia entre pantallas.** Ionic mantiene en memoria las pantallas anteriores de la pila de navegación, de modo que al volver a ellas no se vuelven a montar. Después de crear, editar o borrar un elemento, al volver al listado o al detalle se deben ver los cambios. Indicad en `ARCHITECTURE.md` cómo lo habéis resuelto (estado compartido en Pinia, *hooks* del ciclo de vida de Ionic como `onIonViewWillEnter`, etc.).
- **Confirmaciones y mensajes** con componentes apropiados para móvil (*alerts*, *toasts*, ...): confirmación antes de borrar, resultado de las operaciones y errores comprensibles, incluidos los de validación o permisos devueltos por el *backend*.
- **Estados de la interfaz.** Como en la práctica 4: indicar las operaciones en curso y distinguir el listado vacío del error al cargarlo. Contemplad también el caso de que falle la carga de una página adicional del listado.
- **Formularios adaptados al teclado virtual.** Validación de login, creación y edición con reglas coherentes con el dominio, y tipos de campo adecuados (email, numérico, fecha, ...) para que el móvil muestre el teclado o selector apropiado. Los mensajes de error deben verse junto al campo correspondiente.

El registro de usuarios y la edición del perfil no son obligatorios. Debe haber un modo de disponer de usuarios de prueba para comprobar la aplicación.

### Pruebas y validación (hasta 1 punto)

Cada iteración debe tener su TEST_PLAN y registrar los resultados obtenidos. Las pruebas pueden ser manuales, automatizadas o una combinación de ambas, como establece la metodología SDD (la plantilla de Ionic ya incluye configuración para pruebas unitarias y *end-to-end*, por si queréis usarla).

Además de los casos de la práctica 4 que sigan siendo aplicables, las comprobaciones deben cubrir los aspectos propios del móvil que hayáis especificado. Por ejemplo:

- Comportamiento del botón "atrás" en distintos puntos de la app, incluido después del logout.
- Carga de páginas sucesivas del listado, final del listado y fallo al cargar una página.
- Actualización del listado al volver de crear, editar o borrar.
- Cancelación de una edición y de un borrado.
- Formularios con datos válidos e inválidos y comprobación del tipo de teclado.

Incluid un video con al menos un **recorrido completo con el *backend* real en un dispositivo móvil real o en un emulador** (no basta con el modo responsive del navegador de escritorio): iniciar sesión, crear un elemento, localizarlo en el listado, consultar su detalle, editarlo, eliminarlo y cerrar sesión. Indicad qué dispositivo o emulador habéis usado, cómo habéis accedido a la app desde él, qué datos o usuario se necesitan para repetir el recorrido y qué resultados habéis obtenido. 

Para las pruebas manuales, documentad los pasos, el resultado esperado y el obtenido. Para las automatizadas, indicad cómo ejecutarlas y sus resultados.

### Documentación del proceso SDD (hasta 2 puntos)

Continuad la documentación del proyecto:

- Actualizad `PROJECT_SPEC.md` si cambia el alcance funcional de la aplicación.
- Completad `ARCHITECTURE.md` con la organización del *frontend* móvil: pantallas y navegación, componentes principales, estado compartido, acceso al *backend* y relación con el *frontend* de la práctica 4 (qué se reutiliza y qué cambia).
- Actualizad `AI_SUMMARY.md` con el uso de IA durante esta práctica.
- Añadid las nuevas iteraciones a `docs/iterations/`, manteniendo las secciones SPEC, PLAN, TEST_PLAN, AI_LOG y COMMITS RELACIONADOS.

Las SPEC deben concretar el comportamiento en términos de la app móvil. Por ejemplo, «adaptar el listado a móvil» no explica cómo se cargan más elementos, qué ocurre al llegar al final o si falla la carga, cómo se accede a editar o borrar un elemento ni qué se ve al volver de la edición.

Se valorará:

- Que las SPEC se escriban antes de implementar y definan el comportamiento esperado con precisión suficiente para comprobarlo.
- Que las decisiones de interfaz y navegación propias del móvil estén justificadas.
- Que el PLAN sea coherente con la SPEC, con el *backend* existente y con el código reutilizado de la práctica 4.
- Que las pruebas comprueben los requisitos especificados y se documenten los resultados reales.
- Que la documentación se corresponda con la implementación.
- Que el AI_LOG recoja las interacciones y decisiones relevantes: qué se ha aceptado, rechazado o corregido, cuando corresponda.
- Que los commits relacionados permitan localizar los cambios de cada iteración.

No se valorará la cantidad de páginas, de *prompts* o de código generado.


## Requerimientos adicionales (hasta 4 puntos)

También deben desarrollarse y documentarse con SDD. 

| Apartado | Máximo | Qué debe aportar |
|---|---:|---|
| Recurso secundario con navegación por *tabs* o menú lateral | 1 | Una segunda sección (otro recurso o una vista relevante, como "mis elementos" o favoritos) con listado, creación y borrado, integrada mediante [*tabs*](https://ionicframework.com/docs/api/tabs) o un [menú lateral](https://ionicframework.com/docs/api/menu). La navegación y el botón "atrás" dentro de cada sección deben ser coherentes. |
| PWA instalable y desplegada | 1 | *Manifest*, iconos y *service worker*, de forma que la app se pueda instalar en el móvil. Desplegada en un *hosting* con HTTPS (Firebase Hosting, Netlify, Vercel, ...). La SPEC debe definir qué ocurre sin conexión, que como mínimo será un mensaje comprensible en lugar del error del navegador, y debe comprobarse en un dispositivo real o emulado (no únicamente en el navegador de escritorio). |
| Notificaciones *push* | 1 | Notificaciones que se envían a un usuario cuando ocurre un evento relevante en vuestro dominio (por ejemplo, alguien comenta una receta suya), aunque no tenga la app abierta. El envío debe dispararse desde el *backend*, por ejemplo con un [*webhook* de base de datos](https://supabase.com/docs/guides/database/webhooks) que llame a una *Edge Function* de Supabase. Podéis usar el estándar Web Push con claves VAPID, guardando las suscripciones de cada usuario en una tabla, o un servicio externo como [OneSignal](https://supabase.com/partners/integrations/onesignal). La SPEC debe definir qué eventos generan notificación y a quién se envía, en qué momento se pide el permiso (no nada más abrir la app sin explicación), qué ocurre si el usuario lo deniega y qué pasa con la suscripción al hacer logout. Grabad un vídeo del funcionamiento en un móvil o en un dispositivo emulado en Android Studio o en Mac (no en un navegador de escritorio). Necesita *service worker* y HTTPS, así que en la práctica requiere también el apartado de PWA. Si tenéis un Mac, en iOS solo funciona con la PWA instalada en la pantalla de inicio. |
| App nativa con Capacitor y uso de una API del dispositivo | 1 | Generar el proyecto Android o iOS con [Capacitor](https://capacitorjs.com/), ejecutarlo en un emulador o dispositivo y usar al menos un *plugin* (cámara, geolocalización, compartir, ...) integrado con sentido en vuestro dominio. Especificad y probad qué ocurre si el usuario deniega el permiso y cómo se comporta la funcionalidad al ejecutar la app en el navegador. |

Si un apartado requiere cambios en el *backend*, podéis realizarlos y debéis documentarlos y comprobarlos. El cambio en el *backend* no añade una puntuación independiente.

## Evaluación y entrega

| Apartado | Máximo |
|---|---:|
| Funcionalidades, organización y corrección de la app móvil | 3 |
| Pruebas y posibilidad de repetir las comprobaciones | 1 |
| Documentación del proceso SDD | 2 |
| Requerimientos adicionales | 4 |
| **Total** | **10** |

**Para esta práctica no hay test** ya que la fecha de entrega es a final de cuatrimestre y no se podría realizar el test en clase.

Las ampliaciones no sustituyen las funcionalidades básicas ni la documentación de su desarrollo. Como establece la metodología SDD, debéis poder explicar el código que entregáis y realizar una modificación razonable durante una revisión. Una funcionalidad que no podáis explicar podrá no contar completamente para la nota, aunque aparentemente funcione.

**Fecha límite de entrega: 21 de diciembre de 2026 a las 23:59.** La entrega se realizará a través de Moodle, comprimiendo el proyecto en un archivo `.zip`.

Incluid:

- El código fuente y los archivos de configuración y dependencias necesarios, sin `node_modules`, carpetas de *build* ni proyectos nativos generados que se puedan reconstruir (si habéis hecho el apartado de Capacitor, indicad cómo regenerarlos).
- El directorio `.git` del repositorio, de modo que se pueda consultar el historial de commits.
- La documentación SDD correspondiente.
- Un `README.md` con las instrucciones para instalar y ejecutar la app, acceder a ella desde un móvil o emulador, preparar o arrancar el *backend* y repetir las pruebas. Indicad las variables de configuración necesarias mediante un archivo de ejemplo, sin incluir credenciales privadas.
- Los datos o instrucciones para disponer de un usuario de prueba y datos de ejemplo, la URL de despliegue si habéis hecho la PWA, los vídeos o capturas que se piden, una relación de los apartados adicionales implementados y las limitaciones conocidas.
