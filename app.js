
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

app.use('/livro', require('./routes/livro'));

app.use((req, res) => res.status(404).json({ erro: 'Rota nao encontrada' }));

module.exports = app;
