import { Context } from "hono";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Stadium } from "@domain/entities/Stadium";
import { Repository } from "typeorm";
import { Match } from "@domain/entities/Match";
import { StadiumService } from "@application/services/StadiumService";

const stadiumRepository: Repository<Stadium> = AppDataSource.getRepository(Stadium);
const matchRepository: Repository<Match> = AppDataSource.getRepository(Match);
const stadiumService: StadiumService = new StadiumService(stadiumRepository, matchRepository);
export class GetStadiumsHandler {
    async handle(c: Context) {
        const stadiumNameURL = c.req.query('name');
        const stadiumCityNameURL = c.req.query('city[name]');
        const stadiumCountryNameURL = c.req.query('country[name]');
        const stadiumCountryCodeURL = c.req.query('country[code]');
        try {
            const data = await stadiumService.findAll({ name: stadiumNameURL, cityName: stadiumCityNameURL, countryName: stadiumCountryNameURL, countryCode: stadiumCountryCodeURL })
            let message='All stadiums'
            if (stadiumNameURL) {
                message = 'Stadiums filtered by name: ' + stadiumNameURL;
            } else if (stadiumCityNameURL) {
                message = 'Stadiums filtered by city[name]: ' + stadiumCityNameURL;
            } else if (stadiumCountryNameURL) {
                message = 'Stadiums filtered by country[name]: ' + stadiumCountryNameURL;
            } else if (stadiumCountryCodeURL) {
                message = 'Stadiums filtered by country[code]: ' + stadiumCountryCodeURL;
            }
            return c.json({ 'success': true, 'message': message, 'data': data }, 200);
        } catch (e) {
            throw e;
        }
    }
}