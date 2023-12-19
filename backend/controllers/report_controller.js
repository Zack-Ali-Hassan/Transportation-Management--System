import Fuel from "../model/fuel_records_model.js";
import MaintenanceRecord from "../model/maintenance_record_model.js";

export const read_all_fuel_report = async (req, res) => {
  try {
    const getFuel = await Fuel.find({}).populate("vehicle", ["type"]);
    res.status(200).send(getFuel);
  } catch (error) {
    console.log("Error in reading all fuel record : " + error);
    res.status(500).json("Unknown");
  }
};

export const read_all_maintenance_report = async (req, res) => {
  try {
    const getMaintenanceRecord = await MaintenanceRecord.find({}).populate(
      "vehicle",
      ["type"]
    );
    res.status(200).send(getMaintenanceRecord);
  } catch (error) {
    console.log("Error in reading all maintenance record : " + error);
    res.status(500).json("Unknown");
  }
};
