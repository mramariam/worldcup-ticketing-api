import { Hono } from "hono";
import { GetMatchByIdHandler } from "@infrastructure/handlers/matchs/GetMatchByIdHandler";
import { GetMatchsHandler } from "@infrastructure/handlers/matchs/GetMatchsHandler";
export const matchsRouter = new Hono()
matchsRouter.get('/', (c) => new GetMatchsHandler().handle(c))
matchsRouter.get('/:id', (c) => new GetMatchByIdHandler().handle(c))
