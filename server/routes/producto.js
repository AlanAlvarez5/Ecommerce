import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router()

router.use((req,res, next) => {
    const token = req.headers['access-token'];
    if (token) {
        jwt.verify(token, req.app.get('llave'), (err, decoded) => {
            if(err){
                return res.json({ mensaje: 'Token invalido'});
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else{
        res.send({
            mensaje: 'Token no enviado'
        });
    }
});

const db = require('../db');


router.post('/add', async (req, res) => {
    if (req.decoded.admin){
        
        let imagen = req.headers.host + '/img/'+ req.file.filename;
        let { nombre, marca, descripcion, precio, stock} = req.body;

        try{
            await db.query(`INSERT INTO producto (nombre, marca, descripcion, precio, stock, imagen ) VALUES ('${nombre}', '${marca}', '${descripcion}', '${precio}', '${stock}', '${imagen}')`);
            res.json({
                mensaje: 'Producto agregado'
            })
        }
        catch (error){
            return res.status(400).json({
                mensaje: 'Query Error',
                error
            })
        }
    } else {
        return res.status(400).json({
            mensaje: 'No permitido'
        });
    }
})


module.exports = router;