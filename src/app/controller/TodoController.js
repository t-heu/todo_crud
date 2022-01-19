const connection = require('../../database/connection');
const AppError = require('../../utils/appError');

module.exports = {
  async index(request, response) {
    let { page = 1 } = request.query;
    const { q, type, branch } = request.body;
    let data = [];
    
    const [count] = await connection('todo').count().returning('*');
    
    const branchs = await connection('branchs')
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
        data = await connection('todo')
          .join('branchs', 'branchs.id', '=', 'todo.branch_id')
          .limit(5)
          .offset((page - 1) * 5)
          .where(`${type}`, 'ILIKE', `%${q}%`)
          .select(['todo.*', 'branchs.city']);
      } else {
        data = await connection('todo')
          .join('branchs', 'branchs.id', '=', 'todo.branch_id')
          .limit(5)
          .offset((page - 1) * 5)
          .where(`${type}`, 'ILIKE', `%${q}%`)
          .where('branch_id', `${branch}`)
          .select(['todo.*', 'branchs.city']);
      }
    } else {
      data = await connection('todo')
        .join('branchs', 'branchs.id', '=', 'todo.branch_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select(['todo.*', 'branchs.city']);
    }
    
    return response.render('todo', { data, branchs, page });
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
    
    const todoExist = await connection("todo").where({ code }).first().returning('*');
    
    if (todoExist) {
      throw new AppError('Código de cliente já cadastrado!');
    }
    
    await connection('todo').insert({
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
    
    await connection("todo").update(data).where({ id });
    
    return response.redirect('/');
  },
  
  async delete(request, response) {
    const { id } = request.params;
    
    if (!id) {
      throw new AppError('id not found!');
    }

    await connection('todo').where('id', id).delete();
    
    return response.redirect('/');
  }
};
