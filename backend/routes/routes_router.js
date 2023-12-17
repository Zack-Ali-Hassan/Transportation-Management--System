import express from 'express';
import { deleted_route, read_all_routes, read_single_routes, register_route, updated_route } from '../controllers/routes_controlers.js';
import { routes_register_validation, routes_update_validation } from '../validation/routes_register_validation.js';
const routesRouter = express.Router();

routesRouter.route("/").get(read_all_routes);
routesRouter.route("/:id").get(read_single_routes);
routesRouter.route("/register-route").post(routes_register_validation, register_route);
routesRouter.route("/update-route/:id").put(routes_update_validation ,updated_route);
routesRouter.route("/delete-route/:id").delete(deleted_route);

export default routesRouter;