const { Router } = require("express");
const SalesOrderController = require("../controllers/SalesOrderController");

const ensureAuthenticated = require("../middleware/ensureAutheticated");

const salesOrderRoutes = Router();

const salesOrderController = new SalesOrderController();

salesOrderRoutes.post("/", ensureAuthenticated, salesOrderController.create);
salesOrderRoutes.get("/", ensureAuthenticated, salesOrderController.show);
salesOrderRoutes.get("/:id", ensureAuthenticated, salesOrderController.index);
salesOrderRoutes.delete("/:id", ensureAuthenticated, salesOrderController.delete);

module.exports = salesOrderRoutes;