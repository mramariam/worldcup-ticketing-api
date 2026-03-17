import { Context } from "hono";
import { stadiums } from "@infrastructure/mock/stadiums";

export class GetStadiumsHandler {
    async handle(c: Context) {
        const stadiumNameURL = c.req.query('name');
        const stadiumCityNameURL = c.req.query('city[name]');
        const stadiumCountryNameURL = c.req.query('country[name]');
        const stadiumCountryCodeURL = c.req.query('country[code]');

        let filteredStadiums = stadiums;
        if (stadiumNameURL) {
            filteredStadiums = filteredStadiums.filter(s => s.name.toLowerCase() === stadiumNameURL?.toLowerCase());
            return c.json({ 'success': true, 'message': 'Stadiums filtered by name: ' + stadiumNameURL, 'data': filteredStadiums }, 200);
        }
        if (stadiumCityNameURL) {
            filteredStadiums = filteredStadiums.filter(s => s.city.name.toLowerCase() === stadiumCityNameURL?.toLowerCase());
            return c.json({ 'success': true, 'message': 'Stadiums filtered by city[name]: ' + stadiumCityNameURL, 'data': filteredStadiums })

        } else
            if (stadiumCountryNameURL) {
                filteredStadiums = filteredStadiums.filter(s => s.city.country.name.toLowerCase() === stadiumCountryNameURL?.toLowerCase());
                return c.json({ 'success': true, 'message': 'Stadiums filtered by country[name]: ' + stadiumCountryNameURL, 'data': filteredStadiums })
            } else
                if (stadiumCountryCodeURL) {
                    filteredStadiums = filteredStadiums.filter(s => s.city.country.code.toLowerCase() === stadiumCountryCodeURL?.toLowerCase());
                    return c.json({ 'success': true, 'message': 'Stadiums filtered by country[code]: ' + stadiumCountryCodeURL, 'data': filteredStadiums })
                }
                else
                    return c.json({ 'success': true, 'message': 'All stadiums', 'data': stadiums }, 200);
    }
}
