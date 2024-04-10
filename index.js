const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const userController = require('./controllers/userController.js');
const { generateSHA512Hash, exactDate } = require('./utils/tools.js');
const app = express();
const PORT = 8080;
const templatePath = path.join(__dirname, '/views/login.html');

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.listen(PORT, () => console.log(`http://localhost:${PORT} levantado`));

app.get('/', (req, res) => res.sendFile(templatePath));
app.get('/login', (req, res) => res.sendFile(__dirname + '/views/login.html'));
app.get('/register', (req, res) => res.sendFile(__dirname + '/views/register.html'));
app.get('/inicio', (req, res) => {
    const hash = req.cookies.Expire; // Obtén el valor de la cookie hash

    userController.cookieValidate(hash, (error, results) => {
        if (error) {
            return res.status(500).send('Error al verificar la cookie hash');
        }
        if (results.value === 0 && results.message == "expired") {
            res.status(401).send('Sesion caducada');
        } else if (results.value == 0 && results.message == "ok") {
            res.render('index');
        } else if (results.value == 2 && results.message == "undefined") {
            res.status(401).send('Acceso no autorizado');
        }
    });
});


app.post('/login', (req, res) => {
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
                            res.redirect(`/inicio`);
                        }

                    });
                } else {
                    res.redirect(`/inicio`);
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
                res.redirect(`/inicio`);
            });
        } else {
            console.log("Ya registrado => ", resultsUser);
            return res.status(500).send({ message: 'Este correo ya está registrado' });
        }
    });
});

