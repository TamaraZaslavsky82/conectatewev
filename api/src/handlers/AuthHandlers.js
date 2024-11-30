const { login, logout, register } = require("../controllers/AuthController");

const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Intentar hacer login
    const result = await login(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const registerHandler = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Intentar registrar al usuario
    const result = await register({ fullName, email, password });

    // Si la creación es exitosa, devolver respuesta con el nuevo usuario
    res.status(201).json({
      message: "User registered successfully",
      user: result,
    });
  } catch (error) {
    // Si hay error, devolver el mensaje de error
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  registerHandler,
};

const logoutHandler = (req, res) => {
  logout(req, res); // Solo devolvemos mensaje
};

module.exports = {
  loginHandler,
  logoutHandler,
  registerHandler
};
