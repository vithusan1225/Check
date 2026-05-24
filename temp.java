class Animal {
    String name;

    Animal(String name) {
        this.name = name;
    }

    void speak() {
        System.out.println(name + " makes a sound.");
    }
}

class Dog extends Animal {
    Dog(String name) {
        super(name);
    }

    @Override
    void speak() {
        System.out.println(name + " barks.");
    }
}

public class temp {
    public static void main(String[] args) {
        Animal animal = new Animal("Generic");
        animal.speak();

        Dog dog = new Dog("Buddy");
        dog.speak();
    }
}
