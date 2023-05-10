const Joi = require('joi');
const mongoose = require('mongoose');
const { minLName } = require('./consts.js/length');
const { emailRegExp, phoneRegExp } = require('./consts.js/regexps');

const Schema = mongoose.Schema;

const customerSchema = new Schema(
  {
    name: { type: String, minLength: minLName, required: true },
    surname: { type: String, minLength: minLName, required: true },
    email: { type: String, match: emailRegExp, required: true },
    phone: { type: String, match: phoneRegExp, required: true },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    eventsCount: { type: Number, default: 0 },
    nextEventDate: { type: String, default: 'no date' },
  },
  { versionKey: false },
);

const createCustomerSchema = Joi.object({
  name: Joi.string().min(minLName).required(),
  surname: Joi.string().min(minLName).required(),
  email: Joi.string().pattern(emailRegExp).required().messages({
    'string.pattern.base': `"email" is incorect`,
  }),
  phone: Joi.string().pattern(phoneRegExp).required().messages({
    'string.pattern.base': `"phone" is incorect`,
  }),
});

const updateCustomerSchema = Joi.object({
  name: Joi.string().min(minLName),
  surname: Joi.string().min(minLName),
  email: Joi.string().pattern(emailRegExp).messages({
    'string.pattern.base': `"email" is incorect`,
  }),
  phone: Joi.string().pattern(phoneRegExp).messages({
    'string.pattern.base': `"phone" is incorect`,
  }),
});

const schemas = {
  createCustomerSchema,
  updateCustomerSchema,
};

const Customer = mongoose.model('Customer', customerSchema);

module.exports = { Customer, schemas };
