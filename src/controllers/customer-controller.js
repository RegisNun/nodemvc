'use strict'

const Customer = require('../models/customer');
const repository = require('../repositories/customer-repositories');
const emailServices = require('../services/email-service');
const authService = require('../services/auth-service');

const md5 = require('md5');
const customer = require('../models/customer');


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
        var data = await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY),
            roles: ["user"]
        });

        emailServices.sendEmail('Seja bem vinda', req.body.email, global.EMAIL_TMPL, '')

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

exports.authenticate = async (req, res, next) => {
    try {
        const customer = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });


        if (!customer) {
            res.status(404).send({
                message: 'Usuario ou senha inválidos'
            });
            return;
        }

        const token = await authService.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        });

        res.status(201).send({
            token: token,
            data: {
                name: customer.name,
                email: customer.email
            }
        });
    } catch (e) {
        res.status(400).send({
            message: 'Ocorreu alguem erro na requição',
            data: e
        });
    }
};

exports.refreshToken = async (req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        const customer = await repository.getById(data.id);

        if (!customer) {
            res.status(404).send({
                message: 'Cliente não encontrado'
            });
            return;
        }

        const tokenData = await authService.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        });

        res.status(201).send({
            token: token,
            data: {
                email: customer.email,
                name: customer.name
            }
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};