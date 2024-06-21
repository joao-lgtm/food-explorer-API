const { Router } = require("express");
const SalesOrderController = require("../controllers/SalesOrderController");

const ensureAutheticated = require("../middleware/ensureAutheticated");

const salesOrderRoutes = Router();

const salesOrderController = new SalesOrderController();

salesOrderRoutes.post("/", ensureAutheticated, salesOrderController.create);
salesOrderRoutes.get("/", ensureAutheticated, salesOrderController.show);
salesOrderRoutes.get("/:id", ensureAutheticated, salesOrderController.index);
salesOrderRoutes.delete("/:id", ensureAutheticated, salesOrderController.delete);

module.exports = salesOrderRoutes;