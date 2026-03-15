import { Hono } from "hono";
import { GetCitiesHandler } from "@infrastructure/handlers/cities/GetCitiesHandler";
export const cityRouter = new Hono()
cityRouter.get('/',(c)=>new GetCitiesHandler().handle(c))