exports.run = (client, message, args) => {
    if(!message.guild.me.permissions.has('KICK_MEMBERS')) {
        message.reply('У меня нет прав на это.')
        return
    }
    if(!message.member.permissions.has('KICK_MEMBERS')) {
        message.reply('У вас нет прав на это.')
        return
    }
    var kickmember = message.guild.member(message.mentions.users.first())
    if(!kickmember) {
        message.reply('Пользователь не найден\n`?kick @User Причина`')
        return
    }
    if(kickmember.permissions.has('KICK_MEMBERS')) {
        message.reply('Данный пользователь имеет права равные вам.')
        return
    }
    var reason = args.slice(1).join(' ')
    if(!reason) {
        message.reply('Укажите причину.')
        return
    }
    message.guild.members.get(kickmember.id).kick(reason)
    message.reply(`Вы успешно кикнули ${kickmember.user.tag}!`)
}
exports.help = {
    name: 'kick'
}