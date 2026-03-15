export class Team {
    name: string;
    code: string;

    constructor(name: string, code: string) {
        if (!/^[A-Z]{3}$/.test(code)) {
            throw new Error("Le code de l'équipe n'est pas valide.")
        }
        this.code = code;
        this.name = name;
    }
}