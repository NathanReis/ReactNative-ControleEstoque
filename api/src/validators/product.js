const Category = require('../models/category');
const Product = require('../models/product');

async function validateCreate(product) {
  let errors = [];
  let {
    _id,
    _idCategory,
    description,
    amount,
    minAmount,
    active
  } = product;

  errors.push(...await validateCategory(_idCategory));
  errors.push(...await validateDescription(_id, description));
  errors.push(...validateAmount(amount));
  errors.push(...validateMinAmount(minAmount));
  errors.push(...validateActive(active));

  return errors;
}

async function validateRemove(id) {
  let errors = [];

  return errors;
}

async function validateUpdate(product) {
  let errors = [];
  let {
    _id,
    _idCategory,
    description,
    amount,
    minAmount,
    active
  } = product;

  if (!await Product.findById(_id)) {
    errors.push('Produto inexistente');
  }

  errors.push(...await validateCategory(_idCategory));
  errors.push(...await validateDescription(_id, description));
  errors.push(...validateAmount(amount));
  errors.push(...validateMinAmount(minAmount));
  errors.push(...validateActive(active));

  return errors;
}

module.exports = { validateCreate, validateRemove, validateUpdate }

async function validateCategory(idCategory) {
  let errors = [];

  if (!await Category.findById(idCategory)) {
    errors.push('Categoria inexistente');
  }

  return errors;
}

async function validateDescription(id, description) {
  let errors = [];

  if (!description) {
    errors.push('Descrição é obrigatória');
  } else if (description.length > 30) {
    errors.push('Descrção deve ter no máximo 30 caracteres');
  }

  let existentByDescription = await Product.findOne({ description });

  if (existentByDescription && !existentByDescription._id.equals(id)) {
    errors.push('Descrição já existente');
  }

  return errors;
}

function validateAmount(amount) {
  let errors = [];

  if (!amount && amount !== 0) {
    errors.push('Quantidade é obrigatória');
  } else if (amount < 0) {
    errors.push('Quantidade não pode ser negativa');
  }

  return errors;
}

function validateMinAmount(minAmount) {
  let errors = [];

  if (!minAmount) {
    errors.push('Quantidade mínima é obrigatória');
  } else if (minAmount < 0) {
    errors.push('Quantidade mínima não pode ser negativa');
  }

  return errors;
}

function validateActive(active) {
  let errors = [];

  if (active !== true && active !== false) {
    errors.push('Ativo é obrigatório');
  }

  return errors;
}
