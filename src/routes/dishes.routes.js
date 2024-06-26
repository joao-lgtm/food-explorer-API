const { Router } = require('express');
const multer = require("multer");
const ensureAuthenticated = require('../middleware/ensureAutheticated');

const uploadConfig = require("../configs/upload")
const DishesController = require('../controllers/DishesController');

const dishesController = new DishesController();

const upload = multer(uploadConfig.MULTER);


const dishesRoutes = Router();

dishesRoutes.post("/", ensureAuthenticated, upload.single("img"), dishesController.create);
dishesRoutes.get("/:id", ensureAuthenticated, dishesController.show);
dishesRoutes.get("/", ensureAuthenticated, dishesController.index);
dishesRoutes.patch("/update", ensureAuthenticated, upload.single("img"), dishesController.update);
dishesRoutes.delete("/:id", ensureAuthenticated, dishesController.delete);

module.exports = dishesRoutes;