function catchError(error, _, response, _) {
  console.error(error);

  return response.status(500).json(['Erro inesperado', error.message]);
}

module.exports = catchError;
