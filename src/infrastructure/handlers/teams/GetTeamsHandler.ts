import { Context } from "hono";
import { teams } from "@infrastructure/mock/teams";
import { HTTPException } from "hono/http-exception";
export class GetTeamsHandler {
    async handle(c: Context) {
        const teamURL = c.req.query('sort');
        if (teamURL !== 'name' && teamURL !== '-name' && teamURL !== undefined) {
            throw new HTTPException(400,{message:"Bad request"})
        }
        const ordreTeam = [...teams];
        ordreTeam.sort((a, b) => {
            if (teamURL === '-name') {
                return b.name.localeCompare(a.name)
            } return a.name.localeCompare(b.name);
        });
        const teamNameURL = c.req.query('name');
        const teamName = ordreTeam.find((c) => c.name.toLowerCase() === teamNameURL?.toLowerCase());
        if (!teamNameURL) {
            return c.json({ 'success': true, 'message': 'All teams', 'data': ordreTeam }, 200);
        } else if (!teamName) {
            return c.json({ 'success': true, 'message': "Teams filtered by name: "+teamNameURL, 'data': [teamName] }, 200);
        } else
            return c.json({ 'success': true, 'message': 'Teams filtered by name: ' + teamNameURL, 'data': [teamName] }, 200);

    }
}
