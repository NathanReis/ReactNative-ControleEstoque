const CategoryBll = require('../blls/category');
const Category = require('../models/category');

async function create(request, response) {
  let category = new Category(request.body);

  await CategoryBll.create(category);

  return response.status(201).json({ _id: category._id });
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

  await CategoryBll.remove(id);

  return response.json({ _id: id });
}

async function update(request, response) {
  let id = request.params.id;
  let category = new Category({ ...request.body, _id: id });

  await CategoryBll.update(category);

  return response.json({ _id: id });
}

module.exports = { create, getAll, getById, remove, update };
