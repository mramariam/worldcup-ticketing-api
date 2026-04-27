import { City } from "@domain/entities/City";
import { Match } from "@domain/entities/Match";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { type FindOptionsWhere, ILike, type Repository } from "typeorm";

type CityFilters = {
    name?: string;
    country?: string;
};

export class CityService {
    private readonly cityRepository: Repository<City>;
    private readonly matchRepository: Repository<Match>;
    constructor(cityRepository: Repository<City>, matchRepository: Repository<Match>) {
        this.cityRepository = cityRepository;
        this.matchRepository = matchRepository;
    }
    async findAll({ name, country }: CityFilters = {}): Promise<City[]> {
        const where: FindOptionsWhere<City> = {};
        if (name) {
            where.name = ILike(name);
        }
        if (country) {
            where.country = { name: country as "USA" | "Mexico" | "Canada" };
        }
        return await this.cityRepository.find({
            where: where,
            relations: { country: true }
        });
    }
    async findByName(name: string): Promise<City> {
        const city = await this.cityRepository.findOne({
            where: { name: ILike(name) },
            relations: { country: true }
        });
        if (!city) {
            throw new NotFoundError(`City "${name}" does not exist`);
        }
        return city;
    }
    async findByCountryCode(countryCode: string): Promise<City[]> {
        const cities = await this.cityRepository.find({
            where: { country: { code: countryCode as "us" | "me" | "ca" } },
            relations: { country: true }
        });

        return cities;
    }
    async findMatchsByCity(name: string): Promise<Match[]> {
        const city = await this.cityRepository.findOne({
            where: { name: ILike(name) },
            relations: { country: true }
        });
        if (!city) {
            throw new NotFoundError(`City "${name}" does not exist`);
        }
        const cityMatch = await this.matchRepository.find({
            where:{stadium:{city:{name:ILike(name)}}},
            relations:{
                homeTeam:true,
                awayTeam:true,
                stadium:{city:true}
            }
        })
        return cityMatch;
    }
}
