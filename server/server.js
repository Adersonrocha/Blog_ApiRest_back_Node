const express = require('express');
const app = express();

//utiliza o express.json para converter as camadas
app.use(express.json());

//instancia o uso do posts pelo server.
app.use('/', require('./route/postsRoute'));

app.listen(3000);