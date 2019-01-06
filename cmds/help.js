const Discord = require('discord.js')
exports.run = (client, message, args) => {
    var args1 = message.content.split(' ')
    if(!client.commands.has(args1[1])) {
        var embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .addField('Главные комманды', client.commands.filter(cmd => cmd.help.group === 'general').map(cmd => `?${cmd.help.name} - ${cmd.help.desc}`).join('\n'))
        message.channel.send(embed)
    } else {
        var name = client.commands.get(args1[1]).help.name
        var desc = client.commands.get(args1[1]).help.desc
        var usage = client.commands.get(args1[1]).help.usage
        var commandinfo = new Discord.RichEmbed()
        .setColor('RANDOM')
        .addField('Название', name, true)
        .addField('Описание', desc, true)
        .addField('Использование', usage, true)
        message.channel.send(commandinfo)

    }
}
exports.help = {
name: 'help',
group: 'general',
desc: 'Показывает все комманды бота',
usage: 'help <комманда>',
}