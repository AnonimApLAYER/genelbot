const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('yardım')
    .setDescription('Tüm komutları listeler'),
  async execute(interaction) {
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    const commandList = commandFiles.map(file => {
      const command = require(`./${file}`);
      return `\`${command.data.name}\`: ${command.data.description}`;
    });

    await interaction.reply(`Komutlar:\n${commandList.join('\n')}`);
  },
};
