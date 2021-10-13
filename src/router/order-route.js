'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/order-controller');
const authSevice = require('../services/auth-service');

router.get('/', controller.get);


router.post('/', authSevice.authorize, controller.post);
router.put('/:id', authSevice.authorize, controller.put);
router.delete('/', authSevice.authorize, controller.delete);



module.exports = router;