let router = require('express').Router();
let timers = require('../controller/comManager/commandList');

router.get('/', (req, res) =>{
  res.render('timers.ejs')
  // let timerArray = [];
  // for (timer in timers.timersActive){
  //   timers.timersActive[timer];
  //   let t = timers.commandListArray.find(
  //       n => n.name === timers.timersActive[timer] || 
  //       n.alias.includes(timers.timersActive[timer]
  //     ));
  //   if(t.active = true){
  //     timerArray.push(t)
  //   }
  // }

  // res.json(timerArray)
})

router.get('/timerList', (req, res) =>{
  let timerArray = [];
  for (timer in timers.timersActive){
    timers.timersActive[timer];
    let t = timers.commandListArray.find(
        n => n.name === timers.timersActive[timer] || 
        n.alias.includes(timers.timersActive[timer]
      ));
    if(t.active = true){
      timerArray.push(t)
    }
  }

  res.send(JSON.stringify(timerArray))
})


router.get('/:timer?', (req, res) =>{
  console.log(req.params);
  res.json({
      params: req.params
  })
})

router.post('/:timer?/:state?', (req, res) =>{
  console.log(req.params);
  res.json({
      params: req.params
  })
})

module.exports = router;