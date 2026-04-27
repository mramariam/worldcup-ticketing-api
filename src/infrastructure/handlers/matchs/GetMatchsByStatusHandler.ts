import { Context } from "hono";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Match } from "@domain/entities/Match";
import { Repository } from "typeorm";
import { MatchService } from "@application/services/MatchService";
import { MatchStatus } from "@domain/entities/MatchStatus";
import { ValidationError } from "@domain/errors/ValidationError";
import { HTTPException } from "hono/http-exception";

const matchRepository: Repository<Match> = AppDataSource.getRepository(Match);
const matchService: MatchService = new MatchService(matchRepository);

export class GetMatchsByStatusHandler {
    async handle(c: Context) {
        const matchStatusURL = c.req.param('status');
        try {
            const data = await matchService.findByStatus(matchStatusURL as MatchStatus);
            return c.json({ 'success': true, 'message': 'Matchs with status ' + matchStatusURL, 'data': data }, 200);
        } catch (e) {
            if (e instanceof ValidationError)
                throw new HTTPException(400, { message: e.message })
            throw e;
        }
    }
}