const { Pool } = require('pg')

module.exports = new Pool({
    user: 'postgres',
    password: '5718',
    host: 'localhost',
    port: 5432,
    database: 'teachersandstudents'
})