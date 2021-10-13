'use strict';

const express = require('express');
const router = express.Router();

const controller = require('../controllers/usuarios-controller');
const authService = require('../services/auth-service');

router.get('/', controller.get);

router.get('/admin/:id', authService.authorize, controller.getById);
router.get('/tag/:tag', authService.authorize, controller.getByTag);

router.post('/', controller.post);

router.put('/:id', authService.isAdmin, controller.put);
router.delete('/', authService.isAdmin, controller.delete);




module.exports = router;