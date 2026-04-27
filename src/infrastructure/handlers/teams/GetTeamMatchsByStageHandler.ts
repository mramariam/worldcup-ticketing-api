import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { MatchStage } from "@domain/entities/MatchStage";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Team } from "@domain/entities/Team";
import { Match } from "@domain/entities/Match";
import { Repository } from "typeorm";
import { TeamService } from "@application/services/TeamService";
import { ValidationError } from "@domain/errors/ValidationError";
import { NotFoundError } from "@domain/errors/NotFoundError";

const teamRepository: Repository<Team> = AppDataSource.getRepository(Team);
const matchRepository: Repository<Match> = AppDataSource.getRepository(Match);
const teamService: TeamService = new TeamService(teamRepository, matchRepository);
export class GetTeamMatchsByStageHandler {
    async handle(c: Context) {
        const teamCodeURL = (c.req.param('code'));
        const matchStageURL = c.req.param('stage');
        try {
            const data = await teamService.findMatchsByStage(teamCodeURL, matchStageURL as MatchStage)
            return c.json({ success: true, message: "Matchs for team " + teamCodeURL + " at stage " + matchStageURL, data: data });
        } catch (e) {
            if (e instanceof ValidationError)
                throw new HTTPException(400, { message: e.message });
            if (e instanceof NotFoundError)
                throw new HTTPException(404, { message: e.message })
            throw e;
        }
    }
}
