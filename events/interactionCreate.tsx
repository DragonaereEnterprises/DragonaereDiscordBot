import { CommandInteraction, Client, Interaction, PermissionsBitField, GuildMember } from "discord.js";
import { Commands } from "../Commands"
import { ReacordDiscordJs } from "reacord";
import { EmbedError } from "../components/Embed";
import React from "react";
import dotenv from 'dotenv';
dotenv.config();

export default (client: Client, reacord: ReacordDiscordJs): void => {
	client.on("interactionCreate", async (interaction: Interaction) => {

    if (interaction.isCommand() || interaction.isContextMenuCommand()) {
      await handleSlashCommand(client, interaction, reacord);
    }
  });
}

const handleSlashCommand = async (client: Client, interaction: CommandInteraction, reacord: ReacordDiscordJs): Promise<void> => {
  const member = interaction.member as GuildMember;
  const slashCommand = Commands.find(c => c.name === interaction.commandName);
  if (!slashCommand || !interaction.channel || !interaction.channel.isDMBased){
    reacord.ephemeralReply(interaction, <EmbedError description="An error has occurred" />);
    return;
  }
  if (interaction.member === null){
    reacord.ephemeralReply(interaction, <EmbedError description="You must be a member of this server" />);
    return;
  }
  if (slashCommand.ownerOnly === true && interaction.user.id != process.env.OWNER_ID)
    reacord.ephemeralReply(interaction, <EmbedError description="You must be the Bot Owner to run this Command" />);
  if (slashCommand.adminOnly === true && !member.permissions.has(PermissionsBitField.Flags.Administrator))
    reacord.ephemeralReply(interaction, <EmbedError description="You must be a Server Admin to run this Command" />);

  slashCommand.run(client, interaction, reacord);
};