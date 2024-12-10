// EventControllers.js
const Event = require("../models/Event");
const cloudinary = require("cloudinary").v2;
const fs = require("fs/promises");

// Create a new event
const createEvent = async (data, files) => {
  try {
    const imageUrls = [];

    if (files && files.length > 0) {
      for (const file of files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "events",
        });
        imageUrls.push(result.secure_url);
        await fs.unlink(file.path); // Remove file after upload
      }
    }

    data.images = imageUrls;
    const newEvent = new Event(data);
    return await newEvent.save();
  } catch (error) {
    throw new Error(`Error creating event: ${error.message}`);
  }
};

// Get all events
const getAllEvents = async () => {
  try {
    return await Event.find();
  } catch (error) {
    throw new Error(`Error fetching events: ${error.message}`);
  }
};

// Get event by ID
const getEventById = async (id) => {
  try {
    const event = await Event.findById(id);
    if (!event) {
      throw new Error("Event not found");
    }
    return event;
  } catch (error) {
    throw new Error(`Error fetching event: ${error.message}`);
  }
};

// Update event by ID
const updateEvent = async (id, data, files) => {
  try {
    const event = await Event.findById(id);
    if (!event) {
      throw new Error("Event not found");
    }

    if (files && files.length > 0) {
      const imageUrls = [];
      for (const file of files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "events",
        });
        imageUrls.push(result.secure_url);
        await fs.unlink(file.path); // Remove file after upload
      }
      data.images = imageUrls;
    }

    return await Event.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    throw new Error(`Error updating event: ${error.message}`);
  }
};

// Delete event by ID
const deleteEvent = async (id) => {
  try {
    const event = await Event.findById(id);
    if (!event) {
      throw new Error("Event not found");
    }

    await Event.findByIdAndDelete(id);
    return { message: "Event deleted successfully" };
  } catch (error) {
    throw new Error(`Error deleting event: ${error.message}`);
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
