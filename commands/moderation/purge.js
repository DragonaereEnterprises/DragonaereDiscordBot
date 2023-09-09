const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  modRole: true,
  data: new SlashCommandBuilder()
    .setName('purge')
    .setDescription('Clear the chat of a defined ammount of messages')
    .addIntegerOption(option => option
      .setName('number')
      .setDescription('How many Messages Should be Deleted')
      .setRequired(true)
    ),
    async execute(interaction) {
      await interaction.channel.bulkDelete(interaction.options.getInteger('number'));
      await interaction.reply({ content : `Purged ${interaction.options.getInteger('number')}`, ephemeral: true });
    }
};