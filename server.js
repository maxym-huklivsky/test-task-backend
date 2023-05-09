const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();
const { URL, PORT } = process.env;

mongoose
  .connect(URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log('Connect to server and database');
    });
  })
  .catch((err) => {
    console.log(`Connecting error: ${err}`);
  });
