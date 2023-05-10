const HttpError = require('../helpers/HttpError');
const { Customer } = require('../models/customer');
const { Event } = require('../models/event');

const getAllCustomers = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { page = 1, limit = 5 } = req.query;
    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const skip = (pageNumber - 1) * limitNumber;

    const customerList = await Customer.find({ owner: _id })
      .sort({ name: 1 })
      .skip(skip)
      .limit(limitNumber);

    const totalPages = Math.ceil((await Customer.find({ owner: _id })).length / limitNumber);

    res.json({ totalPages, page: pageNumber, limit: limitNumber, data: customerList });
  } catch (error) {
    next(error);
  }
};

const createCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.create({ ...req.body, owner: req.user._id });

    res.status(201).json(customer);
  } catch (error) {
    next(error);
  }
};

const deleteCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;

    const customer = await Customer.findByIdAndDelete(id);

    if (!customer) {
      throw HttpError(404, 'No customer found with this id');
    }

    await Event.deleteMany({ owner: customer._id });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const updateCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;

    const customer = await Customer.findByIdAndUpdate(id, req.body, { new: true });

    if (!customer) {
      throw HttpError(404, 'No customer found with this id');
    }

    res.json(customer);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllCustomers, createCustomer, deleteCustomer, updateCustomer };
