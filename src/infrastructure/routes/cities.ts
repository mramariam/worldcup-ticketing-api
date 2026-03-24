import { Hono } from "hono";
import { GetCitiesHandler } from "@infrastructure/handlers/cities/GetCitiesHandler";
import { GetCityMatchsHandler } from "@infrastructure/handlers/cities/GetCityMatchsHandler";
import { GetCityByNameHandler } from "@infrastructure/handlers/cities/GetCityByNameHandler";
export const cityRouter = new Hono()

cityRouter.get('/:name/matchs',(c)=>new GetCityMatchsHandler().handle(c))
cityRouter.get('/:name',(c)=>new GetCityByNameHandler().handle(c))
cityRouter.get('/',(c)=>new GetCitiesHandler().handle(c))