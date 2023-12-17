import express from 'express';
import { get_count_customer, get_count_driver, get_count_order, get_count_routes, get_count_user, get_count_vehicle } from '../controllers/dashboard_controllers.js';

const dashboardRouter =express.Router();
dashboardRouter.route("/user").get(get_count_user);
dashboardRouter.route("/customer").get(get_count_customer);
dashboardRouter.route("/routes").get(get_count_routes);
dashboardRouter.route("/vehicle").get(get_count_vehicle);
dashboardRouter.route("/driver").get(get_count_driver);
dashboardRouter.route("/orders").get(get_count_order);
export default dashboardRouter;