import { Hono } from "hono";
import { GetTeamsHandler } from "@infrastructure/handlers/teams/GetTeamsHandler";
import { GetTeamByFifaCodeHandler } from "@infrastructure/handlers/teams/GetTeamByFifaCodeHandler";
export const teamRouter = new Hono()
teamRouter.get('/:code', (c) => new GetTeamByFifaCodeHandler().handle(c))
teamRouter.get('/',(c)=>new GetTeamsHandler().handle(c))
