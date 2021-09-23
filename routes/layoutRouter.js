let router = require('express').Router()
let nextRuns = require('../layout/nextRuns');
let requestRQ = require('../settings/requestH')
let {
  commandsUsed
} = require('../controller/comManager/commandList')

router.get('/', (request, response) => {
  nextRuns().then((respuesta) => {
    response.render('layout.ejs', {
      commandsUsed: commandsUsed,
      nextRuns: respuesta,
      horarioCounter: requestRQ.horaroCounter,
      horarioMax: requestRQ.horaroCounterMax
    });
  }).catch((err) => {
    console.log(err);
  });
})


module.exports = router;