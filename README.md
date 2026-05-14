# Actividad 1: Patrones de Diseño

Este directorio contiene las soluciones para tres escenarios prácticos aplicando patrones de diseño, implementados íntegramente en **TypeScript**.

## 📋 Índice General

1. **[Escenario 1 - Patrón Builder](./escenario1/):** Sistema de configuración de un automóvil con múltiples características opcionales.
2. **[Escenario 2 - Patrón Bridge](./escenario2/):** Sistema de notificaciones multi-plataforma estructurado para evitar la explosión combinatoria de clases.
3. **[Escenario 3 - Patrón Mediator](./escenario3/):** Aplicación de chat grupal para centralizar la comunicación entre múltiples usuarios.

**En cada una de las carpetas encontrarás la siguiente estructura de archivos:**
*   `[Patron].ts`: El código fuente ejecutable con la implementación técnica del patrón y una prueba de su uso.
*   `Escenario.md`: El planteamiento original del problema y cómo el código resuelve cada uno de los beneficios esperados.
*   `README.md`: La justificación teórica detallada sobre **por qué** se escogió ese patrón en particular, descartando otras alternativas.
*   `DiagramaClases.md`: Un diagrama visual UML generado con sintaxis *Mermaid* que muestra las relaciones de clases.

---

## ⚙️ Requisitos Previos

Para poder ejecutar el código fuente de los ejercicios en tu máquina local, requieres el siguiente entorno:

1. **Node.js**: Debes tener Node.js instalado en tu sistema (versión 14 o superior). Puedes verificarlo ejecutando `node -v` en tu terminal.
2. **npm / npx**: Vienen instalados por defecto al instalar Node.js. Servirán para descargar y ejecutar al vuelo el compilador de TypeScript.
3. **TypeScript + ts-node**: No necesitas instalarlos globalmente si usas el comando `npx`, ya que el comando descargará y ejecutará `ts-node` de forma temporal si no lo detecta en tu sistema.

---

## 🚀 Cómo Ejecutar los Escenarios

Abre tu terminal, asegúrate de estar posicionado en la raíz de esta carpeta (`Actividad 1`), y ejecuta los siguientes comandos dependiendo del ejercicio que quieras probar.

### 🚗 Escenario 1: Builder (Configuración de Automóviles)
Observa en consola cómo se construye un auto complejo paso a paso, asegurando la inmutabilidad de sus atributos opcionales.

```bash
cd escenario1
npx ts-node Builder.ts
```
*(Para volver a la raíz luego de ejecutar, usa `cd ..`)*

### 📱 Escenario 2: Bridge (Sistema de Notificaciones)
Observa en consola cómo se pueden combinar libremente y en tiempo de ejecución distintos *Tipos* de notificaciones (Mensajes, Alertas) con distintas *Plataformas* (Web, Móvil, Desktop).

```bash
cd escenario2
npx ts-node Bridge.ts
```

### 💬 Escenario 3: Mediator (Chat Grupal)
Observa en consola cómo múltiples usuarios envían mensajes que son distribuidos correctamente, comprobando que ningún usuario interactúa directamente con otro, sino a través de la sala central.

```bash
cd escenario3
npx ts-node Mediator.ts
```
