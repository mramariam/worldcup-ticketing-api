import { Hono } from "hono";
import { GetCountriesHandler } from "@infrastructure/handlers/countries/GetCountriesHandler";
export const countryRouter = new Hono()
countryRouter.get('/',(c)=>new GetCountriesHandler().handle(c))