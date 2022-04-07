const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const apiRouter = require('./src/routes/api');

const app = express();

require('./src/db');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.use(cors({ origin: '*' }));

app.use('/api', apiRouter);

app.listen(3000, ()=>{
    console.log('Servidor arrancado!');
})

