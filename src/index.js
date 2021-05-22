import express from "express";
import bodyParser from "body-parser";
import { persistentRedisService } from "./persistentRedisService.js";

const app = express();
const port = 80;
app.use(bodyParser.text());

const prefix_user       = 'prs_user';
const prefix_room       = 'prs_room';
const prefix_app        = 'prs_app';
const prefix_incremet   = 'prs_increment';

app.post('/user/:user_id([\\d])/parameter/:parameter([a-z\\d\_]{1,50})', async (req, res) => {
  await persistentRedisService.set(prefix_user, `${req.params.user_id}_${req.params.parameter}`, req.body)
  return res.send();
});

app.delete('/user/:user_id([\\d])/parameter/:parameter([a-z\\d\_]{1,50})', async (req, res) => {
  await persistentRedisService.del(prefix_user, `${req.params.user_id}_${req.params.parameter}`)
  return res.send();
});

app.get('/user/:user_id([\\d])/parameter/:parameter([a-z\\d\_]{1,50})', async (req, res) => {
  const answ = await persistentRedisService.get(prefix_user, `${req.params.user_id}_${req.params.parameter}`);
  if (answ) {
    return res.send(answ);
  }
  return res.sendStatus(404);
});

app.post('/room/:room_id/parameter/:parameter([a-z\\d\_]{1,50})', async (req, res) => {
  await persistentRedisService.set(prefix_room, `${req.params.room_id}_${req.params.parameter}`, req.body)
  return res.send();
});

app.delete('/room/:room_id/parameter/:parameter([a-z\\d\_]{1,50})', async (req, res) => {
  await persistentRedisService.del(prefix_room, `${req.params.room_id}_${req.params.parameter}`)
  return res.send();
});

app.get('/room/:room_id/parameter/:parameter([a-z\\d\_]{1,50})', async (req, res) => {
  const answ = await persistentRedisService.get(prefix_room, `${req.params.room_id}_${req.params.parameter}`);
  if (answ) {
    return res.send(answ);
  }
  return res.sendStatus(404);
});

app.post('/app/parameter/:parameter([a-z\\d\_]{1,50})', async (req, res) => {
  await persistentRedisService.set(prefix_app, `app_${req.params.parameter}`, req.body)
  return res.send();
});

app.delete('/app/parameter/:parameter([a-z\\d\_]{1,50})', async (req, res) => {
  await persistentRedisService.del(prefix_app, `${req.params.parameter}`)
  return res.send();
});

app.get('/app/parameter/:parameter([a-z\\d\_]{1,50})', async (req, res) => {
  const answ = await persistentRedisService.get(prefix_app, `${req.params.parameter}`);
  if (answ) {
    return res.send(answ);
  }
  return res.sendStatus(404);
});

app.get('/increment/parameter/:parameter([a-z\\d\_]{1,50})', async (req, res) => {
  const answ = await persistentRedisService.getIncrement(prefix_incremet, `${req.params.parameter}`);
  if (answ) {
    return res.send(String(answ));
  }
  return res.sendStatus(404);
});

app.delete('/increment/parameter/:parameter([a-z\\d\_]{1,50})', async (req, res) => {
  await persistentRedisService.del(prefix_incremet, `${req.params.parameter}`)
  return res.send();
});

app.get("/", async (req, res) => {
  return res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`running at 0.0.0.0:${port}`)
});
