import { Context } from "hono";

export class GetHealthHandler {
    async handle(c: Context) {
        return c.json({ 'success': true, 'message': 'World Cup Ticketing API' ,'uptime': process.uptime() ,'environment': process.env.NODE_ENV }, 200)
    }
}