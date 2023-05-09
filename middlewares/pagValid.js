const Joi = require('joi');
const HttpError = require('../helpers/HttpError');

const maxLimit = 20;

const schema = Joi.object({
  page: Joi.number().positive(),
  limit: Joi.number().positive().max(maxLimit),
});

const pagValidate = (req, res, next) => {
  const { page = 1, limit = 5 } = req.query;

  const { error } = schema.validate({ page: Number(page), limit: Number(limit) });

  if (error) {
    throw HttpError(400, error.message);
  }

  next();
};

module.exports = pagValidate;
