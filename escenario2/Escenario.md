# Escenario 2: Sistema de Notificaciones Multi-Plataforma

## Escenario
Estás desarrollando una aplicación que gestiona la visualización de notificaciones en diferentes plataformas (por ejemplo: escritorio, móvil, web). Las notificaciones pueden ser de distintos tipos (mensaje, alerta, advertencia, confirmación) y cada tipo puede mostrarse de distintas formas según la plataforma.

## Problema
Si usas herencia tradicional, tendrías que crear una nueva clase para cada combinación posible de "Tipo de Notificación" y "Plataforma". Por ejemplo:
- `NotificacionMensajeWeb`
- `NotificacionAlertaWeb`
- `NotificacionMensajeMovil`
- `NotificacionAlertaMovil`
- ...y así sucesivamente.

Esto lleva rápidamente a una explosión combinatoria de subclases. Si se añade un nuevo tipo de notificación (ej. "Recordatorio") o una nueva plataforma (ej. "Reloj Inteligente"), el número de clases crecería exponencialmente, lo que haría el código muy difícil de mantener y extender.

## Beneficios esperados de la solución:
*   **Separación de responsabilidades:** Separar la lógica de la notificación del medio por el que se presenta.
*   **Escalabilidad:** Poder agregar nuevas plataformas o tipos de notificación sin modificar el resto del sistema.
*   **Reducción de clases:** Evitar la multiplicación de clases para cada combinación.
*   **Flexibilidad en tiempo de ejecución:** Poder cambiar la plataforma dinámicamente si es necesario.

---

## Solución: Patrón Bridge (Puente)

El patrón **Bridge** soluciona el problema de la explosión combinatoria al pasar de la **herencia** a la **composición de objetos**. Identifica dos jerarquías independientes (en este caso, los "Tipos de Notificación" que actúan como la Abstracción, y las "Plataformas" que actúan como la Implementación) y construye un "puente" entre ambas.

### ¿Cómo aborda los requerimientos?

1.  **Separación de responsabilidades:** 
    *   La lógica y formato de alto nivel de las notificaciones se mantiene en las clases `AppNotification` (Mensaje, Alerta, etc.).
    *   El "cómo" se envía físicamente el mensaje a los dispositivos reside en `NotificationPlatform` (Web, Mobile, Desktop).
    *   Ambas dimensiones no se entrelazan. La Abstracción solo delega la orden de visualización a la Plataforma mediante una referencia interna.

2.  **Reducción de clases:** 
    En lugar de crear subclases para cada combinación (`3 plataformas * 4 tipos de notificación = 12 clases`), solo creamos las piezas independientes (`3 plataformas + 4 tipos = 7 clases`). Si agregamos una plataforma nueva, solo creamos 1 clase extra en lugar de 4.

3.  **Escalabilidad:** 
    Si el día de mañana se necesita integrar notificaciones para una "SmartTV", simplemente se crea una nueva clase `SmartTvPlatform implements NotificationPlatform` y automáticamente funcionará con todos los tipos de notificación existentes sin tocar el código original.

4.  **Flexibilidad en tiempo de ejecución:**
    Al usar composición, la clase `AppNotification` contiene una propiedad `platform` que puede modificarse sobre la marcha mediante el método `setPlatform()`. Esto permite que una notificación cambie de destino dinámicamente sin destruir ni recrear el objeto de la notificación, a diferencia de la herencia que es estática y definitiva.
