# Justificación del Patrón de Diseño: Mediator

## Tipo de Patrón
**De Comportamiento (Behavioral)**

## ¿Por qué se seleccionó el patrón Mediator para el Escenario 3?

El desarrollo de la aplicación de chat grupal se enfrentaba a un acoplamiento extremo, también conocido como "Código Espagueti" o dependencia $N \times N$.

### El problema descartado
*   **Comunicación directa (Acoplamiento fuerte):** Si el Usuario A (Alice) quiere hablar, debe tener en su clase una lista de referencias de Bob, Charlie y Dave. Si ingresa Elena, el sistema tiene que buscar las instancias de todos los demás y actualizar sus listas para incluir a Elena. A nivel de arquitectura, los objetos están tan amarrados entre sí que ninguno puede ser utilizado ni modificado sin afectar colateralmente a toda la red de usuarios.
*   **Patrón Observer:** Aunque es útil para escenarios de "Suscripción y Notificación", el Observer establece una relación asimétrica de publicador a suscriptor. En un chat grupal, la relación es multidireccional, cooperativa y suele tener un estado central (historial, reglas de validación de lenguaje, etc.). Aunque el *Mediator* y el *Observer* se pueden mezclar a veces, la intención arquitectónica pura de ser un "director de tráfico" central es más precisa en el Mediator para este escenario.

### La elección de Mediator
El patrón **Mediator (Mediador)** se eligió porque encapsula y externaliza cómo un conjunto de objetos interactúan, promoviendo el bajo acoplamiento.
*   **Desacoplamiento total de "Colegas":** `Alice` y `Bob` no saben que el otro existe a nivel de código. Simplemente le dicen a la "Sala de Chat" (el Mediador): *"Oye, entrega este mensaje por mí"*.
*   **Topología de Estrella:** Transforma una red caótica y enredada ($N \times N$) en un sistema centralizado simple ($1 \times N$). Todos hablan solo con el Mediador, y el Mediador se encarga del resto.
*   **Centralización del control:** Toda la lógica de negocio (por ejemplo, "a quién le llega el mensaje", "qué usuarios están conectados", "aplicar filtro de malas palabras") recae exclusivamente en una única clase: el Mediador (`ChatRoom`).
*   **Facilidad de expansión y mantenimiento:** Si se necesita añadir nuevas reglas, se modifican en el Mediador, en vez de ir modificando la clase abstracta `User` o todas las clases de chat. Agregar un usuario nuevo no requiere actualizar ni notificar a los usuarios previamente existentes en el nivel de sus instancias.
