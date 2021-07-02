const mysql = require('mysql2/promise');

async function createDb (dialect) {
    if (dialect === 'mysql'){
        try {
            var connection = await mysql.createConnection({
                user: process.env.DBUSER,
                password: process.env.DBPASSWORD,
                host: process.env.DBHOST
            });
        } catch (err) {
            return err
        }

        try {
            await connection.query('CREATE DATABASE IF NOT EXISTS ' + process.env.DATABASE + ';')
            
        } catch (err) {
            await connection.end();
            return err
        }
    }
    else{
        return 'createDB dialect not defined'
    }
}

module.exports.createDb = createDb;