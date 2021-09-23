const timers = require('./commandList');
const Timer = require('./Timer')

// const timersActive = ['coms', 'redes', 'discord', 'horario', 'hashtag', 'info', 'donaciones', 'twitter']
// const timersActive = ['discord', 'redes', 'info']
const timersActive = timers.timersActive

async function setTimers(client) {
    for await(const timer of timers.commandListArray){
        if (timersActive.includes(timer.name)) {
            if (timer.active === true) {
                timer.timer.initTimer(timer, client)
            }
        }
    }

    // setInterval(async () => {
    //     for await(const timer of timers.commandListArray){
    //         if (timersActive.includes(timer.name)) {
    //             if (timer.active === true) {
    //                 timer.timer.clearTimer(timer)
    //                 timer.timer.initTimer(timer, client)
    //             }
    //         }
    //     }
    // }, 66*60000);
}

async function clearTimers() {
    try {
        for await(const timer of timers.commandListArray){
            if(timer.timer !== null){
                if(timer.timerA){
                    if (timer.timer.intervalTimer !== null) {
                        await timer.timer.clearTimer(timer)
                    }
                }
            }
        }   
    } catch (error) {
        console.log('Error clearing timers');
    }
}

async function prueba(){
    timers.commandList['discord'].timerTemp = new Timer(function(){
        console.log('prueba discord cada 5 segundos.');
    }, 6000);
    timers.commandList['redes'].timerTemp = new Timer(function(){
        console.log('prueba redes cada 5 segundos.');
    }, 5000);
    console.log('set timer');
}

async function detenerPrueba(){
    timers.commandList['discord'].timerTemp.stop()
    timers.commandList['redes'].timerTemp.stop()
    console.log('se detuvo este timer');
}

module.exports = {setTimers, clearTimers, Timer, prueba, detenerPrueba};