import { Context } from "hono";
import { stadiums } from "@infrastructure/mock/stadiums";

export class GetStadiumsHandler {
    async handle(c: Context) {
        const stadiumNameURL = c.req.query('name');
        const stadiumName = stadiums.find((c) => c.name.toLowerCase() === stadiumNameURL?.toLowerCase());
        if (!stadiumNameURL) {
            return c.json({ 'success': true, 'message': 'All stadiums', 'data': stadiums }, 200);
        } else if (!stadiumName) {
            return c.json({ 'success': true, 'message': "Stadiums filtered by name:", 'data': [] }, 200);
        } else
            return c.json({ 'success': true, 'message': 'Stadiums filtered by name: ' + stadiumNameURL, 'data': [stadiumName] }, 200);
    }
}
