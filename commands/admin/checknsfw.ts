import { CommandInteraction, Client } from "discord.js";
import { Command } from "../../command";
import { ReacordDiscordJs } from "reacord";

export const CheckNSFW: Command = {
  adminOnly: true,
  ownerOnly: false,
  category: "admin",
  name: 'checknsfw',
  description: 'Check the Servers NSFW Level',
  run: async (client: Client, interaction: CommandInteraction, reacord: ReacordDiscordJs) => {
    const nsfwLevel = interaction.guild?.nsfwLevel;
    const nsfwLevelName = ["Default", "Explicit", "Safe", "Age Restricted"];
    if (nsfwLevel === undefined)
      return await reacord.ephemeralReply(interaction, `An Error has Occured`);

    await reacord.ephemeralReply(interaction, `NSFW Level: ${nsfwLevelName[nsfwLevel]}`);
  },
};