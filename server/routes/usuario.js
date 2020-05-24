import express from 'express';
import jwt from 'jsonwebtoken';
const router = express.Router();

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


router.get('/select',  async (req, res) => {
    if(req.decoded.admin){
        try{
            const usuarios = await db.query(`SELECT * from usuario`);
            res.json(usuarios);
        }
        catch (error){
            return res.status(400).json({
                mensaje: 'Query Error',
                error
            })
        }
    } else{
        return res.status(400).json({
            mensaje: 'No permitido'
        });
    }
});

router.get('/select/:id', async(req, res) => {
    let id = req.params.id;
    try{
        const usuarios = await db.query(`SELECT * from usuario where id = ${id}`);
        res.json(usuarios);
    }
    catch (error){
        return res.status(400).json({
            mensaje: 'Query Error',
            error
        })
    }
});



module.exports = router;