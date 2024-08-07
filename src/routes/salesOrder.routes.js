const { Router } = require("express");
const SalesOrderController = require("../controllers/SalesOrderController");
const verifyUserAuthorization = require("../middleware/verifyUserAuthorization");
const ensureAuthenticated = require("../middleware/ensureAutheticated");

const salesOrderController = new SalesOrderController();

const salesOrderRoutes = Router();

salesOrderRoutes.use(ensureAuthenticated);

salesOrderRoutes.post("/", salesOrderController.create);
salesOrderRoutes.get("/", salesOrderController.show);
salesOrderRoutes.get("/all", verifyUserAuthorization(["admin"]), salesOrderController.showAll);
salesOrderRoutes.get("/user/all", salesOrderController.showAllUserId);
salesOrderRoutes.get("/:id", salesOrderController.index);
salesOrderRoutes.delete("/:id", salesOrderController.delete);
salesOrderRoutes.patch("/", salesOrderController.update);

module.exports = salesOrderRoutes;