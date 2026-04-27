import { City } from "@domain/entities/City";
import { countries } from './countries';
//USA
export const Atlanta = new City(countries[0], "Atlanta");
export const Boston = new City(countries[0], "Boston");
export const Dallas = new City(countries[0], "Dallas");
export const Houston = new City(countries[0], "Houston");
export const KansasCity = new City(countries[0], "Kansas City");
export const LosAngeles = new City(countries[0], "Los Angeles");
export const Miami = new City(countries[0], "Miami");
export const NewYork = new City(countries[0], "New York");
export const Philadelphia = new City(countries[0], "Philadelphia");
export const Seattle = new City(countries[0], "Seattle");
export const SanFranscisco = new City(countries[0], "San Francisco");
//Mexique
export const Guadalajara = new City(countries[2], "Guadalajara");
export const MexicoCity = new City(countries[2], "Mexico City");
export const Monterrey = new City(countries[2], "Monterrey");
//Canada
export const Vancouver = new City(countries[1], "Vancouver");
export const Toronto = new City(countries[1], "Toronto");

export const cities = [Atlanta, Boston, Dallas, Houston, KansasCity, LosAngeles, Miami, NewYork, Philadelphia, Seattle, SanFranscisco, Guadalajara, MexicoCity, Monterrey, Vancouver, Toronto];