const { Events, Collection, PermissionsBitField } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
    
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

    if (command.ownerOnly === true && interaction.user.id != 249288094233133059n)
      return interaction.reply({ content: "This command can only be used by the bot owner.", ephemeral: true });

    if (command.adminOnly === true && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator))
      return interaction.reply({ content: "This command can only be used by the server admins.", ephemeral: true });

    if (command.modOnly === true) {
      const db = interaction.client.database;
      const modRoleId = db.collection('guilds').doc(interaction.guild.id);
      const modRole = await modRoleId.get();
      if (!modRole.exist) {
        return interaction.reply({ content: 'No modrole set. If you are an admin, run /modrole', ephemeral: true });
      } else if (!interaction.user.roles.cache.has(modRole) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
        return interaction.reply({ content: 'This command can only be used by server moderators', ephemeral: true });
      } else return
    }
    
    const { cooldowns } = interaction.client;

    if (!cooldowns.has(command.data.name)) {
      cooldowns.set(command.data.name, new Collection());
    }
  
    const now = Date.now();
    const timestamps = cooldowns.get(command.data.name);
    const defaultCooldownDuration = 3;
    const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;
  
    if (timestamps.has(interaction.user.id)) {
      const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
  
      if (now < expirationTime) {
        const expiredTimestamp = Math.round(expirationTime / 1000);
        return interaction.reply({ content: `Please wait, you are on a cooldown for \`${command.data.name}\`. You can use it again <t:${expiredTimestamp}:R>.`, ephemeral: true });
      }
    }
  
    timestamps.set(interaction.user.id, now);
    setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(`Error executing ${interaction.commandName}`);
			console.error(error);
		}
	},
};