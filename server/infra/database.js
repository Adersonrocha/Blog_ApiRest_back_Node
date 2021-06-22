const pg = require('pg-promise')();

const db = pg({
    user: 'postgres',
    password: 'root',
    host: 'localhost',
    port: 5432,
    database: 'blog'
});


module.exports = db;