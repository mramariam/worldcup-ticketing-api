import { City } from "@domain/entities/City";
import { Country } from "@domain/entities/Country";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { type FindOptionsWhere, type Repository } from "typeorm";

type CountryFilters = {
    name?: string;
    code?: string;
};

export class CountryService {
    private readonly countryRepository: Repository<Country>;
    private readonly cityRepository:Repository<City>;
    constructor(countryRepository: Repository<Country>,cityRepository:Repository<City>) {
        this.countryRepository = countryRepository;
        this.cityRepository=cityRepository;
    }
    
    async findAll({ name, code }: CountryFilters = {}): Promise<Country[]> {
        const where: FindOptionsWhere<Country> = {};
        if (name) {
            where.name = name as "USA"|"Mexico"|"Canada"; 
        }
        if (code) {
            where.code = code as "us" | "me" | "ca";
        }
        return await this.countryRepository.find({
            where: where
        });
    }
    async findByCode(code: string): Promise<Country> {
        const country = await this.countryRepository.findOne({
            where: { code: code as "us" | "me" | "ca" }
        });

        if (!country) {
            throw new NotFoundError(`Country "${code}" does not exist`);
        }

        return country;
    }
    async findCitiesByCountry(code:string):Promise<City[]>{
        const country=await this.countryRepository.findOne({
            where:{code:code as "us"|"me"|"ca"}
        })
        if(!country){
            throw new NotFoundError(`Country "${code}" does not exist`);
        }
        const countryCities= await this.cityRepository.find({
            where:{country:{code:code as "us"|"me"|"ca"}},
            relations:{country:true}
        })
        return countryCities
    }
}

