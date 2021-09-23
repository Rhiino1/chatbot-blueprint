const tmi = require('tmi.js');
const opts = require('./opts');
const manager = require('../controller/comManager/commandManager');
const timer = require('../controller/comManager/timers');

// //tmi --- Creating client
const client = new tmi.client(opts);
const send = false;

async function start() {
  try {
    manager.commandManag(this.client, send);
    await client.connect().then(async (addres, port) => {});
    // timer.prueba();
    await timer.setTimers(client);
  } catch (error) {
    console.log('Error trying to connect ', error);
    return false;
  }
  return true;
}

async function stop() {
  await client.disconnect().then(async (data) =>{
    await timer.clearTimers()
    // await timer.detenerPrueba();
    return true;
  }).catch((error) =>{
    return false;
  })
}

function onConnectedHandler(target, sender, msg, self, reply) {
  if (self) {
    return;
  } //Ignorar mensajes del bot.
  // timer.setTimers(client); //Llama funcion de timers y los inicializa
}

function onMessageHandler(target, sender, msg, self) {
  if (self) {
    return;
  } //Ignorar mensajes del bot.
}

module.exports = {client, start, stop};