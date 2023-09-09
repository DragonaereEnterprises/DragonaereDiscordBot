const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('diceroll')
    .setDescription('Roll a Die'),
    async execute(interaction) {
      function generateResponse() {
        let numberReturned = Math.floor(Math.random()*6)+1;
        return numberReturned
      }
      await interaction.reply({ content: `**${generateResponse()}**` });
    }
};