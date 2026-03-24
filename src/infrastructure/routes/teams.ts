import { Hono } from "hono";
import { GetTeamsHandler } from "@infrastructure/handlers/teams/GetTeamsHandler";
import { GetTeamByFifaCodeHandler } from "@infrastructure/handlers/teams/GetTeamByFifaCodeHandler";
import { GetTeamMatchsByFifaCodeHandler } from "@infrastructure/handlers/teams/GetTeamMatchsByFiaCodeHandler";
import { GetTeamMatchsByStageHandler } from "@infrastructure/handlers/teams/GetTeamMatchsByStageHandler";
export const teamRouter = new Hono()
teamRouter.get('/:code', (c) => new GetTeamByFifaCodeHandler().handle(c))
teamRouter.get('/',(c)=>new GetTeamsHandler().handle(c))
teamRouter.get('/:code/matchs',(c)=> new GetTeamMatchsByFifaCodeHandler().handle(c))
teamRouter.get('/:code/matchs/:stage',(c)=>new GetTeamMatchsByStageHandler().handle(c))