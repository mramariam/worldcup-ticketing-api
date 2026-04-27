import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Match } from "@domain/entities/Match";
import { Repository } from "typeorm";
import { MatchService } from "@application/services/MatchService";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { MatchStage } from "@domain/entities/MatchStage";

const matchRepository: Repository<Match> = AppDataSource.getRepository(Match);
const matchService: MatchService = new MatchService(matchRepository);
export class GetMatchByStageHandler {
    async handle(c: Context) {
        const matchStageURL = c.req.param('stage');
        try {
            const data = await matchService.findOneByStage(matchStageURL as MatchStage)
            return c.json({ 'success': true, 'message': 'Match on ' + matchStageURL + ' stage', 'data': data }, 200);
        } catch (e) {
            if (e instanceof NotFoundError)
                throw new HTTPException(404, { message: "There is no match on " + matchStageURL });
            throw e;
        }
    }
}