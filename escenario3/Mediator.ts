// --- Interfaz Mediator ---
// Define la interfaz de comunicación. Los "Colegas" (usuarios) usarán
// esta interfaz para comunicarse con el mediador.
interface ChatRoomMediator {
    sendMessage(message: string, user: User): void;
    addUser(user: User): void;
}

// --- Mediator Concreto ---
// Implementa el comportamiento cooperativo coordinando a los usuarios.
// Conoce y mantiene las referencias de todos los participantes.
class ChatRoom implements ChatRoomMediator {
    private users: User[] = [];

    public addUser(user: User): void {
        this.users.push(user);
        user.setMediator(this); // Establece la referencia al mediador al entrar a la sala
    }

    public sendMessage(message: string, senderUser: User): void {
        const timestamp = new Date().toLocaleTimeString();
        
        // El mediador contiene la lógica centralizada de cómo se distribuyen los mensajes
        console.log(`[Sala de Chat - ${timestamp}] ${senderUser.getName()} dice: ${message}`);
        
        for (const user of this.users) {
            // No enviar el mensaje al propio usuario que lo emitió
            if (user !== senderUser) {
                user.receive(message, senderUser.getName());
            }
        }
    }
}

// --- Colleague (Colega Abstracto) ---
// Representa un participante que interactúa a través del mediador.
abstract class User {
    protected name: string;
    protected mediator!: ChatRoomMediator;

    constructor(name: string) {
        this.name = name;
    }

    public getName(): string {
        return this.name;
    }

    public setMediator(mediator: ChatRoomMediator): void {
        this.mediator = mediator;
    }

    // En lugar de enviar un mensaje a "Jane" o "Bob", el usuario se lo envía al mediador
    public send(message: string): void {
        console.log(`\n--- ${this.name} enviando mensaje... ---`);
        this.mediator.sendMessage(message, this);
    }

    public abstract receive(message: string, senderName: string): void;
}

// --- Colleague Concreto ---
class ChatUser extends User {
    public receive(message: string, senderName: string): void {
        console.log(`   -> [${this.name} recibe de ${senderName}]: ${message}`);
    }
}

// --- Ejecución Cliente ---
const chatGroup = new ChatRoom();

const alice = new ChatUser("Alice");
const bob = new ChatUser("Bob");
const charlie = new ChatUser("Charlie");
const dave = new ChatUser("Dave");

// Centralizamos la conexión agregándolos al mediador
chatGroup.addUser(alice);
chatGroup.addUser(bob);
chatGroup.addUser(charlie);

console.log("=== Inicio del Chat ===");

// Fíjate que Alice no sabe de la existencia de Bob o Charlie directamente.
alice.send("¡Hola equipo, buenos días!");

bob.send("¡Hola Alice! ¿Todo bien?");

console.log("\n=== Ingresa un nuevo usuario ===");
// Agregar un nuevo usuario es tan simple como registrarlo en el mediador.
// No hay que modificar ni avisar a Alice, Bob o Charlie.
chatGroup.addUser(dave);
dave.send("¡Perdón por la demora, ya estoy aquí!");
