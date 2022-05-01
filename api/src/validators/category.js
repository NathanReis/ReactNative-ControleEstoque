const Category = require('../models/category');

async function validateCreate({ _id, description }) {
  let errors = [];

  errors.push(...await validateDescription(_id, description));

  return errors;
}

async function validateRemove(id) {
  let errors = [];

  return errors;
}

async function validateUpdate({ _id, description }) {
  let errors = [];

  if (!await Category.findById(_id)) {
    errors.push('Categoria inexistente');
  }

  errors.push(...await validateDescription(_id, description));

  return errors;
}

module.exports = { validateCreate, validateRemove, validateUpdate }

async function validateDescription(id, description) {
  let errors = [];

  if (!description) {
    errors.push('Descrição é obrigatória');
  } else if (description.length > 15) {
    errors.push('Descrção deve ter no máximo 15 caracteres');
  }

  let existentByDescription = await Category.findOne({ description });

  if (existentByDescription && !existentByDescription._id.equals(id)) {
    errors.push('Descrição já existente');
  }

  return errors;
}
