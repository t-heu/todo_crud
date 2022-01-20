const localpass = require('passport-local').Strategy;
const connection = require('./database/connection');
const bcrypt = require('bcryptjs');

module.exports = function(passport) {
  passport.use(new localpass({usernameField: 'name', passwordField: 'password'}, (name, password, done) => {
    
    connection("user").where({ name }).first().returning('*').then((data) => {
      
      if(!data) {
        return done(null, false, { message: 'nenhum usuário encontrado com esse login!' })
      }

      if(bcrypt.compare(password, data.password)) {
        return done(null, data); 
      } else {  
        return done(null, false, { message: 'Senha incorreta' });
      }
    });
  }));
  
  passport.serializeUser((data, done) => {
    done(null, data.id);
  });
  
  passport.deserializeUser((id, done)  => {
    connection("user").where({ id }).first().returning('*').then(data => {
      done(null, data);
    });
  });
}
