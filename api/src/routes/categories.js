const express = require('express');
const CategoriesController = require('../controllers/categories');

const ROUTER = express.Router();

ROUTER.get('', CategoriesController.getAll);
ROUTER.get('/:id', CategoriesController.getById);

ROUTER.post('', CategoriesController.create);

ROUTER.put('/:id', CategoriesController.update);

ROUTER.delete('/:id', CategoriesController.remove);

module.exports = ROUTER;
