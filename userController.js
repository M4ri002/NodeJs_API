const mysql = require('mysql');
const {generateSHA512Hash, exactDate, expireDate} = require('./tools.js')

// Crear la conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'finalproject'
});

// Función para realizar la consulta del usuario por nombre
function findUser(name,password,callback) {
    connection.query('SELECT name,surname FROM users WHERE name = ? AND password = ?', [name,password], callback);
}
function createUser(name,surname,password,mail,callback) {
    const NewPassword = generateSHA512Hash(name+surname+password);
    hash = generateSHA512Hash(name+surname+password+exactDate());
    const expire = expireDate();
    connection.query('INSERT INTO users(name, surname, mail, password, hash, expire) VALUES (?, ?, ?, ?, ?, ?)', [name,surname,mail,NewPassword,hash,expire], callback);
}

module.exports = {
    connection,
    findUser,
    createUser
};
