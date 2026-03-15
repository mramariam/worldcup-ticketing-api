import { Context } from "hono";
import { cities } from "@infrastructure/mock/cities";

export class GetCitiesHandler {
    async handle(c: Context) {
        const cityNameURL = c.req.query('name');
        const cityName = cities.find((c) => c.name.toLowerCase() === cityNameURL?.toLowerCase());
        if (!cityNameURL) {
            return c.json({ 'success': true, 'message':'All cities', 'data': cities  }, 200);
        } else if (!cityName) {
            return c.json({ 'success': true, 'message': "Cities filtered by name:" ,'data':[]}, 200);
        } else
            return c.json({ 'success': true, 'message': 'Cities filtered by name: ' + cityNameURL, 'data':[cityName] }, 200);
    }
}
