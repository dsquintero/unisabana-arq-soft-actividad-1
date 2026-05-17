import java.util.ArrayList;
import java.util.List;

interface ChatRoomMediator {
    void sendMessage(String message, User user);
    void addUser(User user);
}

class ChatRoom implements ChatRoomMediator {
    private List<User> users = new ArrayList<>();

    public void addUser(User user) {
        this.users.add(user);
        user.setMediator(this);
    }

    public void sendMessage(String message, User senderUser) {
        String timestamp = java.time.LocalTime.now().format(java.time.format.DateTimeFormatter.ofPattern("HH:mm:ss"));
        
        System.out.println("[Sala de Chat - " + timestamp + "] " + senderUser.getName() + " dice: " + message);
        
        for (User user : this.users) {
            if (user != senderUser) {
                user.receive(message, senderUser.getName());
            }
        }
    }
}

abstract class User {
    protected String name;
    protected ChatRoomMediator mediator;

    public User(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }

    public void setMediator(ChatRoomMediator mediator) {
        this.mediator = mediator;
    }

    public void send(String message) {
        System.out.println("\n--- " + this.name + " enviando mensaje... ---");
        this.mediator.sendMessage(message, this);
    }

    public abstract void receive(String message, String senderName);
}

class ChatUser extends User {
    public ChatUser(String name) {
        super(name);
    }

    public void receive(String message, String senderName) {
        System.out.println("   -> [" + this.name + " recibe de " + senderName + "]: " + message);
    }
}

public class Main {
    public static void main(String[] args) {
        ChatRoom chatGroup = new ChatRoom();

        User alice = new ChatUser("Alice");
        User bob = new ChatUser("Bob");
        User charlie = new ChatUser("Charlie");
        User dave = new ChatUser("Dave");

        chatGroup.addUser(alice);
        chatGroup.addUser(bob);
        chatGroup.addUser(charlie);

        System.out.println("=== Inicio del Chat ===");

        alice.send("¡Hola equipo, buenos días!");
        bob.send("¡Hola Alice! ¿Todo bien?");

        System.out.println("\n=== Ingresa un nuevo usuario ===");
        chatGroup.addUser(dave);
        dave.send("¡Perdón por la demora, ya estoy aquí!");
    }
}
