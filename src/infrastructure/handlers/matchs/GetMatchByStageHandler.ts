import { Context } from "hono";
import { matchs } from "@infrastructure/mock/matchs";
import { HTTPException } from "hono/http-exception";
import { MatchStage } from "@domain/entities/MatchStage";
export class GetMatchByStageHandler {
    async handle(c: Context) {
        const matchStageURL = c.req.param('stage');
        const matchStage = matchs.find((m) => m.stage === matchStageURL as MatchStage);
        if (!matchStage) {
            throw new HTTPException(404, { message: "There is no match on " + matchStageURL });
        } else
            return c.json({ 'success': true, 'message': 'Match on ' + matchStageURL+' stage', 'data': matchStage }, 200);
    }
}