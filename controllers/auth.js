const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const HttpError = require('../helpers/HttpError');
const { User } = require('../models/user');
require('dotenv').config();
const { SECRET_KEY } = process.env;

const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    const emailInUse = await User.findOne({ email });

    if (emailInUse) {
      throw HttpError(409, 'This email is in use');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const { _id } = await User.create({ ...req.body, password: hashPassword });

    const token = jwt.sign({ id: _id }, SECRET_KEY, { expiresIn: '24h' });

    await User.findByIdAndUpdate(_id, { token });

    res.status(201).json({ user: { email, name }, token });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw HttpError(401, 'There is not user with this email');
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      throw HttpError(401, 'Incorect password');
    }

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '24h' });

    await User.findByIdAndUpdate(user._id, { token });

    res.json({ user: { email, name }, token });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: '' });

  res.status(204).send();
};

const getCurrent = (req, res) => {
  const { email, name } = req.user;

  res.json({ email, name });
};

module.exports = { register, login, logout, getCurrent };
