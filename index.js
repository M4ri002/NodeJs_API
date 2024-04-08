const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const userController = require('./userController.js');
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
    const hash = req.cookies.hash;

    if (!hash) {
        return res.status(401).send('Acceso no autorizado');
    }
    userController.cookiHashExist(hash, (error, result) => {
        console.log(result);
        if (error) {
            console.error('Error en la consulta SQL:', error);
            return res.status(500).send('Error en la consulta SQL');
        }

        if (results.length > 0) {
            const username = result[0].name;
            res.render('hola', { username });
        } else {
            res.status(401).send('Acceso no autorizado');
        }
    });
    // Consultar la base de datos para verificar la existencia del hash
    
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

        if (results.length > 0) {
            const username = results[0].name;
            // res.redirect(`/inicio?username=${username}`);
            res.redirect(`/inicio`);
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

    userController.createUser(name, surname, password, mail, (error, results) => {
        if (error) {
            console.error('Error en la consulta SQL:', error);
            return res.status(500).send({ error: 'Error al procesar la solicitud' });
        }

        if (results === 1 || results === 2 || results === 3) {
            switch (results) {
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

        if (results && results.affectedRows >= 1) {
            res.redirect(`/inicio?hash=${results.hash}`);
            // res.status(200).send({ message: 'Usuario registrado correctamente' });
        } else {
            console.log("Ya registrado => ",results);
            return res.status(500).send({ message: 'Este correo ya esta registrado' });
        }
    });
});

