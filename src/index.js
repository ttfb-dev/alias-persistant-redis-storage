import express from "express";
import bodyParser from "body-parser";
import { persistentRedisService } from "./persistentRedisService.js";

const app = express();
const port = 80;
app.use(bodyParser.json());

const prefix_user = 'prs_user';
const prefix_room = 'prs_room';
const prefix_app  = 'prs_app';

app.post('/user/:user_id([\\d])/parameter/:parameter([a-z\\d\_]{1,50})', async (req, res) => {
  await persistentRedisService.set(prefix_user, `${req.params.user_id}_${req.params.parameter}`, req.body)
  return res.status(200).send();
});

app.get('/user/:user_id([\\d])/parameter/:parameter([a-z\\d\_]{1,50})', async (req, res) => {
  const answ = await persistentRedisService.get(prefix_user, `${req.params.user_id}_${req.params.parameter}`);
  if (answ) {
    return res.status(200).json(answ);
  }
  return res.status(404).send();
});

app.post('/room/:room_id/parameter/:parameter([a-z\\d\_]{1,50})', async (req, res) => {
  await persistentRedisService.set(prefix_room, `${req.params.room_id}_${req.params.parameter}`, req.body)
  return res.status(200).send();
});

app.get('/room/:room_id/parameter/:parameter([a-z\\d\_]{1,50})', async (req, res) => {
  const answ = await persistentRedisService.get(prefix_user, `${req.params.room_id}_${req.params.parameter}`);
  if (answ) {
    return res.status(200).json(answ);
  }
  return res.status(404).send();
});

app.post('/app/parameter/:parameter([a-z\\d\_]{1,50})', async (req, res) => {
  await persistentRedisService.set(prefix_app, `app_${req.params.parameter}`, req.body)
  return res.status(200).send();
});

app.get('/app/parameter/:parameter([a-z\\d\_]{1,50})', async (req, res) => {
  const answ = await persistentRedisService.get(prefix_app, `${req.params.parameter}`);
  if (answ) {
    return res.status(200).json(answ);
  }
  return res.status(404).send();
});

app.get("/", async (req, res) => {
  return res.status(200).send();
});

app.listen(port, () => {
  console.log(`running at 0.0.0.0:${port}`)
});
