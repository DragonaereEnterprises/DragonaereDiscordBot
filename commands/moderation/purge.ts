import { CommandInteraction, Client } from "discord.js";
import { Command } from "../../command";
import { ReacordDiscordJs } from "reacord";
const ms = require("ms");

export const Purge: Command = {
  adminOnly: true,
  ownerOnly: false,
  category: "moderation",
  name: 'purge',
  description: 'Clear the chat of a defined ammount of messages',
  options: [
    {
      name: 'number',
      description: 'Number of messages to purge',
      required: true,
      type: 4,

    },
  ],
  run: async (client: Client, interaction: CommandInteraction, reacord: ReacordDiscordJs) => {
    if (!interaction.channel?.isDMBased){
      reacord.reply(interaction, "An error has occurred");
      return;
    }
    // @ts-expect-error
    const amount = interaction.options.getInteger('number')
    if (amount > 100) 
      return reacord.ephemeralReply(interaction, `You can only purge 100 messages at a time.`);
    const messages = await interaction.channel?.messages.fetch({ 
        limit: amount + 1,
    });
    const filtered = messages?.filter(
      (msg) => Date.now() - msg.createdTimestamp < ms("14 days")
    );
    if (filtered === undefined)
      return reacord.ephemeralReply(interaction, 'An error has occured');
    await reacord.ephemeralReply(interaction, `Purged ${filtered.size - 1} messages.`);
    // @ts-expect-error
    await interaction.channel?.bulkDelete(filtered)
  },
};