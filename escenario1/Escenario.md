# Escenario 1: Personalización de un Automóvil

## Escenario
Imagina que estás desarrollando una aplicación para una compañía automotriz que permite a los clientes personalizar y ordenar un automóvil. Un objeto `Automóvil` puede tener muchas configuraciones opcionales: tipo de motor, color, llantas, sistema de sonido, interiores, techo solar, navegación GPS, etc.

## Problema
Crear un objeto `Automóvil` con múltiples configuraciones puede llevar a constructores con muchos parámetros (el infame "constructor telescópico") o a múltiples constructores sobrecargados, lo que dificulta el mantenimiento y legibilidad del código.

## Beneficios esperados de la solución:
*   **Legibilidad y claridad:** Facilitar la creación de objetos complejos con muchos parámetros sin necesidad de múltiples constructores o valores por defecto.
*   **Inmutabilidad:** Una vez creado el objeto, sus propiedades no se pueden modificar si el constructor lo define como inmutable.
*   **Flexibilidad:** Poder omitir atributos opcionales sin necesidad de crear subclases o múltiples constructores.
*   **Separación de construcción y representación:** Separar la lógica de construcción del objeto en sí, facilitando modificaciones futuras.

---

## Solución: Patrón Builder (Constructor)

El patrón **Builder** es la solución ideal para este problema. Permite construir objetos complejos paso a paso, aislando la lógica de construcción de los datos de su representación y evitando los problemas del constructor telescópico.

### ¿Cómo aborda los requerimientos?

1.  **Legibilidad y claridad:** Gracias al uso de una interfaz fluida (*fluent interface*), el código del cliente especifica solo lo que necesita, logrando que el código sea muy fácil de leer. Por ejemplo: `builder.setColor("Azul").setSunroof(true).build();`.
2.  **Inmutabilidad:** En nuestra implementación, la clase `Car` usa propiedades de solo lectura (`readonly`). El `Builder` recolecta todas las opciones configuradas y se las pasa al constructor de `Car` una única vez durante el método `.build()`. Una vez inicializadas, no pueden cambiarse.
3.  **Flexibilidad:** El cliente simplemente no llama a los métodos para establecer aquellas opciones que no desea configurar (como `setTires` o `setInterior`), dejando dichos campos como nulos o en su valor por defecto de manera limpia.
4.  **Separación de construcción y representación:** `Car` es solo un contenedor de datos estático, mientras que `CustomCarBuilder` contiene toda la lógica de ensamblaje. Además, se implementó un `CarDirector` opcional para empaquetar flujos de configuración comunes, como la creación de un "Auto Deportivo" o un "Auto Económico".
