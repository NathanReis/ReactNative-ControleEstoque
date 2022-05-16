const ProductBll = require('../blls/product');
const Product = require('../models/product');

async function create(request, response) {
  let product = new Product(request.body);

  let { valid, data } = await ProductBll.create(product);

  return response.status(valid ? 201 : 400).json(data);
}

async function getAll(_, response) {
  return response.json(await ProductBll.getAll());
}

async function getById(request, response) {
  let id = request.params.id;

  return response.json(await ProductBll.getById(id));
}

async function getProductsRunningOut(_, response) {
  return response.json(await ProductBll.getProductsRunningOut());
}

async function remove(request, response) {
  let id = request.params.id;

  let { valid, data } = await ProductBll.remove(id);

  return response.status(valid ? 200 : 400).json(data);
}

async function update(request, response) {
  let id = request.params.id;
  let product = new Product({ ...request.body, _id: id });

  let { valid, data } = await ProductBll.update(product);

  return response.status(valid ? 200 : 400).json(data);
}

module.exports = { create, getAll, getById, getProductsRunningOut, remove, update };
