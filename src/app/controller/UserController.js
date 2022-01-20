const connection = require('../../database/connection');
const AppError = require('../../utils/appError');
const bcrypt = require('bcryptjs');

module.exports = {
  async index(request, response) {
    return response.render('');
  },

  async store(request, response) {
    const { name, password } = request.body;
    
    if (!name) {
      throw new AppError('Informe o nome!');
    }
    
    if (!password) {
      throw new AppError('Informe a senha!');
    }
    
    await connection('user').insert({
      name,
      password: await bcrypt.hash(password, 8),
    });
    
    return response.redirect('/');
  },
  
  async update(request, response) {
    const { id } = request.params;
    const data = request.body;
    
    if (!id) {
      throw new AppError('id not found!');
    }
    
    if (!data) {
      throw new AppError('Informe conteúdo para atualizar!');
    }
    
    await connection("user").update(data).where({ id });
    
    return response.redirect('/branch');
  },
  
  async delete(request, response) {
    const { id } = request.params;
    
    if (!id) {
      throw new AppError('id not found!');
    }

    await connection('user').where('id', id).delete();
    
    return response.redirect('/');
  }
};
