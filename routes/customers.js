const express = require('express');
const {
  getAllCustomers,
  createCustomer,
  deleteCustomer,
  updateCustomer,
} = require('../controllers/customers');
const {
  bodyValidate,
  pagValidate,
  conflictValidateForPut,
  conflictValidateForPost,
} = require('../middlewares');
const { schemas } = require('../models/customer');

const router = express.Router();

router.get('/', pagValidate, getAllCustomers);

router.post(
  '/',
  bodyValidate(schemas.createCustomerSchema),
  conflictValidateForPost,
  createCustomer,
);

router.delete('/:id', deleteCustomer);

router.put(
  '/:id',
  bodyValidate(schemas.updateCustomerSchema),
  conflictValidateForPut,
  updateCustomer,
);

module.exports = router;
