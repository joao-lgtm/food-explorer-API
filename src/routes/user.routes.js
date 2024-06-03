const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload")
const UserController = require("../controllers/UsersController");

const ensureAutheticated = require("../middleware/ensureAutheticated");

const userRoutes = Router();
const upload = multer(uploadConfig.MULTER)

const userController = new UserController();



userRoutes.post("/", userController.create);
userRoutes.patch("/update", ensureAutheticated, upload.single("avatar"), userController.update);

module.exports = userRoutes;