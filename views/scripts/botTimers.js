let timerApp = new Vue({
  el: '#timer-app',
  data: {
    timers: [

    ]
  }
})

// function getTimersArray() {
//   fetch('http://127.0.0.1:8000/bot/timers/timerList', {
//     method: 'GET',
//   }).then(response => {
//     console.log(response);
//   })
// }