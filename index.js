require('dotenv').config()

//useful things like tmi, timers, commandManager and Axios
const axios = require('./settings/request');
const manager = require('./controller/comManager/commandManager');
const client = require('./settings/client');
const cors = require('cors');


//Routes
const timersRoute = require('./routes/timersRoute');
const generalRoute = require('./routes/generalRoute')
const layoutRoute = require('./routes/layoutRouter')
const apiBotRoute = require('./routes/apiBotRouter')

// client.start()

//------------------------------------------------------------------------------------------------------------



//HoraroManager
// const horaroMan = require('../srebot_col/horaro/horaroMan');
const requestRQ = require('./settings/requestH');

//------------------------------------------------------------------------------------------------------------

//Useful const
const channel = axios.channelName;
//------------------------------------------------------------------------------------------------------------

//Express
const express = require('express');
const app = express();
const {
    Server
} = require("socket.io");
const socketContext = require('./settings/socket-context');


//Settings
app.set('appName', 'Bot Manager');
app.set('port', process.env.PORT || 8000);
app.set('view engine', 'ejs');

const server = app.listen(app.get('port'), () => {
    console.log(`Server on port: ${app.get('port')}`);
    console.log(app.get('ip'));
    console.log(process.env.BASE_URL)
})
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected');
});
socketContext.set(io);



//Middlewares
app.use(express.json());
app.use(express.static('views'));
app.use(cors());
app.use('/', generalRoute)
app.use('/bot/timers', timersRoute)
app.use('/layout', layoutRoute)
app.use('/api/bot', apiBotRoute)


//Routers
// app.get('/bot', (request, response) => {
//     axios.kraken.get(`/channels/${process.env.CHANNEL_ID}`).then(function (res) {
//         let data = res.data;
//         requestRQ.horario.get(process.env.HORARIO_URL).then(async function (res) {
//             let horaro = res.data;        
//             response.render('bot.ejs', { info: data, horaro: horaro, commands: manager.commands.commandList, client: client.client});
//         })
//     });
// })

// app.post('/bot/stopTimer', (req, res) =>{
//     console.log(manager.commands.commandList[7].timer);
//     manager.commands.commandList[7].timer.clearTimer(manager.commands.commandList[7])
//     res.send('stopped')
// })

// app.post('/bot/initTimer', (req, res) =>{
//     console.log('estoy entrando aqui');
//     console.log(manager.commands.commandList[7].timer);
//     manager.commands.commandList[7].timer.initTimer(manager.commands.commandList[7], client.client)
//     res.send('init timer')
// })

// app.post('/bot/refreshTimer', (req, res) =>{
//     manager.commands.commandList[7].timer.refreshTimer(manager.commands.commandList[7])
//     res.send('refreshed')
// })