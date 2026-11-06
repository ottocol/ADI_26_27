# Práctica: Desarrollo del frontend con un framework JavaScript

El objetivo de esta práctica es desarrollar el *frontend* de vuestra aplicación web, conectado al *backend* de la práctica 1. 

Los requisitos del enunciado se expresan en términos genéricos: usuarios, recurso principal y recursos secundarios. En vuestra aplicación serán recetas, películas, alumnos, notas, .... 

En la implementación debéis usar el *framework* JavaScript Vue.

El desarrollo se realizará siguiendo la **metodología SDD de la asignatura**. Se permite el uso de IA en los términos descritos en esa metodología: las SPEC de las iteraciones las debéis escribir vosotros, aunque la IA puede revisarlas; el PLAN y el TEST_PLAN pueden ser propuestos por la IA, pero debéis revisarlos antes de implementar. También debéis revisar y entender el código que entregáis.

Podéis usar el mismo repositorio que usásteis en la práctica 1, guardar el código en una carpeta `/frontend-vue` y continuar con la documentación de SDD actualizando el `ARCHITECTURE.md` y añadiendo nuevas iteraciones en `/iterations`. También podéis usar otro repositorio distinto pero os tocará copiar información del repo de la práctica 1: el `PROJECT-SPEC.md`, la capa de servicios del *backend*,...

## Punto de partida y organización del código

Si en la práctica 1 desarrollasteis los dos tipos de backend, basta con conectar el frontend a uno de ellos.

La organización del proyecto debe distinguir las siguientes responsabilidades:

- **Componentes y vistas:** presentación de la información e interacción con el usuario. Dividid la interfaz en componentes con responsabilidades claras; no concentréis toda la aplicación en un único componente.
- **Gestión del estado compartido:** información que necesitan distintas partes de la aplicación y operaciones que la actualizan. Para ello podéis usar Pinia. El estado compartido debe incluir, como mínimo, la información de la sesión y los datos de los listados que utilicen varios componentes. El estado que solo necesita un componente, como un campo de formulario o si un panel está abierto, puede permanecer en ese componente. Aunque en clase de teoría comentamos que para datos que vienen del servidor es mejor usar una librería distinta de Pinia, podéis usarla aquí para simplificar.
- **Acceso al backend:** llamadas a vuestra API REST o uso de la capa de servicios desarrollada en la práctica 1. Los componentes no deberían acceder directamente a sus tablas ni depender de los detalles de Supabase o la API REST.



## Requerimientos básicos (hasta 7 puntos)

### Funcionalidades e interfaz (hasta 3 puntos)

La aplicación debe permitir realizar las siguientes operaciones:

- **Login y logout.** Mostrar si hay una sesión iniciada y quién es el usuario autenticado. Al cerrar sesión se debe actualizar la interfaz y dejar de mostrar información privada de ese usuario.
- **Listar elementos del recurso principal.** Mostrar la información necesaria para identificarlos y acceder a las operaciones disponibles. Si el backend devuelve los datos paginados, la interfaz debe permitir recorrer las páginas; no basta con mostrar siempre la primera.
- **Consultar el detalle de un elemento.** Mostrar información adicional a la del listado. Podéis hacerlo en un panel, un diálogo, una vista u otra solución coherente con vuestra aplicación.
- **Crear un elemento.** Recoger sus datos mediante un formulario y mostrar el resultado de la operación.
- **Editar un elemento.** Mostrar sus datos actuales, permitir modificarlos y guardar los cambios. También se debe poder cancelar la edición sin guardar.
- **Eliminar un elemento.** Evitar borrados accidentales mediante una confirmación o un mecanismo equivalente y reflejar el resultado en la interfaz.

El registro de usuarios y la edición del perfil no son obligatorios en este frontend, aunque estén implementados en el backend. Debe haber un modo de disponer de usuarios de prueba para comprobar la aplicación.

Las operaciones disponibles deben respetar las reglas de vuestra aplicación. Por ejemplo, un usuario podrá consultar recursos públicos sin iniciar sesión si así lo habéis definido, pero no debería tener disponible la edición de recursos ajenos si no tiene permiso. **La autorización debe seguir comprobándose en el backend**, aunque la interfaz oculte o desactive determinadas acciones.

Además, la interfaz debe:

- Indicar cuándo se está realizando una operación asíncrona, como cargar un listado o guardar un formulario.
- Distinguir entre un listado vacío y un error al obtener los datos.
- Mostrar mensajes comprensibles cuando una operación falle, incluidos los errores de validación o permisos devueltos por el backend.
- Reflejar los cambios después de crear, editar o eliminar, sin que el usuario tenga que recargar manualmente la página.
- Validar los formularios de login, creación y edición con reglas coherentes con el dominio: campos obligatorios, formatos, rangos, etc. La validación del cliente complementa la del backend.


### Pruebas y validación (hasta 1 punto)

Cada iteración debe tener su TEST_PLAN y registrar los resultados obtenidos. **Las pruebas del frontend pueden ser manuales, automatizadas o una combinación de ambas**, como establece la metodología SDD. 

Las comprobaciones deben cubrir tanto los casos correctos como los estados y errores que hayáis especificado. Por ejemplo:

- Inicio de sesión correcto e incorrecto y cierre de sesión.
- Listado con datos, listado vacío y fallo al cargarlo.
- Creación y edición con datos válidos e inválidos.
- Cancelación de una edición y cancelación de un borrado.
- Actualización del listado y del detalle tras una modificación.
- Restricciones de acceso relevantes para vuestra aplicación.

Incluid al menos un **recorrido completo con el backend real**: iniciar sesión, crear un elemento, localizarlo en el listado, consultar su detalle, editarlo, eliminarlo y cerrar sesión. Indicad qué datos o usuario se necesitan para repetirlo y qué resultados habéis obtenido.

Para las pruebas manuales, documentad los pasos, el resultado esperado y el obtenido. Para las automatizadas, indicad cómo ejecutarlas y sus resultados.

### Documentación del proceso SDD (hasta 2 puntos)

Continuad la documentación del proyecto iniciada en la práctica 1:

- Actualizad `PROJECT_SPEC.md` si cambia el alcance funcional de la aplicación.
- Completad `ARCHITECTURE.md` con la organización del frontend: componentes y vistas principales, estado compartido, acceso al backend y navegación, si procede.
- Actualizad `AI_SUMMARY.md` con el uso de IA durante esta práctica.
- Añadid las nuevas iteraciones a `docs/iterations/`, manteniendo las secciones SPEC, PLAN, TEST_PLAN, AI_LOG y COMMITS RELACIONADOS.

Las SPEC deben concretar los requisitos en vuestro dominio y describir un comportamiento comprobable. Por ejemplo, «implementar la edición» no explica qué campos pueden cambiarse, quién puede editarlos, qué ocurre si los datos son inválidos o cómo queda la interfaz después de guardar.

Se valorará:

- Que las SPEC se escriban antes de implementar y definan el comportamiento esperado con precisión suficiente para comprobarlo.
- Que el PLAN sea coherente con la SPEC y con el backend existente.
- Que las pruebas comprueben los requisitos especificados y se documenten los resultados reales.
- Que la documentación se corresponda con la implementación y refleje los cambios relevantes y sus motivos.
- Que el AI_LOG recoja las interacciones y decisiones relevantes: qué se ha aceptado, rechazado o corregido, cuando corresponda.
- Que los commits relacionados permitan localizar los cambios de cada iteración.

No se valorará la cantidad de páginas, de prompts o de código generado. Tampoco se exige comentar cada variable o método del código.

### Test sobre la práctica (hasta 1 punto)

Se realizará en clase un mini-test de 10–15 minutos con preguntas sobre vuestra propia implementación. Podréis consultar la entrega realizada, pero no usar IA.

Ejemplos de preguntas:

- ¿En qué iteración implementaste la edición? ¿cómo y dónde se comprueba que los datos introducidos son válidos?
- ¿Dónde se guarda la información de la sesión y qué cambia al hacer logout?
- ¿Cómo habéis comprobado el caso de error al cargar el listado? ¿y el de "sin datos" (0 registros)? ¿qué se muestra en los dos casos?

La fecha del test será el día siguiente de la entrega, el 24 de noviembre.

## Requerimientos adicionales (hasta 3 puntos)

Podéis implementar los siguientes apartados. También deben desarrollarse y documentarse con SDD; no necesitan una copia separada de la documentación general.

| Apartado | Máximo | Qué debe aportar |
|---|---:|---|
| Búsqueda integrada con la paginación | 0,5 | Buscar por criterios apropiados para vuestro dominio sobre el conjunto de datos del backend, recorrer las páginas del resultado y gestionar los cambios de búsqueda y la ausencia de resultados. Filtrar solo la página descargada no es suficiente. |
| Navegación mediante un router | 0,5 | Definir rutas para vistas relevantes de la aplicación, como listado, detalle o edición, y permitir acceder por URL y navegar con atrás/adelante de forma coherente. Instalar el router sin utilizarlo no es suficiente. |
| Mejora de la interfaz mediante una biblioteca de componentes | 0,5 | Integrarla de manera coherente en varias partes de la aplicación, adaptando formularios, mensajes o diálogos a las necesidades de los usuarios. No basta con instalarla o aplicar su plantilla inicial. |
| Gestión de un recurso secundario | 0,5 | Integrar su listado, creación y borrado en el flujo de la aplicación, con las validaciones y permisos que procedan. Por ejemplo, gestionar comentarios desde el detalle de una receta. |
| Implementación parcial con otro framework, por ejemplo React, Svelte, Angular... | 1 | En un proyecto separado, implementar el listado y el borrado del recurso principal con otro framework, usando el mismo backend y la autenticación necesaria para esas operaciones. Reutilizad los servicios que sean independientes del framework y explicad brevemente las diferencias en componentes y gestión del estado. No se exige repetir el resto del frontend. |

Si un apartado requiere cambios en el backend, podéis realizarlos y debéis documentarlos y comprobarlos. En esta práctica se valora la funcionalidad del frontend y su integración; el cambio en el backend no añade una puntuación independiente.

## Evaluación y entrega

| Apartado | Máximo |
|---|---:|
| Funcionalidades, organización y corrección del frontend principal | 3 |
| Pruebas y posibilidad de repetir las comprobaciones | 1 |
| Documentación del proceso SDD | 2 |
| Test en clase | 1 |
| Requerimientos adicionales | 3 |
| **Total** | **10** |

Las ampliaciones no sustituyen las funcionalidades básicas ni la documentación de su desarrollo. Como establece la metodología SDD, debéis poder explicar el código que entregáis y realizar una modificación razonable durante una revisión. Una funcionalidad que no podáis explicar podrá no contar completamente para la nota, aunque aparentemente funcione.

**Fecha límite de entrega: 23 de noviembre a las 23:59** La entrega se realizará a través de Moodle, comprimiendo el proyecto en un archivo `.zip`.

Incluid:

- El código fuente y los archivos de configuración y dependencias necesarios, sin `node_modules` ni archivos generados que se puedan reconstruir.
- El directorio `.git` del repositorio o repositorios entregados, de modo que se pueda consultar el historial de commits. No es necesario dar acceso a un repositorio online.
- La documentación SDD correspondiente.
- Un `README.md` con las instrucciones para instalar y ejecutar el frontend, preparar o arrancar el backend elegido y repetir las pruebas. Indicad las variables de configuración necesarias mediante un archivo de ejemplo, sin incluir credenciales privadas.
- Los datos o instrucciones para disponer de un usuario de prueba y datos de ejemplo, además de una relación de los apartados adicionales implementados y las limitaciones conocidas.

