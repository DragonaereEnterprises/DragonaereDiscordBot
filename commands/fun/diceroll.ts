import { CommandInteraction, Client } from "discord.js";
import { Command } from "../../command";

export const DiceRoll: Command = {
  adminOnly: false,
  ownerOnly: false,
  category: "fun",
  name: 'diceroll',
  description: 'Roll a Die',
  run: async (client: Client, interaction: CommandInteraction) => {
    function generateResponse() {
      let numberReturned = Math.floor(Math.random() * 6) + 1;
      return numberReturned;
    }
    await interaction.followUp({ content: `**${generateResponse()}**`, ephemeral: false });
  },
};