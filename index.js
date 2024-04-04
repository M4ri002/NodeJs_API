const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8080;

// Configuración de body-parser para analizar JSON
app.use(bodyParser.json());
// app.use(bodyParser.raw());
// app.use(bodyParser.text());

// Inicia el servidor en el puerto especificado
app.listen(PORT, () => console.log(`http://localhost:${PORT} levantado`));

/*  
GET http://localhost:8080/test  
Se ejecuta la función de callback [()=>{}] cuando llega la solicitud
req = datos entrantes
res = respuesta
GET = solicitar algo al servidor
POST = el cliente intenta crear algo nuevo en el servidor
*/
app.get('/test', (req, res) => {
    // Datos de ejemplo
    const data = {
        name: 'mario',
        apellido: 'caravaca'
    };
    res.status(200).send(JSON.stringify(data));
});

app.post('/test/:id', (req, res) => {
    console.log(req.body);
    const { id } = req.params;
    const { edad } = req.body;
    if (!edad) {
        res.send({ message: 'Necesitamos la edad' });
    }else{
        res.send({
            user: `mario con la edad ${edad} y el id ${id}`
        });
    }
});
