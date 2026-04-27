import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { City } from "@domain/entities/City";

@Entity()
export class Country {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({ type: "varchar", length: 10 })
    public name!: "USA" | "Mexico" | "Canada";

    @Column({ type: "varchar", length: 2 })
    public code!: "us" | "me" | "ca";

    @OneToMany(() => City, (city) => city.country)
    public cities!: City[];

    constructor(name?: "USA" | "Mexico" | "Canada", code?: "us" | "me" | "ca") {
        if (name && code) {
            if (!((name === "USA" && code === "us") || 
                  (name === "Mexico" && code === "me") || 
                  (name === "Canada" && code === "ca"))) {
                throw new Error("Le code ne correspond pas au pays.");
            }
            this.name = name;
            this.code = code;
        }
    }
}
