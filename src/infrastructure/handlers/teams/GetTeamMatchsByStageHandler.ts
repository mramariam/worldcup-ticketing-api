import { Context } from "hono";
import { teams } from "@infrastructure/mock/teams";
import { matchs } from "@infrastructure/mock/matchs";
import { HTTPException } from "hono/http-exception";
import { MatchStage } from "@domain/entities/MatchStage";
export class GetTeamMatchsByStageHandler {
    async handle(c: Context) {
        const teamCodeURL = (c.req.param('code'));
        const matchStageURL = c.req.param('stage');
        if (!/^[A-Z]{3}$/.test(teamCodeURL) ) {
            throw new HTTPException(400, { message: "Invalid FIFA code: \"" + teamCodeURL + "\"" });
        }
        const teamCode = teams.find((t) => t.code === teamCodeURL);
        
        if(Object.values(MatchStage).includes(matchStageURL as MatchStage)===false){
            throw new HTTPException(400, { message: "Invalid stage: \"" + matchStageURL + "\"" });
        }
        if (!teamCode) {
            throw new HTTPException(404, { message: "Team " + teamCodeURL + " does not exist" });
        }
        const teamMatchStage = matchs.filter((m) => (m.awayTeam.code === teamCodeURL || m.homeTeam.code === teamCodeURL) && (m.stage === (matchStageURL as MatchStage)))
        return c.json({ success: true, message: "Matchs for team "+ teamCodeURL +" at stage "+matchStageURL, data: teamMatchStage });
    }
}