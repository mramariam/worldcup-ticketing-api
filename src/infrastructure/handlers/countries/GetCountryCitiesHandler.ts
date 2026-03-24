import { Context } from "hono";
import { countries } from "@infrastructure/mock/countries";
import { cities } from "@infrastructure/mock/cities";
import { HTTPException } from "hono/http-exception";
export class GetCountryCitiesHandler {
    async handle(c: Context) {
        const countryCodeURL = (c.req.param('code'));
        const country = countries.find((c) => c.code === countryCodeURL);
        if (!country) {
            throw new HTTPException(404, { message: "Country \""+countryCodeURL+"\" does not exist" });
        }
        const countryCities=cities.filter((c)=>c.country.code===countryCodeURL)    
        return c.json({success:true,message:"Cities in "+country.name,data:countryCities})
    }
}