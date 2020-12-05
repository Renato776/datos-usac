const { fetch, graphs } = require('./index.js')
const wings = {};
async function Main(){
    for ( const dataset in graphs ) {
        wings[dataset] = {};
        for ( const graph in graphs[dataset] ) {
            wings[dataset][graph] = await fetch(graph,dataset)
        }
    }
    console.log(JSON.stringify(wings))
}
Main();
