import { Client, GatewayIntentBits } from 'discord.js';
import http from 'http';
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

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('OK');
});

server.listen(3000, () => {
  console.log('Server listening on port 3000...');
});

client.login(process.env.DISCORD_TOKEN);