
import express from 'express';

const app = express();

// Ver todas peticiones que se hagan al servidor 
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import history from 'connect-history-api-fallback';
// Subir imagenes
import multer from 'multer';


// Asignar puerto
app.set('port', process.env.PORT || 3000);

// jws
const { llave } = require('./keys');
app.set('llave', llave);

// Middlewares
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true})); 

const storage = multer.diskStorage({
    destination: 'uploads/products',
    filename: (req , file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
  
app.use(multer({
    storage,
    dest: 'uploads/products',
    // limits: {fileSize: 1000000}
}).single('imagen'))

// Usar views
app.use(express.static(path.join(__dirname, 'public/')));
app.use(express.static(path.join(__dirname, 'uploads/')));

// Routes
app.use('/api', require('./routes'));
app.use('/api/usuario', require('./routes/usuario'));
app.use('/api/producto', require('./routes/producto'));
app.use('/api/compra', require('./routes/compra'));


app.use(history());


app.listen(app.get('port'), () => {
    console.log('Server on ', app.get('port'));
});
