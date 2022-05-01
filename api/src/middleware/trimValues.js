function trimValues(request, _, next) {
  if (request.body) {
    Object.keys(request.body).forEach(key => {
      if (typeof request.body[key] === 'string') {
        request.body[key] = request.body[key].trim();
      }
    });
  }

  if (request.query) {
    Object.keys(request.query).forEach(key => {
      if (typeof request.query[key] === 'string') {
        request.query[key] = request.query[key].trim();
      }
    });
  }

  next();
}

module.exports = trimValues;
