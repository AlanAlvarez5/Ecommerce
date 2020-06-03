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
    if (!req.decoded.admin) {
        try {
            let total = req.body.total
            let usuario_id = req.decoded.id
            let estado = 'Proceso'

            let record = await db.query(`INSERT into compra (usuario_id, total, estado) values (${usuario_id}, ${total}, '${estado}')`)

            res.json({
                mensaje: 'COMPRA_ADDED',
                record
            });
        } catch (error) {
            return res.status(400).json({
                mensaje: 'Query Error',
                error
            });
        }
    } else {
        return res.status(400).json({
            mensaje: 'No permitido'
        });
    }
});

router.get('/select', async(req, res) => {
    if (req.decoded.admin) {
        try {
            let compras = await db.query(`SELECT * from compra`);
            res.json(compras);
        } catch (error) {
            return res.status(400).json({
                mensaje: 'Query Error',
                error
            });
        }
    } else {
        return res.status(400).json({
            mensaje: 'No permitido'
        });
    }
});

router.get('/select-usuario/:id', async(req, res) => {
    const usuario_id = req.params.id;
    if (usuario_id == req.decoded.id) {
        try {
            let compras = await db.query(`SELECT * from compra where usuario_id = ${usuario_id}`);
            res.json(compras);
        } catch (error) {
            return res.status(400).json({
                mensaje: 'Query Error',
                error
            });
        }
    } else {
        return res.status(400).json({
            mensaje: 'No permitido'
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
    if (req.decoded.admin) {
        try {
            let id = req.params.id;
            let estado = req.body.estado;
            await db.query(`UPDATE compra SET estado = '${estado}' where id = ${id}`)
            res.json({
                mensaje: 'COMPRA_UPDATED'
            })
        } catch (error) {
            res.status(400).json({
                mensaje: 'Query Error',
                error
            });
        }
    } else {
        return res.status(400).json({
            mensaje: 'No permitido'
        });
    }
});

router.delete('/delete/:id', async(req, res) => {
    if (req.decoded.admin) {
        try {
            let id = req.params.id
            await db.query(`DELETE from compra where id = ${id}`)
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

// CRUD detalles compra

router.post('/add-detail', async(req, res) => {
    try {
        let { compra_id, producto_id, cantidad } = req.body;
        await db.query(`INSERT into detalle (compra_id, producto_id, cantidad) values (${compra_id}, ${producto_id}, ${cantidad})`)

        res.json({
            mensaje: 'DETAIL_ADD'
        });

    } catch (error) {
        return res.status(400).json({
            mensaje: 'Query Error',
            error
        });
    }
});

router.get('/select-detail/:id', async(req, res) => {
    const id = req.params.id;
    try {
        // Hacer join con la información de los productos
        // let detalles = await db.query(`SELECT * from detalle where compra_id = '${id}'`);
        let detalles = await db.query(`SELECT detalle.producto_id, detalle.cantidad, producto.nombre, producto.marca, producto.precio, producto.imagen FROM detalle JOIN producto ON producto.id = detalle.producto_id and detalle.compra_id = '${id}'`);
        res.json(detalles);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Query Error',
            error
        });
    }
});

module.exports = router;