import { Context } from "hono";
import { matchs } from "@infrastructure/mock/matchs";
import { HTTPException } from "hono/http-exception";
import { MatchStage } from "@domain/entities/MatchStage";
export class GetMatchsByStageHandler {
    async handle(c: Context) {
        const matchStageURL = c.req.param('stage');
        const matchStage = matchs.filter((m) => m.stage === matchStageURL as MatchStage);
        if (Object.values(MatchStage).includes(matchStageURL as MatchStage)===false) {
            throw new HTTPException(400, { message: "Invalid stage: \"" + matchStageURL+"\"" });
        } else
            return c.json({ 'success': true, 'message': 'Matchs at stage ' + matchStageURL, 'data': matchStage }, 200);
    }
}