const cloudinary = require("../../config/cloudinary");
const Event = require("../models/Event");

// Crear un nuevo evento con imágenes
const createNewEvent = async (data, images) => {
  try {
    let uploadedImages = [];
    if (images) {
      const uploadPromises = images.map((image) =>
        cloudinary.uploader.upload(image, { folder: "events" })
      );
      const results = await Promise.all(uploadPromises);
      uploadedImages = results.map((result) => result.secure_url);
    }

    const newEvent = new Event({ ...data, image: uploadedImages });
    const savedEvent = await newEvent.save();
    return savedEvent;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Obtener todos los eventos
const getAllEvents = async () => {
  try {
    const events = await Event.find();
    return events;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Actualizar evento con nuevas imágenes
const updateEvent = async (eventId, data, images) => {
  try {
    let updatedFields = { ...data };

    if (images) {
      const uploadPromises = images.map((image) =>
        cloudinary.uploader.upload(image, { folder: "events" })
      );
      const results = await Promise.all(uploadPromises);
      updatedFields.image = results.map((result) => result.secure_url);
    }

    const updatedEvent = await Event.findByIdAndUpdate(eventId, updatedFields, { new: true });

    if (!updatedEvent) {
      throw new Error("Event not found");
    }

    return updatedEvent;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Eliminar evento
const deleteEvent = async (eventId) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(eventId);
    if (!deletedEvent) throw new Error("Event not found");

    return deletedEvent;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createNewEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
};
