import express from 'express';
import { USERS } from '../db.js';

// Se inicializa el Router
const accountRouter = express.Router();


// GET
try {
    accountRouter.get('/:_id', (req, res) => {
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
    accountRouter.post('/', (req, res) => {
        const user = USERS.find(user => user._id === req.params._id)
        if (user)
            return res.status(409).send("user already exists");
        USERS.push({
            _id: req.body._id,
            name: req.body.name,
        })
        return res.status(200).send(user);
        });
} catch (error) {
    console.log(error.message);
}

// PUT
try {
    accountRouter.put('/:_id', (req, res) => {
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
    accountRouter.patch('/:_id', (req, res) => {
        const { _id } = req.params;
        const { name, email, password } = req.body;
        const user = USERS.find(user => user._id === _id);
        if (!user) return res.status(404).send("user not found");
        if (name) user.name = name;
        if (email) user.email = email;
        if (password) user.password = password;
        return res.send(user);
        });
} catch (error) {
    console.log(error.message);
}
        

// DELETE
try {
    accountRouter.delete('/:_id', (req, res) => {
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

export default accountRouter;