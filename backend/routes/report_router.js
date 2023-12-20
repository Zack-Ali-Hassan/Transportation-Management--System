import express from 'express';
import { read_all_fuel_report, read_all_maintenance_report } from '../controllers/report_controller.js';
const reportRouter = express.Router();
reportRouter.route("/fuel").get(read_all_fuel_report);
reportRouter.route("/maintenance").get(read_all_maintenance_report);
export default reportRouter;
