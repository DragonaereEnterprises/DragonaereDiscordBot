import { CommandInteraction, Client } from "discord.js";
import { Command } from "../../command";
import { ReacordDiscordJs } from "reacord";
import { EmbedMessage } from "../../components/Embed";
import React from "react";

export const EightBall: Command = {
  adminOnly: false,
  ownerOnly: false,
  category: "fun",
  name: '8ball',
  description: 'Ask the 8Ball a question',
  options: [
    {
      name: 'question',
      description: 'What do you want to ask the 8Ball?',
      required: true,
      type: 3,

    },
  ],
  run: async (client: Client, interaction: CommandInteraction, reacord: ReacordDiscordJs) => {
    const responses = ["42", "It is certain", "Reply hazy, try again","Don’t count on it", "It is decidedly so","Ask again later","My reply is no","Without a doubt","Better not tell you now",	"My sources say no","Yes definitely","Cannot predict now",	"Outlook not so good","You may rely on it","Concentrate and ask again",	"Very doubtful","As I see it, yes","Most likely","Outlook good","Yes","Signs point to yes"];
    // @ts-expect-error
    let questionString = interaction.options.getString("question", true);
    function generateResponse() {
        let arrayNumber = Math.floor(Math.random()*20);
        return responses[arrayNumber]
    }
    reacord.reply(interaction, <EmbedMessage title="8 Ball" description={`**Question:** ${questionString}\n**Answer:** ${generateResponse()}`} />);
  },
};