let router = require('express').Router()
const client = require('../settings/client');
const axios = require('../settings/request');
const commandsRQ = require('../controller/comManager/commandList');

router.post('/connect', (request, response) => {
  if (connect()) {
    response.json({
      connected: 'true',
      message: 'connected successfully'
    });
  } else {
    response.json({
      connected: 'false',
      message: 'error trying to connect'
    });
  }
})

router.post('/disconnect', (request, response) => {
  if (disconnect()) {
    response.json({
      connected: 'false',
      message: 'disconnected successfully'
    });
  } else {
    response.json({
      connected: 'true',
      message: 'error trying to disconnect'
    });
  }
})

router.post('/reconnect', (request, response) => {
  if (reconnect()) {
    response.json({
      connected: 'true',
      message: 'reconnected successfully'
    });
  } else {
    response.json({
      connected: 'false',
      message: 'error trying to reconnect'
    });
  }
})

router.get('/streamInfo', (request, response) => {
  axios.kraken.get(`/channels/${process.env.CHANNEL_ID}`).then( (res) =>{
    let data = res.data;
    response.json({title: data.status, game: data.game})
  }).catch((err) =>{
    console.error(err);
    response.json({title: '', game: ''})
  })
})

router.post('/changeTitle', async (request, response) => {
  let title = request.body.title
  let ok = {};
  axios.kraken.put(`/channels/${process.env.CHANNEL_ID}?channel[status]=${encodeURIComponent(title)}`).then( async function (res) {
    ok = {title: title, message: 'ok'};
    response.json(ok)
  }).catch(function (err) {
    console.log(err);
    ok = {title: 'not changed', message: 'error'};
    response.json(ok)
  })
})

router.post('/changeCategory', async (request, response) => {
  let game = request.body.game
  let ok = {};
  axios.kraken.put(`/channels/${process.env.CHANNEL_ID}?channel[game]=${encodeURIComponent(game)}`).then( async function (res) {
    ok = {game: game, message: 'ok'};
    response.json(ok)
  }).catch(function (err) {
    console.log(err);
    ok = {game: 'not changed', message: 'error'};
    response.json(ok)
  })
})

router.get('/commands/list', async (request, response) =>{
  let commands = commandsRQ.getCommandList();
  response.json(JSON.stringify(commands))
})


async function connect() {
  if (client.client.readyState() === 'OPEN' || client.client.readyState() === 'CONNECTING') {
    return true;
  } else {
    await client.start().then(() => {
      return true;
    })
    return false;
  }
}

async function disconnect() {
  if (client.client.readyState() === 'CLOSED' || client.client.readyState() === 'CLOSING') {
    return true;
  } else {
    await client.stop().then(() => {
      return true;
    })
    return false;
  }
}

async function reconnect() {
  if (client.client.readyState() === 'OPEN' || client.client.readyState() === 'CONNECTING') {
    await disconnect().then(async () => {
      await connect().then(() => {
        return true;
      })
    })
    return false;
  } else {
    await connect().then(() => {
      return true;
    })
    return false;
  }
}
module.exports = router;