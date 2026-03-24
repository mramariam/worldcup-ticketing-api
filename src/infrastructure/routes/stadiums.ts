import { Hono } from "hono";
import { GetStadiumsHandler } from "@infrastructure/handlers/stadiums/GetStadiumsHandler";
import { GetStadiumMatchsHandler } from "@infrastructure/handlers/stadiums/GetStadiumMatchsHandler";
import { GetStadiumByNameHandler } from "@infrastructure/handlers/stadiums/GetStadiumByNameHandler";
export const stadiumRouter = new Hono()
stadiumRouter.get('/:name/matchs',(c)=>new GetStadiumMatchsHandler().handle(c))
stadiumRouter.get('/:name',(c)=>new GetStadiumByNameHandler().handle(c))
stadiumRouter.get('/',(c)=>new GetStadiumsHandler().handle(c))