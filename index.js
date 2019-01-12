const Discord = require('discord.js')
const client = new Discord.Client();
const fs = require('fs')
const {TOKEN} = require('./config') // Создайте файл config.js в папке с ботом и напишите exports.TOKEN = 'Токен вашего бота.'
const xp = require('./xp.json')
const db = require('quick.db')
client.on('message', async (message) => {
    if(message.channel.type === 'dm') return;
    if(message.author.bot) return;
    let addxp = Math.floor(Math.random() * 10) + 5
    if(db.has(`level_${message.author.id}.xp`)) {
        db.add(`level_${message.author.id}.xp`, addxp)
    } else {
        db.set(`level_${message.author.id}.xp`, addxp)
    }
    if(!db.has(`level_${message.author.id}.level`)) {
        db.set(`level_${message.author.id}`, 1)
    }
    var xp = db.fetch(`level_${message.author.id}.xp`)
    var level = db.fetch(`level_${message.author.id}.level`)
    var currentLevel = level
    var currentXp = xp
    var nextLevel = level * 100;
    if(nextLevel <= xp) {
        await db.add(`level_${message.author.id}.level`, 1)
        var levelUpEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setDescription(`Поздравляю!\nВы получили ${currentLevel + 1} уровень!`)
        .setColor('RANDOM')
        .setFooter('XP System | ML 2.0', client.user.avatarURL)
        message.channel.send(levelUpEmbed)
    }
})
client.login(TOKEN)
client.owner = '291568379423096832';
client.on('ready', () => {
    console.log('[START] Launched.')
    client.user.setActivity('ML tutorials', {type: 'WATCHING'})
})
client.on('guildMemberAdd', member => {
    var channel = member.guild.channels.get('509568629243641868')
    channel.send(`Поприветствуем нового участника ${member} на сервере ${member.guild.name}`)
    member.send(`Добро пожаловать на наш сервер!`)
})
client.on('guildMemberRemove', member => {
    var channel = member.guild.channels.get('509568629243641868')
    channel.send(`Прощай ${member.user.tag} с нащего сервера :(`)
})
client.on('messageDelete', message => {
    if(message.author.bot) return;
    var channel = message.guild.channels.get('509568629243641868')
    var embed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription(`**Удалено сообщение**\nСодержание: ${message.content}\nID: ${message.id}`)
    .setColor('RANDOM')
    .setFooter('ML 2.0', client.user.avatarURL)
    channel.send(embed)
}) 
client.on('messageUpdate', (oldm, newm) => {
    if(oldm.author.bot) return;
    var channel = oldm.guild.channels.get('509568629243641868')
    var embed1 = new Discord.RichEmbed()
    .setAuthor(oldm.author.username, oldm.author.avatarURL)
    .setDescription(`**Сообщение изменено**\nДо: ${oldm.content}\nПосле: ${newm.content}`)
    .setColor('RANDOM')
    .setFooter('ML 2.0', client.user.avatarURL)
    channel.send(embed1)
})
client.prefix = '?'
client.commands = new Discord.Collection();
fs.readdir('./cmds/', (err, files) => {
    if(err) console.log(err)
    let jsfiles = files.filter(f => f.split('.').pop() === 'js');
    if(jsfiles.length <= 0) {
        console.log('No commands!')
        return
    }
    console.log(`[COMMANDS] Loaded ${files.length} commands!`)
    jsfiles.forEach(f => {
        let props = require(`./cmds/${f}`)
        client.commands.set(props.help.name, props);
    })
})
client.on('guildCreate', guild => {
    db.set(`guild_${guild.id}`, {
        prefix: '?'
    })
})
client.on('message', message => {
    if(message.channel.type === 'dm') return;
    if(!db.has(`guild_${message.guild.id}.prefix`)) {
        db.set(`guild_${message.guild.id}`, {
            prefix: '?'
        })
    }
    var prefix = db.fetch(`guild_${message.guild.id}.prefix`)
    let msg = message.content.toLowerCase() || message.content.toUpperCase()
    if(!msg.startsWith(prefix)) return;
    if(message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    let command = args.shift().toLowerCase();
    let cmd;
    if(client.commands.has(command)) {
        cmd = client.commands.get(command) 
    }
    if(!cmd) return;
    if(cmd.help.enabled === false) {
        return
    }
    if(cmd.help.owner && message.author.id !== client.owner) {
        message.reply('У вас нет прав!')
        return
    }
    cmd.run(client, message, args)
})
