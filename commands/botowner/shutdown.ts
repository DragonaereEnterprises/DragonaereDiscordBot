import { CommandInteraction, Client } from "discord.js";
import { Command } from "../../command";

export const ShutDown: Command = {
  adminOnly: false,
  ownerOnly: true,
  category: "botowner",
  name: 'shutdown',
  description: 'Shuts the bot down',
  run: async (client: Client, interaction: CommandInteraction) => {
    await interaction.followUp({ content: 'Shutting Down...', ephemeral: true});
    setTimeout(function(){return},3000);
    process.exit(0);
  },
};