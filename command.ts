import { CommandInteraction, ChatInputApplicationCommandData, Client } from "discord.js";

export interface Command extends ChatInputApplicationCommandData {
  category: string;
  adminOnly: boolean;
  ownerOnly: boolean;
  run: (client: Client, interaction: CommandInteraction) => void;
}