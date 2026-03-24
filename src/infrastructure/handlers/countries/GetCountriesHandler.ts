import { Context } from "hono";
import { countries } from "@infrastructure/mock/countries";

export class GetCountriesHandler {
    async handle(c: Context) {
        const countryNameURL = c.req.query('name');
        const countryName = countries.find((c) => c.name.toLowerCase() === countryNameURL?.toLowerCase());
        if (!countryNameURL) {
            return c.json({ 'success': true, 'message': 'All countries', 'data': countries }, 200);
        } else if (!countryName) {
            return c.json({ 'success': true, 'message': "Countries filtered by name: "+ countryNameURL, 'data': [countryName] }, 200);
        } else
            return c.json({ 'success': true, 'message': 'Countries filtered by name: ' + countryNameURL, 'data': [countryName] }, 200);
    }
}
