# Justificación del Patrón de Diseño: Bridge

## Tipo de Patrón
**Estructural**

## ¿Por qué se seleccionó el patrón Bridge para el Escenario 2?

El sistema de notificaciones enfrentaba un problema clásico de explosión combinatoria al intentar manejar dos dimensiones independientes que crecen a la par:
1. **El Tipo de Notificación:** Mensaje, Alerta, Advertencia, Confirmación.
2. **La Plataforma de Salida:** Web, Móvil, Escritorio.

### ¿Por qué se descartaron otras alternativas?
*   **Herencia Múltiple / Subclases (El Anti-patrón):** Crear subclases para cada combinación (`MensajeWeb`, `AlertaWeb`, `MensajeMovil`, etc.) acoplaría fuertemente el código. Por cada nueva plataforma que el negocio decida integrar (Ej. SmartTV), tendríamos que replicar y escribir 4 nuevas clases (una por cada tipo de notificación existente). Esto viola el Principio Abierto/Cerrado (SOLID).
*   **Patrón Strategy:** Aunque se parece estructuralmente, *Strategy* se enfoca en cambiar algoritmos intercambiables de una misma tarea (como rutear un mapa a pie, bici o auto). Aquí, estamos separando una *abstracción de alto nivel* (la lógica de qué tipo de notificación es) de una *implementación física subyacente* (la plataforma de envío).

### La elección de Bridge
El patrón **Bridge (Puente)** fue seleccionado porque está diseñado específicamente para **separar una abstracción de su implementación, permitiendo que ambas evolucionen de forma independiente**.
*   **Prioriza la composición sobre la herencia:** En lugar de heredar de `PlataformaWeb` dentro de la clase `NotificacionMensaje`, la clase `AppNotification` *contiene* una referencia abstracta hacia cualquier `NotificationPlatform`.
*   **Independencia de dimensiones:** Permite que crear un nuevo Tipo de Notificación no obligue a modificar el código de las plataformas, y viceversa. Las matemáticas pasan de multiplicarse ($N \times M$ subclases) a sumarse ($N + M$ clases modulares).
*   **Dinamismo en ejecución:** Facilita cambiar el comportamiento de forma dinámica. Una notificación puede iniciar estando asociada a la plataforma `Web` y a medio camino reasignarse (mediante su método *setter*) a `MobilePlatform`.
