import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { City } from "@domain/entities/City";
import { CityService } from "@application/services/CityService";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { Repository } from "typeorm";
import { Match } from "@domain/entities/Match";

const cityRepository: Repository<City> = AppDataSource.getRepository(City);
const matchRepository: Repository<Match> = AppDataSource.getRepository(Match);
const cityService: CityService = new CityService(cityRepository, matchRepository);

export class GetCityByNameHandler {
    async handle(c: Context) {
        const cityURL = c.req.param('name');
        try {
            const data = await cityService.findByName(cityURL);
            return c.json({ success: true, message: "City " + data.name, data: data }, 200);

        } catch (e) {
            if (e instanceof NotFoundError)
                throw new HTTPException(404, { message: e.message });
            throw e;
        }
    }
}
