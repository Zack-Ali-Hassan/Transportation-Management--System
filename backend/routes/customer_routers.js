import express from 'express';
import { deleted_customer, read_all_customer_names, read_all_customers, read_single_customer, register_customer, updated_customer } from '../controllers/customer_controllers.js';
import { customer_edit_validation, customer_register_validation } from '../validation/customer_register_validation.js';

const customerRouter = express.Router();

customerRouter.route("/").get(read_all_customers);
customerRouter.route('/data').get(read_all_customer_names);
customerRouter.route("/:id").get(read_single_customer);
customerRouter.route("/register-customer").post(customer_register_validation, register_customer);
customerRouter.route("/update-customer/:id").put(customer_edit_validation, updated_customer);
customerRouter.route("/delete-customer/:id").delete(deleted_customer);

export default customerRouter;