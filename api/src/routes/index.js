const { Router } = require("express");


mainRouter.use("/products", ProductRouter);
mainRouter.use("/users", UsersRouter); // ver este Handler, se repite en la ruta /user  !!
mainRouter.use("/admin", AdminRouter);
mainRouter.use("/clientAdmin", ClientAdminRouter);
mainRouter.use("/category", CategoryRoutes);
mainRouter.use("/reviews", ReviewRouter);
mainRouter.use("/orders", OrderRouter);
mainRouter.use("/webhook", WebhookRouter);


const mainRouter = Router();


module.exports = mainRouter;