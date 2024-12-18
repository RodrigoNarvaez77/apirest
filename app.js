const express = require('express');
const routes = require('./routes/routes'); // Importa las rutas
const path = require('path');
const app = express();
const port = 3000;

// Middleware para parsear JSON en el cuerpo de las solicitudes
app.use(express.json());

app.use(express.static(path.join(__dirname, './views')));

//ruta del archivo
app.use('/api',routes);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});