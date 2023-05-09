const express = require('express');
const { register, login, logout, getCurrent } = require('../controllers/auth');
const { bodyValidate, authorizate } = require('../middlewares');
const { schemas } = require('../models/user');

const router = express.Router();

router.post('/register', bodyValidate(schemas.registerSchema), register);

router.post('/login', bodyValidate(schemas.loginSchema), login);

router.post('/logout', authorizate, logout);

router.get('/current', authorizate, getCurrent);

module.exports = router;
