import { Hono } from "hono";
import { GetCountriesHandler } from "@infrastructure/handlers/countries/GetCountriesHandler";
import { GetCountryByCodeHandler } from "@infrastructure/handlers/countries/GetCountryByCodeHandler";
import { GetCountryCitiesHandler } from "@infrastructure/handlers/countries/GetCountryCitiesHandler";
export const countryRouter = new Hono()
countryRouter.get('/',(c)=>new GetCountriesHandler().handle(c))
countryRouter.get('/:code',(c)=>new GetCountryByCodeHandler().handle(c))
countryRouter.get('/:code/cities',(c)=>new GetCountryCitiesHandler().handle(c))