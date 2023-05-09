const HttpError = require('../helpers/HttpError');
const { Customer } = require('../models/customer');

const findCustomer = async (req, res, next) => {
  try {
    const { customerId } = req.params;

    const customer = await Customer.findById(customerId);

    if (!customer) {
      throw HttpError(404, 'No customer found with this id');
    }

    req.customer = customer;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = findCustomer;
