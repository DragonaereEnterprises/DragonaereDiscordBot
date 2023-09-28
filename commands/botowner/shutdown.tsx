import { CommandInteraction, Client } from "discord.js";
import { Command } from "../../command";
import { ReacordDiscordJs } from "reacord";
import React from "react";

export const ShutDown: Command = {
  adminOnly: false,
  ownerOnly: true,
  category: "botowner",
  name: 'shutdown',
  description: 'Shuts the bot down',
  run: async (client: Client, interaction: CommandInteraction, reacord: ReacordDiscordJs) => {
    reacord.ephemeralReply(interaction, <p>Shutting Down...</p>);
    setTimeout(function(){return},3000);
    process.exit(0);
  },
};