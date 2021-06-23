const express = require('express');
const app = express();

//utiliza o express.json para converter as camadas
app.use(express.json());

//instancia o uso do posts pelo server.
app.use('/', require('./route/postsRoute'));

app.use(function (error, req, res, next) {
	if (error.message === 'Já existe um Post com esse título') {
		return res.status(409).send(e.message);
	}
	if (error.message === 'Post não encontrado') {
		return res.status(404).send(e.message);
	}
	res.status(500).send(e.message);
});

app.listen(3000);