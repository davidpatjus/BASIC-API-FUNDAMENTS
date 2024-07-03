import express from 'express';
import dotenv from 'dotenv'
import accountRouter from './routes/account.js';

// Se configuran las variables de entorno
dotenv.config();

//se inicializa el servidor y asigna el puerto
const App = express();
const PORT = process.env.PORT || 3001;

// Try para el manejo de errores
try {
    // Se configura el servidor para recibir json y text
App.use(express.json());
App.use(express.text());
    // Se configura las rutas
App.use('/', accountRouter);
    //servidor conectado o error
App.listen(PORT, () =>
    console.log(`servidor levantado en el puerto ${PORT} madafacka`)
);} catch (err) {
    console.log(err.message);
}


