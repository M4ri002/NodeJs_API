const mysql = require('mysql');
const { generateSHA512Hash, exactDate, expireDate, validateData, convertToLowercase } = require('./tools.js')

// Crear la conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'finalproject'
});

// Función para realizar la consulta del usuario por nombre
// Función para realizar la consulta del usuario por nombre, y opcionalmente por mail
// Función para buscar un usuario por correo electrónico y opcionalmente por contraseña
function findUser(mail, password, callback) {
    let query, params;

    if (mail && password) {
        const lowerMail = convertToLowercase(mail);
        const newPassword = generateSHA512Hash(lowerMail + password);
        query = 'SELECT * FROM users WHERE mail = ? AND password = ? ';
        params = [mail, newPassword];
    } else if (mail) {
        query = 'SELECT * FROM users WHERE mail = ? ';
        params = [mail];
    }

    connection.query(query, params, callback);
    // Desencriptar el password para poder verificar el login
}



function createUser(name, surname, password, mail, callback) {
    const validateResult = validateData(name, surname, password, mail);

    if (validateResult === 1 || validateResult === 2 || validateResult === 3) {
        return callback(false, validateResult);
    } else if (validateResult === "200") {

        findUser(mail, password, (error, results) => {
            if (error) {
                return callback(false, 'Error al buscar usuario');
            }

            if (results.length > 0) {
                return callback(false, 'El usuario ya existe');
            } else {
                const lowerMail = convertToLowercase(mail);
                const newPassword = generateSHA512Hash(lowerMail + password);
                const hash = generateSHA512Hash(name + surname + password + exactDate());

                connection.query('INSERT INTO users(name, surname, mail, password, hash, expire) VALUES (?, ?, ?, ?, ?, DATE_FORMAT(NOW() + INTERVAL 20 SECOND, "%Y-%m-%d %H:%i:%s"))', 
                [name, surname, lowerMail, newPassword, hash], (error, results) => {
                    // Devuelvo a cliente estos datos
                    return callback(false, { hash: hash, affectedRows: results.affectedRows });
                });
            }
        });
    }
}

function cookiHashExist(hash) {
    connection.query('SELECT * FROM users WHERE hash = ?', [hash]);
}

function timeCookie(hash, callback) {
    connection.query('SELECT expire FROM users WHERE hash = ?', [hash], (error, results) => {
        return callback(false, results[0].expire );
    });
}


module.exports = {
    connection,
    findUser,
    createUser,
    cookiHashExist,
    timeCookie,
};