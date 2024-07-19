const { Router } = require("express");
const SalesOrderDetailsController = require("../controllers/SalesOrderDetailsController");

const ensureAutheticated = require("../middleware/ensureAutheticated");

const salesOrderDetailsController = new SalesOrderDetailsController();

const salesOrderDetailsRoutes = Router();

salesOrderDetailsRoutes.use(ensureAutheticated)

salesOrderDetailsRoutes.delete("/", salesOrderDetailsController.delete);
salesOrderDetailsRoutes.patch("/", salesOrderDetailsController.update);
salesOrderDetailsRoutes.get("/:id", salesOrderDetailsController.show);

module.exports = salesOrderDetailsRoutes;