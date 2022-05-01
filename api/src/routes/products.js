const express = require('express');
const ProductsController = require('../controllers/products');

const ROUTER = express.Router();

ROUTER.get('', ProductsController.getAll);
ROUTER.get('/:id', ProductsController.getById);

ROUTER.post('', ProductsController.create);

ROUTER.put('/:id', ProductsController.update);

ROUTER.delete('/:id', ProductsController.remove);

module.exports = ROUTER;
