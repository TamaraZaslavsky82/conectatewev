const { Router } = require("express");
const {
  getCategoriesHandler,
  postCategoryHandler,
  putCategoryHandler,
  deleteCategoryHandler,
} = require("../handlers/CategoryHandlers.js");

const router = Router();

// Rutas del CRUD
router.get("/", getCategoriesHandler); // Obtener todas las categorías
router.post("/", postCategoryHandler); // Crear nueva categoría
router.put("/:categoryId", putCategoryHandler); // Actualizar categoría
router.delete("/:categoryId", deleteCategoryHandler); // Eliminar categoría

module.exports = router;
