const Category = require('../models/category');
const Product = require('../models/product');
const ProductValidator = require('../validators/product');

async function create(product) {
  let errors = await ProductValidator.validateCreate(product);

  if (errors.length !== 0) {
    return { valid: false, data: errors };
  }

  await product.save();

  return { valid: true, data: { _id: product._id } };
}

async function getAll() {
  let products = await Product.find({}).sort({ description: 'asc' });
  let productsWithCategory = [];

  for (let product of products) {
    productsWithCategory.push(await appendCategoryOnProduct(product));
  }

  return productsWithCategory;
}

async function getById(id) {
  let product = await Product.findById(id);

  return await appendCategoryOnProduct(product);
}

async function getProductsRunningOut() {
  let products = await Product.$where('this.amount <= this.minAmount').sort({ amount: 'asc' });
  let productsWithCategory = [];

  for (let product of products) {
    productsWithCategory.push(await appendCategoryOnProduct(product));
  }

  return productsWithCategory;
}

async function remove(id) {
  let errors = await ProductValidator.validateRemove(id);

  if (errors.length !== 0) {
    return { valid: false, data: errors };
  }

  await Product.findByIdAndRemove(id);

  return { valid: true, data: { _id: id } };
}

async function update(product) {
  let errors = await ProductValidator.validateUpdate(product);

  if (errors.length !== 0) {
    return { valid: false, data: errors };
  }

  await Product.findByIdAndUpdate(product._id, product);

  return { valid: true, data: { _id: product._id } };
}

module.exports = { create, getAll, getById, getProductsRunningOut, remove, update };

async function appendCategoryOnProduct(product) {
  let category = await Category.findById(product._idCategory);

  return { ...product._doc, category };
}
