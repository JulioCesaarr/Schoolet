const express = require('express');
const routes = require('./Routes')

const app = express()
const port = 6000;

routes(app)

app.listen(port, () => console.log(`Servidor está rodando na porta ${port}`))

module.exports = app