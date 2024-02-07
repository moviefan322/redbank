import asyncHandler from "express-async-handler";
import Event from "../models/eventModel";

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
    res.json({ message: "Event removed" });
  } else {
    res.status(404);
    throw new Error("Event not found");
  }
});

// @desc    create an event
// @route   POST /api/events
// @access  Private/Admin

const createEvent = asyncHandler(async (req, res) => {
  const { title, date, time, urlPhoto, link } = req.body;

  const event = new Event({
    title,
    date,
    time,
    urlPhoto,
    link,
  });

  const createdEvent = await event.save();
  res.status(201).json(createdEvent);
});

// @desc    update an event
// @route   PUT /api/events/:_id
// @access  Private/Admin

const updateEvent = asyncHandler(async (req, res) => {
  const { title, date, time, urlPhoto, link } = req.body;

  const event = await Event.findById(req.params._id);

  if (event) {
    event.title = title;
    event.date = date;
    event.time = time;
    event.urlPhoto = urlPhoto;
    event.link = link;

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } else {
    res.status(404);
    throw new Error("Event not found");
  }
});

export { getEvents, getEventById, deleteEvent, createEvent, updateEvent };
