const { Router } = require('express')

const TodoController = require('./app/controller/TodoController');
const GetTodoController = require('./app/controller/GetTodoController');
const BranchController = require('./app/controller/BranchController');

const ensureAuthenticated = require('./app/middlewares/ensureAuthenticated');

const routes = Router();

routes.get('/', TodoController.index);
routes.post('/', ensureAuthenticated, TodoController.store);
routes.get('/edit/:id', ensureAuthenticated, GetTodoController.index);
routes.post('/edit/:id', ensureAuthenticated, TodoController.update);
routes.post('/delete/:id', ensureAuthenticated, TodoController.delete);

routes.post('/search', TodoController.index);

routes.get('/branch', BranchController.index);
routes.post('/branch', ensureAuthenticated, BranchController.store);
routes.post('/branch/edit/:id', ensureAuthenticated, BranchController.update);
routes.post('/branch/delete/:id', ensureAuthenticated, BranchController.delete);

module.exports = routes;
