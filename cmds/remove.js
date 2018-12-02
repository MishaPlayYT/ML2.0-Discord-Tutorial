exports.run = (client, message, args) => {
    const Discord = require('discord.js')
    if(!message.guild.me.permissions.has('ADMINISTRATOR')) {
        message.reply('У меня нет прав на это :(((')
    }
    var args1 = message.content.split(' ')
    var rolename = args1[2]
    var user = message.mentions.members.first()
    if(!rolename) {
        message.reply('Укажите название роли.')
    }
    if(!user) {
        message.reply('Укажите пользователя.')
    }
    var role = message.guild.roles.find('name', rolename)
    if(!role) {
        message.reply('Роль не найдена.')
    }
    message.guild.member(user).removeRole(role).then(r => {
        message.reply(`У **${user.user.tag}** была убрана роль **${rolename}**`)
    })
    
}
exports.help = {
    name: 'remove'
}