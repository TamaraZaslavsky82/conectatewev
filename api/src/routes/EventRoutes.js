const { Router } = require("express");
const {
  getEventsHandler,
  postEventHandler,
  putEventHandler,
  deleteEventHandler,
} = require("../handlers/EventHandlers");
const upload = require("../middlewares/multer");

const router = Router();

// Rutas del CRUD
router.get("/", getEventsHandler); // Obtener todos los eventos
router.post("/", upload.array("images", 5), postEventHandler); // Crear nuevo evento (máx. 5 imágenes)
router.put("/:eventId", upload.array("images", 5), putEventHandler); // Actualizar evento
router.delete("/:eventId", deleteEventHandler); // Eliminar evento

module.exports = router;
