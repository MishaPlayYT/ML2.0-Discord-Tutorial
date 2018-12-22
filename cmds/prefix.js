const Discord = require('discord.js')
const db = require('quick.db')
exports.run = (client, message, args) => {
    if(!message.member.permissions.has('ADMINISTRATOR')) {
        message.reply('У вас нет прав!')
        return
    }
    var prefix = db.fetch(`guild_${message.guild.id}.prefix`)
    var args1 = message.content.toLowerCase().split(' ')
    if(!args1[1]) {
        var prefix = db.fetch(`guild_${message.guild.id}.prefix`)
        var embed = new Discord.RichEmbed()
        .setDescription('Мой префикс на этом сервере `' + prefix + '`')
        .setColor('RANDOM')
        message.channel.send(embed)
    }
    if(args1[1] === 'set') {
        var setprefix = args1[2]
        if(!setprefix) {
            message.reply('Укажите префикс.')
            return
        }
        if(setprefix.lenght > 5) {
            message.reply('Префикс не может быть больше 5 символов.')
            return
        }
        db.set(`guild_${message.guild.id}.prefix`, setprefix)
        var embed1 = new Discord.RichEmbed()
        .setDescription(`Вы установили префикс \`${setprefix}\` для этого сервера`)
        .setColor('RANDOM')
        .setFooter('ID: ' + message.guild.id, client.user.avatarURL)
        message.channel.send(embed1)
    }
}
exports.help = {
    name: 'prefix', 
}