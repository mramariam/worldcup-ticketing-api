import { City } from "@domain/entities/City";

export class Stadium {
    name: string;
    city: City;
    capacity: number;

    constructor(name: string, city: City, capacity: number) {
        if (capacity <= 0) {
            throw new Error("La capacité du stade doit être supérieure à 0.");
        }
        this.name = name;
        this.city = city;
        this.capacity = capacity;
    }
}