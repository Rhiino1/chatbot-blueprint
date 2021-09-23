const commands = require('../comManager/commandList');

function commandManag(client, send) {
    client.on('message', async (channel, tags, message, self, reply) => {
        if(message === 'agente 3'){
            if(tags.badges && tags.badges.moderator){
                client.say(channel, 'Lucha... ¿Dónde se ha metido?')
                return;
            }
        };

        if(message === 'gasre'){
            if(tags.badges && tags.badges.moderator){
                client.say(channel, 'Gracias a SpeedrunEspañol los streams han sido optimizados de una manera formidable, haciendo que las maratones hayan sido más y más constantemente, ha puesto al servicio strats complicadas pero atractivas de ver, seguro nos dará un gran espectáculo con una demostración más compleja de los speedruns')
                return;
            }
        };

        if (self || !message.startsWith('!')) return;
        const args = message.slice(1).split(' ');
        const commandName = args.shift().toLowerCase();
        const command = commands.commandListArray.find(n => n.name === commandName || n.alias.includes(commandName));
        if (!command) {
            return;
        }
        command.action = require(`./commands/${command.name}Com`);

        const isBroadcaster = tags.badges && tags.badges.broadcaster;
        const isMod = tags.badges && tags.badges.moderator;
        const isSub = tags.badges && (tags.badges.subscriber || tags.badges.founder);
        const modUp = isMod || isBroadcaster;
        const permissions = {
            broadUp: isBroadcaster || modUp,
            modUp,
            subUp: isSub || modUp,
            else: true
        }
        console.log(permissions);

        if (!permissions[command.permissionLevel] || !command.active) return;
        reply = msg => client.say(channel, msg);
        try {
            if(Date.now() - (command.last_invoc+command.cd) > 0){
                if (!send) {
                    command.cooldown = true;
                    command.last_invoc = Date.now();
                    return await command.action({ channel, tags, message, args, reply });
                }
            }else{
                let timecd = Math.ceil(Math.abs(Date.now() - (command.last_invoc+5000))/1000);
                return;
            }
        } catch (err) {
            return console.error(err);
        }
    })
}


module.exports = {commandManag, commands};
