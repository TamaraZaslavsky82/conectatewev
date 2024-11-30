const User = require("../models/User");
const bcrypt = require("bcryptjs");

const createUser = async (data) => {
  try {
    if (!data.email || !data.email.includes('@')) {
      throw new Error("Invalid email address");
    }

    // Encriptar la contraseña antes de guardar
    const salt = bcrypt.genSaltSync(10);
    data.password = bcrypt.hashSync(data.password, salt);

    const newUser = new User(data);
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

// Obtener el único usuario administrador
const getUser = async () => {
  try {
    const user = await User.findOne();
    if (!user) {
      throw new Error("No user found in the database.");
    }
    return user;
  } catch (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
};

// Actualizar usuario administrador
const updateUser = async (userId, data) => {
  try {
    if (data.password) {
      const salt = bcrypt.genSaltSync(10);
      data.password = bcrypt.hashSync(data.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, data, {
      new: true,
    });
    if (!updatedUser) {
      throw new Error("User not found");
    }
    return updatedUser;
  } catch (error) {
    throw new Error(`Error updating user: ${error.message}`);
  }
};

// Eliminar usuario administrador
const deleteUser = async (userId) => {
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      throw new Error("User not found");
    }
    return deletedUser;
  } catch (error) {
    throw new Error(`Error deleting user: ${error.message}`);
  }
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
