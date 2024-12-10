const {
  createNewCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/CategoryController");

// Obtener todas las categorías
const getCategoriesHandler = async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Crear categoría
const postCategoryHandler = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newCategory = await createNewCategory(name, description);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar categoría
const putCategoryHandler = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name, description } = req.body;

    const updatedCategory = await updateCategory(categoryId, name, description);
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar categoría
const deleteCategoryHandler = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const deletedCategory = await deleteCategory(categoryId);
    res.status(200).json(deletedCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getCategoriesHandler,
  postCategoryHandler,
  putCategoryHandler,
  deleteCategoryHandler,
};
