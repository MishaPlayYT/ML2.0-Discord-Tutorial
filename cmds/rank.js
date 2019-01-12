const Discord = require('discord.js')
exports.run = (client, message, args) => {
    const db = require('quick.db')
    var args1 = message.content.split(' ')
    var user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args1[1]) || message.guild.member(message.author)
    var currentLevel = db.fetch(`level_${user.id}.level`)
    var currentXp = db.fetch(`level_${user.id}.xp`)
    var nextLevel = currentLevel * 100;
    var xpToNextLevel = (currentLevel * 100) - currentXp
    var embed = new Discord.RichEmbed()
    .setAuthor(user.user.username, user.user.avatarURL)
    .addField('Уровень', currentLevel, true)
    .addField('Опыт', currentXp, true)
    .addField('Опыта до следующего уровня', xpToNextLevel, true)
    .setColor('RANDOM')
    .setFooter('XP System | ML 2.0', client.user.avatarURL)
    message.channel.send(embed)
}
exports.help = {
    desc: "Показывает ваш уровень",
    usage: "rank @User",
    group: 'general',
    guildOnly: false,
    enabled: true,
    owner: false,
    name: 'rank', 
}