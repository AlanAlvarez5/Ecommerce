import express from 'express';
const router = express.Router();

const db = require('../db');

router.get('/select',  async (req, res) => {
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