const HttpError = require('../helpers/HttpError');

const bodyValidate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    next(HttpError(400, error.message));
  }

  next();
};

module.exports = bodyValidate;
