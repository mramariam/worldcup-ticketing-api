import { Context } from "hono";
import { countries } from "@infrastructure/mock/countries";

export class GetCountryByCodeHandler {
    async handle(c: Context) {
        const countryCodeURL = c.req.param('name');
        const countryCode = countries.find((c) => c.code.toLowerCase() === countryCodeURL?.toLowerCase());
        if (!countryCode) {
            return c.json({ 'success': false, 'error': "Country with code" + countryCodeURL + "does not exist" }, 404);
        } else
            return c.json({ 'success': true, 'message': 'Country with code ' + countryCodeURL, 'data': countryCode }, 200);
    }
}
