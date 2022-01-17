const connection = require('../../database/connection');
const generateUniqueId = require('../../utils/generateUniqueId');
const AppError = require('../../utils/appError');

module.exports = {
  async index(request, response) {
    const data = await connection('branchs')
      .select('*');
    
    return response.render('branch', { data });
  },

  async store(request, response) {
    const { code_branch, city } = request.body;
    
    if (!code_branch) {
      throw new AppError('Informe Código!');
    }
    
    if (!city) {
      throw new AppError('Informe a cidade!');
    }
    
    const branchExist = await connection("branchs").where({ code_branch }).first().returning('*');
    
    if (branchExist) {
      throw new AppError('Filial já existente');
    }
    
    const id = generateUniqueId();
    
    await connection('branchs').insert({
      id,
      code_branch: Number(code_branch),
      city,
    });
    
    return response.redirect('/branch');
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
    
    await connection("branchs").update(data).where({ id });
    
    return response.redirect('/branch');
  },
  
  async delete(request, response) {
    const { id } = request.params;
    
    if (!id) {
      throw new AppError('id not found!');
    }

    await connection('branch').where('id', id).delete();
    
    return response.redirect('/branch');
  }
};
