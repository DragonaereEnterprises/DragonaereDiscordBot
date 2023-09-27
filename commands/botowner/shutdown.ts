import { CommandInteraction, Client } from "discord.js";
import { Command } from "../../command";
import { ReacordDiscordJs } from "reacord";

export const ShutDown: Command = {
  adminOnly: false,
  ownerOnly: true,
  category: "botowner",
  name: 'shutdown',
  description: 'Shuts the bot down',
  run: async (client: Client, interaction: CommandInteraction, reacord: ReacordDiscordJs) => {
    await reacord.ephemeralReply(interaction, 'Shutting Down...');
    setTimeout(function(){return},3000);
    process.exit(0);
  },
};