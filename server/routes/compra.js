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

router.post('/add', async(req, res) => {
    try {
        let usuario_id = req.decoded.id
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

router.get('/select', async(req, res) => {
    try {
        let usuario_id = req.recoded.id;

        let compras = await db.query(`SELECT * from compra where usuario_id = ${usuario_id}`);
        res.json(compras);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Query Error',
            error
        });
    }
});

router.get('/select/:id', async(req, res) => {
    try {
        let id = req.params.id;
        let record = await db.query(`SELECT * from compra where id = ${id}`);
        res.json(record);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Query Error',
            error
        });
    }
});

router.put('/edit/:id', async(req, res) => {
    try {
        let id = req.params.id
        let { total, estado } = req.body
        let record = await db.query(`UPDATE compra SET total = ${total}, estado = '${estado}' where id = ${id}`)
        res.json({
            mensaje: 'COMPRA_UPDATED'
        })
    } catch (error) {
        res.status(400).json({
            mensaje: 'Query Error',
            error
        });
    }
});

router.delete('/delete/:id', async(req, res) => {
    if (req.decoded.admin) {
        try {
            let id = req.params.id
            let record = await db.query(`DELETE from compra where id = ${id}`)
            res.json({
                mensaje: 'COMPRA_DELETED'
            })
        } catch (error) {
            res.status(400).json({
                mensaje: 'Query Error',
                error
            })
        }
    } else {
        return res.status(400).json({
            mensaje: 'No permitido'
        });
    }
});

module.exports = router;