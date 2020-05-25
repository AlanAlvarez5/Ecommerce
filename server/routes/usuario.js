import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const router = express.Router();

router.use((req,res, next) => {
    const token = req.headers.authorization.split(' ')[1];
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
    if ((!req.decoded.admin && req.decoded.id == id) || req.decoded.admin){
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
    } else{
        return res.status(400).json({
            mensaje: 'No permitido'
        });
    }
    
});

router.get('/add', async (req, res) => {
    if (req.decoded.admin){
        let { nombre, correo, password, telefono, direccion, cp, ciudad, admin } = req.body;
    
        const {salt_rounds} = require('../keys');
        const hashed  = bcrypt.hashSync(password, salt_rounds);

        try{
            let record = await db.query(`INSERT into usuario (nombre, correo, password, telefono, direccion, cp, ciudad, admin) values ('${nombre}', '${correo}', '${hashed}', '${telefono}', '${direccion}', '${cp}', '${ciudad}', ${admin} )`)
    
            let usuario = await db.query(`SELECT * from usuario where id = ${record.insertId}`)
    
            res.json({
                mensaje: 'USER_REGISTERED',
                usuario,
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

router.put('/edit/:id', async (req, res) => {

    let id = req.params.id;
    if ((!req.decoded.admin && req.decoded.id == id) || req.decoded.admin){
        let { nombre, correo, password, telefono, direccion, cp, ciudad, admin } = req.body;
    
        const {salt_rounds} = require('../keys');
        const hashed  = bcrypt.hashSync(password, salt_rounds);

        try{
            let record = await db.query(`UPDATE usuario SET nombre = '${nombre}', correo = '${correo}', password = '${hashed}', telefono = '${telefono}', direccion = '${direccion}', cp = '${cp}', ciudad = '${ciudad}', admin = ${admin} where id =  ${id}`)
    
            let usuario = await db.query(`SELECT * from usuario where id = ${record.insertId}`)
    
            res.json({
                mensaje: 'USER_MODIFIED',
                usuario,
            })
            
        } catch (error) {
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
            await db.query(`DELETE from usuario where id = ${id}`)
    
            res.json({
                mensaje: 'USER_DELETED',
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