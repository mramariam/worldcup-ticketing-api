import { Context } from "hono";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Match } from "@domain/entities/Match";
import { Repository } from "typeorm";
import { MatchService } from "@application/services/MatchService";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { MatchStage } from "@domain/entities/MatchStage";
import { ValidationError } from "@domain/errors/ValidationError";
import { HTTPException } from "hono/http-exception";

const matchRepository: Repository<Match> = AppDataSource.getRepository(Match);
const matchService: MatchService = new MatchService(matchRepository);

export class GetMatchsByStageHandler {
    async handle(c: Context) {
        const matchStageURL = c.req.param('stage');
        try {
            const data = await matchService.findByStage(matchStageURL as MatchStage);
            return c.json({ 'success': true, 'message': 'Matchs at stage ' + matchStageURL, 'data': data }, 200);
        } catch (e) {
            if(e instanceof ValidationError) 
                throw new HTTPException(400,{message:e.message})
            throw e;
        }
    }
}