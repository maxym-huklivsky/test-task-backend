const Joi = require('joi');
const mongoose = require('mongoose');
const { minLName } = require('./consts.js/length');

const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    title: { type: String, minLength: minLName, required: true },
    description: {
      type: String,
      minLength: minLName,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'customer',
    },
  },
  { versionKey: false },
);

const addEventSchema = Joi.object({
  title: Joi.string().min(minLName).required(),
  description: Joi.string().min(minLName).required(),
  startDate: Joi.date().greater('now').message('"date" cannot be in the past').required(),
  endDate: Joi.date().greater('now').message('"date" cannot be in the past').required(),
});

const schemas = { addEventSchema };

const Event = mongoose.model('Event', eventSchema);

module.exports = { Event, schemas };
