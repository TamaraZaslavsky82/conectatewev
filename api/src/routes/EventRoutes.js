// EventRoutes.js
const { Router } = require("express");
const {
  createEventHandler,
  getAllEventsHandler,
  getEventByIdHandler,
  updateEventHandler,
  deleteEventHandler,
} = require("../handlers/EventHandlers");
const upload = require("../middlewares/multer");

const EventRoutes = Router();

EventRoutes.post("/", upload.array("images"), createEventHandler);
EventRoutes.get("/", getAllEventsHandler);
EventRoutes.get("/:id", getEventByIdHandler);
EventRoutes.put("/:id", upload.array("images"), updateEventHandler);
EventRoutes.delete("/:id", deleteEventHandler);

module.exports = EventRoutes;
