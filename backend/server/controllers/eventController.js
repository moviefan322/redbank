import asyncHandler from "express-async-handler";
import Event from "../models/eventModel.js";

// @desc    get all events
// @route   GET /api/events
// @access  Public

const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({});
  res.json(events);
});

// @desc    get single event
// @route   GET /api/events/:_id
// @access  Public

const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params._id);

  if (event) {
    res.json(event);
  } else {
    res.status(404);
    throw new Error(`Event with id:${req.params._id} not found`);
  }
});

// @desc    delete an event
// @route   DELETE /api/events/:_id
// @access  Private/Admin

const deleteEvent = asyncHandler(async (req, res) => {
  const deletedEvent = await Event.findByIdAndDelete(req.params._id);

  if (deletedEvent) {
    res.json({ message: "Event removed", item: deletedEvent });
  } else {
    res.status(404);
    throw new Error("Event not found");
  }
});

// @desc    create an event
// @route   POST /api/events
// @access  Private/Admin

const createEvent = asyncHandler(async (req, res) => {
  const { title, date, time, urlPhoto, link, description, descriptionShort } =
    req.body;

  const event = new Event({
    title,
    date,
    time,
    urlPhoto,
    link,
    description,
    descriptionShort,
  });

  const createdEvent = await event.save();
  res.status(201).json(createdEvent);
});

// @desc    update an event
// @route   PUT /api/events/:_id
// @access  Private/Admin

const updateEvent = asyncHandler(async (req, res) => {
  const { title, date, time, urlPhoto, link, description, descriptionShort } =
    req.body;

  const event = await Event.findById(req.params._id);

  if (event) {
    if (title !== undefined) event.title = title;
    if (date !== undefined) event.date = date;
    if (time !== undefined) event.time = time;
    if (urlPhoto !== undefined) event.urlPhoto = urlPhoto;
    if (link !== undefined) event.link = link;
    if (description !== undefined) event.description = description;
    if (descriptionShort !== undefined)
      event.descriptionShort = descriptionShort;

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } else {
    res.status(404);
    throw new Error("Event not found");
  }
});

const deleteAllEvents = asyncHandler(async (req, res) => {
  const deletedEvents = await Event.deleteMany({});

  if (deletedEvents) {
    res.json({ message: "All events removed" });
  } else {
    res.status(404);
    throw new Error("Events not found");
  }
});

export {
  getEvents,
  getEventById,
  deleteEvent,
  createEvent,
  updateEvent,
  deleteAllEvents,
};
