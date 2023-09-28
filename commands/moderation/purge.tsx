import { CommandInteraction, Client } from "discord.js";
import { Command } from "../../command";
import { ReacordDiscordJs } from "reacord";
import React from "react";
import ms from "ms";

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
    if (!interaction.isChatInputCommand()) return
    const amount = interaction.options.getInteger('number', true)
    if (amount > 100) 
      return reacord.ephemeralReply(interaction, <p>You can only purge 100 messages at a time.</p>);
    const messages = await interaction.channel?.messages.fetch({ 
        limit: amount + 1,
    });
    const filtered = messages?.filter(
      (msg) => Date.now() - msg.createdTimestamp < ms("14 days")
    );
    if (filtered === undefined)
      return reacord.ephemeralReply(interaction, <p>An error has occured</p>);
    reacord.ephemeralReply(interaction, <p>Purged ${filtered.size - 1} messages.</p>);
    // @ts-expect-error
    await interaction.channel?.bulkDelete(filtered);
  },
};