import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Match } from "@domain/entities/Match";
import { Repository } from "typeorm";
import { MatchService } from "@application/services/MatchService";
import { NotFoundError } from "@domain/errors/NotFoundError";

const matchRepository: Repository<Match> = AppDataSource.getRepository(Match);
const matchService: MatchService = new MatchService(matchRepository);
export class GetMatchByIdHandler {
    async handle(c: Context) {
        const matchURL = parseInt(c.req.param('id'), 10);
        try {
            const data = await matchService.findById(matchURL);
            return c.json({ 'success': true, 'message': 'Match ' + matchURL, 'data': data }, 200);
        } catch (e) {
            if (e instanceof NotFoundError)
                throw new HTTPException(404, { message: "Match " + matchURL + " does not exist" });
            throw e;
        }
    }
}
