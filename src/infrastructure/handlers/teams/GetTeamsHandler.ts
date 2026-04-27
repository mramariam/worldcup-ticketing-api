import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Team } from "@domain/entities/Team";
import { TeamService } from "@application/services/TeamService";
import { Repository } from "typeorm";
import { Match } from "@domain/entities/Match";

const teamRepository: Repository<Team> = AppDataSource.getRepository(Team);
const matchRepository: Repository<Match> = AppDataSource.getRepository(Match);
const teamService: TeamService = new TeamService(teamRepository, matchRepository);

export class GetTeamsHandler {
    async handle(c: Context) {
        const teamSortURL = c.req.query('sort') as "name" | "-name" | undefined;
        const teamNameURL = c.req.query('name');
        if (teamSortURL !== 'name' && teamSortURL !== '-name' && teamSortURL !== undefined) {
            throw new HTTPException(400, { message: "Bad request" });
        }
        try {
            const data = await teamService.findAll({name: teamNameURL,sort: teamSortURL});
            const message = teamNameURL ? 'Teams filtered by name: ' + teamNameURL : 'All teams';
            return c.json({ 'success': true, 'message': message, 'data': data }, 200);

        } catch (e) {
            throw e;
        }
    }
}
