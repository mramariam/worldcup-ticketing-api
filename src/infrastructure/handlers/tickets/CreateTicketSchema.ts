import * as z from "zod";


export const CreateTicketSchema=z.object({
    matchId:z.number({error:"L'id du match doit etre un nombre."}).int({error:"L'id du match doit etreun nombre entier."}).positive({error:"L'id du match doit etre un nombre entier positif."}),
    seat:z.string({error:"La place est une chaine de caractere."}).min(1,{error:"La place doit contenir au moins un caractere."}).max(10,{error:"La place doit doit contenir au maximum 10 carateres."}),
    customer:z.object({
        firstname:z.string({error:"Le prenom du client doit etre une chaine une chaine de caracteres."}).min(1,{error:"Le prenom du client doit contenir au moins 1 caractere."}),
        lastname:z.string({error:"Le nom du client doit etre une chaine de caractere."}).min(1,{error:"Le nom du client doit contenir au moins un caractere."}),
        email:z.string().email({error:"Le mail du client doit etre au format \"email\""}),
    })
})
export type CreateTicket = z.infer<typeof CreateTicketSchema>;