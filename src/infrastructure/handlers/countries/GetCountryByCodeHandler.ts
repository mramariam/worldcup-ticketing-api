import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Country } from "@domain/entities/Country";
import { Repository } from "typeorm";
import { City } from "@domain/entities/City";
import { CountryService } from "@application/services/CountryService";
import { NotFoundError } from "@domain/errors/NotFoundError";

const countryRepository: Repository<Country> = AppDataSource.getRepository(Country);
const cityRepository: Repository<City> = AppDataSource.getRepository(City);
const countryService: CountryService = new CountryService(countryRepository, cityRepository);

export class GetCountryByCodeHandler {
    async handle(c: Context) {
        const countryCodeURL = c.req.param('code');
        try {
            const data = await countryService.findByCode(countryCodeURL)
            return c.json({ 'success': true, 'message': 'Country ' + data.name, 'data': data }, 200);
        } catch (e) {
            if (e instanceof NotFoundError)
                throw new HTTPException(404, { message: e.message });
            throw e;
        }
    }
}
