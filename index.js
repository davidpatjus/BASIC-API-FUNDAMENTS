import express from 'express';
import dotenv from 'dotenv'
import { USERS } from './db.js'

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
    //servidor conectado o error
App.listen(PORT, () =>
    console.log(`servidor levantado en el puerto ${PORT} madafacka`)
);} catch (err) {
    console.log(err.message);
}

// GET
try {
    App.get('/:_id', (req, res) => {
        const user = USERS.find(user => user._id === req.params._id)
        if (!user) 
            return res.status(404).send("user not found");
        return res.status(200).send(user);
        });
} catch (error) {
    console.log(error.message);
}

// POST
try {
    App.post('/:_id', (req, res) => {
        const user = USERS.find(user => user._id === req.params._id)
        if (!user)
            return res.status(404).send("user not found");
        user.name = req.body.name;
        user.save();
        return res.status(200).send(user);
        });
} catch (error) {
    console.log(error.message);
}

// PUT
try {
    App.put('/:_id', (req, res) => {
        const { _id } = req.params;
        const { name, age, email } = req.body;
        const user = USERS.find(user => user._id === _id);
        if (!user) return res.status(404).send("user not found");
        user.name = name;
        user.age = age;
        user.email = email;
        return res.status(200).send(user);
            });
} catch (error) {
    console.log(error.message);
}

//PATCH
try {
    App.patch('/:_id', (req, res) => {
        const { _id } = req.params;
        const { name, email, password } = req.body;
        const user = USERS.find(user => user._id === _id);
        if (!user) return res.status(404).send("user not found");
        if (name) user.name = name;
        if (email) user.email = email;
        if (password) user.password = password;
        return res.status(200).send("user updated: ",user);
        });
} catch (error) {
    console.log(error.message);
}
        

// DELETE
try {
    App.delete('/:_id', (req, res) => {
        const { _id } = req.params;
        const index = USERS.findIndex((user) => user._id === _id);
        USERS.splice(index, 1);
        if (!index) 
            return res.status(404).send("user not found");
        return res.status(200).send("deleted");
        });
} catch (error) {
    console.log(error.message);
}



