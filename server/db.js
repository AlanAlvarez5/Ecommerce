import mysql from 'mysql';
import { promisify } from 'util';

const { database } = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DB: Conexión Perdida');
        }
        if ( err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DB: Demasiadas conexiones');
        }
        if ( err.code === 'ECONNREFUSED'){
            console.err('DB: Conexion denegada');
        }
    }

    if (connection) connection.release();
    console.log('DB: conectada');

    return;
});

// Usar promesas con querys
pool.query = promisify(pool.query);


module.exports = pool;

