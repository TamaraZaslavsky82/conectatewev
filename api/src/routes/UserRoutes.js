const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

// Crear un nuevo usuario administrador
router.post("/create", async (req, res) => {
  try {
    const user = await UserController.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener el usuario administrador
router.get("/", async (req, res) => {
  try {
    const user = await UserController.getUser();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar un usuario administrador
router.put("/:userId", async (req, res) => {
  try {
    const updatedUser = await UserController.updateUser(req.params.userId, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar un usuario administrador
router.delete("/:userId", async (req, res) => {
  try {
    const deletedUser = await UserController.deleteUser(req.params.userId);
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
