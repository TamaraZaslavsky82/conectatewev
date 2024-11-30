const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || "SECRETO"; 

// Login
const login = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    // Comparar la contraseña
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    // Crear un JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

    return {
      message: "Login successful",
      token,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Logout (invalidate the session)
const logout = (req, res) => {
  // Básicamente, en el servidor, no es necesario invalidar el token porque
  // la invalidación se hace en el cliente al borrar el token.
  // Sin embargo, puedes eliminar el token del frontend o hacerlo en el cliente.
  res.status(200).json({ message: "Logged out successfully" });
};
const register = async (req, res) => {
    try {
      // Desestructuramos los datos del usuario desde el body
      const { fullName, email, password } = req.body;
  
      // Verificar si el email ya está registrado
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }
  
      // Encriptar la contraseña
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
  
      // Crear el nuevo usuario
      const newUser = new User({
        fullName,
        email,
        password: hashedPassword,
      });
  
      // Guardar el usuario en la base de datos
      const savedUser = await newUser.save();
  
      // Respondemos con el usuario creado
      res.status(201).json({
        message: "User registered successfully",
        user: {
          _id: savedUser._id,
          fullName: savedUser.fullName,
          email: savedUser.email,
          createdAt: savedUser.createdAt,
          updatedAt: savedUser.updatedAt,
        },
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  };
module.exports = {
  login,
  logout,
  register
};
