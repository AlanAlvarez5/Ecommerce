import express from 'express';
const router = express.Router();

const db = require('../db');

router.get('/select',  async (req, res) => {
    await db.query(`SELECT * FROM usuario`, (ex, rows) => {
        if (ex){
            console.log(ex);
            res.send([])
        } else{
            res.json(rows);
        }
    });

});


module.exports = router;