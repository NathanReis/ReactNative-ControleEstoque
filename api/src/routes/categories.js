const express = require('express');
const CategoryController = require('../controllers/categories');

const ROUTER = express.Router();

ROUTER.get('', CategoryController.getAll);
ROUTER.get('/:id', CategoryController.getById);

ROUTER.post('', CategoryController.create);

ROUTER.put('/:id', CategoryController.update);

ROUTER.delete('/:id', CategoryController.remove);

module.exports = ROUTER;
