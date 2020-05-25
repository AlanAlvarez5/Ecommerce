import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router()

router.use((req, res, next) => {
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

router.get('/select', async (req, res) => {
    try{
        let productos = await db.query(`SELECT * from productos`);
        res.json(productos)
    }
    catch (error){
        return res.status(400).json({
            mensaje: 'Query Error',
            error
        })
    }
});



router.get('/select/:id', async (req, res) => {
    let id = req.params.id;
    try{
        let productos = await db.query(`SELECT * from productos where id = ${id}`);
        res.json(productos)
    }
    catch (error){
        return res.status(400).json({
            mensaje: 'Query Error',
            error
        })
    }
});



router.post('/add', async (req, res) => {
    if (req.decoded.admin){
        
        let imagen = req.headers.host + '/img/'+ req.file.filename;
        let { nombre, marca, descripcion, precio, stock} = req.body;

        try{
            await db.query(`INSERT INTO producto (nombre, marca, descripcion, precio, stock, imagen ) VALUES ('${nombre}', '${marca}', '${descripcion}', '${precio}', '${stock}', '${imagen}')`);
            res.json({
                mensaje: 'PRODUCT_ADDED'
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
});

router.put('/edit/:id', async (req, res) => {
    if (req.decoded.admin){
        
        let id = req.params.id;
        let { nombre, marca, descripcion, precio, stock} = req.body;

        try{
            await db.query(`UPDATE producto SET nombre = '${nombre}', marca = '${marca}', descripcion = '${descripcion}', precio = '${precio}', stock = '${stock}' where id = ${id}`);
            res.json({
                mensaje: 'PRODUCT_UPDATED'
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
});

router.delete('/delete/:id', async (req, res) => {
    let id = req.params.id;
    if (req.decoded.admin){
        try{
            await db.query(`DELETE from producto where id = ${id}`)
    
            res.json({
                mensaje: 'PRODUCT_DELETED',
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



module.exports = router;