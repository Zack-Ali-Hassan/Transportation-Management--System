import express from 'express';
import { deleted_maintenance_record, read_all_maintenance_record, read_single_maintenance_record, register_maintenance_record, updated_maintenance_record } from '../controllers/maintenance_record_controllers.js';
import { maintenance_record_register_validation, maintenance_record_update_validation } from '../validation/maintenance_record_validation.js';
const maintenanceRecordRouter = express.Router();

maintenanceRecordRouter.route("/").get(read_all_maintenance_record);
maintenanceRecordRouter.route("/:id").get(read_single_maintenance_record);
maintenanceRecordRouter.route("/register-maintenance").post(maintenance_record_register_validation, register_maintenance_record);
maintenanceRecordRouter.route("/update-maintenance/:id").put(maintenance_record_update_validation,updated_maintenance_record);
maintenanceRecordRouter.route("/delete-maintenance/:id").delete(deleted_maintenance_record);

export default maintenanceRecordRouter;