import express from 'express';
const router = express.Router();

router.get('/hola', (req, res) => {
    console.log('Hola3');
    res.json({hola:'hola'})
});


module.exports = router;