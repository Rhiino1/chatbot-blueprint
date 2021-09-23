let commands = new Vue({
  el: '#commandsList',
  data: {
    commands: [],
    show: [],
    commandPerPage: 5,
    currentPage: 0,
    itemsPerPage: 1,
    totalPage: 0,
    resultCount: 0
  },
  methods: {
    getTable: async function () {
      let indicador = document.getElementById('indicador_paginas');
      let list = []
      this.getCommandsListV().then(() => {
        for (let i = 0; i < this.commandPerPage; i++) {
          const command = this.commands[i];
          let element = {
            active: null,
            name: null,
            note: null,
            permissionLevel: null,
          }
          element.active = command.active;
          element.name = command.name;
          element.note = command.note;
          element.permissionLevel = command.permissionLevel;
          console.log(element);
          list.push(element)
        }
      }).finally(() => {
        console.log('hola');
        this.show = list
        this.totalPage = Math.ceil(this.commands.length / this.commandPerPage)
        indicador.innerText = `${this.currentPage + 1} / ${this.totalPage} `
        console.log(this.totalPage);
      })
    },
    updateTable: function () {
      this.currentPage++;
      let i = this.currentPage * this.commandPerPage;
      let j = 1
      this.show = []
      // console.log(this.currentPage * this.commandPerPage);
      // console.log(i % this.commandPerPage <= this.commandPerPage);
      // console.log(i < this.commands.length);
      if(this.currentPage >= this.totalPage){
        this.currentPage = this.commandPerPage-1;
      }
      for (i = this.currentPage * this.commandPerPage; i % this.commandPerPage <= this.commandPerPage && i < this.commands.length; i++) {
        if(j > 5){
          break;
        }
        const command = this.commands[i];
        let element = {
          active: null,
          name: null,
          note: null,
          permissionLevel: null,
        }
        element.active = command.active;
        element.name = command.name;
        element.note = command.note;
        element.permissionLevel = command.permissionLevel;
        this.show.push(command)
        j++
      }
      console.log(this.show);
      let indicador = document.getElementById('indicador_paginas');
      indicador.innerText = `${this.currentPage + 1} / ${this.totalPage} `
    },
    reverseTable: function () {
      this.currentPage--;
      let i = this.currentPage * this.commandPerPage;
      let j = 1
      this.show = []
      console.log(this.currentPage * this.commandPerPage);
      console.log(i % this.commandPerPage <= this.commandPerPage);
      console.log(i < this.commands.length);
      if(this.currentPage < 0){
        this.currentPage = 0;
      }
      for (i = this.currentPage * this.commandPerPage; i % this.commandPerPage <= this.commandPerPage && i < this.commands.length; i++) {
        if(j > 5){
          break;
        }
        const command = this.commands[i];
        let element = {
          active: null,
          name: null,
          note: null,
          permissionLevel: null,
        }
        element.active = command.active;
        element.name = command.name;
        element.note = command.note;
        element.permissionLevel = command.permissionLevel;
        this.show.push(command)
        j++
      }
      console.log(this.show);
      let indicador = document.getElementById('indicador_paginas');
      indicador.innerText = `${this.currentPage + 1} / ${this.totalPage} `
    },
    firstTable: function () {
      this.currentPage = 0;
      let i = this.currentPage * this.commandPerPage;
      let j = 1
      this.show = []
      // console.log(this.currentPage * this.commandPerPage);
      // console.log(i % this.commandPerPage <= this.commandPerPage);
      // console.log(i < this.commands.length);
      for (i = this.currentPage * this.commandPerPage; i % this.commandPerPage <= this.commandPerPage && i < this.commands.length; i++) {
        if(j > 5){
          break;
        }
        const command = this.commands[i];
        let element = {
          active: null,
          name: null,
          note: null,
          permissionLevel: null,
        }
        element.active = command.active;
        element.name = command.name;
        element.note = command.note;
        element.permissionLevel = command.permissionLevel;
        this.show.push(command)
        j++
      }
      console.log(this.show);
      let indicador = document.getElementById('indicador_paginas');
      indicador.innerText = `${this.currentPage + 1} / ${this.totalPage} `
    },
    lastTable: function () {
      this.currentPage = this.totalPage-1;
      let i = this.currentPage * this.commandPerPage;
      let j = 1
      this.show = []
      // console.log(this.currentPage * this.commandPerPage);
      // console.log(i % this.commandPerPage <= this.commandPerPage);
      // console.log(i < this.commands.length);
      for (i = this.currentPage * this.commandPerPage; i % this.commandPerPage <= this.commandPerPage && i < this.commands.length; i++) {
        if(j > 5){
          break;
        }
        const command = this.commands[i];
        let element = {
          active: null,
          name: null,
          note: null,
          permissionLevel: null,
        }
        element.active = command.active;
        element.name = command.name;
        element.note = command.note;
        element.permissionLevel = command.permissionLevel;
        this.show.push(command)
        j++
      }
      console.log(this.show);
      let indicador = document.getElementById('indicador_paginas');
      indicador.innerText = `${this.currentPage + 1} / ${this.totalPage} `
    },
    getCommandsListV: async function () {
      await fetch('http://127.0.0.1:8000/api/bot/commands/list', {
          method: 'GET',
          headers: {
            'Content-type': 'application/json'
          },
        }, ).then(response => response.json())
        .then(async (data) => {
          // console.log(data);
          dataConverted = JSON.parse(data);
          for (const key in dataConverted) {
            if (dataConverted.hasOwnProperty(key)) {
              const element = dataConverted[key];
              // console.log(element);
              this.commands.push(element)
            }
          }
          // dataConverted.forEach(command =>{
          // commands.commands.push(data)
          // })
          // console.log(this.commands);
        })
    },
  }
})

function load() {
  // commands.getCommandsListV
  commands.getTable()
}
window.onload = load()