import { CommandInteraction, Client, Interaction, PermissionsBitField } from "discord.js";
import { Commands } from "../Commands"
import { ReacordDiscordJs } from "reacord";
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
  const slashCommand = Commands.find(c => c.name === interaction.commandName);
  if (!slashCommand || !interaction.channel || !interaction.channel.isDMBased){
    reacord.reply(interaction, "An error has occurred");
    return;
  }
  if (interaction.member === null){
    reacord.reply(interaction, "You must be a member of this server");
    return;
  }
  if (slashCommand.ownerOnly === true && interaction.user.id != process.env.OWNER_ID)
    reacord.reply(interaction, "You must be the Bot Owner to run this Command");
    // @ts-expect-error
  if (slashCommand.adminOnly === true && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator))
    reacord.reply(interaction, "You must be a Server Admin to run this Command");

  slashCommand.run(client, interaction, reacord);
};