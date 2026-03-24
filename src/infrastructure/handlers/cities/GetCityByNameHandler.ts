import { Context } from "hono";
import { cities } from "@infrastructure/mock/cities";
import { HTTPException } from "hono/http-exception";
export class GetCityByNameHandler {
    async handle(c: Context) {
        const cityURL = (c.req.param('name'));
        const city = cities.find((s) => s.name.toLowerCase() === cityURL?.toLowerCase());
        if (!city) {
            throw new HTTPException(404, { message: "City \""+cityURL+"\" does not exist" });
        }
        return c.json({success:true,message:"City "+cityURL,data:city})
    }
}