import express from 'express';
import { deleted_driver, read_all_driver, read_single_driver, register_driver, updated_driver } from '../controllers/driver_controlers.js';
import { driver_register_validation, driver_update_validation } from '../validation/driver_register_validation.js';


const routesDriver = express.Router();

routesDriver.route("/").get(read_all_driver);
routesDriver.route("/:id").get(read_single_driver);
routesDriver.route("/register-driver").post(driver_register_validation, register_driver);
routesDriver.route("/update-driver/:id").put(driver_update_validation,updated_driver);
routesDriver.route("/delete-driver/:id").delete(deleted_driver);

export default routesDriver;