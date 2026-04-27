import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"; 
import { Country } from "@domain/entities/Country";
const VILLE_VALIDES = {
    "USA": ["Atlanta", "Boston", "Dallas", "Houston", "Kansas City", "Los Angeles", "Miami", "New York", "Philadelphia", "Seattle", "San Francisco"],
    "Mexico": ["Guadalajara", "Mexico City", "Monterrey"],
    "Canada": ["Toronto", "Vancouver"]
};
@Entity()
export class City {
    @PrimaryGeneratedColumn()
    public id!: number;

    @ManyToOne(() => Country)
    public country!: Country;

    @Column()
    public name!: string;

    constructor(country?: Country, name?: string) {
        if (country && name) {
            const countryCity = VILLE_VALIDES[country.name as keyof typeof VILLE_VALIDES];
            if (!countryCity || !countryCity.includes(name)) {
                throw new Error("La ville n'est pas valide");
            }
            this.country = country;
            this.name = name;
        }
    }
}
