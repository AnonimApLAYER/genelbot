const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('zaman-asimi')
    .setDescription('Belirli bir üyeye zaman aşımı uygula')
    .addUserOption(option =>
      option.setName('uye')
        .setDescription('Zaman aşımı uygulanacak üye')
        .setRequired(true))
    .addIntegerOption(option =>
      option.setName('sure')
        .setDescription('Zaman aşımı süresi (dakika)')
        .setRequired(true)),
  async execute(interaction) {
    const member = interaction.options.getMember('uye');
    const duration = interaction.options.getInteger('sure');

    if (member && duration) {
      await member.timeout(duration * 60 * 1000);
      await interaction.reply(`${member.displayName} adlı kullanıcıya ${duration} dakikalık zaman aşımı uygulandı.`);
    } else {
      await interaction.reply('Kullanıcı veya süre belirtilmedi.');
    }
  },
};
