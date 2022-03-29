// redis password: RInufXJiKRBCS9GULmTtuFAbI8lm6UxC

// admin password: wRBdYva3Hu_F_6S

import express from 'express';
import cors from 'cors';
import { Client, Repository } from 'redis-om';
import { positionSchema } from './positions.schema.js';

const app = express();
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000']
}));

const client = new Client();
await client.open("redis://Admin:wRBdYva3Hu_F_6S@redis-11103.c91.us-east-1-3.ec2.cloud.redislabs.com:11103");

const positionRepository = new Repository(positionSchema, client);

await positionRepository.dropIndex();
await positionRepository.createIndex();

app.get('/positions', async (req, res) => {
    res.send(await positionRepository.search().returnAll());
});

app.post('/positions', async (req, res) => {
    const position = positionRepository.createIndex();
    position.positionX = req.body.positionX;
    position.positionY = req.body.positionY;
    position.id = await positionRepository.save(position)
    res.send(position);
})


app.listen(8000);