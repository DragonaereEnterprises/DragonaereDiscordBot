import { CommandInteraction, Client } from "discord.js";
import { Command } from "../../command";

export const CheckNSFW: Command = {
  adminOnly: true,
  ownerOnly: false,
  category: "admin",
  name: 'checknsfw',
  description: 'Check the Servers NSFW Level',
  run: async (client: Client, interaction: CommandInteraction) => {
    const nsfwLevel = interaction.guild?.nsfwLevel;
    const nsfwLevelName = ["Default", "Explicit", "Safe", "Age Restricted"];
    if (nsfwLevel === undefined)
      return await interaction.followUp({ content: `An Error has Occured`, ephemeral: true });

    await interaction.followUp({ content: `NSFW Level: ${nsfwLevelName[nsfwLevel]}`, ephemeral: true });
  },
};