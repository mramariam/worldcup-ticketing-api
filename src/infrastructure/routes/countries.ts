import { Hono } from "hono";
import { GetCountriesHandler } from "@infrastructure/handlers/countries/GetCountriesHandler";
import { GetCountryByCodeHandler } from "@infrastructure/handlers/countries/GetCountryByCodeHandler";
export const countryRouter = new Hono()
countryRouter.get('/',(c)=>new GetCountriesHandler().handle(c))
countryRouter.get('/code',(c)=>new GetCountryByCodeHandler().handle(c))