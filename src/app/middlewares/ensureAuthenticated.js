const { Buffer } = require('buffer');
const AppError = require('../../utils/appError');

function ensureAuthenticated(request, response, next) {
  const b64auth = (request.headers.authorization || '').split(' ')[1] || '';
  const [username, password] = Buffer.from(b64auth, 'base64').toString().split(':');
  
  if (username === process.env.USERNAME && password === process.env.PASSWORD) {
    return next();
  }
  /*
  if (!username || !password) {
    throw new AppError('Verifique se sua senha ou usuário está correto!', 401)
  }*/
  
  response.set('WWW-Authenticate', 'Basic realm="401"');
  response.status(401).send('Autenticação obrigatória.');
}

module.exports = ensureAuthenticated;
