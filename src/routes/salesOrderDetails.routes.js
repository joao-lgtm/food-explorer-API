const { Router } = require("express");
const SalesOrderDetailsController = require("../controllers/SalesOrderDetailsController");

const ensureAutheticated = require("../middleware/ensureAutheticated");

const salesOrderDetailsRoutes = Router();

const salesOrderDetailsController = new SalesOrderDetailsController();

salesOrderDetailsRoutes.delete("/", ensureAutheticated, salesOrderDetailsController.delete);
salesOrderDetailsRoutes.patch("/", ensureAutheticated, salesOrderDetailsController.update);
salesOrderDetailsRoutes.get("/", ensureAutheticated, salesOrderDetailsController.show);

module.exports = salesOrderDetailsRoutes;