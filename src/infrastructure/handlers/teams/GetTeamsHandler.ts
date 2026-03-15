import { Context } from "hono";
import { teams } from "@infrastructure/mock/teams";

export class GetTeamsHandler {
    async handle(c: Context) {
        const teamURL = c.req.query('sort');
        if (teamURL !== 'name' && teamURL !== '-name' && teamURL !== undefined) {
            return c.json({ 'success': false, 'message': 'Bad request' }, 400);
        }
        const ordreTeam = teams;
        ordreTeam.sort((a, b) => {
            if (teamURL === '-name') {
                return b.name.localeCompare(a.name)
            } return a.name.localeCompare(b.name);
        });
        const teamNameURL = c.req.query('name');
        const teamName = teams.find((c) => c.name.toLowerCase() === teamNameURL?.toLowerCase());
        if (!teamNameURL) {
            return c.json({ 'success': true, 'message': 'All teams', 'data': ordreTeam }, 200);
        } else if (!teamName) {
            return c.json({ 'success': true, 'message': "Teams filtered by name:", 'data': [] }, 200);
        } else
            return c.json({ 'success': true, 'message': 'Teams filtered by name: ' + teamNameURL, 'data': [teamName] }, 200);

    }
}
