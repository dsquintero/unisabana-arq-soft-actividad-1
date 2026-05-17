# Actividad 1: Patrones de Diseño

Este directorio contiene las soluciones para tres escenarios prácticos aplicando patrones de diseño. Para ofrecer mayor flexibilidad, **cada escenario incluye la implementación tanto en TypeScript como en Java.**

## 📋 Índice General

1. **[Escenario 1 - Patrón Builder](./escenario1/):** Sistema de configuración de un automóvil con múltiples características opcionales.
2. **[Escenario 2 - Patrón Bridge](./escenario2/):** Sistema de notificaciones multi-plataforma estructurado para evitar la explosión combinatoria de clases.
3. **[Escenario 3 - Patrón Mediator](./escenario3/):** Aplicación de chat grupal para centralizar la comunicación entre múltiples usuarios.

**En cada una de las carpetas encontrarás la siguiente estructura:**
*   📁 `ts/`: Carpeta con el código fuente ejecutable en TypeScript (`.ts`).
*   📁 `java/`: Carpeta con el código fuente ejecutable en Java (`Main.java`).
*   📝 `Escenario.md`: El planteamiento original del problema y cómo el código resuelve cada uno de los beneficios esperados.
*   📝 `README.md`: La justificación teórica detallada sobre **por qué** se escogió ese patrón en particular, descartando alternativas.
*   📊 `DiagramaClases.md`: Un diagrama visual UML generado con sintaxis *Mermaid* que muestra las relaciones de clases.

---

## ⚙️ Requisitos Previos

Para ejecutar los proyectos de manera local requieres:

*   **Para TypeScript:** Instalar **Node.js** (v14 o superior). Esto incluye la herramienta `npx` que descargará y ejecutará `ts-node` al vuelo.
*   **Para Java:** Instalar el **JDK de Java** (versión 11 o superior sugerida para ejecutar archivos sueltos usando el comando `java`).

---

## 🚀 Cómo Ejecutar los Escenarios

Abre tu terminal y asegúrate de estar posicionado en la raíz de esta carpeta (`Actividad 1`).

### 🚗 Escenario 1: Builder (Configuración de Automóviles)

Para ejecutar en TypeScript:
```bash
cd escenario1/ts
npx ts-node Builder.ts
```

Para ejecutar en Java:
```bash
cd escenario1/java
java Main.java
```

*(Recuerda usar `cd ../..` para volver a la raíz)*

### 📱 Escenario 2: Bridge (Sistema de Notificaciones)

Para ejecutar en TypeScript:
```bash
cd escenario2/ts
npx ts-node Bridge.ts
```

Para ejecutar en Java:
```bash
cd escenario2/java
java Main.java
```

### 💬 Escenario 3: Mediator (Chat Grupal)

Para ejecutar en TypeScript:
```bash
cd escenario3/ts
npx ts-node Mediator.ts
```

Para ejecutar en Java:
```bash
cd escenario3/java
java Main.java
```
