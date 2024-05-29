const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Bir üyeyi sunucudan at')
    .addUserOption(option =>
      option.setName('uye')
        .setDescription('Atılacak üye')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('sebep')
        .setDescription('Atılma sebebi')
        .setRequired(false)), // Burada düzeltme yapıldı
  async execute(interaction) {
    const member = interaction.options.getMember('uye');
    const reason = interaction.options.getString('sebep') || 'Sebep belirtilmedi';

    if (!member.kickable) {
      return interaction.reply('Bu üyeyi atamıyorum, yetkilerimi kontrol et!');
    }

    await member.kick(reason);
    await interaction.reply(`${member.displayName} adlı kullanıcı \`${reason}\` sebebiyle sunucudan atıldı.`);
  },
};
