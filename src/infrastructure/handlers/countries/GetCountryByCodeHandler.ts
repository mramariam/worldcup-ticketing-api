import { Context } from "hono";
import { countries } from "@infrastructure/mock/countries";
import { HTTPException } from "hono/http-exception";
export class GetCountryByCodeHandler {
    async handle(c: Context) {
        const countryCodeURL = c.req.param('code');
        const countryCode = countries.find((c) => c.code.toLowerCase() === countryCodeURL?.toLowerCase());
        if (!countryCode) {
            throw new HTTPException(404, { message: "Country \"" + countryCodeURL + "\" does not exist" });
        } else
            return c.json({ 'success': true, 'message': 'Country ' + countryCode.name, 'data': countryCode }, 200);
    }
}
