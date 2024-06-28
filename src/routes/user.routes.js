const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload")
const UserController = require("../controllers/UsersController");
const UserValidatedController = require("../controllers/UserValidatedController");

const ensureAuthenticated = require("../middleware/ensureAutheticated");

const userRoutes = Router();
const upload = multer(uploadConfig.MULTER)

const userController = new UserController();
const userValidatedController = new UserValidatedController();


userRoutes.post("/", userController.create);
userRoutes.patch("/update", ensureAuthenticated, upload.single("avatar"), userController.update);
userRoutes.get("/validated", ensureAuthenticated, userValidatedController.index);

module.exports = userRoutes;