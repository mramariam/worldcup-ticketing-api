import { Ticket } from "@domain/entities/Ticket";
import { Match } from "@domain/entities/Match";
import { Customer } from "@domain/entities/Customer";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { ConflictError } from "@domain/errors/ConflictError";
import { type Repository } from "typeorm";

type CreateTicketDTO = {
    matchId: number;
    seat: string;
    customer: {
        firstname: string;
        lastname: string;
        email: string;
    }
};

export class TicketService {
    constructor(
        private readonly ticketRepository: Repository<Ticket>,
        private readonly matchRepository: Repository<Match>,
        private readonly customerRepository: Repository<Customer>
    ) { }

    async create(data: CreateTicketDTO): Promise<Ticket> {
        const match = await this.matchRepository.findOneBy({ id: data.matchId });
        if (!match) {
            throw new NotFoundError(`Match ${data.matchId} does not exist`);
        }
        const seatReserved = await this.ticketRepository.findOne({
            where: { match: { id: match.id }, seat: data.seat }
        });
        if (seatReserved) {
            throw new ConflictError(`Seat '${data.seat}' is already taken for match ${match.id}`);
        }
        let customer = await this.customerRepository.findOneBy({ email: data.customer.email });
        if (!customer) {
            customer = this.customerRepository.create({
                firstname: data.customer.firstname,
                lastname: data.customer.lastname,
                email: data.customer.email
            });
            await this.customerRepository.save(customer);
        }
        const newTicket = this.ticketRepository.create({
            match: match,
            seat: data.seat,
            customer: customer
        });
        return await this.ticketRepository.save(newTicket);
    }
}
