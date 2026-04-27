import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Stadium } from "@domain/entities/Stadium";
import { Match } from "@domain/entities/Match";
import { Repository } from "typeorm";
import { StadiumService } from "@application/services/StadiumService";
import { NotFoundError } from "@domain/errors/NotFoundError";

const stadiumRepository: Repository<Stadium> = AppDataSource.getRepository(Stadium);
const matchRepository: Repository<Match> = AppDataSource.getRepository(Match);
const stadiumService: StadiumService = new StadiumService(stadiumRepository, matchRepository);
export class GetStadiumMatchsHandler {
    async handle(c: Context) {
        const stadiumURL = (c.req.param('name'));
        try {
            const data = await stadiumService.findMatchsByStadium(stadiumURL)
            return c.json({ success: true, message: "Matchs at " + stadiumURL, data: data })
        } catch (e) {
            if (e instanceof NotFoundError)
                throw new HTTPException(404, { message: "Stadium \"" + stadiumURL + "\" does not exist" });
            throw e;
        }
    }
}