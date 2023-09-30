import { CommandInteraction, Client, GuildMember } from "discord.js";
import { Command } from "../../types";
import { ReacordDiscordJs } from "reacord";
import { EmbedError, EmbedMessage } from "../../components/Embed";
import React from "react";
import { LavalinkManager } from "lavalink-client/dist/types";



export const Stop: Command = {
  adminOnly: false,
  ownerOnly: false,
  category: 6,
  name: 'stop',
  description: 'Stops the Music',
  run: async (client: Client, interaction: CommandInteraction, reacord: ReacordDiscordJs, lavalink: LavalinkManager) => {
    if(!interaction.guildId) return;
    const vcId = (interaction.member as GuildMember)?.voice?.channelId;
    const player = lavalink.getPlayer(interaction.guildId);
    if(!player) return reacord.ephemeralReply(interaction, <EmbedError description="I'm not connected" />);
    
    // example to apply a filter!
    await player.destroy(`${interaction.user.username} stopped the Player`);

    // and it is good again!
    reacord.reply(interaction, <EmbedMessage title="Stopped the player" /> );
  },
};