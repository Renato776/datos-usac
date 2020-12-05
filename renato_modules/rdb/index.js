const { Pool } = require('pg');

const pool = new Pool();

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1);
});

async function Query(sql,params){
    return (await pool.query(sql,params)).rows;
}
console.log('New version');
exports.query = Query;
