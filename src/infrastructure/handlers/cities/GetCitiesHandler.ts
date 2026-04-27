import { Context } from "hono";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { City } from "@domain/entities/City";
import { CityService } from "@application/services/CityService";
import { Repository } from "typeorm";
import { Match } from "@domain/entities/Match";

const cityRepository: Repository<City> = AppDataSource.getRepository(City);
const matchRepository: Repository<Match> = AppDataSource.getRepository(Match);
const cityService: CityService = new CityService(cityRepository, matchRepository);

export class GetCitiesHandler {
    async handle(c: Context) {
        const cityNameURL = c.req.query('name');
        try {
            const data = await cityService.findAll({ name: cityNameURL });
            const message = cityNameURL ? "Cities filtered by name: " + cityNameURL : "All cities";
            return c.json({ success: true, message: message, data: data }, 200);

        } catch (e) { 
            throw e;
        }
    }
}
