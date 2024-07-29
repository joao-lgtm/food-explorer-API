const { Router } = require("express");
const SalesOrderController = require("../controllers/SalesOrderController");

const ensureAuthenticated = require("../middleware/ensureAutheticated");

const salesOrderController = new SalesOrderController();

const salesOrderRoutes = Router();

salesOrderRoutes.use(ensureAuthenticated);

salesOrderRoutes.post("/", salesOrderController.create);
salesOrderRoutes.get("/", salesOrderController.show);
salesOrderRoutes.get("/all", salesOrderController.showAll);
salesOrderRoutes.get("/user/all", salesOrderController.showAllUserId);
salesOrderRoutes.get("/:id", salesOrderController.index);
salesOrderRoutes.delete("/:id", salesOrderController.delete);

module.exports = salesOrderRoutes;