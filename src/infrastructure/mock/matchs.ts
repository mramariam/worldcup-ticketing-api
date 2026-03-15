
import { Match } from "@domain/entities/Match";
import { MatchStage } from "@domain/entities/MatchStage";
import { MatchStatus } from "@domain/entities/MatchStatus";
import { stadiums } from "./stadiums";
import { teams } from "./teams";

export const match1 = new Match(1, teams[1], teams[22], undefined, undefined, null, null, null, null, stadiums[6], MatchStatus.SCHEDULED, MatchStage.GROUP, new Date);
export const match2 = new Match(2, teams[19], teams[27], undefined, undefined, null, null, null, null, stadiums[13], MatchStatus.SCHEDULED, MatchStage.GROUP, new Date);
export const match3 = new Match(3, teams[45], teams[2], undefined, undefined, null, null, null, null, stadiums[2], MatchStatus.SCHEDULED, MatchStage.GROUP, new Date);

export const matchs = [match1, match2, match3];
