import { CommandInteraction, Client } from "discord.js";
import { Command } from "../../command";
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
  run: async (client: Client, interaction: CommandInteraction) => {
    if (!interaction.channel?.isDMBased){
      interaction.followUp({ content: "An error has occurred" });
      return;
    }
    // @ts-expect-error
    const amount = interaction.options.getInteger('number')
    if (amount > 100) 
      return interaction.followUp({ content : `You can only purge 100 messages at a time.`, ephemeral: true });
    const messages = await interaction.channel?.messages.fetch({ 
        limit: amount + 1,
    });
    const filtered = messages?.filter(
      (msg) => Date.now() - msg.createdTimestamp < ms("14 days")
    );
    if (filtered === undefined)
      return interaction.followUp({ content: 'An error has occured', ephemeral: true });
    await interaction.followUp({ content : `Purged ${filtered.size - 1} messages.`, ephemeral: true });
    // @ts-expect-error
    await interaction.channel?.bulkDelete(filtered)
  },
};