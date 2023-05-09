const express = require('express');
const cors = require('cors');
const { authorizate, findCustomer } = require('./middlewares');

const userRoute = require('./routes/auth');
const customersRoute = require('./routes/customers');
const eventsRoute = require('./routes/events');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', userRoute);
app.use('/api/customers', authorizate, customersRoute);
app.use('/api/customers/:customerId/events', authorizate, findCustomer, eventsRoute);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server Error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
