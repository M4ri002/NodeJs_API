const crypto = require('crypto');


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





module.exports = {
    capitalizeFirstLetter,
    generateSHA512Hash,
    exactDate,
    // expireDate,
    validateData,
    convertToLowercase,
};