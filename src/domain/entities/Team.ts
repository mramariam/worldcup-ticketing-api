import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Team {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public name!: string;

    @Column({ length: 3, unique: true }) // On force la longueur à 3 et l'unicité
    public code!: string;

    constructor(name?: string, code?: string) {
        if (name && code) {
            if (!/^[A-Z]{3}$/.test(code)) {
                throw new Error("Le code de l'équipe n'est pas valide.");
            }
            this.name = name;
            this.code = code;
        }
    }
}
