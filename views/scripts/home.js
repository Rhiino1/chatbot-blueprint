async function connectBot(button) {
  fetch('http://127.0.0.1:8000/api/bot/connect', {
      method: 'POST',
    }).then(async response => await response.json())
    .then(async (data) => {
      console.log(data) 
    })
}

async function disconnectBot(button) {
  fetch('http://127.0.0.1:8000/api/bot/disconnect', {
      method: 'POST',
    }).then(response => response.json())
    .then(data => console.log(data))
}

async function reconnectBot(button) {
  fetch('http://127.0.0.1:8000/api/bot/reconnect', {
      method: 'POST',
    }).then(response => response.json())
    .then(data => console.log(data))
}

async function streamInfo() {
  let streamInfo = {
    title: '',
    game: ''
  }
  await fetch('http://127.0.0.1:8000/api/bot/streamInfo', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      }
    }).then(response => response.json())
    .then(async (data) => {
      streamInfo.title = await data.title;
      streamInfo.game = await data.game;
      console.log(streamInfo);
      return streamInfo;
    })
}

let title = new Vue({
  el: '.streamDiv',
  data: {
    title: '',
    game: ''
  },
  methods: {
    changeTitleV: async function () {
      console.log(this.title);
      await fetch('http://127.0.0.1:8000/api/bot/changeTitle', {
        method: 'POST',
        body: JSON.stringify({
          'title': this.title
        }),
        headers: {
          'Content-type': 'application/json',
        },
      }).then(response => response.json()).then((data)=>{
        console.log(data);
      })
    },
    changeCategoryV: async function () {
      console.log(this.game);
      await fetch('http://127.0.0.1:8000/api/bot/changeCategory', {
        method: 'POST',
        body: JSON.stringify({
          'game': this.game
        }),
        headers: {
          'Content-type': 'application/json',
        },
      }).then(response => response.json()).then((data)=>{
        console.log(data);
      })
    }
  }
})