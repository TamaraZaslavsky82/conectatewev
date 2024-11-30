const { Router } = require("express");
const {
  loginHandler,
  logoutHandler,
  registerHandler,
} = require("../handlers/AuthHandlers");

const router = Router();

// Ruta para hacer login
router.post("/login", loginHandler);

// Ruta para hacer logout
router.post("/logout", logoutHandler);
router.post("/register", registerHandler);
module.exports = router;
