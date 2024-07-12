const { Router } = require('express');
const ensureAuthenticated = require('../middleware/ensureAutheticated');


const CategoryController = require('../controllers/CategoryController');

const categoryController = new CategoryController();


const dishesRoutes = Router();

dishesRoutes.get("/", ensureAuthenticated, categoryController.index);

module.exports = dishesRoutes;