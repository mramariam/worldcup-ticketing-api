import { City } from "@domain/entities/City";
import { Country } from "@domain/entities/Country";
import { Customer } from "@domain/entities/Customer";
import { Match } from "@domain/entities/Match";
import { MatchStage } from "@domain/entities/MatchStage";
import { MatchStatus } from "@domain/entities/MatchStatus";
import { Stadium } from "@domain/entities/Stadium";
import { Team } from "@domain/entities/Team";
import { Ticket } from "@domain/entities/Ticket";
import { DataSource } from "typeorm";
import "reflect-metadata";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306, 
    username: "worldcup_ticketing", 
    password: "motdepasseMram", 
    database: "worldcup_ticketing", 
    synchronize:true,
    //dropSchema:true,
    logging:false,
    entities: [City,Country,Customer,Match,Stadium,Team,Ticket]   
})