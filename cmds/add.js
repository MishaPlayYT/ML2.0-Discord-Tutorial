exports.run = (client, message, args) => {
    const Discord = require('discord.js')
    if(!message.guild.me.permissions.has('ADMINISTRATOR')) {
        return message.reply('У меня нет прав на это :(((')
    }
    var args1 = message.content.split(' ')
    var rolename = args1[2]
    var user = message.mentions.members.first()
    if(!rolename) {
        return message.reply('Укажите название роли.')
    }
    if(!user) {
        return message.reply('Укажите пользователя.')
    }
    var role = message.guild.roles.find('name', rolename)
    if(!role) {
        return message.reply('Роль не найдена.')
    }
    message.guild.member(user).addRole(role).then(r => {
        message.reply(`**${user.user.tag}** была выдана роль **${rolename}**`)
    })
    
}
exports.help = {
    name: 'add'
}