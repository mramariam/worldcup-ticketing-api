import { Country } from "@domain/entities/Country";

export const USA = new Country("USA", "us");
export const Canada = new Country("Canada", "ca");
export const Mexico = new Country("Mexico", "me");

export const countries = [USA, Canada, Mexico];