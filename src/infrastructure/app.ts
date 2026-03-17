import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { matchsRouter } from './routes/matchs';
import { homeRouter } from './routes/home';
import { teamRouter } from './routes/teams';
import { cityRouter } from './routes/cities';
import { countryRouter } from './routes/countries';
import { stadiumRouter } from './routes/stadiums';
export const app = new Hono()
app.route("/matchs", matchsRouter);
app.route("/", homeRouter);
app.route("/teams", teamRouter);
app.route("/cities",cityRouter);
app.route("/countries",countryRouter)
app.route("/stadiums", stadiumRouter)
app.onError((error,c)=>{
    if(error instanceof HTTPException){
        return error.getResponse()
    }
})