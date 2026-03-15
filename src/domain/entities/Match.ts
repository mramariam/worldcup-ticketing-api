import { Team } from "@domain/entities/Team";
import { Stadium } from "@domain/entities/Stadium";
import { MatchStatus } from "@domain/entities/MatchStatus";
import { MatchStage } from "@domain/entities/MatchStage";

export class Match {
    public id: number;
    public homeTeam: Team;
    public awayTeam: Team;
    public homeScore: number = 0;
    public awayScore: number = 0;
    public homeScoreExtraTime: number | null;
    public awayScoreExtraTime: number | null;
    public homeScoreShootOut: number | null;
    public awayScoreShootOut: number | null;
    public stadium: Stadium;
    public status: MatchStatus;
    public stage: MatchStage;
    public date: Date;

    constructor(id: number, homeTeam: Team, awayTeam: Team, homeScore: number = 0, awayScore: number = 0, homeScoreExtraTime: number | null, x: number | null, homeScoreShootOut: number | null, awayScoreShootOut: number | null, stadium: Stadium, status: MatchStatus, stage: MatchStage, date: Date) {
        if (id <= 0) {
            throw new Error("L'id de l'équipe n'est pas valide.")
        }
        if (homeTeam.name === awayTeam.name) {
            throw new Error("Le nom des équipes ne peut pas être le même.")
        }
        if (homeScore < 0) {
            throw new Error("Le scrore de l'équipe hote n'est pas valide.")
        }
        if (awayScore < 0) {
            throw new Error("Le score de l'équipe invitée n'est pas valide.")
        }
        this.id = id;
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.homeScore = homeScore;
        this.awayScore = awayScore;
        this.homeScoreExtraTime = homeScoreExtraTime;
        this.awayScoreExtraTime = x;
        this.homeScoreShootOut = homeScoreShootOut;
        this.awayScoreShootOut = awayScoreShootOut;
        this.stadium = stadium;
        this.status = status;
        this.stage = stage;
        this.date = date;

    }

    /**
     * isDraw
     */
    public isDraw(): boolean {
        return this.homeScore === this.awayScore;
    }

    /**
     * winner
 :string    */
    public winner(): string {
        if ((this.homeScore+(this.homeScoreExtraTime ?? 0)+(this.homeScoreShootOut ??0)) < (this.awayScore+(this.awayScoreExtraTime??0)+(this.awayScoreShootOut??0))) {
            return this.awayTeam.name;
        } else if ((this.awayScore+(this.awayScoreExtraTime??0)+(this.awayScoreShootOut??0)) < (this.homeScore+(this.homeScoreExtraTime??0)+(this.homeScoreShootOut??0))) {
            return this.homeTeam.name;
        }
        return "Les équipes ont fait match null."
    }

}