const { Router } = require('express');
const multer = require("multer");
const ensureAuthenticated = require('../middleware/ensureAutheticated');
const verifyUserAuthorization = require("../middleware/verifyUserAuthorization");

const uploadConfig = require("../configs/upload")
const DishesController = require('../controllers/DishesController');

const dishesController = new DishesController();

const upload = multer(uploadConfig.MULTER);


const dishesRoutes = Router();

dishesRoutes.use(ensureAuthenticated)

dishesRoutes.post("/", verifyUserAuthorization(["admin"]), upload.single("img"), dishesController.create);
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.get("/", dishesController.index);
dishesRoutes.patch("/update", verifyUserAuthorization(["admin"]), upload.single("img"), dishesController.update);
dishesRoutes.delete("/:id", verifyUserAuthorization(["admin"]), dishesController.delete);

module.exports = dishesRoutes;