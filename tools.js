const crypto = require('crypto');
const userController = require('./userController.js');


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function convertToLowercase(string) {
    return string.toLowerCase();
}


function generateSHA512Hash(data) {
    const hash = crypto.createHash('sha512');
    hash.update(data);
    return hash.digest('hex');
}

function exactDate() {
    const ahora = new Date();

    const hora = ahora.getHours();
    const minutos = ahora.getMinutes();
    const segundos = ahora.getSeconds();
    const milisegundos = ahora.getMilliseconds();

    // Formatear la hora con decimales
    return horaConDecimales = `${hora}:${minutos}:${segundos}.${milisegundos}`;
}


function validateData(name, surname, password, mail) {
    const nameSurnameRegex = /^[a-zA-Z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameSurnameRegex.test(name) || !nameSurnameRegex.test(surname)) {
        return 1;
    }

    if (password.length < 4) {
        return 2;
    }

    if (!emailRegex.test(mail)) {
        return 3;
    }

    return "200";
}

const validateCookie = (hash) => (req, res, next) => {
    console.log('Hash recibido:', hash);
    if (!hash) {
        return res.status(401).send('Acceso no autorizado');
    }

    // Llamar a la función en userController para validar el hash en la base de datos
    userController.cookiHashExist(hash, (error, result) => {
        if (error) {
            console.error('Error al validar el hash en la base de datos:', error);
            return res.status(500).send('Error en la validación del hash en la base de datos');
        }

        if (result.length > 0) {
            // Si el hash es válido, permitir que la solicitud continúe
            next();
        } else {
            res.status(401).send('Acceso no autorizado');
        }
    });
};



module.exports = {
    capitalizeFirstLetter,
    generateSHA512Hash,
    exactDate,
    validateData,
    convertToLowercase,
    validateCookie,
};