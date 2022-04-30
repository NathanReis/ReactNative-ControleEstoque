const Category = require('../models/category');

async function create(category) {
  await category.save();
}

async function getAll() {
  return await Category.find({}).sort({ description: 'asc' });
}

async function getById(id) {
  return await Category.findById(id);
}

async function remove(id) {
  await Category.findByIdAndRemove(id);
}

async function update(model) {
  await Category.findByIdAndUpdate(model._id, model);
}

module.exports = { create, getAll, getById, remove, update };
