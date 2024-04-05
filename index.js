const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const userController = require('./userController.js');
const app = express();
const PORT = 8080;
const templatePath = path.join(__dirname, '/login.html');

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => console.log(`http://localhost:${PORT} levantado`));

app.get('/', (req, res) => res.sendFile(templatePath));

app.post('/login', (req, res) => {
    const { name, password } = req.body;

    if (!name || !password) {
        res.status(400).send({ message: 'Faltan datos por enviar' });
        return;
    }

    userController.findUser(name, password, (error, results) => {
        if (error) {
            console.error('Error en la consulta SQL:', error);
            res.status(500).send({ error: 'Error en la consulta SQL. Puede que la base de datos no esté disponible' });
            return;
        }

        if (results.length > 0) {
            const username = results[0].name;
            res.render('index', { username: username });
        } else {
            res.status(401).send({ message: 'Usuario no encontrado' });
            console.log('El usuario no existe');
        }
    });
});

app.post('/register', (req, res) => {
    const { name, surname, password, mail } = req.body;
    if (!name || !surname || !password || !mail) {
        res.status(400).send({ message: 'Faltan datos por enviar' });
        return;
    }
    userController.createUser(name, surname, password, mail, (error, results) => {
        if (error) {
            console.error('Error en la consulta SQL:', error);
            res.status(500).send({ error: 'Error en la consulta SQL. Puede que la base de datos no esté disponible' });
            return;
        }
        if (results.affectedRows >= 1) {
            // const username = results[0].name;
            // res.render('index', { username: username });
            res.send({message: 'Insertado correctamente'})
        } else if(results.affectedRows == 0) {
            res.status(401).send({ message: 'No se ha podido insertar' });
        console.log(results);
        console.log('El usuario no existe');
        }
    });
});
