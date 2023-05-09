const HttpError = require('../helpers/HttpError');
const { Customer } = require('../models/customer');

const conflictValidateForPut = async (req, res, next) => {
  try {
    const { email, phone } = req.body;
    const { id } = req.params;

    const thisCust = await Customer.findById(id);

    if (thisCust.email !== email && thisCust.phone !== phone) {
      const searchByEmail = await Customer.findOne({ email });
      if (searchByEmail) {
        throw HttpError(409, 'This customer email address is in use');
      }

      const searchByPhone = await Customer.findOne({ phone });
      if (searchByPhone) {
        throw HttpError(409, 'This customer phone number is in use');
      }
    }

    if (thisCust.email !== email) {
      const searchByEmail = await Customer.findOne({ email });

      if (searchByEmail) {
        throw HttpError(409, 'This customer email address is in use');
      }
    }

    if (thisCust.phone !== phone) {
      const searchByPhone = await Customer.findOne({ phone });

      if (searchByPhone) {
        throw HttpError(409, 'This customer phone number is in use');
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = conflictValidateForPut;
