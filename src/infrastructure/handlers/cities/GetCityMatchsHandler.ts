import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { City } from "@domain/entities/City";
import { Match } from "@domain/entities/Match";
import { CityService } from "@application/services/CityService";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { Repository } from "typeorm";

const cityRepository: Repository<City> = AppDataSource.getRepository(City);
const matchRepository: Repository<Match> = AppDataSource.getRepository(Match);
const cityService: CityService = new CityService(cityRepository, matchRepository);

export class GetCityMatchsHandler {
    async handle(c: Context) {
        const cityURL = c.req.param('name');
        try {
            const cityMatchs = await cityService.findMatchsByCity(cityURL);
            return c.json({ success: true, message: "Matchs in " + cityURL, data: cityMatchs }, 200);
        } catch (e) {
            if (e instanceof NotFoundError)
                throw new HTTPException(404, { message: e.message });
            throw e;
        }
    }
}
