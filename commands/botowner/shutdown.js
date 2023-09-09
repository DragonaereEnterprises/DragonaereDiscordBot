const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  ownerOnly: true,
  data: new SlashCommandBuilder()
    .setName('shutdown')
    .setDescription('Shuts the bot down'),
  async execute(interaction) {
    await interaction.reply({ content: 'Shutting Down...', ephemeral: true });

    process.exit();
  }
};