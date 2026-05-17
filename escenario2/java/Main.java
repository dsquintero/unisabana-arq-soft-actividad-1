interface NotificationPlatform {
    void send(String title, String message);
}

class WebPlatform implements NotificationPlatform {
    public void send(String title, String message) {
        System.out.println("[Web Browser] Mostrando pop-up: " + title + " -> " + message);
    }
}

class MobilePlatform implements NotificationPlatform {
    public void send(String title, String message) {
        System.out.println("[App Móvil] Notificación Push: " + title + " -> " + message);
    }
}

class DesktopPlatform implements NotificationPlatform {
    public void send(String title, String message) {
        System.out.println("[Escritorio] Toast del Sistema Operativo: " + title + " -> " + message);
    }
}

abstract class AppNotification {
    protected NotificationPlatform platform;

    public AppNotification(NotificationPlatform platform) {
        this.platform = platform;
    }

    public void setPlatform(NotificationPlatform platform) {
        this.platform = platform;
    }

    public abstract void notifyMessage(String message);
}

class MessageNotification extends AppNotification {
    public MessageNotification(NotificationPlatform platform) { super(platform); }
    public void notifyMessage(String message) {
        this.platform.send("Mensaje Nuevo", message);
    }
}

class AlertNotification extends AppNotification {
    public AlertNotification(NotificationPlatform platform) { super(platform); }
    public void notifyMessage(String message) {
        this.platform.send("¡ALERTA CRÍTICA!", "⚠️ " + message.toUpperCase() + " ⚠️");
    }
}

class WarningNotification extends AppNotification {
    public WarningNotification(NotificationPlatform platform) { super(platform); }
    public void notifyMessage(String message) {
        this.platform.send("Advertencia", "Precaución: " + message);
    }
}

class ConfirmationNotification extends AppNotification {
    public ConfirmationNotification(NotificationPlatform platform) { super(platform); }
    public void notifyMessage(String message) {
        this.platform.send("Confirmación", "✅ Éxito: " + message);
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println("=== Combinación: Mensaje en Web ===");
        NotificationPlatform webPlatform = new WebPlatform();
        AppNotification notificationMessage = new MessageNotification(webPlatform);
        notificationMessage.notifyMessage("Hola, ¿cómo estás?");

        System.out.println("\n=== Combinación: Alerta en Móvil ===");
        NotificationPlatform mobilePlatform = new MobilePlatform();
        AppNotification notificationAlert = new AlertNotification(mobilePlatform);
        notificationAlert.notifyMessage("Intento de acceso no autorizado");

        System.out.println("\n=== Flexibilidad en Tiempo de Ejecución ===");
        System.out.println("Cambiando el Mensaje para que ahora llegue por Escritorio...");
        NotificationPlatform desktopPlatform = new DesktopPlatform();
        notificationMessage.setPlatform(desktopPlatform);
        notificationMessage.notifyMessage("Hola de nuevo, te envié el documento.");

        System.out.println("\n=== Combinación: Advertencia en Escritorio ===");
        AppNotification notificationWarning = new WarningNotification(desktopPlatform);
        notificationWarning.notifyMessage("Espacio en disco insuficiente.");

        System.out.println("\n=== Combinación: Confirmación en Web ===");
        AppNotification notificationConfirmation = new ConfirmationNotification(webPlatform);
        notificationConfirmation.notifyMessage("Tus preferencias han sido guardadas.");
    }
}
