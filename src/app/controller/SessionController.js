const AppError = require('../../utils/appError');
const passport = require('passport');

module.exports = {
  async index(requese, response) {
    return response.render('login')
  },
  
  async store(request, response, next) {
    const { name, password } = request.body;
    
    if (!name || !password) {
      throw new AppError('Campos vazio!');
    }
      
    return passport.authenticate('local', {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true
    })(request, response, next);
  }
};
