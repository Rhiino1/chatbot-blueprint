let coms = require('../commandList');
const axios = require('../../../settings/request');
let text = ``;
module.exports = async({channel, tags, message, args, reply}) =>{

    const com = message.split(' ');
    //console.log(com[0].substring(1,com[0].length));
    const command = coms.commandListArray.find(n => n.name === com[0].substring(1,com[0].length) || n.alias.includes(com[0].substring(1,com[0].length)));
    text = command['text'];
    const params = {
        comSec: com[1],
        paramSec: com[2]
    };
    switch (params['comSec']) {
        case '-t':{
            if(command.time === null){
                return reply(text);
            }else{
                if(command.timerA === true){
                    command.timer.clearTimer(command)
                    command.timerA = false;
                    if(coms.timersActive.indexOf(command.name) !== -1){
                        coms.timersActive.splice(coms.timersActive.indexOf(command.name), 1);
                    }
                    return reply(`Se ha detenido el timer.`);
                }else{
                    command.timerA = true;
                    command.timer.intervalTimer = setInterval(() => {
                        reply(text);
                        console.log(`set timer ${command.name}`)
                    }, command.time);
                }
            }
            break;
        }case '-e':{
            if (tags.mod === true || tags['display-name'] === axios.channelName) {
                text = message.substring(com[0].length+com[1].length+2);
                return reply(`Se ha modificado el comando !${command.name}`);
            }
            break;
        }

        default: {
            command.timer.clearTimer(command);
            command.timerA = true;
            reply(text);
            command.timer.intervalTimer = setInterval(() => {
                reply(text);
                console.log(`set timer ${command.name}`)
            }, command.time);
            break;
        }
    }
}
