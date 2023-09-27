import { Client, GatewayIntentBits } from 'discord.js';
import http from 'http';
import { ReacordDiscordJs } from "reacord"
import dotenv from 'dotenv';
dotenv.config({path: '.env.dev'});

import ready from "./events/ready";
import interactionCreate from "./events/interactionCreate";

const client = new Client({ intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildVoiceStates,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.GuildMessages
] });

const reacord = new ReacordDiscordJs(client)

ready(client);
interactionCreate(client, reacord);

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('OK');
});

server.listen(3000, () => {
  console.log('Server listening on port 3000...');
});

client.login(process.env.DISCORD_TOKEN);