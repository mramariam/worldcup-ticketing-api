import { Context } from "hono";
import { matchs } from "@infrastructure/mock/matchs";
import { HTTPException } from "hono/http-exception";
export class GetMatchByIdHandler {
    async handle(c: Context) {
        const matchURL = parseInt(c.req.param('id'), 10);
        const matchID = matchs.find((m) => m.id === matchURL);
        if (!matchID) {
            throw new HTTPException(404, { message: "Match " + matchURL + " does not exist" });
        } else
            return c.json({ 'success': true, 'message': 'Match ' + matchURL, 'data': matchs[matchURL - 1] }, 200);
    }
}
