const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rastgele-emoji')
    .setDescription('Sunucudaki rastgele bir emojiyi gönder'),
  async execute(interaction) {
    const emojis = interaction.guild.emojis.cache;
    if (!emojis.size) return interaction.reply('Sunucuda emoji bulunamadı!');

    const randomEmoji = emojis.random();
    await interaction.reply(`${randomEmoji}`);
  },
};
