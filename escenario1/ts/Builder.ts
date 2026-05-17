// Producto: Automóvil
class Car {
    public readonly engineType?: string;
    public readonly color?: string;
    public readonly tires?: string;
    public readonly soundSystem?: string;
    public readonly interior?: string;
    public readonly sunroof?: boolean;
    public readonly gpsNavigation?: boolean;

    // Usamos el constructor para asignar los valores y mantener la inmutabilidad
    constructor(builder: CustomCarBuilder) {
        this.engineType = builder.engineType;
        this.color = builder.color;
        this.tires = builder.tires;
        this.soundSystem = builder.soundSystem;
        this.interior = builder.interior;
        this.sunroof = builder.sunroof;
        this.gpsNavigation = builder.gpsNavigation;
    }

    public showDetails(): void {
        console.log(`Automóvil configurado con:`);
        console.log(`- Motor: ${this.engineType || 'N/A'}`);
        console.log(`- Color: ${this.color || 'N/A'}`);
        console.log(`- Llantas: ${this.tires || 'N/A'}`);
        console.log(`- Sistema de sonido: ${this.soundSystem || 'N/A'}`);
        console.log(`- Interiores: ${this.interior || 'N/A'}`);
        console.log(`- Techo solar: ${this.sunroof ? 'Sí' : 'No'}`);
        console.log(`- Navegación GPS: ${this.gpsNavigation ? 'Sí' : 'No'}`);
    }
}

// Interfaz Builder
interface CarBuilder {
    setEngineType(engineType: string): this;
    setColor(color: string): this;
    setTires(tires: string): this;
    setSoundSystem(soundSystem: string): this;
    setInterior(interior: string): this;
    setSunroof(sunroof: boolean): this;
    setGpsNavigation(gpsNavigation: boolean): this;
    build(): Car;
}

// Concrete Builder
class CustomCarBuilder implements CarBuilder {
    // Propiedades temporales del builder
    public engineType?: string;
    public color?: string;
    public tires?: string;
    public soundSystem?: string;
    public interior?: string;
    public sunroof?: boolean;
    public gpsNavigation?: boolean;

    constructor() {
        this.reset();
    }

    public reset(): void {
        this.engineType = undefined;
        this.color = undefined;
        this.tires = undefined;
        this.soundSystem = undefined;
        this.interior = undefined;
        this.sunroof = undefined;
        this.gpsNavigation = undefined;
    }

    public setEngineType(engineType: string): this {
        this.engineType = engineType;
        return this; // Permite el encadenamiento de métodos (fluent interface)
    }

    public setColor(color: string): this {
        this.color = color;
        return this;
    }

    public setTires(tires: string): this {
        this.tires = tires;
        return this;
    }

    public setSoundSystem(soundSystem: string): this {
        this.soundSystem = soundSystem;
        return this;
    }

    public setInterior(interior: string): this {
        this.interior = interior;
        return this;
    }

    public setSunroof(sunroof: boolean): this {
        this.sunroof = sunroof;
        return this;
    }

    public setGpsNavigation(gpsNavigation: boolean): this {
        this.gpsNavigation = gpsNavigation;
        return this;
    }

    public build(): Car {
        // Pasa este builder al constructor del auto para mantener la inmutabilidad
        const result = new Car(this);
        this.reset(); // Prepara el builder para crear un nuevo objeto (opcional)
        return result;
    }
}

// Director (Opcional, útil para configuraciones predeterminadas)
class CarDirector {
    private builder: CarBuilder;

    constructor(builder: CarBuilder) {
        this.builder = builder;
    }

    public setBuilder(builder: CarBuilder): void {
        this.builder = builder;
    }

    public buildSportsCar(): Car {
        return this.builder
            .setEngineType("V8")
            .setColor("Rojo")
            .setTires("Deportivas")
            .setInterior("Cuero")
            .setSunroof(true)
            .setGpsNavigation(true)
            .build();
    }

    public buildEconomyCar(): Car {
        return this.builder
            .setEngineType("1.0L 3-cilindros")
            .setColor("Blanco")
            .setTires("Estándar")
            .setInterior("Tela")
            .setSunroof(false)
            .setGpsNavigation(false)
            .build();
    }
}

// --- Ejecución ---
console.log("=== Uso del Builder para un auto personalizado ===");
const customBuilder = new CustomCarBuilder();
const myCustomCar = customBuilder
    .setEngineType("Híbrido")
    .setColor("Azul Noche")
    .setGpsNavigation(true)
    .setSoundSystem("Harman Kardon")
    // Note que omitimos llantas, interiores y techo solar
    .build();

myCustomCar.showDetails();
// myCustomCar.color = "Verde"; // Esto daría error porque las propiedades son inmutables (readonly)

console.log("\n=== Uso del Director para autos preconfigurados ===");
const director = new CarDirector(customBuilder);

console.log("\n--- Auto Deportivo ---");
const sportsCar = director.buildSportsCar();
sportsCar.showDetails();

console.log("\n--- Auto Económico ---");
const economyCar = director.buildEconomyCar();
economyCar.showDetails();
