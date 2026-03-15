import { Hono } from "hono";
import { GetStadiumsHandler } from "@infrastructure/handlers/stadiums/GetStadiumsHandler";
export const stadiumRouter = new Hono()
stadiumRouter.get('/',(c)=>new GetStadiumsHandler().handle(c))