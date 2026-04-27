import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Team } from "@domain/entities/Team";
import { Stadium } from "@domain/entities/Stadium";
import { MatchStatus } from "@domain/entities/MatchStatus";
import { MatchStage } from "@domain/entities/MatchStage";

@Entity()
export class Match {
    @PrimaryGeneratedColumn()
    public id!: number;

    @ManyToOne(() => Team)
    public homeTeam!: Team;

    @ManyToOne(() => Team)
    public awayTeam!: Team;

    @Column({ default: 0 })
    public homeScore!: number;

    @Column({ default: 0 })
    public awayScore!: number;

    @Column({ type: "int", nullable: true })
    public homeScoreExtraTime!: number | null;

    @Column({ type: "int", nullable: true })
    public awayScoreExtraTime!: number | null;

    @Column({ type: "int", nullable: true })
    public homeScoreShootOut!: number | null;

    @Column({ type: "int", nullable: true })
    public awayScoreShootOut!: number | null;

    @ManyToOne(() => Stadium)
    public stadium!: Stadium;

    @Column({
        type: "enum",
        enum: MatchStatus
    })
    public status!: MatchStatus;

    @Column({
        type: "enum",
        enum: MatchStage
    })
    public stage!: MatchStage;

    @Column()
    public date!: Date;

    constructor(
        id?: number,
        homeTeam?: Team,
        awayTeam?: Team,
        homeScore: number = 0,
        awayScore: number = 0,
        homeScoreExtraTime: number | null = null,
        awayScoreExtraTime: number | null = null,
        homeScoreShootOut: number | null = null,
        awayScoreShootOut: number | null = null,
        stadium?: Stadium,
        status?: MatchStatus,
        stage?: MatchStage,
        date?: Date,
        price?:number
    ) {
        if (id !== undefined && homeTeam && awayTeam && stadium && status && stage && date) {
            if (id <= 0) throw new Error("L'id n'est pas valide.");
            if (homeTeam.name === awayTeam.name) throw new Error("Le nom des équipes ne peut pas être le même.");
            if (homeScore < 0 || awayScore < 0) throw new Error("Le score n'est pas valide.");

            this.id = id;
            this.homeTeam = homeTeam;
            this.awayTeam = awayTeam;
            this.homeScore = homeScore;
            this.awayScore = awayScore;
            this.homeScoreExtraTime = homeScoreExtraTime;
            this.awayScoreExtraTime = awayScoreExtraTime;
            this.homeScoreShootOut = homeScoreShootOut;
            this.awayScoreShootOut = awayScoreShootOut;
            this.stadium = stadium;
            this.status = status;
            this.stage = stage;
            this.date = date;
        }
    }

    public isDraw(): boolean {
        return this.homeScore === this.awayScore;
    }

    public winner(): string {
        const totalHome = this.homeScore + (this.homeScoreExtraTime ?? 0) + (this.homeScoreShootOut ?? 0);
        const totalAway = this.awayScore + (this.awayScoreExtraTime ?? 0) + (this.awayScoreShootOut ?? 0);

        if (totalHome > totalAway) return this.homeTeam.name;
        if (totalAway > totalHome) return this.awayTeam.name;
        return "Les équipes ont fait match nul.";
    }
}
