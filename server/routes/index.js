import express from 'express';
import jwt from 'jsonwebtoken';
const router = express.Router();

const db = require('../db');

router.get('/login', async (req, res) => {
    let { correo, password }  = req.body;
    try{
        const usuario = await db.query(`SELECT * from usuario where correo = '${correo}' and password = '${password}'`);
        if (usuario.length > 0){
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
        }else{
            res.json({ mensaje: 'Usuario o contraseña incorrectos'});
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

    try{
        let record = await db.query(`INSERT into usuario (nombre, correo, password, telefono, direccion, cp, ciudad, admin) values ('${nombre}', '${correo}', '${password}', '${telefono}', '${direccion}', '${cp}', '${ciudad}', ${admin} )`)

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