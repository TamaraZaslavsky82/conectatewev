const {
  createNewEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
} = require("../controllers/EventController");

// Obtener todos los eventos
const getEventsHandler = async (req, res) => {
  try {
    const events = await getAllEvents();
    res.status(200).json(events);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Crear nuevo evento
const postEventHandler = async (req, res) => {
  try {
    const data = req.body;
    const images = req.files?.map((file) => file.path); // Archivos subidos con Multer

    const newEvent = await createNewEvent(data, images);
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar evento
const putEventHandler = async (req, res) => {
  try {
    const { eventId } = req.params;
    const data = req.body;
    const images = req.files?.map((file) => file.path);

    const updatedEvent = await updateEvent(eventId, data, images);
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar evento
const deleteEventHandler = async (req, res) => {
  try {
    const { eventId } = req.params;

    const deletedEvent = await deleteEvent(eventId);
    res.status(200).json(deletedEvent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getEventsHandler,
  postEventHandler,
  putEventHandler,
  deleteEventHandler,
};
