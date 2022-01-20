const connection = require('../../database/connection');
const AppError = require('../../utils/appError');

module.exports = {
  async index(request, response) {
    const { id } = request.params;
    
    if (!id) {
      throw new AppError('id not found!');
    }
    
    const branchs = await connection('branch')
      .select('*');
    
    const [data] = await connection('client')
      .where({id})
      .select('*');
    
    return response.render('editClient', { data, branchs });
  }
};
