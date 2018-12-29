exports.run = (client, message, args) => {
    function stop(channel) {
        channel.send('Остановка...').then(msg => {msg.delete(5000)})
        .then(msg => client.destroy())
    }
    stop(message.channel)
    message.delete()
}
exports.help = {
name: 'stop',
}