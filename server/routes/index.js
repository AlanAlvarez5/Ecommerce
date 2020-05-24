import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = express.Router();

const db = require('../db');

router.post('/login', async (req, res) => {
    let { correo, password }  = req.body;
    try{
        const usuario = await db.query(`SELECT * from usuario where correo = '${correo}'`);
        if (usuario.length > 0){
            if ( bcrypt.compareSync(password, usuario[0].password)){
                let payload = {}
                if (usuario[0].admin){
                   payload = {
                        check: true,
                        admin: true
                    };
                } else {
                    payload = {
                        check: true,
                        admin: false
                    };
                }
                const token = jwt.sign(payload, req.app.get('llave'), {
                    expiresIn: 1440
                });
    
                res.json({
                    mensaje: 'Autenticado',
                    token,
                    usuario
                });
            } else{
                res.json({ mensaje: 'INVALID_USERNAME_PASSWORD'});
            }
        }else{
            res.json({ mensaje: 'INVALID_USERNAME_PASSWORD'});
        }
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Query Error',
            error
        })
    }
});


router.post('/signin', async (req, res) => {
    let { nombre, correo, password, telefono, direccion, cp, ciudad } = req.body;
    let admin = 0;
    
    const {salt_rounds} = require('../keys');
    const hashed  = bcrypt.hashSync(password, salt_rounds)
        
    try{
        let record = await db.query(`INSERT into usuario (nombre, correo, password, telefono, direccion, cp, ciudad, admin) values ('${nombre}', '${correo}', '${hashed}', '${telefono}', '${direccion}', '${cp}', '${ciudad}', ${admin} )`)

        let usuario = await db.query(`SELECT * from usuario where id = ${record.insertId}`)

        const payload = {
            check: true
        };

        const token = jwt.sign(payload, req.app.get('llave'), {
            expiresIn: 1440
        });

        res.json({
            mensaje: 'Usuario creado',
            usuario,
            token
        })
        
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Query Error',
            error
        })
    }
});


module.exports = router;