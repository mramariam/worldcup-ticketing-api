import { MatchService } from "@application/services/MatchService";
import { Match } from "@domain/entities/Match";
import { ValidationError } from "@domain/errors/ValidationError";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { Repository } from "typeorm";

const matchRepository: Repository<Match> = AppDataSource.getRepository(Match);
const matchService: MatchService = new MatchService(matchRepository);

export class GetMatchsHandler {
    async handle(c: Context) {
        try {
            const teamMatchCodeURL = c.req.query('team[code]');
            const dateMatchURL = c.req.query('date');
            const parsedDate = dateMatchURL ? new Date(dateMatchURL) : undefined;
            const matchs = await matchService.findAll({
                teamCode: teamMatchCodeURL,
                date: parsedDate as any
            });
            let message = "All matchs";
            if (teamMatchCodeURL && dateMatchURL) message = `Matchs filtered by team[code]: ${teamMatchCodeURL} and date: ${dateMatchURL}`;
            else if (teamMatchCodeURL) message = "Matchs filtered by team[code]: " + teamMatchCodeURL;
            else if (dateMatchURL) message = "Matchs filtered by date: " + dateMatchURL;
            return c.json({ success: true, message: message, data: matchs }, 200);

        } catch (e) {
            if (e instanceof ValidationError)
                throw new HTTPException(400, { message: e.message });
            throw e;
        }
    }
}
