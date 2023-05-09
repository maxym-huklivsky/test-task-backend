const HttpError = require('../helpers/HttpError');
const { Customer } = require('../models/customer');
const { Event } = require('../models/event');

const getAllEvents = async (req, res, next) => {
  try {
    const { _id } = req.customer;
    const { page = 1, limit = 5, sortBy = 'title' } = req.query;
    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const skip = (pageNumber - 1) * limitNumber;

    const eventsList = await Event.find({ owner: _id })
      .sort({ [sortBy]: 1 })
      .skip(skip)
      .limit(limitNumber);

    const totalPages = Math.ceil((await Event.find({ owner: _id })).length / limit);

    res.json({ totalPages, page: pageNumber, limit: limitNumber, data: eventsList });
  } catch (error) {
    next(error);
  }
};

const createEvent = async (req, res, next) => {
  try {
    const { _id } = req.customer;

    const event = await Event.create({ ...req.body, owner: _id });

    const { eventsCount } = await Customer.findOne({ _id: _id });

    await Customer.findByIdAndUpdate(_id, {
      eventsCount: eventsCount + 1,
    });

    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
};

const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id } = req.customer;

    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      throw HttpError(404, 'No event found with this id');
    }

    const { eventsCount } = await Customer.findOne({ _id: _id });

    await Customer.findByIdAndUpdate(_id, { eventsCount: eventsCount - 1 });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllEvents, createEvent, deleteEvent };
