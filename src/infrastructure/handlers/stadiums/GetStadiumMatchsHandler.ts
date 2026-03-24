import { Context } from "hono";
import { stadiums } from "@infrastructure/mock/stadiums";
import { matchs } from "@infrastructure/mock/matchs";
import { HTTPException } from "hono/http-exception";
export class GetStadiumMatchsHandler {
    async handle(c: Context) {
        const stadiumURL = (c.req.param('name'));
        const stadium = stadiums.find((s) => s.name === stadiumURL);
        if (!stadium) {
            throw new HTTPException(404, { message: "Stadium \""+stadiumURL+"\" does not exist" });
        }
        const stadiumMatch=matchs.filter((m)=>m.stadium.name===stadiumURL)    
        return c.json({success:true,message:"Matchs at "+stadiumURL,data:stadiumMatch})
    }
}