const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // Importar bcryptjs
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    fullName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Método para comparar contraseñas con la encriptada
UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
