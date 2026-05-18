/**
 * Clase producto es el objetos resultante.
 * Los productos construidos por distintos objetos constructores
 * no tienen que pertenecer a la misma jerarquía de clases o interfaz.
 */
class Car {
    private final String engineType;
    private final String color;
    private final String tires;
    private final String soundSystem;
    private final String interior;
    private final boolean sunroof;
    private final boolean gpsNavigation;

    // Se usa el constructor para asignar los valores y mantener la inmutabilidad
    public Car(CustomCarBuilder builder) {
        this.engineType = builder.getEngineType();
        this.color = builder.getColor();
        this.tires = builder.getTires();
        this.soundSystem = builder.getSoundSystem();
        this.interior = builder.getInterior();
        this.sunroof = builder.hasSunroof();
        this.gpsNavigation = builder.hasGpsNavigation();
    }

    public void showDetails() {
        System.out.println("Automóvil configurado con:");
        System.out.println("- Motor: " + (engineType != null ? engineType : "N/A"));
        System.out.println("- Color: " + (color != null ? color : "N/A"));
        System.out.println("- Llantas: " + (tires != null ? tires : "N/A"));
        System.out.println("- Sistema de sonido: " + (soundSystem != null ? soundSystem : "N/A"));
        System.out.println("- Interiores: " + (interior != null ? interior : "N/A"));
        System.out.println("- Techo solar: " + (sunroof ? "Sí" : "No"));
        System.out.println("- Navegación GPS: " + (gpsNavigation ? "Sí" : "No"));
    }
}

/**
 * sta interfza declara pasos de construcción de producto que todos los tipos de objetos
 */
interface CarBuilder {
    CarBuilder setEngineType(String engineType);
    CarBuilder setColor(String color);
    CarBuilder setTires(String tires);
    CarBuilder setSoundSystem(String soundSystem);
    CarBuilder setInterior(String interior);
    CarBuilder setSunroof(boolean sunroof);
    CarBuilder setGpsNavigation(boolean gpsNavigation);
    Car build();
}

/**
 *  Esta clase ofrece distintas implementaciones de los pasos de construcción.
 *  Los constructores concretos pueden crear productos que no siguen
 *  la interfaz común.
 */
class CustomCarBuilder implements CarBuilder {
    private String engineType;
    private String color;
    private String tires;
    private String soundSystem;
    private String interior;
    private boolean sunroof;
    private boolean gpsNavigation;

    public void reset() {
        this.engineType = null;
        this.color = null;
        this.tires = null;
        this.soundSystem = null;
        this.interior = null;
        this.sunroof = false;
        this.gpsNavigation = false;
    }

    public CarBuilder setEngineType(String engineType) {
        this.engineType = engineType;
        return this;
    }

    public CarBuilder setColor(String color) {
        this.color = color;
        return this;
    }

    public CarBuilder setTires(String tires) {
        this.tires = tires;
        return this;
    }

    public CarBuilder setSoundSystem(String soundSystem) {
        this.soundSystem = soundSystem;
        return this;
    }

    public CarBuilder setInterior(String interior) {
        this.interior = interior;
        return this;
    }

    public CarBuilder setSunroof(boolean sunroof) {
        this.sunroof = sunroof;
        return this;
    }

    public CarBuilder setGpsNavigation(boolean gpsNavigation) {
        this.gpsNavigation = gpsNavigation;
        return this;
    }

    public String getEngineType() { return engineType; }
    public String getColor() { return color; }
    public String getTires() { return tires; }
    public String getSoundSystem() { return soundSystem; }
    public String getInterior() { return interior; }
    public boolean hasSunroof() { return sunroof; }
    public boolean hasGpsNavigation() { return gpsNavigation; }

    public Car build() {
        Car result = new Car(this);
        this.reset();
        return result;
    }
}

/**
 * Esta clase Director define el orden en el que se invocarán los pasos de construcción,
 * por ende se puede crear y reutilizar configuraciones específicas de los productos
 */
class CarDirector {
    private CarBuilder builder;

    public CarDirector(CarBuilder builder) {
        this.builder = builder;
    }

    public void setBuilder(CarBuilder builder) {
        this.builder = builder;
    }

    public Car buildSportsCar() {
        return builder.setEngineType("V8")
                      .setColor("Rojo")
                      .setTires("Deportivas")
                      .setInterior("Cuero")
                      .setSunroof(true)
                      .setGpsNavigation(true)
                      .build();
    }

    public Car buildEconomyCar() {
        return builder.setEngineType("1.0L 3-cilindros")
                      .setColor("Blanco")
                      .setTires("Estándar")
                      .setInterior("Tela")
                      .setSunroof(false)
                      .setGpsNavigation(false)
                      .build();
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println("=== Uso del Builder para un auto personalizado ===");
        CustomCarBuilder customBuilder = new CustomCarBuilder();
        Car productCustomCar = customBuilder
                .setEngineType("Híbrido")
                .setColor("Azul Noche")
                .setGpsNavigation(true)
                .setSoundSystem("Harman Kardon")
                .build();

        productCustomCar.showDetails();

        System.out.println("\n=== Uso del Director para autos preconfigurados ===");
        CarDirector director = new CarDirector(customBuilder);

        System.out.println("\n--- Auto Deportivo ---");
        Car sportsCar = director.buildSportsCar();
        sportsCar.showDetails();

        System.out.println("\n--- Auto Económico ---");
        Car economyCar = director.buildEconomyCar();
        economyCar.showDetails();
    }
}
