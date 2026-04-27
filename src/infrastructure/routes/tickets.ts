import { CreateTicketHandler } from "@infrastructure/handlers/tickets/CreateTicketHandler";
import { Hono } from "hono";
export const ticketRouter = new Hono();
ticketRouter.post("/", (c) => new CreateTicketHandler().handle(c))