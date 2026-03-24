import { Context } from "hono";
import { matchs } from "@infrastructure/mock/matchs";
import { HTTPException } from "hono/http-exception";
export class GetMatchsHandler {
    async handle(c: Context) {
        const teamMatchCodeURL = c.req.query('team[code]');
        const dateMatchURL = c.req.query('date')

        if (!teamMatchCodeURL && !dateMatchURL) {
            return c.json({ 'success': true, 'message': 'All matchs', 'data': matchs }, 200);
        }
        if (teamMatchCodeURL) {
            if (!/^[A-Z]{3}$/.test(teamMatchCodeURL)) {
                throw new HTTPException(400, { message: "Le fifacode demandé est incorrect." });
            }
            const teamMatchCode = matchs.filter((c) => (c.homeTeam.code.toLowerCase() === teamMatchCodeURL?.toLowerCase() || c.awayTeam.code.toLowerCase() === teamMatchCodeURL?.toLowerCase()));
            if (teamMatchCode.length === 0) {
                return c.json({ 'success': true, 'message': "Matchs filtered by team[code]: " + teamMatchCodeURL, 'data': teamMatchCode }, 200);
            }
            return c.json({ 'success': true, 'message': "Matchs filtered by team[code]: " + teamMatchCodeURL, 'data': teamMatchCode }, 200);
        }
        if(dateMatchURL){
            if(!/^\d{4}-\d{2}-\d{2}$/.test(dateMatchURL)){
                throw new HTTPException(400,{message:"Invalid date format."})
            }
            const dateMatch=matchs.filter((c)=>(c.date.toISOString().split("T")[0]===dateMatchURL))
            if(dateMatch.length===0){
                return c.json({success:true,message:"Matchs filtered by date: "+dateMatchURL,data:dateMatch})
            }
            return c.json({success:true,message:"Matchs filtered by date: "+dateMatchURL,data:dateMatch})
        }
    }
}

