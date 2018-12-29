const Discord = require('discord.js')
exports.run = (client, message, args) => {
    const {TOKEN} = require('../config')
    function restart(channel) {
        channel.send('Перезагрузка...').then(msg => {msg.delete(5000)})
        .then(msg => client.destroy()).then(() => client.login(TOKEN))
    }
    restart(message.channel)
    message.delete()
}
exports.help = {
name: 'restart',
}