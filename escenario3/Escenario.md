# Escenario 3: Aplicación de Chat Grupal

## Escenario
Estás desarrollando una aplicación de chat grupal. Los usuarios pueden enviarse mensajes entre sí dentro de una sala de chat. Sin embargo, gestionar las interacciones directas entre cada usuario haría que cada uno deba conocer y comunicarse con todos los demás, lo que resulta en una alta dependencia entre objetos.

## Problema
Sin un mediador, si tenemos 10 usuarios en la sala, cada uno tendría que mantener referencias directas a los otros 9 usuarios para poder comunicarse (una relación Muchos a Muchos, o $N \times N$). Esto genera una "red de espagueti" donde los componentes están fuertemente acoplados. Si agregas o eliminas usuarios, debes actualizar y romper muchísimas referencias, resultando en un sistema difícil de escalar y de mantener.

## Validación del Patrón
Efectivamente, el patrón **Mediator (Mediador)** es el más óptimo y es el "estándar de la industria" (el ejemplo clásico por excelencia) para resolver exactamente este problema. Convierte una relación de muchos-a-muchos en una relación de uno-a-muchos (forma de estrella). En lugar de que los usuarios se hablen directamente entre sí, todos se comunican a través de un nodo central: la **Sala de Chat (El Mediador)**.

## Beneficios esperados y cómo los resuelve el Mediador:

1. **Facilita el mantenimiento (Agregar o eliminar usuarios no requiere modificar los demás):**
   * *Solución:* Como los usuarios (Colegas) no guardan referencias a otros usuarios, sino únicamente al Mediador, la entrada o salida de un usuario es trivial. Solo la sala de chat (`ChatRoom`) actualiza su lista interna de conectados. A `Alice` no le afecta en absoluto si `Bob` se desconecta o si `Dave` ingresa.

2. **Mejor organización (La lógica de comunicación centralizada):**
   * *Solución:* En lugar de que cada usuario tenga lógica compleja de "A quién debo enviar este mensaje" o "Cómo le aplico un filtro a las malas palabras", toda esa lógica reside en el método `sendMessage` del `ChatRoomMediator`. Si decides que los mensajes deben ser cifrados o filtrados, solo modificas el Mediador, en un solo lugar.

3. **Reduce la complejidad (Evita una red enmarañada):**
   * *Solución:* Se rompe el acoplamiento directo. Un objeto `ChatUser` puede existir sin saber absolutamente nada sobre las clases de los otros usuarios. El componente se vuelve altamente reutilizable para otros proyectos (por ejemplo, tomar la clase `ChatUser` y meterla en otra sala de un juego diferente) porque su única dependencia es una interfaz de Mediador (`ChatRoomMediator`).
