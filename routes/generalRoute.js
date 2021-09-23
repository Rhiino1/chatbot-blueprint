let router = require('express').Router()
const axios = require('../settings/request');
const requestRQ = require('../settings/requestH');

router.get('/', (request, response) => {
  axios.kraken.get(`/channels/${process.env.CHANNEL_ID}`).then((res) => {
    let data = res.data;
    response.render('home.ejs', {
      infoStream: data
    })
  }).catch((err) => {
    console.error(err);
    response.render('home.ejs', {
      infoStream: {
        status: 'stream title',
        game: 'stream category'
      }
    })
  })
})

router.get('/homeOld', (request, response) => {
  axios.kraken.get(`/channels/${process.env.CHANNEL_ID}`).then(function (res) {
    let data = res.data;
    //console.log(data);
    requestRQ.horario.get(process.env.HORARIO_URL).then(async function (res) {
      // console.log(response.data);
      let horaro = res.data;
      response.render('index.ejs', {
        info: data,
        horaro: horaro
      });
    })
  });
})

router.get('/commands', (request, response) => {
  response.render('commands.ejs');
})

router.get('/timers', (request, response) => {
  response.render('timers.ejs');
})

router.get('/updatestream?', (request, response) => {
  let keys = [];
  for (const key in request.query) {
    keys.push(key);
  }
  console.log(keys);
  axios.kraken.put(`/channels/${process.env.CHANNEL_ID}?channel[status]=${encodeURIComponent(request.query['title'])}&channel[game]=${encodeURIComponent(request.query['game'])}`).then(function (res) {
    //console.log(res.data);
  }).catch(function (err) {
    console.log('Error al intentar actualizar.');
  })
  getDataToIndex(axios, response, 'updatestream.ejs');
})

router.get('/updatestream/game?', (request, response) => {

  axios.kraken.put(`/channels/${process.env.CHANNEL_ID}?channel[game]=${encodeURIComponent(request.query['game'])}`).then(function (res) {}).catch(function (err) {
    console.log('Error al intentar actualizar.');
  })
  getDataToIndex(axios, response, 'updatestreamgame.ejs');
})

router.get('/updatestream/title?', (request, response) => {
  let keys = [];
  for (const key in request.query) {
    keys.push(key);
  }

  axios.kraken.put(`/channels/${process.env.CHANNEL_ID}?channel[status]=${encodeURIComponent(request.query['title'])}`).then(function (res) {
    console.log(res.data);
  }).catch(function (err) {
    console.log('Error al intentar actualizar.');
  })

  getDataToIndex(axios, response, 'updatestreamtitle.ejs');
})

function getDataToIndex(axios, response, ejsString) {
  axios.kraken.get(`/channels/${process.env.CHANNEL_ID}`).then(function (res) {
    let data = res.data;
    response.render(ejsString, {
      info: data
    });
  });
}

module.exports = router;