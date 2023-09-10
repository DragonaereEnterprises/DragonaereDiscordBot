import { Client, GatewayIntentBits } from 'discord.js';
import express, { Application, Response } from "express";
import dotenv from 'dotenv';
dotenv.config();

import ready from "./events/ready";
import interactionCreate from "./events/interactionCreate";

const client = new Client({ intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildVoiceStates,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.GuildMessages
] });

ready(client);
interactionCreate(client);

const app: Application = express();

app.get("/",(res: Response) => {
  res.status(200).send({
    message: "Hello World!",
  });
});

app.get('/health', (res: Response) => {
  res.status(200);
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})

client.login(process.env.DISCORD_TOKEN);