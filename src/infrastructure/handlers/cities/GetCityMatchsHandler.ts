import { Context } from "hono";
import { cities } from "@infrastructure/mock/cities";
import { matchs } from "@infrastructure/mock/matchs";
import { HTTPException } from "hono/http-exception";
export class GetCityMatchsHandler {
    async handle(c: Context) {
        const cityURL = (c.req.param('name'));
        const city = cities.find((s) => s.name === cityURL);
        if (!city) {
            throw new HTTPException(404, { message: "City \""+cityURL+"\" does not exist" });
        }
        const cityMatch=matchs.filter((m)=>m.stadium.city.name===cityURL)    
        return c.json({success:true,message:"Matchs in "+cityURL,data:cityMatch})
    }
}