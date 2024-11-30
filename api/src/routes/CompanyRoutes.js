const { Router } = require("express");
const {
  getCompaniesHandler,
  postCompanyHandler,
  putCompanyHandler,
  deleteCompanyHandler,
} = require("../handlers/CompanyHandlers");
const upload = require("../middlewares/multer");

const router = Router();

// Rutas del CRUD
router.get("/", getCompaniesHandler); // Obtener todas las compañías
router.post("/", upload.array("images", 5), postCompanyHandler); // Crear nueva compañía (máx. 5 imágenes)
router.put("/:companyId", upload.array("images", 5), putCompanyHandler); // Actualizar compañía
router.delete("/:companyId", deleteCompanyHandler); // Eliminar compañía

module.exports = router;
