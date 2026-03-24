import { Context } from "hono";
import { teams } from "@infrastructure/mock/teams";
import { matchs } from "@infrastructure/mock/matchs";
import { HTTPException } from "hono/http-exception";
export class GetTeamMatchsByFifaCodeHandler {
    async handle(c: Context) {
        const teamURL = (c.req.param('code'));
        const team = teams.find((t) => t.code === teamURL);
        if (!/^[A-Z]{3}$/.test(teamURL)) {
            throw new HTTPException(400, { message: "Invalid FIFA code: \""+teamURL+"\"" });
        }
        else if (!team) {
            throw new HTTPException(404, { message: "Team " + teamURL + " does not exist" });
        }
        const teamMatch=matchs.filter((m)=>m.awayTeam.code===teamURL||m.homeTeam.code===teamURL)
        if (!teamMatch){
            return c.json({success:true,message:"Matchs for team "+teamURL,data:teamMatch})
        }
         return c.json({success:true,message:"Matchs for team "+teamURL,data:teamMatch});
    }
}
