import express from 'express';
const router = express.Router()



const db = require('../db');
router.post('/imagen', (req, res) => {
    console.log(req.file.filename); //Nombre del archivo almacenado
    console.log(req.body.nombre); //Acceder a mas propiedades del formulario
    res.send('subida');
})


module.exports = router;