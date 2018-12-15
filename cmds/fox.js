const Discord = require('discord.js')
const sa = require('superagent')
exports.run = async (client, message, args) => {
    var {body} = await sa.get(`https://randomfox.ca/floof/`)
    var fox = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setImage(body.image)
    message.channel.send(fox)
}
exports.help = {
    name: 'fox'
}