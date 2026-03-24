import { Context } from "hono";
import { teams } from "@infrastructure/mock/teams";
import { HTTPException } from "hono/http-exception";
export class GetTeamByFifaCodeHandler {
    async handle(c: Context) {
        const teamURL = (c.req.param('code'));
        const team = teams.find((t) => t.code === teamURL);
        if (!/^[A-Z]{3}$/.test(teamURL)) {
            throw new HTTPException(404, { message: "Le fifacode demandé est incorrect." });
        }
        else if (!team) {
            throw new HTTPException(404, { message: "Team " + teamURL + " does not exist" });
        }
        else return c.json({ 'success': true, 'message': 'Team ' + teamURL, 'data': { 'name': team.name, 'code': { 'value': teamURL } } }, 200);
    }
}
