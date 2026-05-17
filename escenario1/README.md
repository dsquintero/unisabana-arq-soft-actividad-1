# Justificación del Patrón de Diseño: Builder

## Tipo de Patrón
**Creacional**

## ¿Por qué se seleccionó el patrón Builder para el Escenario 1?

Para el problema de la compañía automotriz, el principal desafío era la necesidad de crear un objeto `Automóvil` que posee una gran cantidad de configuraciones opcionales.

Se descartaron otros enfoques por las siguientes razones:
1. **Múltiples Constructores (Sobrecarga):** Si intentáramos crear constructores para cada posible combinación (Auto con GPS, Auto con GPS y Techo, Auto sin GPS pero con sistema de sonido, etc.), terminaríamos con decenas de constructores (`new Car(engine, gps)`, `new Car(engine, gps, sunroof)`), lo cual es inmanejable.
2. **Constructor Telescópico:** Consiste en tener un solo constructor gigante pasándole `null` a los valores que no queremos: `new Car("V8", "Rojo", null, null, null, true, false)`. Esto hace que el código sea casi imposible de leer y entender, ya que a simple vista no se sabe a qué atributo corresponde cada parámetro o valor `null`.
3. **Patrón Factory Method o Abstract Factory:** Estos patrones son útiles para crear familias de objetos enteros o cuando no sabemos la clase exacta a instanciar, pero no solucionan el problema de la configuración *paso a paso* de un único objeto muy complejo.

### La elección de Builder
El patrón **Builder** fue elegido porque su propósito exacto es **separar la construcción de un objeto complejo de su representación**. 
*   **Permite una interfaz fluida (Fluent Interface):** Hace que la lectura del código sea natural, encadenando métodos claros como `builder.setColor("Rojo").setSunroof(true).build()`.
*   **Controla el paso a paso:** Permite configurar el objeto en distintas etapas o métodos antes de instanciarlo definitivamente.
*   **Asegura la Inmutabilidad:** Al recolectar todos los atributos en el *Builder* temporalmente y pasarlos de una vez a la clase final `Car`, garantizamos que sus campos sean inmutables (solo lectura) tras la creación.
