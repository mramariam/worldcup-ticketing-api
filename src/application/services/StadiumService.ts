import { Match } from "@domain/entities/Match";
import { Stadium } from "@domain/entities/Stadium";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { type FindOptionsWhere, ILike, type Repository } from "typeorm";

type StadiumFilters = {
    name?: string;
    cityName?: string;
    countryName?: string;
    countryCode?: string;
};

export class StadiumService {
    private readonly stadiumRepository: Repository<Stadium>;
    private readonly matchRepository: Repository<Match>;
    constructor(stadiumRepository: Repository<Stadium>, matchRepository: Repository<Match>) {
        this.stadiumRepository = stadiumRepository;
        this.matchRepository = matchRepository;
    }

    async findAll({ name, cityName, countryName, countryCode }: StadiumFilters = {}): Promise<Stadium[]> {
        const where: FindOptionsWhere<Stadium> = {};
        if (name) {
            where.name = ILike(name);
        }
        if (cityName) {
            where.city = { name: ILike(cityName) };
        }
        if (countryName) {
            where.city = { country: { name: countryName as "USA" | "Mexico" | "Canada" } };
        }
        if (countryCode) {
            where.city = { country: { code: countryCode as "us" | "me" | "ca" } };
        }

        return await this.stadiumRepository.find({
            where: where,
            relations: { city: { country: true } }
        });
    }
    async findByName(name: string): Promise<Stadium> {
        const stadium = await this.stadiumRepository.findOne({
            where: { name: ILike(name) },
            relations: {
                city: {
                    country: true
                }
            }
        });
        if (!stadium) {
            throw new NotFoundError(`Stadium "${name}" does not exist`);
        }
        return stadium;
    }
    async findMatchsByStadium(name: string): Promise<Match[]> {
        const stadium = await this.stadiumRepository.findOne({
            where: { name: ILike(name) }
        });
        if (!stadium) {
            throw new NotFoundError(`Stadium "${name}" does not exist`);
        }
        const stadiumMatchs = await this.matchRepository.find({
            where: { stadium: { name: ILike(name) } },
            relations: {
                homeTeam: true,
                awayTeam: true,
                stadium: {city:true}
            }
        });
        return stadiumMatchs;
    }
}
