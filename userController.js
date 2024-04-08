const mysql = require('mysql');
const { generateSHA512Hash, exactDate, expireDate, validateData } = require('./tools.js')

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

    if (mail) {
        query = 'SELECT * FROM users WHERE mail = ? ';
        params = [mail, password];
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
                const newPassword = generateSHA512Hash(name + surname + password);
                const hash = generateSHA512Hash(name + surname + password + exactDate());
                const expire = expireDate();

                connection.query('INSERT INTO users(name, surname, mail, password, hash, expire) VALUES (?, ?, ?, ?, ?, ?)', [name, surname, mail, newPassword, hash, expire], callback);
            }
        });
    }
}



module.exports = {
    connection,
    findUser,
    createUser
};