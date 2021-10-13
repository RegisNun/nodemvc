'use strict'

const express = require('express');
const app = express();
const config = require('./config');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//carrega rotas
const indexRouter    = require('./router/index-route');
const productRouter  = require('./router/usuarios-route');
const usuariosRouter = require('./router/usuarios-route');

const customerRouter = require('./router/customer-route');
const orderRouter    = require('./router/order-route');

//connecta com o banco
// mongoose.connect(config.connectionString);

// const connection = mongoose.connection;
// connection.once('open', () => {
//     console.log("MongoDB database connection established successfully");
// })


//Funciona como um mideware --> verifica antes de chegar na rota
app.use(bodyParser.json({
    limit: '3mb'
}));
app.use(bodyParser.urlencoded({ extended: false }));


// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});


const router = express.Router();
app.use('/', indexRouter);
app.use('/products', productRouter);
app.use('/usuarios', productRouter);
app.use('/customers', customerRouter);
app.use('/customers', customerRouter);
app.use('/order', orderRouter);

module.exports = app;