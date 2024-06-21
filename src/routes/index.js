const { Router } = require("express");

const usersRouter = require("./user.routes");
const sessionsRouter = require("./sessions.routes");
const dishesRouter = require("./dishes.routes");
const ingredientsRouter = require("./ingredients.routes");
const salesOrderRouter = require("./salesOrder.routes");
const salesOrderDetailsRoutes = require("./salesOrderDetails.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/dishes", dishesRouter);
routes.use("/ingredients", ingredientsRouter);
routes.use("/salesOrder", salesOrderRouter);
routes.use("/details", salesOrderDetailsRoutes);

module.exports = routes;