const AppError = require('../../utils/appError');

function ensureAuthenticated(request, response, next) {
  if (!request.isAuthenticated()) {
    throw new AppError('Você precisa logar');
  }
  
  return next();
}

module.exports = ensureAuthenticated;
