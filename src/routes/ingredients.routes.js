const { Router } = require('express');

const IngredientsController = require('../controllers/IngredientsController');
const ingredientsController = new IngredientsController();

const ingredientsRoutes = Router();
ingredientsRoutes.delete("/:id", ingredientsController.delete);

module.exports = ingredientsRoutes;