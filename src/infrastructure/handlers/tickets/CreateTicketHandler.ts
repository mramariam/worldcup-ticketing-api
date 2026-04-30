import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Ticket } from "@domain/entities/Ticket";
import { Match } from "@domain/entities/Match";
import { Customer } from "@domain/entities/Customer";
import { TicketService } from "@application/services/TicketService";
import { CreateTicketSchema } from "./CreateTicketSchema";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { ValidationError } from "@domain/errors/ValidationError";
import { Repository } from "typeorm";
import { ConflictError } from "@domain/errors/ConflictError";

const ticketRepository: Repository<Ticket> = AppDataSource.getRepository(Ticket);
const matchRepository: Repository<Match> = AppDataSource.getRepository(Match);
const customerRepository: Repository<Customer> = AppDataSource.getRepository(Customer);
const ticketService: TicketService = new TicketService(ticketRepository, matchRepository, customerRepository);

export class CreateTicketHandler {
    async handle(c: Context) {
        const body = await c.req.json();
        const ticketValide = CreateTicketSchema.safeParse(body);
        if (!ticketValide.success) {
            throw new HTTPException(400, { message: "Can't create ticket (wrong or missing values)" });
        }
        try {
            const nouveauTicket = await ticketService.create(ticketValide.data);
            return c.json({
                "success": true,
                "message": "Ticket created",
                "data": {
                    "id": nouveauTicket.id,
                    "seat": nouveauTicket.seat,
                    "email": nouveauTicket.customer.email,
                    "match": {
                        "id": nouveauTicket.match.id
                    }
                }
            }, 201);
        } catch (e) {
            if (e instanceof NotFoundError)
                throw new HTTPException(404, { message: e.message });
            if (e instanceof ConflictError)
                throw new HTTPException(409, { message: e.message });
            if (e instanceof ValidationError)
                throw new HTTPException(400, { message: e.message });
            throw e;
        }
    }
}
