import express from 'express';
import { deleted_fuel_record, read_all_fuel_record, read_single_fuel_record, register_fuel_record, updated_fuel_record } from '../controllers/fuel_record_controllers.js';
import { fuel_record_register_validation, fuel_record_update_validation } from '../validation/fuel_record_register_validation.js';
const routesFuel = express.Router();

routesFuel.route("/").get(read_all_fuel_record);
routesFuel.route("/:id").get(read_single_fuel_record);
routesFuel.route("/register-fuel").post(fuel_record_register_validation, register_fuel_record);
routesFuel.route("/update-fuel/:id").put(fuel_record_update_validation,updated_fuel_record);
routesFuel.route("/delete-fuel/:id").delete(deleted_fuel_record);

export default routesFuel;