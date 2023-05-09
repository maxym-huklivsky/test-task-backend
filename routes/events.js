const express = require('express');
const { getAllEvents, createEvent, deleteEvent } = require('../controllers/events');
const { bodyValidate, dateValidate, pagValidate } = require('../middlewares');
const { schemas } = require('../models/event');

const router = express.Router();

router.get('/', pagValidate, getAllEvents);

router.post('/', bodyValidate(schemas.addEventSchema), dateValidate, createEvent);

router.delete('/:id', deleteEvent);

module.exports = router;
