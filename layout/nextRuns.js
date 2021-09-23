const horarioRQ = require('../settings/requestH');
const {
    horaroCounter
} = require('../settings/requestH');
let moment = require('moment')

async function nextRuns() {
    let nextRuns = [];
    await horarioRQ.horario.get(process.env.HORARIO_URL).then(function (response) {
        let juegoC;
        let juegoCategory;
        let hor = response.data;

        // console.log(hor);

        for (let index = 0; index < hor.data.columns.length; index++) {
            if (hor.data.columns[index] === 'Juego') {
                juegoC = index;
            }
            if (hor.data.columns[index] === 'Categoría') {
                juegoCategory = index;
            }
        }

        let horarioMax = hor.data.items.length;
        let horaroCounter = horarioRQ.horaroCounter;
        nextRuns = [];

        // console.log(horaroCounter)
        for (let i = 0; i < horarioMax; i++) {
            let game = {}
            let date = hor.data.items[i].scheduled
            let title = hor.data.items[i].data[juegoC];
            let category = hor.data.items[i].data[juegoCategory];
            if (title.startsWith('[')) {
                titleIndex = title.search(']');
                title = title.substring(1, titleIndex);
            }
            if (category.startsWith('[')) {
                categoryIndex = category.search(']');
                category = category.substring(1, categoryIndex);
            }
            let dt
            if(i != 0){
                dt = moment(nextRuns[i-1]['date'])
                // console.log('First:' + dt);
                // console.log(dt);
                dt.add(1,'minute')
                // console.log('Changed' + dt);
                // console.log(dt);
            }else{
                dt = moment(new Date())
                // console.log(dt);
                dt.add(1,'minute')
                // console.log(dt);
            }
            
            game = {
                'number': i,
                'date': dt.format(),
                'title': title,
                'category': category
            }
            nextRuns.push(game);
        }

        // if (horarioMax - horaroCounter > 4) {
        //     let title = hor.data.items[horaroCounter + 1].data[juegoC];
        //     let title2 = hor.data.items[horaroCounter + 2].data[juegoC];
        //     let title3 = hor.data.items[horaroCounter + 3].data[juegoC];
        //     let title4 = hor.data.items[horaroCounter + 4].data[juegoC];
        //     if (title.startsWith('[')) {
        //         titleIndex = title.search(']');
        //         title = title.substring(1, titleIndex);
        //     }
        //     if (title2.startsWith('[')) {
        //         titleIndex = title2.search(']');
        //         title2 = title2.substring(1, titleIndex);
        //     }
        //     if (title3.startsWith('[')) {
        //         titleIndex = title3.search(']');
        //         title3 = title3.substring(1, titleIndex);
        //     }
        //     if (title4.startsWith('[')) {
        //         titleIndex = title4.search(']');
        //         title4 = title4.substring(1, titleIndex);
        //     }
        //     nextRuns.push(title);
        //     nextRuns.push(title2);
        //     nextRuns.push(title3);
        //     nextRuns.push(title4);
        // }else if(horarioMax - horaroCounter > 3){
        //     let title = hor.data.items[horaroCounter + 1].data[juegoC];
        //     let title2 = hor.data.items[horaroCounter + 2].data[juegoC];
        //     let title3 = hor.data.items[horaroCounter + 3].data[juegoC];
        //     if (title.startsWith('[')) {
        //         titleIndex = title.search(']');
        //         title = title.substring(1, titleIndex);
        //     }
        //     if (title2.startsWith('[')) {
        //         titleIndex = title2.search(']');
        //         title2 = title2.substring(1, titleIndex);
        //     }
        //     if (title3.startsWith('[')) {
        //         titleIndex = title3.search(']');
        //         title3 = title3.substring(1, titleIndex);
        //     }
        //     nextRuns.push(title);
        //     nextRuns.push(title2);
        //     nextRuns.push(title3);
        // }else if(horarioMax - horaroCounter > 2){
        //     let title = hor.data.items[horaroCounter + 1].data[juegoC];
        //     let title2 = hor.data.items[horaroCounter + 2].data[juegoC];
        //     if (title.startsWith('[')) {
        //         titleIndex = title.search(']');
        //         title = title.substring(1, titleIndex);
        //     }
        //     if (title2.startsWith('[')) {
        //         titleIndex = title2.search(']');
        //         title2 = title2.substring(1, titleIndex);
        //     }
        //     nextRuns.push(title);
        //     nextRuns.push(title2);
        // }else{
        //     let title = hor.data.items[horaroCounter + 1].data[juegoC];
        //     if (title.startsWith('[')) {
        //         titleIndex = title.search(']');
        //         title = title.substring(1, titleIndex);
        //     }
        //     if (title2.startsWith('[')) {
        //         titleIndex = title2.search(']');
        //         title2 = title2.substring(1, titleIndex);
        //     }
        //     nextRuns.push(title);
        // }

        // console.log(nextRuns)
        // return nextRuns;

        // let salida = nextRuns.join("    ");

        // var fs = require('fs');
        // fs.writeFile('./nextRuns.txt', `${salida}`, function (err) {
        //     // If an error occurred, show it and return
        //     if (err) return console.error(err);
        //     // Successfully wrote to the file!
        // });

        // console.log(salida);
    })
    return nextRuns;
}
module.exports = nextRuns;