import { CommandInteraction, ChatInputApplicationCommandData, Client } from "discord.js";
import { LavalinkManager, MiniMap } from "lavalink-client/dist/types";
import { ReacordDiscordJs } from "reacord";

import { SlashCommandSubcommandBuilder, SlashCommandSubcommandGroupBuilder, SlashCommandSubcommandsOnlyBuilder } from "discord.js";
// import { RedisClientType } from "redis";

export interface Command extends ChatInputApplicationCommandData {
  category: number;
  adminOnly: boolean;
  ownerOnly: boolean;
  run: (client: Client, interaction: CommandInteraction, reacord: ReacordDiscordJs, lavalink: LavalinkManager) => void;
}

export interface CustomRequester {
  id: string,
  username: string,
  avatar?: string,
}
export interface SubCommand {
  data: SlashCommandSubcommandBuilder | SlashCommandSubcommandGroupBuilder | SlashCommandSubcommandsOnlyBuilder;
  run: (client: Client, interaction: CommandInteraction, reacord: ReacordDiscordJs, lavalink: LavalinkManager) => void;
}

export interface Event {
  name: string,
  run: (client:BotClient, ...params:any) => any;
}

export interface BotClient extends Client {
  lavalink: LavalinkManager;
  commands: MiniMap<string, Command|SubCommand>;
  // redis: RedisClientType;
  defaultVolume: number;
}