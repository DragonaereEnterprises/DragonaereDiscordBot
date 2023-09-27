import { CommandInteraction, Client } from "discord.js";
import { Command } from "../../command";
import { ReacordDiscordJs } from "reacord";

export const CoinFlip: Command = {
  adminOnly: false,
  ownerOnly: false,
  category: "fun",
  name: 'coinflip',
  description: 'Flip a coin',
  run: async (client: Client, interaction: CommandInteraction, reacord: ReacordDiscordJs) => {
    function generateResponse() {
      let flipVariable = Math.random();
      if (flipVariable < .5) {
        return 'Heads'
      }
      else {
        return 'Tails'
      }
    }
    await reacord.reply(interaction, `${generateResponse()}`);
  }
};