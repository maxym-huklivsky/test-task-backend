const Joi = require('joi');
const mongoose = require('mongoose');
const { emailRegExp } = require('./consts.js/regexps');
const { minLName, minLPassword, maxLName, maxLPassword } = require('./consts.js/length');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, minLength: minLName, maxLength: maxLName, required: true },
    email: {
      type: String,
      match: [emailRegExp, `"email" is incorect`],
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minLength: minLPassword,
      required: true,
    },
    token: String,
  },
  { versionKey: false },
);

const registerSchema = Joi.object({
  name: Joi.string().min(minLName).max(maxLName).required(),
  email: Joi.string().pattern(emailRegExp).required().messages({
    'string.pattern.base': `"email" is incorect`,
  }),
  password: Joi.string().min(minLPassword).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required().messages({
    'string.pattern.base': `"email" is incorect`,
  }),
  password: Joi.string().min(minLPassword).max(maxLPassword).required(),
});

const schemas = { registerSchema, loginSchema };

const User = mongoose.model('User', userSchema);

module.exports = { User, schemas };
