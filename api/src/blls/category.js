const Category = require('../models/category');
const Product = require('../models/product');
const CategoryValidator = require('../validators/category');

async function create(category) {
  let errors = await CategoryValidator.validateCreate(category);

  if (errors.length !== 0) {
    return { valid: false, data: errors };
  }

  await category.save();

  return { valid: true, data: { _id: category._id } };
}

async function getAll() {
  return await Category.find({}).sort({ description: 'asc' });
}

async function getById(id) {
  return await Category.findById(id);
}

async function remove(id) {
  let errors = await CategoryValidator.validateRemove(id);

  if (errors.length !== 0) {
    return { valid: false, data: errors };
  }

  await Product.deleteMany({ _idCategory: id });
  await Category.findByIdAndRemove(id);

  return { valid: true, data: { _id: id } };
}

async function update(category) {
  let errors = await CategoryValidator.validateUpdate(category);

  if (errors.length !== 0) {
    return { valid: false, data: errors };
  }

  await Category.findByIdAndUpdate(category._id, category);

  return { valid: true, data: { _id: category._id } };
}

module.exports = { create, getAll, getById, remove, update };
