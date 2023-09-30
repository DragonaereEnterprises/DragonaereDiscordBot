import { CommandInteraction, Client } from "discord.js";
import { Command } from "../../command";
import { ReacordDiscordJs, Embed, Button } from "reacord";
import React from "react";

function HelpEmbed(){

	return (
		<Embed
			title="Help"
			description="Hahaha broken..."
			color={0x00ff00}
			timestamp={Date.now()}
		/>
	)
}

export const Help: Command = {
  adminOnly: false,
  ownerOnly: false,
  category: 5,
  name: 'help',
  description: 'Stop it. Get some help.',
  run: async (client: Client, interaction: CommandInteraction, reacord: ReacordDiscordJs) => {
    reacord.reply(interaction, <HelpEmbed />)
  },
};