exports.run = (client, message, args) => {
    const Discord = require('discord.js')
    var embed = new Discord.RichEmbed()
    .setTitle('Pong!')
    .setDescription(`Latency **${client.ping}ms**`)
    .setColor('RANDOM')
    .setFooter('ML Tutorials', client.user.avatarURL)
    message.channel.send(embed)
}
exports.help = {
    name: 'ping'
}