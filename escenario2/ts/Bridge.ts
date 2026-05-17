// --- Implementación (La Plataforma) ---
// Define la interfaz para las plataformas en las que se enviarán las notificaciones.
// La Abstracción solo puede comunicarse a través de los métodos declarados aquí.
interface NotificationPlatform {
    send(title: string, message: string): void;
}

// Implementaciones Concretas de las Plataformas
class WebPlatform implements NotificationPlatform {
    send(title: string, message: string): void {
        console.log(`[Web Browser] Mostrando pop-up: ${title} -> ${message}`);
    }
}

class MobilePlatform implements NotificationPlatform {
    send(title: string, message: string): void {
        console.log(`[App Móvil] Notificación Push: ${title} -> ${message}`);
    }
}

class DesktopPlatform implements NotificationPlatform {
    send(title: string, message: string): void {
        console.log(`[Escritorio] Toast del Sistema Operativo: ${title} -> ${message}`);
    }
}

// --- Abstracción (Tipo de Notificación) ---
// Actúa como el controlador que delega el trabajo real a la Plataforma enlazada.
abstract class AppNotification {
    protected platform: NotificationPlatform;

    // El objeto puente (Bridge) se establece en el constructor
    constructor(platform: NotificationPlatform) {
        this.platform = platform;
    }

    // Permite cambiar la plataforma en tiempo de ejecución
    public setPlatform(platform: NotificationPlatform): void {
        this.platform = platform;
    }

    public abstract notify(message: string): void;
}

// --- Abstracciones Refinadas ---
// Tipos específicos de notificaciones (Mensaje, Alerta, Advertencia, Confirmación)
class MessageNotification extends AppNotification {
    public notify(message: string): void {
        this.platform.send("Mensaje Nuevo", message);
    }
}

class AlertNotification extends AppNotification {
    public notify(message: string): void {
        // Formateo específico para alertas
        this.platform.send("¡ALERTA CRÍTICA!", `⚠️ ${message.toUpperCase()} ⚠️`);
    }
}

class WarningNotification extends AppNotification {
    public notify(message: string): void {
        this.platform.send("Advertencia", `Precaución: ${message}`);
    }
}

class ConfirmationNotification extends AppNotification {
    public notify(message: string): void {
        this.platform.send("Confirmación", `✅ Éxito: ${message}`);
    }
}

// --- Ejecución Cliente ---
console.log("=== Combinación: Mensaje en Web ===");
const webPlatform = new WebPlatform();
const notificationMessage = new MessageNotification(webPlatform);
notificationMessage.notify("Hola, ¿cómo estás?");

console.log("\n=== Combinación: Alerta en Móvil ===");
const mobilePlatform = new MobilePlatform();
const notificationAlert = new AlertNotification(mobilePlatform);
notificationAlert.notify("Intento de acceso no autorizado");

console.log("\n=== Flexibilidad en Tiempo de Ejecución ===");
console.log("Cambiando el Mensaje para que ahora llegue por Escritorio...");
const desktopPlatform = new DesktopPlatform();
notificationMessage.setPlatform(desktopPlatform); // Cambiamos el puente en caliente
notificationMessage.notify("Hola de nuevo, te envié el documento.");

console.log("\n=== Combinación: Advertencia en Escritorio ===");
const notificationWarning = new WarningNotification(desktopPlatform);
notificationWarning.notify("Espacio en disco insuficiente.");

console.log("\n=== Combinación: Confirmación en Web ===");
const notificationConfirmation = new ConfirmationNotification(webPlatform);
notificationConfirmation.notify("Tus preferencias han sido guardadas.");
