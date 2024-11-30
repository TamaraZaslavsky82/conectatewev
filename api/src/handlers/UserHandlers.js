const UserController = require("../controllers/UserController");

const createUserHandler = async (req, res) => {
  try {
    const user = await UserController.createUser(req.body);
    res.status(201).json(user);  // Respuesta exitosa al crear el usuario
  } catch (error) {
    res.status(400).json({ error: error.message });  // Respuesta de error si ocurre un problema
  }
};

const getUserHandler = async (req, res) => {
  try {
    const user = await UserController.getUser();
    res.status(200).json(user);  // Respuesta exitosa con los datos del usuario
  } catch (error) {
    res.status(400).json({ error: error.message });  // Respuesta de error si no se encuentra el usuario
  }
};

const updateUserHandler = async (req, res) => {
  try {
    const updatedUser = await UserController.updateUser(req.params.userId, req.body);
    res.status(200).json(updatedUser);  // Respuesta exitosa con el usuario actualizado
  } catch (error) {
    res.status(400).json({ error: error.message });  // Respuesta de error si el usuario no se encuentra o no se puede actualizar
  }
};

const deleteUserHandler = async (req, res) => {
  try {
    const deletedUser = await UserController.deleteUser(req.params.userId);
    res.status(200).json(deletedUser);  // Respuesta exitosa al eliminar el usuario
  } catch (error) {
    res.status(400).json({ error: error.message });  // Respuesta de error si el usuario no se puede eliminar
  }
};

module.exports = {
  createUserHandler,
  getUserHandler,
  updateUserHandler,
  deleteUserHandler,
};
