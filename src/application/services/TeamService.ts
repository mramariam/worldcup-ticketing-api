import { Match } from "@domain/entities/Match";
import { MatchStage } from "@domain/entities/MatchStage";
import { Team } from "@domain/entities/Team";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { ValidationError } from "@domain/errors/ValidationError";
import { type FindOptionsOrder, type FindOptionsWhere, ILike, type Repository } from "typeorm";

type TeamFilters = {
    name?: string;
    code?: string;
    sort?: "name" | "-name";
};

export class TeamService {
    private readonly teamRepository: Repository<Team>;
    private readonly matchRepository: Repository<Match>;
    constructor(teamRepository: Repository<Team>, matchRepository: Repository<Match>) {
        this.teamRepository = teamRepository;
        this.matchRepository = matchRepository;
    }

    async findAll({ name, sort }: TeamFilters = {}): Promise<Team[]> {
        const where: FindOptionsWhere<Team> = {};
        const order: FindOptionsOrder<Team> = {};

        if (name) {
            where.name = ILike(name);
        }
        if (sort === '-name') {
            order.name = 'DESC'
        }
        else {
            order.name = 'ASC'
        }
        return await this.teamRepository.find({
            where: where,
            order: order
        });
    }


    async findByCode(code: string): Promise<Team> {
        if (code && !/^[A-Z]{3}$/.test(code)) {
            throw new ValidationError("Invalid FIFA code: \"" + code + "\"");
        }
        const team = await this.teamRepository.findOne({
            where: { code: code as any }
        });
        if (!team) {
            throw new NotFoundError(`Team with code "${code}" does not exist`);
        }
        return team;
    }

    async findMatchsByCode(code: string): Promise<Match[]> {
        if (code && !/^[A-Z]{3}$/.test(code)) {
            throw new ValidationError("Invalid FIFA code: \"" + code + "\"");
        }
        const team = await this.teamRepository.findOne({
            where: { code: ILike(code) }
        });
        if (!team) {
            throw new NotFoundError(`Team "${code}" does not exist`);
        }
        const teamMatchs = await this.matchRepository.find({
            where: [
                { homeTeam: { code: ILike(code) } },
                { awayTeam: { code: ILike(code) } }
            ],
            relations: {
                homeTeam: true,
                awayTeam: true,
                stadium: true
            }
        })
        return teamMatchs;
    }
    async findMatchsByStage(code: string, stage: MatchStage): Promise<Match[]> {
        const validStage = Object.values(MatchStage)
        if (!validStage.includes(stage as MatchStage)) {
            throw new ValidationError(`Invalid stage: "${stage}"`);
        }
        const team = await this.teamRepository.findOne({
            where: { code: ILike(code) }
        });
        if (!team) {
            throw new NotFoundError(`Team "${code}" does not exist`);
        }
        const teamMatchs = await this.matchRepository.find({
            where: [
                { homeTeam: { code: ILike(code) }, stage: stage as MatchStage },
                { awayTeam: { code: ILike(code) }, stage: stage as MatchStage }
            ],
            relations: {
                homeTeam: true,
                awayTeam: true,
                stadium: true
            }
        });
        return teamMatchs;
    }
}
