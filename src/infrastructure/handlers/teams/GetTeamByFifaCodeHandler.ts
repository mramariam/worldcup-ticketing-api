import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Team } from "@domain/entities/Team";
import { Repository } from "typeorm";
import { Match } from "@domain/entities/Match";
import { TeamService } from "@application/services/TeamService";
import { ValidationError } from "@domain/errors/ValidationError";
import { NotFoundError } from "@domain/errors/NotFoundError";

const teamRepository: Repository<Team> = AppDataSource.getRepository(Team);
const matchRepository: Repository<Match> = AppDataSource.getRepository(Match);
const teamService: TeamService = new TeamService(teamRepository, matchRepository);
export class GetTeamByFifaCodeHandler {
    async handle(c: Context) {
        const teamURL = (c.req.param('code'));
        try {
            const data = await teamService.findByCode(teamURL)
            return c.json({ 'success': true, 'message': 'Team ' + teamURL, 'data': data }, 200);
        } catch (e) {
            if (e instanceof ValidationError)
                throw new HTTPException(400, { message: e.message })
            if (e instanceof NotFoundError)
                throw new HTTPException(404, { message: e.message });
            throw e;
        }

    }
}
