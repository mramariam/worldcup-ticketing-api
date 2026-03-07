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
  const matchID = parseInt(c.req.param('id'), 10);
  const matchURL = matchs.find((m) => m.id === matchID);
  if (!matchURL) {
    return c.json({ 'success': false, 'error': "Match " + matchID + " does not exist" }, 404);
  }
  return c.json({ 'success': true, 'message': 'Match 1', 'data': { 'id': matchID } }, 200);
})


