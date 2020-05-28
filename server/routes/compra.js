import express from 'express';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.use((req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, req.app.get('llave'), (err, decoded) => {
            if (err) {
                return res.json({ mensaje: 'Token invalido' });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.send({
            mensaje: 'Token no enviado'
        });
    }
});

const db = require('../db');

router.get('/add', async(req, res) => {
    try {
        usuario_id = req.decoded.id
            // let usuario_id = 3
        let total = 0.0
        let estado = 'Proceso'

        let record = await db.query(`INSERT into compra (usuario_id, total, estado) values (${usuario_id}, ${total}, '${estado}')`)

        res.json({
            mensaje: 'COMPRA_ADDED'
        });
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Query Error',
            error
        });
    }
});




module.exports = router;