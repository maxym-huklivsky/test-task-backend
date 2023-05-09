const HttpError = require('../helpers/HttpError');
const { Event } = require('../models/event');

const dateValidate = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.body;
    const { _id } = req.customer;

    const firstDate = new Date(startDate);
    const secondDate = new Date(endDate);

    if (firstDate >= secondDate) {
      next(HttpError(409, `"startDate" cannot be greater than "endDate"`));
    }

    const eventsList = await Event.find({ owner: _id });

    for (const { startDate, endDate } of eventsList) {
      if (
        (startDate <= firstDate && firstDate <= endDate) ||
        (startDate <= secondDate && secondDate <= endDate) ||
        (firstDate < startDate && endDate < secondDate)
      ) {
        throw HttpError(409, 'There is an event in this date range');
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = dateValidate;
