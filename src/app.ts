import { Hono } from 'hono'
import { matchs } from 'mock/matchs'
export const app = new Hono()

app.get('/', (c) => {
  return c.json({ 'success': true, 'message': 'World Cup Ticketing API' })
})
app.get('/matchs', (c) => {
  return c.json({ 'success': true, 'message': 'All matchs', 'data': matchs }, 200);
})
app.get('/matchs/:id', (c) => {
  const matchURL = parseInt(c.req.param('id'), 10);
  const matchID = matchs.find((m) => m.id === matchURL);
  if (!matchID) {
    return c.json({ 'success': false, 'error': "Match " + matchURL + " does not exist" }, 404);
  }
  return c.json({ 'success': true, 'message': 'Match ' + matchURL, 'data': matchs[matchURL-1] }, 200);
})


