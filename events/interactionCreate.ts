import { CommandInteraction, Client, Interaction, PermissionsBitField } from "discord.js";
import { Commands } from "../Commands"

export default (client: Client): void => {
	client.on("interactionCreate", async (interaction: Interaction) => {

    if (interaction.isCommand() || interaction.isContextMenuCommand()) {
      await handleSlashCommand(client, interaction);
    }
  });
}

const handleSlashCommand = async (client: Client, interaction: CommandInteraction): Promise<void> => {
  const slashCommand = Commands.find(c => c.name === interaction.commandName);
  if (!slashCommand) {
    interaction.followUp({ content: "An error has occurred" });
    return;
  }
  let userId = interaction.user.id;
  // @ts-ignore
  if (slashCommand.ownerOnly === true && userId != 249288094233133059n)
    interaction.followUp({ content: "You must be the Bot Owner to run this Command" });
  // @ts-ignore
  if (slashCommand.adminOnly === true && !interaction.member?.permissions.has(PermissionsBitField.Flags.Administrator))
    interaction.followUp({ content: "You must be a Server Admin to run this Command" });

  await interaction.deferReply({ ephemeral: false });

  slashCommand.run(client, interaction);
};