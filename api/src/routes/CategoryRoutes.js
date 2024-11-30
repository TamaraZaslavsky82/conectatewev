const { Router } = require("express");
const {
  getCategoriesHandler,
  postCategoryHandler,
  putCategoryHandler,
  deleteCategoryHandler,
} = require("../handlers/CategoryHandlers.js");
const upload = require("../middlewares/multer");

const router = Router();

// Rutas del CRUD
router.get("/", getCategoriesHandler); // Obtener todas las categorías
router.post("/", upload.single("image"), postCategoryHandler); // Crear nueva categoría
router.put("/:categoryId", upload.single("image"), putCategoryHandler); // Actualizar categoría
router.delete("/:categoryId", deleteCategoryHandler); // Eliminar categoría

module.exports = router;
