const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  adminOnly: true,
  data: new SlashCommandBuilder()
    .setName('checknsfw')
    .setDescription('Check the Servers NSFW Level'),
    async execute(interaction) {
      const nsfwLevel = interaction.guild.nsfwLevel;
      const nsfwLevelName = ["Default", "Explicit", "Safe", "Age Restricted"];
      await interaction.reply({ content : `NSFW Level: ${nsfwLevelName[nsfwLevel]}`, ephemeral: true });
    }
};