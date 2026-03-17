import { Context } from "hono";
import { matchs } from "@infrastructure/mock/matchs";

export class GetMatchsHandler {
    async handle(c: Context) {
        const teamMatchCodeURL = c.req.query('team[code]');
        const teamMatchCode = matchs.filter((c) => (c.homeTeam.code.toLowerCase() === teamMatchCodeURL?.toLowerCase() || c.awayTeam.code.toLowerCase() === teamMatchCodeURL?.toLowerCase()));
        if (!teamMatchCodeURL) {
            return c.json({ 'success': true, 'message': 'All matchs', 'data': matchs }, 200);
        } else if (!/^[A-Z]{3}$/.test(teamMatchCodeURL)) {
            return c.json({ 'success': false, 'error': 'Bad Request' });
        }
        else if (teamMatchCode.length === 0) {
            return c.json({ 'success': true, 'message': "Matchs filtered by team[code]: " + teamMatchCodeURL, 'data': [] }, 200);
        }
        return c.json({ 'success': true, 'message': "Matchs filtered by team[code]: " + teamMatchCodeURL, 'data': teamMatchCode }, 200);
    }
}
