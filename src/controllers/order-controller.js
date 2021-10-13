'use strict'

const guid = require('guid');
const Order = require('../models/order');
const repository = require('../repositories/order-repository');
const authService = require('../services/auth-service');


exports.get = async (req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);

    } catch (e) {
        res.status(400).send({
            message: "Erro ao pesquisar",
            data: e
        });
    }
};


exports.post = async (req, res, next) => {
    try {

        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        const logado = await authService.decodeToken(token);

        console.log(logado);

        var data = await repository.create(
            {
                customer: logado.id,
                number: guid.raw().substring(0, 6),
                items: req.body.items
            }
        );
        res.status(201).send(data);
    } catch (e) {
        res.status(400).send({
            message: 'Falha durante cadastro!' + e,
            data: e
        });
    }
};


exports.put = async (req, res, next) => {

    var data = await repository.update(req.params.id, req.body);

    try {
        var data = await repository.update(req.params.id, req.body);
        res.status(200).set(data);
    } catch (e) {
        res.status(400).send({
            message: 'Falha a alterar cadastro!',
            data: e
        })
    }
};

exports.delete = async (req, res, next) => {

    try {
        var data = await repository.delete(req.body.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(400).send({
            message: 'Falha  ao remover o produto ' + e,
            data: e
        });
    }
};

