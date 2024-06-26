const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const userController = require('./controllers/userController.js');
const { VueLoad } = require('./routes/routes.js');

// Use plugin with optional defaults

const { generateSHA512Hash, exactDate } = require('./utils/tools.js');

const app = express();
const PORT = 5173;

const staticPath = path.join(__dirname, '../dist');

app.use(express.static(staticPath));

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.listen(PORT, () => console.log(`http://localhost:${PORT} levantado`));


app.get('/session', (req, res) => {
    const hash = req.cookies.Expire;
    userController.cookieValidate(hash, (error, results) => {
        console.log("Log cookie => ", results);
        if (error) {
            return res.status(500).send('Error al verificar la cookie hash');
        }
        if (results.value === 0 && results.message == "expired") {
            res.status(401).send('SESION CADUCADA');
        } else if (results.value == 0 && results.message == "ok") {
            res.status(200).send('AUTORIZADO');
        } else if (results.value == 2 && results.message == "undefined") {
            res.status(401).send('SESION NO AUTORIZADA');
        }
    });
});

app.post('/server/login', (req, res) => {
    const { mail, password } = req.body;

    if (!mail || !password) {
        return res.status(400).send({ message: 'Faltan datos por enviar' });
    }

    userController.findUser(mail, password, (error, results) => {
        if (error) {
            console.error('Error en la consulta SQL:', error);
            return res.status(500).send({ error: 'Error en la consulta SQL. Puede que la base de datos no esté disponible' });
        }

        if (results.length > 0) {
            userController.timeCookie(results[0].mail, results[0].password, false, (error, resultCookie) => {
                if (error) {
                    console.error('Error al obtener la fecha de expiración:', error);
                    return res.status(500).send({ message: 'Error al obtener la fecha de expiración' });
                }

                if (resultCookie.value == 0) {
                    const newHash = generateSHA512Hash(results[0].name + results[0].surname + results[0].password + exactDate());
                    const expirationDate = new Date(resultCookie.expire);

                    userController.updateHash(results[0].mail, newHash, (error, resultsUpdate) => {
                        if (error) {
                            console.error('Error al actualizar el hash:', error);
                            return res.status(500).send({ message: 'Error al actualizar el hash' });
                        }
                        if (resultsUpdate) {
                            res.cookie('Expire', newHash, {
                                expires: expirationDate,
                                httpOnly: true
                            });
                            res.status(200).send('Correcto');
                        }
                    });
                } else {
                    res.redirect(`/login`);
                }
            });
        } else {
            res.status(401).send({ message: 'Usuario no encontrado' });
        }
    });
});

app.post('/register', (req, res) => {
    const { name, surname, password, mail } = req.body;

    if (!name || !surname || !password || !mail) {
        return res.status(400).send({ message: 'Faltan datos por enviar' });
    }

    userController.createUser(name, surname, password, mail, (error, resultsUser) => {
        if (error) {
            console.error('Error en la consulta SQL:', error);
            return res.status(500).send({ error: 'Error al procesar la solicitud' });
        }

        if (resultsUser && resultsUser.affectedRows >= 1) {
            userController.timeCookie(false, false, resultsUser.hash, (error, resultCookie) => {
                if (error) {
                    console.error('Error al obtener la fecha de expiración:', error);
                    return res.status(500).send({ message: 'Error al obtener la fecha de expiración' });
                }

                const expirationDate = new Date(resultCookie);
                res.cookie('Expire', resultsUser.hash, {
                    expires: expirationDate,
                    httpOnly: true
                });
                res.redirect(`/bienvenido`);
            });
        } else {
            console.log("Ya registrado => ", resultsUser);
            return res.status(500).send({ message: 'Este correo ya está registrado' });
        }
    });
});

app.get('/', VueLoad);
app.get('/login', VueLoad);
app.get('/about', VueLoad);
app.get('/options', VueLoad);
app.get('/bienvenido', (req, res) => {
    console.log("ME HAN HECHO UN GET A BIENVENIDO");
    VueLoad(req, res); // Llama a VueLoad con los parámetros req y res
});
