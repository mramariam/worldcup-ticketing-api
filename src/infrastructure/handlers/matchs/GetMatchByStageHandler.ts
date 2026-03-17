import { Context } from "hono";
import { matchs } from "@infrastructure/mock/matchs";

export class GetMatchByStageHandler {
    async handle(c: Context) {
        const matchStageURL = c.req.param('stage');
        const matchStage = matchs.find((m) => m.stage === matchStageURL);
        if (!matchStage) {
            return c.json({ 'success': false, 'error': "There is no match on " + matchStageURL }, 404);
        } else
            return c.json({ 'success': true, 'message': 'Match on ' + matchStageURL+' stage', 'data': matchStage }, 200);
    }
}