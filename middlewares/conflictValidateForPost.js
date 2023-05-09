const HttpError = require('../helpers/HttpError');
const { Customer } = require('../models/customer');

const conflictValidateForPost = async (req, res, next) => {
  try {
    const { email, phone } = req.body;

    const searchByEmail = await Customer.findOne({ email });
    if (searchByEmail) {
      throw HttpError(409, 'This customer email address is in use');
    }

    const searchByPhone = await Customer.findOne({ phone });
    if (searchByPhone) {
      throw HttpError(409, 'This customer phone number is in use');
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = conflictValidateForPost;
