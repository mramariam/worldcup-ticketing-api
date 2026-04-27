import "reflect-metadata";
import { AppDataSource } from "./AppDataSource";
import { Country } from "@domain/entities/Country";
import { countries } from "@infrastructure/mock/countries";
import { City } from "@domain/entities/City";
import { cities } from "@infrastructure/mock/cities";
import { Stadium } from "@domain/entities/Stadium";
import { stadiums } from "@infrastructure/mock/stadiums";
import { Team } from "@domain/entities/Team";
import { teams } from "@infrastructure/mock/teams";
import { Match } from "@domain/entities/Match";
import { matchs } from "@infrastructure/mock/matchs";
import { Ticket } from "@domain/entities/Ticket";
import { tickets } from "@infrastructure/mock/tickets";

async function clear(): Promise<void> {
    try {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }
        const countryRepository = AppDataSource.getRepository(Country);
        const cityRepository = AppDataSource.getRepository(City);
        const stadiumRepository = AppDataSource.getRepository(Stadium);
        const teamRepository = AppDataSource.getRepository(Team);
        const matchRepository = AppDataSource.getRepository(Match);
        const ticketRepository = AppDataSource.getRepository(Ticket);
        await ticketRepository.deleteAll();
        await matchRepository.deleteAll();
        await teamRepository.deleteAll();
        await stadiumRepository.deleteAll();
        await cityRepository.deleteAll();
        await countryRepository.deleteAll();

        console.log("Database cleared with success");
    } catch (error) {
        console.error(error);
        console.error("Cant't clear database")
    }
}

async function seed(): Promise<void> {
    try {
        await clear();
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }
        const countryRepository = AppDataSource.getRepository(Country);
        const cityRepository = AppDataSource.getRepository(City);
        const stadiumRepository = AppDataSource.getRepository(Stadium);
        const teamRepository = AppDataSource.getRepository(Team);
        const matchRepository = AppDataSource.getRepository(Match);
        const ticketRepository = AppDataSource.getRepository(Ticket);

       // const countryEntities = countryRepository.create(countries);
        await countryRepository.save(countries);
        console.log(`Countries inserted`)

       // const cityEntities = cityRepository.create(cities)
        await cityRepository.save(cities);
        console.log(`Cities inserted`)

      //  const stadiumEntities = stadiumRepository.create(stadiums)
        await stadiumRepository.save(stadiums)
        console.log(`Stadiums inserted`)

     //   const teamEntities = teamRepository.create(teams)
        await teamRepository.save(teams)
        console.log(`Teams inserted`)

      //  const matchEntities = matchRepository.create(matchs)
        await matchRepository.save(matchs)
        console.log(`Matchs inserted`)

        //const ticketEntities = ticketRepository.create(tickets)
        await ticketRepository.save(tickets)
        console.log(`Tickets inserted`)

        await AppDataSource.destroy();
        console.log("Database seeded with success")
    } catch (error) {
        console.error(error);
    }
}
seed();