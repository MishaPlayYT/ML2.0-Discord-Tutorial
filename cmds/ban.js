exports.run = (client, message, args) => {
    if(!message.guild.me.permissions.has('BAN_MEMBERS')) {
        message.reply('У меня нет прав на это.')
        return
    }
    if(!message.member.permissions.has('BAN_MEMBERS')) {
        message.reply('У вас нет прав на это.')
        return
    }
    var kickmember = message.guild.member(message.mentions.users.first())
    if(!kickmember) {
        message.reply('Пользователь не найден\n`?ban @User Причина`')
        return
    }
    if(kickmember.permissions.has('BAN_MEMBERS')) {
        message.reply('Данный пользователь имеет права равные вам.')
        return
    }
    var reason = args.slice(1).join(' ')
    if(!reason) {
        message.reply('Укажите причину.')
        return
    }
    message.guild.members.get(kickmember.id).ban(reason)
    message.reply(`Вы успешно забанили ${kickmember.user.tag}!`)
}
exports.help = {
    name: 'ban'
}