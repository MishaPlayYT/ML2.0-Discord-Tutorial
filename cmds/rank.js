const Discord = require('discord.js')
exports.run = (client, message, args) => {
    const xp = require('../xp.json')
    var user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args1[1]) || message.guild.member(message.author)
    if(!xp[user.id]) {
        xp[user.id] = {
            level: 1,
            xp: 0
        }
    }
    var currentLevel = xp[user.id].level
    var currentXp = xp[user.id].xp
    var nextLevel = xp[user.id].level * 100;
    var xpToNextLevel = (currentLevel * 100) - currentXp
    var userlevel = xp[user.id].level
    var userxp = xp[user.id].xp
    var embed = new Discord.RichEmbed()
    .setAuthor(user.username, user.avatarURL)
    .addField('Уровень', userlevel, true)
    .addField('Опыт', userxp, true)
    .addField('Опыта до следующего уровня', xpToNextLevel, true)
    .setColor('RANDOM')
    .setFooter('XP System | ML 2.0', client.user.avatarURL)
    message.channel.send(embed)
}
exports.help = {
    name: 'rank', 
}