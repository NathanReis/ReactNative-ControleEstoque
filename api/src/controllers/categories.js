const CategoryBll = require('../blls/category');
const Category = require('../models/category');

async function create(request, response) {
  let category = new Category(request.body);

  let { valid, data } = await CategoryBll.create(category);

  return response.status(valid ? 201 : 400).json(data);
}

async function getAll(_, response) {
  return response.json(await CategoryBll.getAll());
}

async function getById(request, response) {
  let id = request.params.id;

  return response.json(await CategoryBll.getById(id));
}

async function remove(request, response) {
  let id = request.params.id;

  let { valid, data } = await CategoryBll.remove(id);

  return response.status(valid ? 200 : 400).json(data);
}

async function update(request, response) {
  let id = request.params.id;
  let category = new Category({ ...request.body, _id: id });

  let { valid, data } = await CategoryBll.update(category);

  return response.status(valid ? 200 : 400).json(data);
}

module.exports = { create, getAll, getById, remove, update };
