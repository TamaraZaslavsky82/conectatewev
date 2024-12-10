// EventHandler.js
const { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } = require("../controllers/EventController");

const createEventHandler = async (req, res) => {
  try {
    const { body, files } = req;
    const event = await createEvent(body, files);
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllEventsHandler = async (req, res) => {
  try {
    const events = await getAllEvents();
    res.status(200).json(events);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getEventByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await getEventById(id);
    res.status(200).json(event);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateEventHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { body, files } = req;
    const updatedEvent = await updateEvent(id, body, files);
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteEventHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await deleteEvent(id);
    res.status(200).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createEventHandler,
  getAllEventsHandler,
  getEventByIdHandler,
  updateEventHandler,
  deleteEventHandler,
};
