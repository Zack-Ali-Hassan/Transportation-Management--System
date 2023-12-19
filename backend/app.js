import express from "express";
import chalk from "chalk";
import customerRouter from "./routes/customer_routers.js";
import connectDB from "./db/db.js";
import vehicleRouter from "./routes/vehicle_router.js";
import routesRouter from "./routes/routes_router.js";
import routesDriver from "./routes/driver_router.js";
import routesFuel from "./routes/fuel_record_router.js";
import maintenanceRecordRouter from "./routes/maintenance_record_router.js";
import orderRouter from "./routes/order_router.js";
import cors from "cors";
import dashboardRouter from "./routes/dashboard_router.js";
import userRouter from "./routes/user_router.js";
import reportRouter from "./routes/report_router.js";
const app = express();
app.use(cors())
app.use(express.json());
app.use("/api/v1/user/", userRouter);
app.use("/api/v1/dashboard/", dashboardRouter);
app.use("/api/v1/customer/", customerRouter);
app.use("/api/v1/vehicle/", vehicleRouter);
app.use("/api/v1/routes/", routesRouter);
app.use("/api/v1/driver/", routesDriver);
app.use("/api/v1/fuel-record/", routesFuel);
app.use("/api/v1/maintenance-record/", maintenanceRecordRouter);
app.use("/api/v1/order/", orderRouter);
app.use("/api/v1/report/", reportRouter);

app.use((req, res) => {
  res
    .status(404)
    .json(
      req.originalUrl + " This page does not found, please try again..😵😵"
    );
});
connectDB();
const ports = 8000;
app.listen(ports, () => {
  console.log(
    `${chalk.green.bold("Server is running on ")} ${chalk.red.bold(
      "https://localhost:"
    )}${ports}`
  );
});
