import express from 'express';
import { deleted_vehicle, read_all_vehicles, read_all_vehicles_names, read_single_vehicle, register_vehicle, updated_vehicle } from '../controllers/vehicle_controller.js';
import { vehicle_register_validation, vehicle_update_validation } from '../validation/vehicle_register_validation.js';
const vehicleRouter = express.Router();
vehicleRouter.route('/').get(read_all_vehicles);
vehicleRouter.route('/data').get(read_all_vehicles_names);
vehicleRouter.route('/:id').get(read_single_vehicle);
vehicleRouter.route('/register-vehicle').post(vehicle_register_validation, register_vehicle);
vehicleRouter.route('/update-vehicle/:id').put(vehicle_update_validation, updated_vehicle);
vehicleRouter.route('/delete-vehicle/:id').delete(deleted_vehicle);

export default vehicleRouter;