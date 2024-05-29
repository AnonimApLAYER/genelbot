const Discord = require('discord.js');
module.exports = {
  name: 'ready',
    
  execute(client) {

const aktivitelist = [
  "Geliştiriliyorum",
  "Darkevb Code",
];

  console.log(`${client.user.tag} adıyla giriş yapıldı!`);
  let i = 0;
  setInterval(() => {
    const status = aktivitelist[i % aktivitelist.length];
    client.user.setActivity({ activities: [{ name: status }] });
  }, 8000);
}
};