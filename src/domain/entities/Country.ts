export class Country {
    public name: "USA" | "Mexico" | "Canada";
    public code: "us" | "me" | "ca";

    constructor(name: "USA" | "Mexico" | "Canada", code: "us" | "me" | "ca") {
        if (!((name === "USA" && code === "us") || (name === "Mexico" && code === "me") || (name === "Canada" && code === "ca"))) {
            throw new Error("Le code ne correspond pas à la ville.")
        }
        this.code = code;
        this.name = name;
    }
}