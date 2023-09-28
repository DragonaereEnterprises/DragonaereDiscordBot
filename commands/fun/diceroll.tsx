import { CommandInteraction, Client } from "discord.js";
import { Command } from "../../command";
import { ReacordDiscordJs } from "reacord";
import React from "react";

export const DiceRoll: Command = {
  adminOnly: false,
  ownerOnly: false,
  category: "fun",
  name: 'diceroll',
  description: 'Roll a Die',
  run: async (client: Client, interaction: CommandInteraction, reacord: ReacordDiscordJs) => {
    function generateResponse() {
      let numberReturned = Math.floor(Math.random() * 6) + 1;
      return numberReturned;
    }
    reacord.reply(interaction, <p>**${generateResponse()}**</p>);
  },
};