import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Match } from "@domain/entities/Match";
import { Customer } from "@domain/entities/Customer";

@Entity()
export class Ticket {
    @PrimaryGeneratedColumn()
    public id!: number;

    @ManyToOne(() => Match)
    public match!: Match;

    @Column({ length: 10 })
    public seat!: string;

    @ManyToOne(() => Customer)
    public customer!: Customer;

    constructor(id?: number, match?: Match, seat?: string, customer?: Customer) {
        // Validation métier
        if (id !== undefined && match && seat && customer) {
            if (id <= 0) {
                throw new Error("L'id du ticket n'est pas valide.");
            }
            if (seat.length < 1 || seat.length > 10) {
                throw new Error("La place doit comporter entre 1 et 10 caractères.");
            }
            
            this.id = id;
            this.match = match;
            this.seat = seat;
            this.customer = customer;
        }
    }
}
