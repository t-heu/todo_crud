const { Router } = require('express')

const ClientController = require('./app/controller/ClientController');
const GetClientController = require('./app/controller/GetClientController');
const BranchController = require('./app/controller/BranchController');
const UserController = require('./app/controller/UserController');
const SessionController = require('./app/controller/SessionController');

const ensureAuthenticated = require('./app/middlewares/ensureAuthenticated');

const routes = Router();

// routes.get('/', (request, response) => response.redirect('/client'));

routes.get('/', ClientController.index);
routes.post('/client', ensureAuthenticated, ClientController.store);
routes.post('/client/edit/:id', ensureAuthenticated, ClientController.update);
routes.post('/client/delete/:id', ensureAuthenticated, ClientController.delete);

routes.get('/client/:id', ensureAuthenticated, GetClientController.index);

routes.post('/client/search', ClientController.index);

routes.get('/branch', BranchController.index);
routes.post('/branch', ensureAuthenticated, BranchController.store);
routes.post('/branch/edit/:id', ensureAuthenticated, BranchController.update);
routes.post('/branch/delete/:id', ensureAuthenticated, BranchController.delete);

// login
routes.get('/session', SessionController.index);
routes.post('/session', SessionController.store);
routes.post('/user', UserController.store);

module.exports = routes;
