const { Router } = require("express");

const usersRouter = require("./user.routes");
const sessionsRouter = require("./sessions.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);

module.exports = routes;