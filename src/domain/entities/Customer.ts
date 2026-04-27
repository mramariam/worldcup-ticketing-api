import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public firstname!: string;

    @Column()
    public lastname!: string;

    @Column({ unique: true }) 
    public email!: string;

    constructor(firstname?: string, lastname?: string, email?: string) {
        if (firstname && lastname && email) {
            this.firstname = firstname;
            this.lastname = lastname;
            this.email = email;
        }
    }
}
