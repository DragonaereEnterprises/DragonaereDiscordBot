const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  adminOnly: true,
  data: new SlashCommandBuilder()
    .setName('modrole')
    .setDescription('Set or change the servers mod role')
    .addRoleOption(option => option
      .setName('role')
      .setDescription('Select the Mod Role')
      .setRequired(true)
    ),
    async execute(interaction) {
      const db = interaction.client.database;
      const setGuildModRole = db.collection('guilds').doc(interaction.guild.id);
      const modRole = interaction.options.getRole('role');

      await setGuildModRole.set({'modRoleId': modRole.id}, { merge: true });

      await interaction.reply({ content : `Set ${modRole.name} as the Mod Role`, ephemeral: true });
    }
};