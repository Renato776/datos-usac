const { query } = require('../renato_modules/rredis');
const fs = require('fs');
const graphs = JSON.parse(fs.readFileSync('./raw-graphs.json', 'utf8'));
async function Load(){
    for ( const dataset in graphs ) {
        for ( graph in graphs[dataset] ) {
            await query('hset',dataset,graph,JSON.stringify(graphs[dataset][graph]))
        }
    }
    process.exit(0);
}
Load();
