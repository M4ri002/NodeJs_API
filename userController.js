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

function cookiHashExist(hash, callback) {
    connection.query('SELECT hash FROM users WHERE hash = ?', [hash], (error, results) => {
        if (error) {
            console.error('Error al consultar la base de datos:', error);
            callback(error, null); // Llama al callback con el error
        } else {
            callback(null, results); // Llama al callback con los resultados de la consulta
            
        }
    });
}


function timeCookie(mail, password, hash, callback) {
    console.log(mail, password, hash);
    if (!mail && !password && hash) {
        // Consulta para obtener la fecha de expedición asociada al hash
        connection.query('SELECT expire FROM users WHERE hash = ?', [hash], (error, results) => {
            if (error) {
                console.error('Error al consultar la base de datos:', error);
                return callback(error, null);
            }

            // Verifica si se encontraron resultados
            if (results.length > 0) {
                const expireDate = results[0].expire;
                const currentDate = new Date();

                // Compara la fecha de expedición con la fecha actual
                if (expireDate < currentDate) {
                    // Si la fecha de expedición ha caducado, devuelve 0
                    return callback(false, {value: 0});
                } else {
                    // Si la fecha de expedición es válida, devuelve el hash del usuario
                    return callback(false, expireDate);
                }
            } else {
                // No se encontraron resultados para el hash proporcionado
                return callback(false, null);
            }
        });
    } else if (mail && password && !hash) {
        // Aquí deberías incluir la lógica para verificar la fecha de expedición según el mail y la contraseña
        // Pero en tu código actual, el query es idéntico al caso anterior
        connection.query('SELECT expire,hash FROM users WHERE mail = ? AND password = ?', 
        [mail,password], (error, results) => {
            if (error) {
                console.error('Error al consultar la base de datos:', error);
                return callback(error, null);
            }

            if (results.length > 0) {
                const expireDate = results[0].expire;
                const currentDate = new Date();

                if (expireDate < currentDate) {
                    return callback(false, {value: 0});
                } else {
                    return callback(false, results[0].hash);
                }
            } else {
                return callback(false, null);
            }
        });
    }
}


module.exports = {
    connection,
    findUser,
    createUser,
    cookiHashExist,
    timeCookie,
};