import { Context } from "hono";
import { teams } from "@infrastructure/mock/teams";

export class GetTeamByFifaCodeHandler {
    async handle(c: Context) {
        const teamURL = (c.req.param('code'));
        const team = teams.find((t) => t.code === teamURL);
        if(!/^[A-Z]{3}$/.test(teamURL)){
            return c.json({ 'success': false, 'error': "Bad Request" }, 400);
        }
        else if (!team) {
            return c.json({ 'success': false, 'error': "Team " + teamURL + " does not exist" }, 404);
        }
        else return c.json({ 'success': true, 'message': 'Team ' + teamURL, 'data': {'name':team.name,'code':{'value':teamURL}} }, 200);
    }
}
