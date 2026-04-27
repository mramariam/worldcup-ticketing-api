import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { City } from "@domain/entities/City";

@Entity()
export class Stadium {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public name!: string;

    @ManyToOne(() => City)
    public city!: City;

    @Column()
    public capacity!: number;

    constructor(name?: string, city?: City, capacity?: number) {
        if (name && city && capacity !== undefined) {
            if (capacity <= 0) {
                throw new Error("La capacité du stade doit être supérieure à 0.");
            }
            this.name = name;
            this.city = city;
            this.capacity = capacity;
        }
    }
}
