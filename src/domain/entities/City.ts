import { Country } from "@domain/entities/Country";

const VILLE_VALIDES = { "USA": ["Atlanta", "Boston", "Dallas", "Houston", "Kansas City", "Los Angeles", "Miami", "New York", "Philadelphia", "Seattle", "San Francisco"], "Mexico": ["Guadalajara", "Mexico City", "Monterrey"], "Canada": ["Toronto", "Vancouver"] };
export class City {
    public country: Country;
    public name: string;

    constructor(country: Country, name: string) {
        const countryCity = VILLE_VALIDES[country.name as keyof typeof VILLE_VALIDES];
        if (!countryCity) {
            throw new Error("La ville n'est pas valide.")
        }
        this.country = country;
        this.name = name;
    }
}