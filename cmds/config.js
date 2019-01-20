const Discord = require('discord.js')
const db = require('quick.db')
exports.run = (client, message) => {
    var prefix = db.fetch(`guild_${message.guild.id}.prefix`)
    var welcomemessage = db.fetch(`guild_${message.guild.id}.welcomemessage`)
    if(!welcomemessage) {
        db.set(`guild_${message.guild.id}.welcomemessage`, 'None')
    }
    var notificationchannel = db.fetch(`guild_${message.guild.id}.channel`)
    if(!notificationchannel) {
        db.set(`guild_${message.guild.id}.channel`, 'None')
    }
    var leavemessage = db.fetch(`guild_${message.guild.id}.leavemessage`)
    if(!leavemessage) {
        db.set(`guild_${message.guild.id}.leavemessage`, 'None')
    }
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    var args1 = message.content.toLowerCase().split(' ')
    if(!message.member.permissions.has('MANAGE_GUILD')) {
        message.reply('У вас нет прав!')
        return
    }
    var formorehelp = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setColor('RANDOM')
        .setFooter(`Config | Guild: ${message.guild.id}`, client.user.avatarURL);
    if(!args1[1]) {
        var config = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setDescription('\`guild\` - Название сервера\n\`member\` - Упоминание участника')
            .setFooter(`Config | Guild: ${message.guild.id}`, client.user.avatarURL)
            .addField('Канал Приветствий/Прощаний (setchannel)', `<#${notificationchannel}>`)
            .addField('Приветствие (setwelcome)', welcomemessage)
            .addField('Прощание (setleave)', leavemessage)
        message.channel.send(config)
    }
    if(args1[1] === 'help') {
        var confighelp = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setFooter(`Config | Guild: ${message.guild.id}`, client.user.avatarURL)
            .setDescription('\`guild\` - Название сервера\n\`member\` - Упоминание участника')
            .addField('Канал Приветствий/Прощаний (setchannel)', `Пример: \`${prefix}config setchannel #Канал|ID\``)
            .addField('Приветствие (setwelcome)', `Пример: \`${prefix}config setwelcome Сообщение_Приветствие\``)
            .addField('Прощание (setleave)', `Пример: \`${prefix}config setleave Сообщение_Прощание\``)
        message.channel.send(confighelp)
    } else if (args1[1] === 'setchannel') {
        if(args1[2] === 'reset') {
            message.reply('Вы успешно удалили канал Прощаний/Приветствий!')
            db.set(`guild_${message.guild.id}.channel`, 'None')
            return
        }
        var channel = message.mentions.channels.first() || message.guild.channels.get(args1[2])

        if(!channel) {
            message.reply('Укажите канал')
            return
        }
    if(!channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) {
        message.reply('У меня нет прав, чтобы писать в этом канале :(')
        return
    }
    var channelid = channel.id
        var setchannel = new Discord.RichEmbed()
            .addField('Канал Прощаний/Приветствий был установлен!', message.guild.channels.get(channelid))
            .setColor('RANDOM')
            .setFooter(`Config | Guild: ${message.guild.id}`)
        message.channel.send(setchannel)
        db.set(`guild_${message.guild.id}.channel`, channelid)
    } else if (args1[1] === 'setwelcome') {
        if(args1[2] === 'reset') {
            message.reply('Вы успешно удалили сообщение приветствие!')
            db.set(`guild_${message.guild.id}.welcomemessage`, 'None')
            return
        }
        var welcomemessage = args.slice(2).join(' ')

        if(!welcomemessage) {
            message.reply('Укажите сообщение приветствие!')
            return
        }
    var setwelcome = new Discord.RichEmbed()
        .addField(`Сообщение приветствие было установлено`, welcomemessage)
        .setColor('RANDOM')
        .setFooter(`Config | Guild: ${message.guild.id}`)
        message.channel.send(setwelcome)
        db.set(`guild_${message.guild.id}.welcomemessage`, welcomemessage)
    } else if (args1[1] === 'setleave') {
        if(args1[2] === 'reset') {
            message.reply('Вы успешно удалили сообщение прощание!')
            db.set(`guild_${message.guild.id}.leavemessage`, 'None')
            return
        }
        var leavemessage = args.slice(2).join(' ')

        if(!leavemessage) {
            message.reply('Укажите сообщение приветствие!')
            return
        }
        var setwelcome = new Discord.RichEmbed()
            .addField(`Сообщение прощание было установлено`, leavemessage)
            .setColor('RANDOM')
            .setFooter(`Config | Guild: ${message.guild.id}`)
        message.channel.send(setwelcome)
        db.set(`guild_${message.guild.id}.leavemessage`, leavemessage)
    }
}
exports.help = {
    name: 'config'
}