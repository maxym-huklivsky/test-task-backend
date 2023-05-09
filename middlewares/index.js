const bodyValidate = require('./bodyValidate');
const authorizate = require('./authorizate');
const pagValidate = require('./pagValid');
const conflictValidateForPost = require('./conflictValidateForPost');
const conflictValidateForPut = require('./conflictValidateForPut');
const findCustomer = require('./findCustomer');
const dateValidate = require('./dateValidate');

module.exports = {
  bodyValidate,
  authorizate,
  pagValidate,
  conflictValidateForPost,
  conflictValidateForPut,
  findCustomer,
  dateValidate,
};
