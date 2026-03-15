import { Context } from "hono";
import { matchs } from "@infrastructure/mock/matchs";

export class GetMatchByIdHandler {
    async handle(c: Context) {
        const matchURL = parseInt(c.req.param('id'), 10);
        const matchID = matchs.find((m) => m.id === matchURL);
        if (!matchID) {
            return c.json({ 'success': false, 'error': "Match " + matchURL + " does not exist" }, 404);
        } else
            return c.json({ 'success': true, 'message': 'Match ' + matchURL, 'data': matchs[matchURL - 1] }, 200);
    }
}
