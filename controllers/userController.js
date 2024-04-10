const mysql = require('mysql');
const { generateSHA512Hash, exactDate, validateData, convertToLowercase } = require('../utils/tools.js')
const timeExpire = 10; 
// Crear la conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'finalproject'
});

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
}

function createUser(name, surname, password, mail, callback) {
    const validateResult = validateData(name, surname, password, mail);

    if (validateResult === 1 || validateResult === 2 || validateResult === 3) {
        return callback(false, validateResult);
    } else if (validateResult === 200) {

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

                connection.query(`INSERT INTO users(name, surname, mail, password, hash, expire) VALUES (?, ?, ?, ?, ?, DATE_FORMAT(NOW() + INTERVAL '${timeExpire}' SECOND, "%Y-%m-%d %H:%i:%s"))`,
                    [name, surname, lowerMail, newPassword, hash], (error, results) => {
                        return callback(false, { hash: hash, affectedRows: results.affectedRows });
                    });
            }
        });
    }
}

function cookieValidate(hash, callback) {
    connection.query('SELECT hash, expire FROM users WHERE hash = ?', [hash], (error, results) => {
        if (error) {
            console.error('Error al consultar la base de datos:', error);
            callback(error, null);
            return;
        }
        if (results.length === 0) {
            // No se encontró ningún usuario con el hash dado
            callback(null, { value: 2, message: "undefined" }); // Llama al callback con resultados nulos
            return;
        }
        const expireDate = results[0].expire;
        if (expireDate != null) {
            const currentDate = new Date();
            if (expireDate < currentDate) {
                // La cookie ha expirado
                callback(null, { value: 0, message: "expired" });
            } else {
                // La cookie es válida
                callback(null, { value: 0, message: "ok" });
            }
        } else {
            // La fecha de expiración es nula (esto puede indicar un problema)
            callback(null, null);
        }
    });
}

function timeCookie(mail, password, hash, callback) {
    // console.log(mail, password, hash);
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
                    return callback(false, { value: 0 });
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
        // Aquí incluimos la lógica para verificar la fecha de expiración según el correo y la contraseña
        connection.query('SELECT * FROM users WHERE mail = ? AND password = ?', [mail, password], (error, results) => {
            if (error) {
                console.error('Error al consultar la base de datos:', error);
                return callback(error, null);
            }

            if (results.length > 0) {
                const userId = results[0].id; // Obtener el ID del usuario encontrado
                const expireDate = new Date(results[0].expire); // Obtener la fecha de expiración del usuario
                const currentDate = new Date();

                if (expireDate < currentDate) {
                    const newExpirationDate = new Date(currentDate.getTime() + (timeExpire * 1000)); // Sumar 20 segundos a la fecha actual

                    connection.query('UPDATE users SET expire = ? WHERE id = ?', [newExpirationDate, userId], (error, updateResult) => {
                        if (error) {
                            console.error('Error al actualizar la fecha de expiración en la base de datos:', error);
                            return callback(error, null);
                        }

                        if (updateResult.affectedRows > 0) {
                            // Actualización exitosa, devolver el nuevo valor de la fecha de expiración
                            return callback(false, { value: 0, expire: newExpirationDate });
                        } else {
                            // No se pudo actualizar la fecha de expiración
                            return callback(false, null);
                        }
                    });
                } else {
                    // La fecha de expiración es válida, devolver el hash del usuario encontrado
                    return callback(false, results[0].hash);
                }
            } else {
                // No se encontró ningún usuario con el correo y contraseña especificados
                return callback(false, null);
            }
        });
    }
}

function updateHash(mail, newHash, callback) {
    connection.query(
        'UPDATE users SET hash = ? WHERE mail = ?',
        [newHash, mail],
        (error, results) => {
            if (error) {
                console.error('Error al actualizar el hash en la base de datos:', error);
                return callback(error, null);
            }
            // Verifica si se realizó correctamente la actualización
            if (results.affectedRows > 0) {
                return callback(false, true);
            } else {
                return callback(false, false); // No se actualizó ninguna fila
            }
        }
    );
}

module.exports = {
    connection,
    findUser,
    createUser,
    cookieValidate,
    timeCookie,
    updateHash,
};