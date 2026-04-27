import { Context } from "hono";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Country } from "@domain/entities/Country";
import { Repository } from "typeorm";
import { CountryService } from "@application/services/CountryService";
import { City } from "@domain/entities/City";

const countryRepository: Repository<Country> = AppDataSource.getRepository(Country);
const cityRepository: Repository<City> = AppDataSource.getRepository(City);
const countryService: CountryService = new CountryService(countryRepository, cityRepository);

export class GetCountriesHandler {
    async handle(c: Context) {
        const countryNameURL = c.req.query('name');
        try {
            const data = await countryService.findAll({ name: countryNameURL });
            const message = countryNameURL ? "Countries filtered by name: " + countryNameURL : "All countries";
            return c.json({ 'success': true, 'message': message, 'data': data }, 200);
        } catch (e) {
            throw e;
        }
    }
}

