import Customer from "../model/customer_model.js";
import Driver from "../model/driver_model.js";
import Order from "../model/orders_model.js";
import Routes from "../model/routes_model.js";
import Vehicle from "../model/vehicles_model.js";
import User from "../model/user_model.js";
import chalk from "chalk";
export const get_count_customer = async (req, res)=>{
    try {
        const getCustomersCount = await Customer.find({}).count();
        res.status(200).send(getCustomersCount.toString());
    } catch (error) {
        console.log("Error in reading count of customer : "  + error);
        res.status(500).json("Unknown");
    }
}
export const get_count_routes = async (req, res)=>{
    try {
        const getRoutesCount = await Routes.find({}).count();
        res.status(200).send(getRoutesCount.toString());
    } catch (error) {
        console.log("Error in reading count of routes : "  + error);
        res.status(500).json("Unknown");
    }
}
export const get_count_vehicle = async (req, res)=>{
    try {
        const getVehicleCount = await Vehicle.find({}).count();
        res.status(200).send(getVehicleCount.toString());
    } catch (error) {
        console.log("Error in reading count of vehicles : "  + error);
        res.status(500).json("Unknown");
    }
}
export const get_count_driver = async (req, res)=>{
    try {
        const getDriverCount = await Driver.find({}).count();
        res.status(200).send(getDriverCount.toString());
    } catch (error) {
        console.log("Error in reading count of driver : "  + error);
        res.status(500).json("Unknown");
    }
}
export const get_count_order = async (req, res)=>{
    try {
        const getOrderCount = await Order.find({}).count();
        res.status(200).send(getOrderCount.toString());
    } catch (error) {
        console.log("Error in reading count of orders : "  + error);
        res.status(500).json("Unknown");
    }
}
export const get_count_user = async (req, res) => {
    try {
      let getData = await User.find({}).count();
      res.status(200).json(getData.toString());
    } catch (error) {
      console.log(`${chalk.red.bold("Error in reading all user count : ")}` + error);
      res.status(500).json("Unknown error...");
    }
  };
