const connection = require('../../database/connection');
const AppError = require('../../utils/appError');

module.exports = {
  async index(request, response) {
    let { page = 1 } = request.query;
    const { q, type, branch } = request.body;
    let data = [];
    
    const [count] = await connection('client').count().returning('*');
    
    const branchs = await connection('branch')
      .select('*');
    
    const calcPagesMax = Math.ceil(count.count / 5);
    
    if (page < 1) {
      return response.redirect(`/?page=1`);
    }
    
    if (page > calcPagesMax && calcPagesMax >= 1) {
      return response.redirect(`/?page=${calcPagesMax}`);
    }
    
    if (q) {
      if (branch === '0') {
        data = await connection('client')
          .join('branch', 'branch.id', '=', 'client.branch_id')
          .limit(5)
          .offset((page - 1) * 5)
          .where(`${type}`, 'ILIKE', `%${q}%`)
          //.collate('utf8_general_ci')
          .select(['client.*', 'branch.city']);
       } else {
        data = await connection('client')
          .join('branch', 'branch.id', '=', 'client.branch_id')
          .limit(5)
          .offset((page - 1) * 5)
          //.collate('utf8_general_ci')
          .where(`${type}`, 'ILIKE', `%${q}%`)
          .where('branch_id', `${branch}`)
          .select(['client.*', 'branch.city']);
      }
    } else {
      data = await connection('client')
        .join('branch', 'branch.id', '=', 'client.branch_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select(['client.*', 'branch.city']);
    }
    
    return response.render('client', { data, branchs, page });
  },

  async store(request, response) {
    const { code, corporate_name, name, branch } = request.body;
    
    if (!code) {
      throw new AppError('Informe Código!');
    }
    
    if (!corporate_name) {
      throw new AppError('Informe Razão social do cliente!');
    }
    
    if (!name) {
      throw new AppError('Informe Nome do cliente!');
    }
    
    const todoExist = await connection("client").where({ code }).first().returning('*');
    
    if (todoExist) {
      throw new AppError('Código de cliente já cadastrado!');
    }
    
    await connection('client').insert({
      code,
      corporate_name,
      name,
      branch_id: branch
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
    
    await connection("client").update(data).where({ id });
    
    return response.redirect('/');
  },
  
  async delete(request, response) {
    const { id } = request.params;
    
    if (!id) {
      throw new AppError('id not found!');
    }

    await connection('client').where('id', id).delete();
    
    return response.redirect('/');
  }
};
