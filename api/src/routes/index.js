const { Router } = require("express");
const CategoryRoutes = require("./CategoryRoutes");
const CompanyRoutes = require("./CompanyRoutes");
const EventRoutes = require("./EventRoutes");
const AuthRoutes = require("./AuthRoutes");
const UserRoutes = require("./UserRoutes"); // Se añadió la ruta de User
const mainRouter = Router();

mainRouter.use("/category", CategoryRoutes);
mainRouter.use("/event", EventRoutes);
mainRouter.use("/company", CompanyRoutes);
mainRouter.use("/auth", AuthRoutes);
mainRouter.use("/user", UserRoutes); // Ruta de usuario
module.exports = mainRouter;