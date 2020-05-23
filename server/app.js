
import express from 'express';

const app = express();

import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// app.get('/', (req, res) => {
//     res.send('Computo en la nube');
// });

import history from 'connect-history-api-fallback';
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

// Asignar puerto
app.set('port', process.env.PORT || 3000);


app.listen(app.get('port'), () => {
    console.log('Server on ', app.get('port'));
});

