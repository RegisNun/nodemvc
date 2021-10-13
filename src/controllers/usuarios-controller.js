'use strict'

const Product = require('../models/Product');
const repository = require('../repositories/product-repositories');
const azure = require('azure-storage');
const guid = require('guid');
const config = require('../config');


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

exports.getById = async (req, res, next) => {

    try {
        var data = await repository.getById(res.params.id);
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

        let contract = new ValidationContract();
        contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres');
        contract.hasMinLen(req.body.slug, 3, 'O título deve conter pelo menos 3 caracteres');
        contract.hasMinLen(req.body.description, 3, 'O título deve conter pelo menos 3 caracteres');

        // Se os dados forem inválidos
        if (!contract.isValid()) {
            res.status(400).send(contract.errors()).end();
            return;
        }

        //criar bloco service
        const blobSvc = azure.createBlobService(config.containerConnnectionString);

        let filename = guid.raw().toString() + '.jpg';
        let rawdata = req.body.image;
        let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        let type = matches[1];
        let buffer = new Buffer(matches[2], 'base64');

        // Salva a imagem
        await blobSvc.createBlockBlobFromText('product-images', filename, buffer, {
            contentType: type
        }, function (error, result, response) {
            if (error) {
                filename = 'default-product.png'
            }
        });

        const data =  await repository.create({
                            title: req.body.title,
                            slug: req.body.slug,
                            description: req.body.description,
                            price: req.body.price,
                            active: true,
                            tags: req.body.tags,
                            image: 'https://nodestoreregisnun.blob.core.windows.net/product-images/' + filename
                        });

        res.status(201).send(data);

    } catch (e) {
        res.status(400).send({
            message: 'Falha durante cadastro!',
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

exports.getByTag = async (req, res, next) => {

    try {
        var data = repository.getByTag();
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({
            message: "Erro ao pesquisar",
            data: e
        });
    }

};



