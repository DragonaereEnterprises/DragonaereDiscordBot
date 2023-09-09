const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('coinflip')
    .setDescription('Flip a coin'),
    async execute(interaction) {
        function generateResponse() {
            let flipVariable = Math.random();
            if (flipVariable < .5) {
                return 'Heads'
            }
            else {
                return 'Tails'
            }
        }
        await interaction.reply({ content : `${generateResponse()}`});
    }
};