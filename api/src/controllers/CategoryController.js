const cloudinary = require("../../config/cloudinary");
const Category = require("../models/Category");

// Crear una nueva categoría con imagen
const createNewCategory = async (name, description, image) => {
  try {
    let imageUrl = "";
    if (image) {
      const uploadResult = await cloudinary.uploader.upload(image, {
        folder: "categories", // Organiza las imágenes en una carpeta de Cloudinary
      });
      imageUrl = uploadResult.secure_url;
    }

    const newCategory = new Category({
      name,
      description,
      image: imageUrl,
    });

    const savedCategory = await newCategory.save();
    return savedCategory;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Obtener todas las categorías
const getAllCategories = async () => {
  try {
    const categories = await Category.find();
    return categories;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Actualizar categoría con nueva imagen
const updateCategory = async (categoryId, name, description, image) => {
  try {
    let updatedFields = { name, description };

    if (image) {
      const uploadResult = await cloudinary.uploader.upload(image, {
        folder: "categories",
      });
      updatedFields.image = uploadResult.secure_url;
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      updatedFields,
      { new: true }
    );

    if (!updatedCategory) {
      throw new Error("Category not found");
    }

    return updatedCategory;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Eliminar categoría
const deleteCategory = async (categoryId) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) throw new Error("Category not found");

    return deletedCategory;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createNewCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
