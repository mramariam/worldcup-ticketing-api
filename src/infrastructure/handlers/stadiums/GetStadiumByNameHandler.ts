import { Context } from "hono";
import { stadiums } from "@infrastructure/mock/stadiums";
import { HTTPException } from "hono/http-exception";
export class GetStadiumByNameHandler {
    async handle(c: Context) {
        const stadiumURL = (c.req.param('name'));
        const stadium = stadiums.find((s) => s.name.toLowerCase() === stadiumURL?.toLowerCase());
        if (!stadium) {
            throw new HTTPException(404, { message: "Stadium \""+stadiumURL+"\" does not exist" });
        }
        return c.json({success:true,message:"Stadium "+stadiumURL,data:stadium})
    }
}