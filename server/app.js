
import express from 'express';

const app = express();

import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import history from 'connect-history-api-fallback';

// Asignar puerto
app.set('port', process.env.PORT || 3000);

// Middelwares
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true})); //--Cuidado con imagenes
  
// Usar views
app.use(express.static(path.join(__dirname, 'views')));

// Global
app.use((req, res, next) => {
    next();
});

// Routes
app.use('/api', require('./routes'));
app.use('/api', require('./routes/usuario'));


app.use(history());


app.listen(app.get('port'), () => {
    console.log('Server on ', app.get('port'));
});

