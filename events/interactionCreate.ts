import { CommandInteraction, Client, Interaction, PermissionsBitField } from "discord.js";
import { Commands } from "../Commands"
import dotenv from 'dotenv';
dotenv.config();

export default (client: Client): void => {
	client.on("interactionCreate", async (interaction: Interaction) => {

    if (interaction.isCommand() || interaction.isContextMenuCommand()) {
      await handleSlashCommand(client, interaction);
    }
  });
}

const handleSlashCommand = async (client: Client, interaction: CommandInteraction): Promise<void> => {
  const slashCommand = Commands.find(c => c.name === interaction.commandName);
  if (!slashCommand || !interaction.channel || !interaction.channel.isDMBased){
    interaction.followUp({ content: "An error has occurred" });
    return;
  }
  if (interaction.member === null){
    interaction.followUp({content:"You must be a member of this server"});
    return;
  }
  if (slashCommand.ownerOnly === true && interaction.user.id != process.env.OWNER_ID)
    interaction.followUp({ content: "You must be the Bot Owner to run this Command" });
    // @ts-expect-error
  if (slashCommand.adminOnly === true && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator))
    interaction.followUp({ content: "You must be a Server Admin to run this Command" });

  await interaction.deferReply({ ephemeral: false });

  slashCommand.run(client, interaction);
};