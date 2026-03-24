import { Context } from "hono";
import { matchs } from "@infrastructure/mock/matchs";
import { HTTPException } from "hono/http-exception";
import { MatchStatus } from "@domain/entities/MatchStatus";
export class GetMatchsByStatusHandler {
    async handle(c: Context) {
        const matchStatusURL = c.req.param('status');
        const matchStatus = matchs.filter((m) => m.status === matchStatusURL as MatchStatus);
        if (Object.values(MatchStatus).includes(matchStatusURL as MatchStatus)===false) {
            throw new HTTPException(400, { message: "Invalid status: \"" + matchStatusURL+"\"" });
        } else
            return c.json({ 'success': true, 'message': 'Matchs with status ' + matchStatusURL, 'data': matchStatus }, 200);
    }
}