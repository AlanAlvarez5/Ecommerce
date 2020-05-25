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





module.exports = router;