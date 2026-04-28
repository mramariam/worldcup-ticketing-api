import { Match } from "@domain/entities/Match";
import { MatchStage } from "@domain/entities/MatchStage";
import { MatchStatus } from "@domain/entities/MatchStatus";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { ValidationError } from "@domain/errors/ValidationError";
import { type FindOptionsWhere, ILike, type Repository } from "typeorm";

type MatchFilters = {
    date?: Date;
    teamCode?: string;
};

export class MatchService {
    private readonly matchRepository: Repository<Match>;

    constructor(matchRepository: Repository<Match>) {
        this.matchRepository = matchRepository;
    }
    async findAll({ date, teamCode }: MatchFilters = {}): Promise<Match[]> {
        if (teamCode && !/^[A-Z]{3}$/.test(teamCode)) {
            throw new ValidationError("Le fifacode demandé est incorrect.");
        }
        if (date && isNaN(date.getTime())) {
            throw new ValidationError("Invalid date format.");
        }
        let where: FindOptionsWhere<Match> | FindOptionsWhere<Match>[] = {};
        if (teamCode) {
            where = [
                { homeTeam: { code: teamCode as any } },
                { awayTeam: { code: teamCode as any } }
            ];
            if (date) {
                where[0].date = new Date(date);
                where[1].date = new Date(date);
            }
        } else if (date) {
            where = { date: new Date(date) };
        }
        return await this.matchRepository.find({
            where: where,
            relations: {
                homeTeam: true,
                awayTeam: true,
                stadium: {city:true}
            }
        });
    }
    async findById(id: number): Promise<Match> {
        const match = await this.matchRepository.findOne({
            where: { id: id },
            relations: {
                homeTeam: true,
                awayTeam: true,
                stadium: {city:{country:true}}
            }
        });
        if (!match) {
            throw new NotFoundError(`Match with ID "${id}" does not exist`);
        }
        return match;
    }

    async findOneByStage(stage: MatchStage): Promise<Match> {
        const validStage = Object.values(MatchStage)
        if (!validStage.includes(stage as MatchStage)) {
            throw new ValidationError(`Invalid status: "${stage}"`);
        }
        const match = await this.matchRepository.findOne({
            where: { stage: stage as MatchStage },
            relations: {
                homeTeam: true,
                awayTeam: true,
                stadium: {city:true}
            }
        });
        if (!match) {
            throw new NotFoundError(`No match found for stage "${stage}"`);
        }
        return match
    }
    async findByStage(stage: MatchStage): Promise<Match[]> {
        const validStage = Object.values(MatchStage)
        if (!validStage.includes(stage as MatchStage)) {
            throw new ValidationError(`Invalid stage: "${stage}"`);
        }
        const matchs = await this.matchRepository.find({
            where: { stage: stage as MatchStage },
            relations: {
                homeTeam: true,
                awayTeam: true,
                stadium:{city:true}
            }
        });
        return matchs
    }
    async findByStatus(status: MatchStatus): Promise<Match[]> {
        const validStatus = Object.values(MatchStatus)
        if (!validStatus.includes(status as MatchStatus)) {
            throw new ValidationError(`Invalid status: "${status}"`);
        }
        const matchs = await this.matchRepository.find({
            where: { status: status as MatchStatus },
            relations: {
                homeTeam: true,
                awayTeam: true,
                stadium: {city:true}
            }
        });
        return matchs
    }
}
