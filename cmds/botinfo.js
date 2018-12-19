exports.run = (client, message, args) => {
    const moment = require('moment')
    const Discord = require('discord.js')
    var embed = new Discord.RichEmbed()
    .setAuthor(client.user.username, client.user.avatarURL)
    .addField('👾 Создатель', client.users.get(client.owner), true)
    .addField('✏ Название', client.user.username, true)
    .addField('📆 Создан', moment(client.user.createdAt).format('HH:MM DD-MM-YY'), true)
    .addField('🎛 Ping', Math.floor(client.ping), true)
    .setThumbnail(client.user.avatarURL)
    .addField('🛡 Discord.js', `v${Discord.version}`, true)
    .setFooter('ML 2.0', client.user.avatarURL)
    .setColor('RANDOM')
    message.channel.send(embed)
}
exports.help = {
    guildOnly: false,
    enabled: true,
    owner: false,
    name: 'botinfo'
}