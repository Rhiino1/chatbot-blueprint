// const command = require('./command');
let list = [];
let commandList = {
    'titulo': {
        name: 'titulo',
        alias: ['changeTitle', 'cambiarTitulo'],
        permissionLevel: 'modUp',
        action: null,
        active: true,
        timerA: false,
        timer: null,
        params: ['titulo', '-e'],
        time: null,
        note: 'cambia el titulo del stream al nombre brindado',
        last_invoc: Date.now(),
        cd: 5000,
        text: ''
    },
    'juego': {
        name: 'juego',
        alias: ['changeGame', 'cambiarjuego', 'cambiarGame', 'changejuego'],
        permissionLevel: 'modUp',
        action: null,
        active: true,
        timerA: false,
        timer: null,
        params: ['game', '-e'],
        time: null,
        note: 'cambia el juego al nombre brindado',
        last_invoc: Date.now(),
        cd: 5000,
        text: ''
    },
    'siguiente': {
        name: 'siguiente',
        alias: ['change', 'siguenterun'],
        permissionLevel: 'modUp',
        action: null,
        active: true,
        timerA: false,
        timer: null,
        params: ['-b', '-m', '-e'],
        time: null,
        note: 'cambia el juego y titulo dado un horaro. params: -b: retrocede en uno el juego y titulo dado un horario. -m: coloca la programación manualmente dado el numero de ella.',
        last_invoc: Date.now(),
        cd: 5000, //15000
        text: ''
    },
    'list': {
        name: 'list',
        alias: ['comandos', 'commandsList', 'listaCom', 'lista'],
        permissionLevel: 'else',
        action: null,
        active: false,
        timerA: false,
        timer: null,
        params: null,
        time: null,
        note: 'muestra la lista de comandos actual.',
        last_invoc: Date.now(),
        cd: 15000,
        text: 'Lista de comandos disponibles: !horario, !coms, !info, !runner, !redes, !discord, !hashtag, !twitter, !categoria, !glosario, !estimado, !wr'
    },
    'runner': {
        name: 'runner',
        alias: ['runners', 'jugador', 'jugadores', 'player', 'players'],
        permissionLevel: 'else',
        action: null,
        active: true,
        timerA: false,
        timer: null,
        params: ['-e'],
        time: null,
        note: 'muestra el runner actual.',
        last_invoc: Date.now(),
        cd: 15000,
        text: 'Runner/s: '
    },
    'coms': {
        name: 'coms',
        alias: ['comentaristas', 'comentario', 'comentarista'],
        permissionLevel: 'else',
        action: null,
        active: true,
        timerA: false,
        timer: {
            'intervalTimer': null,
            async initTimer(timer, client) {
                if (timer.timerA) {
                    return 'True';
                } else {
                    timer.timerA = true;
                    this.intervalTimer = setInterval(() => {
                        client.say(process.env.CHANNEL_NAME, timer.text);
                    }, timer.time);
                    console.log(`set timer ${timer.name}`)
                }
            },
            async clearTimer(timer) {
                if (this.intervalTimer) {
                    clearInterval(this.intervalTimer)
                    console.log(`clear timer ${timer.name}`);
                    timer.timerA = false;
                    return true;
                }
                console.log(`Error clearing timer ${timer.name}`);
                return false;
            },
            async refreshTimer(timer, client) {
                if (timer.timerA) {
                    this.intervalTimer.refresh()
                } else {
                    this.clearTimer(this.intervalTimer)
                    this.initTimer(timer, client)
                }
                timer.timerA = true;
                console.log(`timer refreshed ${timer.name}`);
            },
            async resetTimer(timer, time, client) {
                if (time < (120 * 60000))
                    time.time = time;
                if (timer.timerA) {
                    this.clearTimer(this.intervalTimer)
                    this.initTimer(timer, client)
                } else {
                    this.initTimer(timer, client)
                }
                timer.timerA = true;
                console.log(`timer reseted ${timer.name}`);
            }
        },
        params: ['-t', '-e'],
        time: 35 * 60000,
        note: 'cada 35 minutos muestra comentaristas actuales',
        last_invoc: Date.now(),
        cd: 5000,
        text: `Comentaristas: `
    },
    'redes': {
        name: 'redes',
        alias: ['social'],
        permissionLevel: 'else',
        action: null,
        active: true,
        timerA: false,
        timerTemp: null,
        timer: {
            'intervalTimer': null,
            async initTimer(timer, client) {
                if (timer.timerA) {
                    return 'True';
                } else {
                    timer.timerA = true;
                    this.intervalTimer = setInterval(() => {
                        client.say(process.env.CHANNEL_NAME, timer.text);
                    }, timer.time);
                    console.log(`set timer ${timer.name}`)
                }
            },
            async clearTimer(timer) {
                if (this.intervalTimer) {
                    clearInterval(this.intervalTimer)
                    console.log(`clear timer ${timer.name}`);
                    timer.timerA = false;
                    return true;
                }
                console.log(`Error clearing timer ${timer.name}`);
                return false;
            },
            async refreshTimer(timer, client) {
                if (timer.timerA) {
                    this.intervalTimer.refresh()
                } else {
                    this.clearTimer(this.intervalTimer)
                    this.initTimer(timer, client)
                }
                timer.timerA = true;
                console.log(`timer refreshed ${timer.name}`);
            },
            async resetTimer(timer, time, client) {
                if (time < (120 * 60000))
                    time.time = time;
                if (timer.timerA) {
                    this.clearTimer(this.intervalTimer)
                    this.initTimer(timer, client)
                } else {
                    this.initTimer(timer, client)
                }
                timer.timerA = true;
                console.log(`timer reseted ${timer.name}`);
            }
        },
        params: ['-t'],
        time: 80 * 60000,
        note: 'cada 45 minutos muestra las redes sociales de SRE',
        last_invoc: Date.now(),
        cd: 5000,
        text: 'Recuerda seguirnos en nuestras redes sociales para estar al tanto del evento y futuros eventos realizados por la comunidad - Twitter: https://twitter.com/speedrunespanol - Discord: https://discord.gg/4hrfa25 - Youtube: https://www.youtube.com/channel/UCHnjAF0-ZNCHWKqxzdfh0sw'
    },
    'discord': {
        name: 'discord',
        alias: ['disc'],
        permissionLevel: 'else',
        action: null,
        active: true,
        timerA: false,
        timer: {
            'intervalTimer': null,
            async initTimer(timer, client) {
                if (timer.timerA) {
                    return 'True';
                } else {
                    timer.timerA = true;
                    this.intervalTimer = setInterval(() => {
                        client.say(process.env.CHANNEL_NAME, timer.text);
                    }, timer.time);
                    console.log(`set timer ${timer.name}`)
                }
            },
            async clearTimer(timer) {
                if (this.intervalTimer) {
                    clearInterval(this.intervalTimer)
                    console.log(`clear timer ${timer.name}`);
                    timer.timerA = false;
                    return true;
                }
                console.log(`Error clearing timer ${timer.name}`);
                return false;
            },
            async refreshTimer(timer, client) {
                if (timer.timerA) {
                    this.intervalTimer.refresh()
                } else {
                    this.clearTimer(this.intervalTimer)
                    this.initTimer(timer, client)
                }
                timer.timerA = true;
                console.log(`timer refreshed ${timer.name}`);
            },
            async resetTimer(timer, time, client) {
                if (time < (120 * 60000))
                    time.time = time;
                if (timer.timerA) {
                    this.clearTimer(this.intervalTimer)
                    this.initTimer(timer, client)
                } else {
                    this.initTimer(timer, client)
                }
                timer.timerA = true;
                console.log(`timer reseted ${timer.name}`);
            }
        },
        params: ['-t'],
        time: 65 * 60000,
        note: 'cada 65 minutos muestra el enlace al discord de SRE',
        last_invoc: Date.now(),
        cd: 5000,
        text: '¡Entra al Discord de la comunidad! http://www.discord.gg/SRE'
    },
    'horario': {
        name: 'horario',
        alias: ['horarios', 'horaro', 'schedule', 'bracket', 'brackets'],
        permissionLevel: 'else',
        action: null,
        active: true,
        timerA: false,
        timer: {
            'intervalTimer': null,
            async initTimer(timer, client) {
                if (timer.timerA) {
                    return 'True';
                } else {
                    timer.timerA = true;
                    this.intervalTimer = setInterval(() => {
                        client.say(process.env.CHANNEL_NAME, timer.text);
                    }, timer.time);
                    console.log(`set timer ${timer.name}`)
                }
            },
            async clearTimer(timer) {
                if (this.intervalTimer) {
                    clearInterval(this.intervalTimer)
                    console.log(`clear timer ${timer.name}`);
                    timer.timerA = false;
                    return true;
                }
                console.log(`Error clearing timer ${timer.name}`);
                return false;
            },
            async refreshTimer(timer, client) {
                if (timer.timerA) {
                    this.intervalTimer.refresh()
                } else {
                    this.clearTimer(this.intervalTimer)
                    this.initTimer(timer, client)
                }
                timer.timerA = true;
                console.log(`timer refreshed ${timer.name}`);
            },
            async resetTimer(timer, time, client) {
                if (time < (120 * 60000))
                    time.time = time;
                if (timer.timerA) {
                    this.clearTimer(this.intervalTimer)
                    this.initTimer(timer, client)
                } else {
                    this.initTimer(timer, client)
                }
                timer.timerA = true;
                console.log(`timer reseted ${timer.name}`);
            }
        },
        params: ['-t'],
        time: 42 * 60000,
        note: 'cada 42 minutos muestra el enlace al horario',
        last_invoc: Date.now(),
        cd: 5000,
        text: `Horario: ${process.env.HORARIO_LINK}`
    },
    'hashtag': {
        name: 'hashtag',
        alias: [''],
        permissionLevel: 'else',
        action: null,
        active: false,
        timerA: false,
        timer: {
            'intervalTimer': null,
            async initTimer(timer, client) {
                if (timer.timerA) {
                    return 'True';
                } else {
                    timer.timerA = true;
                    this.intervalTimer = setInterval(() => {
                        client.say(process.env.CHANNEL_NAME, timer.text);
                    }, timer.time);
                    console.log(`set timer ${timer.name}`)
                }
            },
            async clearTimer(timer) {
                if (this.intervalTimer) {
                    clearInterval(this.intervalTimer)
                    console.log(`clear timer ${timer.name}`);
                    timer.timerA = false;
                    return true;
                }
                console.log(`Error clearing timer ${timer.name}`);
                return false;
            },
            async refreshTimer(timer, client) {
                if (timer.timerA) {
                    this.intervalTimer.refresh()
                } else {
                    this.clearTimer(this.intervalTimer)
                    this.initTimer(timer, client)
                }
                timer.timerA = true;
                console.log(`timer refreshed ${timer.name}`);
            },
            async resetTimer(timer, time, client) {
                if (time < (120 * 60000))
                    time.time = time;
                if (timer.timerA) {
                    this.clearTimer(this.intervalTimer)
                    this.initTimer(timer, client)
                } else {
                    this.initTimer(timer, client)
                }
                timer.timerA = true;
                console.log(`timer reseted ${timer.name}`);
            }
        },
        params: ['-t'],
        time: 33 * 60000,
        note: 'cada 33 minutos muestra el hashtag usado en twitter para el evento',
        last_invoc: Date.now(),
        cd: 5000,
        text: '¡No olvides dar Follow al canal, y compartir en Twitter bajo el hashtag #ESA2021Espanol!'
    },
    'info': {
        name: 'info',
        alias: ['informacion', 'informaciones', 'information'],
        permissionLevel: 'else',
        action: null,
        active: true,
        timerA: false,
        timer: {
            'intervalTimer': null,
            async initTimer(timer, client) {
                if (timer.timerA) {
                    return 'True';
                } else {
                    timer.timerA = true;
                    this.intervalTimer = setInterval(() => {
                        client.say(process.env.CHANNEL_NAME, timer.text);
                    }, timer.time);
                    console.log(`set timer ${timer.name}`)
                }
            },
            async clearTimer(timer) {
                if (this.intervalTimer) {
                    clearInterval(this.intervalTimer)
                    console.log(`clear timer ${timer.name}`);
                    timer.timerA = false;
                    return true;
                }
                console.log(`Error clearing timer ${timer.name}`);
                return false;
            },
            async refreshTimer(timer, client) {
                if (timer.timerA) {
                    this.intervalTimer.refresh()
                } else {
                    this.clearTimer(this.intervalTimer)
                    this.initTimer(timer, client)
                }
                timer.timerA = true;
                console.log(`timer refreshed ${timer.name}`);
            },
            async resetTimer(timer, time, client) {
                if (time < (120 * 60000))
                    time.time = time;
                if (timer.timerA) {
                    this.clearTimer(this.intervalTimer)
                    this.initTimer(timer, client)
                } else {
                    this.initTimer(timer, client)
                }
                timer.timerA = true;
                console.log(`timer reseted ${timer.name}`);
            }
        },
        params: ['-t'],
        time: 50 * 60000,
        note: 'cada 50 minutos muestra la informacion del evento',
        last_invoc: Date.now(),
        cd: 5000,
        text: '¡SpeedrunsEspañol nos trae Juegos Horribles Hechos Deprisa 2! La maratón de juegos awful donde runners de la comunidad enseñarán como podemos sufrir divirtiendonos. ¡Quédate con nosotros durante estos dos días en un rato increíble!'
    },
    'donaciones': {
        name: 'donaciones',
        alias: ['donacion', 'donar', 'donate', 'donation'],
        permissionLevel: 'else',
        action: null,
        active: false,
        timerA: false,
        timer: {
            'intervalTimer': null,
            async initTimer(timer, client) {
                if (timer.timerA) {
                    return 'True';
                } else {
                    timer.timerA = true;
                    this.intervalTimer = setInterval(() => {
                        client.say(process.env.CHANNEL_NAME, timer.text);
                    }, timer.time);
                    console.log(`set timer ${timer.name}`)
                }
            },
            async clearTimer(timer) {
                if (this.intervalTimer) {
                    clearInterval(this.intervalTimer)
                    console.log(`clear timer ${timer.name}`);
                    timer.timerA = false;
                    return true;
                }
                console.log(`Error clearing timer ${timer.name}`);
                return false;
            },
            async refreshTimer(timer, client) {
                if (timer.timerA) {
                    this.intervalTimer.refresh()
                } else {
                    this.clearTimer(this.intervalTimer)
                    this.initTimer(timer, client)
                }
                timer.timerA = true;
                console.log(`timer refreshed ${timer.name}`);
            },
            async resetTimer(timer, time, client) {
                if (time < (120 * 60000))
                    time.time = time;
                if (timer.timerA) {
                    this.clearTimer(this.intervalTimer)
                    this.initTimer(timer, client)
                } else {
                    this.initTimer(timer, client)
                }
                timer.timerA = true;
                console.log(`timer reseted ${timer.name}`);
            }
        },
        params: ['-t'],
        time: 25 * 60000,
        note: 'cada 25 minutos muestra el enlace para donar al evento',
        last_invoc: Date.now(),
        cd: 5000,
        text: '¿Quieres mandar un donativo para Save The Children? El donativo mínimo son $5, y puedes dirigirlos para un incentivo o sorteo que haya en el momento. Aquí tienes el enlace: donations.esamarathon.com/bids/esa2021 , ¡no olvides añadir [SRE] al principio de tu alias para ser leído por los anfitriones en nuestra retransmisión!'
    },
    'twitter': {
        name: 'twitter',
        alias: [],
        permissionLevel: 'else',
        action: null,
        active: true,
        timerA: false,
        timer: {
            'intervalTimer': null,
            async initTimer(timer, client) {
                if (timer.timerA) {
                    return 'True';
                } else {
                    timer.timerA = true;
                    this.intervalTimer = setInterval(() => {
                        client.say(process.env.CHANNEL_NAME, timer.text);
                    }, timer.time);
                    console.log(`set timer ${timer.name}`)
                }
            },
            async clearTimer(timer) {
                if (this.intervalTimer) {
                    clearInterval(this.intervalTimer)
                    console.log(`clear timer ${timer.name}`);
                    timer.timerA = false;
                    return true;
                }
                console.log(`Error clearing timer ${timer.name}`);
                return false;
            },
            async refreshTimer(timer, client) {
                if (timer.timerA) {
                    this.intervalTimer.refresh()
                } else {
                    this.clearTimer(this.intervalTimer)
                    this.initTimer(timer, client)
                }
                timer.timerA = true;
                console.log(`timer refreshed ${timer.name}`);
            },
            async resetTimer(timer, time, client) {
                if (time < (120 * 60000))
                    time.time = time;
                if (timer.timerA) {
                    this.clearTimer(this.intervalTimer)
                    this.initTimer(timer, client)
                } else {
                    this.initTimer(timer, client)
                }
                timer.timerA = true;
                console.log(`timer reseted ${timer.name}`);
            }
        },
        params: ['-t'],
        time: 28 * 60000,
        note: 'cada 28 minutos muestra el enlace del twitter',
        last_invoc: Date.now(),
        cd: 5000,
        text: `Twitter de la comunidad: twitter.com/SpeedrunEspanol`
    },
    'feedback': {
        name: 'feedback',
        alias: [],
        permissionLevel: 'else',
        action: null,
        active: false,
        timerA: false,
        timer: null,
        params: null,
        time: null,
        note: 'muestra el discord de SRE.',
        last_invoc: Date.now(),
        cd: 5000,
        text: ''
    },
    'original': {
        name: 'original',
        alias: [],
        permissionLevel: 'else',
        action: null,
        active: false,
        timerA: false,
        timer: null,
        params: null,
        time: null,
        note: 'muestra el stream original.',
        last_invoc: Date.now(),
        cd: 5000,
        text: 'Puedes ver la transmisión original aquí: twitch.tv/esamarathon'
    },
    'wr': {
        name: 'wr',
        alias: [],
        permissionLevel: 'else',
        action: null,
        active: true,
        timerA: false,
        timer: null,
        params: null,
        time: null,
        note: 'muestra pagina de speedrun.com para hallar wr.',
        last_invoc: Date.now(),
        cd: 5000,
        text: 'Los mejores tiempos de la mayoría de los juegos los puedes encontrar en speedrun.com , utiliza el buscador que aparece en la parte superior.'
    },
    'ñ': {
        name: 'ñ',
        alias: [],
        permissionLevel: 'else',
        action: null,
        active: true,
        timerA: false,
        timer: null,
        params: null,
        time: null,
        note: 'ñ',
        last_invoc: Date.now(),
        cd: 5000,
        text: 'Ñ en el chat? ¡Mejor usen el emote! sreF'
    },
    'awful': {
        name: 'awful',
        alias: [],
        permissionLevel: 'else',
        action: null,
        active: false,
        timerA: false,
        timer: null,
        params: null,
        time: null,
        note: 'ñ',
        last_invoc: Date.now(),
        cd: 5000,
        text: 'SRE te trae la Juegos Horribles Hechos Deprisa 2: Electric Boogaloo. La segunda edición de nuestra maratón de juegos awful, llena de rarezas, juegos de calidad cuestionable, y muchas, muchas risas. Puedes postular tus juegos como runner a traves de este enlace: oengus.io/marathon/sreawful2'
    },
    'bidwar': {
        name: 'bidwar',
        alias: ['bidwars', 'apuesta', 'apuestas', 'incentivo', 'incentivos'],
        permissionLevel: 'else',
        action: null,
        active: false,
        timerA: false,
        timer: null,
        params: null,
        time: null,
        note: 'Muestra el enlace a las bidwars',
        last_invoc: Date.now(),
        cd: 5000,
        text: 'Puedes ver todos los incentivos de la ESA SUMMER2021 aquí: donations.esamarathon.com/bids/esa2021'
    },
    'estimado': {
        name: 'estimado',
        alias: [],
        permissionLevel: 'else',
        action: null,
        active: true,
        timerA: false,
        timer: null,
        params: null,
        time: null,
        note: 'Muestra el estimado de la run',
        last_invoc: Date.now(),
        cd: 5000,
        text: `Estimado: `
    },
    'categoria': {
        name: 'categoria',
        alias: ['categoría', 'categorías', 'categorias', 'category'],
        permissionLevel: 'else',
        action: null,
        active: true,
        timerA: false,
        timer: null,
        params: null,
        time: null,
        note: 'Muestra la cateogoría actual',
        last_invoc: Date.now(),
        cd: 5000,
        text: `Categoría: `
    },
    'glosario': {
        name: 'glosario',
        alias: [],
        permissionLevel: 'else',
        action: null,
        active: true,
        timerA: false,
        timer: null,
        params: null,
        time: null,
        note: 'Muestra el enlace a el glosario',
        last_invoc: Date.now(),
        cd: 5000,
        text: 'Aquí encontrarás el glosario del speedrunning: www.speedrunslive.com/faq/glossary/sp/'
    },
};

function commandsNames() {
    commandList.forEach(command => {
        if (command.active === true)
            list.push(command.name);
    });
    return list;
}

function getCommandList() {
    let commands = []
    commandListArray.forEach(command => {
        let temp = {
            'name': null,
            'note': null,
            'permissionLevel': null,
            'active': null,
        }
        temp.name = `!${command.name}`
        temp.note = command.note
        temp.permissionLevel = command.permissionLevel
        temp.active = command.active
        commands.push(temp)
        // commands.push()
    })
    return commands
}

const commandListArray = Object.values(commandList);

const timersActive = ['discord', 'redes']
// const timersActive = []

const commandsUsed = ['!runner', '!coms', '!redes', '!discord', '!horario', '!hashtag', '!info', '!wr', '!estimado', '!categoria', '!glosario']

module.exports = {
    commandList,
    commandsNames,
    commandListArray,
    timersActive,
    getCommandList,
    commandsUsed
};