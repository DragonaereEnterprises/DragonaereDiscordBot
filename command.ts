import { CommandInteraction, ChatInputApplicationCommandData, Client } from "discord.js";
import { ReacordDiscordJs } from "reacord";

export interface Command extends ChatInputApplicationCommandData {
  category: number;
  adminOnly: boolean;
  ownerOnly: boolean;
  run: (client: Client, interaction: CommandInteraction, reacord: ReacordDiscordJs) => void;
}