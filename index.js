const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const userController = require('./userController.js');
const { validateCookie, generateSHA512Hash, exactDate } = require('./tools.js');
const app = express();
const PORT = 8080;
const templatePath = path.join(__dirname, '/login.html');

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.listen(PORT, () => console.log(`http://localhost:${PORT} levantado`));

app.get('/', (req, res) => res.sendFile(templatePath));
app.get('/login', (req, res) => res.sendFile(__dirname + '/login.html'));
app.get('/register', (req, res) => res.sendFile(__dirname + '/register.html'));
app.get('/inicio', (req, res) => {
    const hash = req.cookies.Expire; // Obtén el valor de la cookie hash

    userController.cookiHashExist(hash, (error, results) => {
        if (error) {
            return res.status(500).send('Error al verificar la cookie hash');
        }

        if (results.length > 0) {
            res.render('index');
        } else {
            res.status(401).send('Acceso no autorizado');
        }
    });
});


app.post('/login', (req, res) => {
    const { mail, password } = req.body;

    if (!mail || !password) {
        res.status(400).send({ message: 'Faltan datos por enviar' });
        return;
    }

    userController.findUser(mail, password, (error, results) => {

        if (error) {
            console.error('Error en la consulta SQL:', error);
            res.status(500).send({ error: 'Error en la consulta SQL. Puede que la base de datos no esté disponible' });
            return;
        }
        // console.log(results[0]);
        if (results.length > 0) {
            userController.timeCookie(results[0].mail, results[0].password, false, (error, resultCookie) => {
                console.log(resultCookie);
                if (error) {
                    console.error('Error al obtener la fecha de expiración:', error);
                    return res.status(500).send({ message: 'Error al obtener la fecha de expiración' });
                }
                else {
                    if (resultCookie.value == 0) {
                        console.log("Hay que crear cookie en login");
                        const expirationDate = new Date(resultCookie);

                        // No generar hash aquí crear funcion en tools que a la vez que crea guarda el nuevo hash en la base de datos en el usuario que toque 
                        res.cookie('Expire', generateSHA512Hash(results[0].mail + results[0].mail + results[0].mail + exactDate()), {
                            expires: expirationDate,
                            httpOnly: true
                        });
                        res.redirect(`/inicio`);
                    }


                }
            });
            // res.render('index', { username: username });
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

        if (resultsUser === 1 || resultsUser === 2 || resultsUser === 3) {
            switch (resultsUser) {
                case 1:
                    return res.status(400).send({ message: 'Error! Tu nombre o apellidos no son válidos' });
                case 2:
                    return res.status(400).send({ message: 'Error! La contraseña no es válida, asegúrate de que tenga más de 4 caracteres' });
                case 3:
                    return res.status(400).send({ message: 'Error! El correo electrónico no tiene un formato válido' });
                default:
                    return res.status(500).send({ message: 'Error inesperado' });
            }
        }

        if (resultsUser && resultsUser.affectedRows >= 1) {
            // console.log(resultsUser);
            userController.timeCookie(resultsUser.hash, (error, resultCookie) => {
                if (error) {
                    console.error('Error al obtener la fecha de expiración:', error);
                    return res.status(500).send({ message: 'Error al obtener la fecha de expiración' });
                }
                else {
                    // console.log("TimeCookie antes de formateo => ", resultCookie);
                    const expirationDate = new Date(resultCookie);
                    // console.log("TimeCookie formateado => ", expirationDate);

                    res.cookie('Expire', resultsUser.hash, {
                        expires: expirationDate,
                        httpOnly: true
                    });
                    // res.status(200).send({ message: 'Usuario registrado' });
                    // res.redirect(`/inicio?hash=${resultsUser.hash}`);
                    res.redirect(`/inicio`);

                }
            });
        } else {
            console.log("Ya registrado => ", resultsUser);
            return res.status(500).send({ message: 'Este correo ya esta registrado' });
        }
    });
});
