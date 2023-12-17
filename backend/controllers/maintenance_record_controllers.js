import MaintenanceRecord from "../model/maintenance_record_model.js";
export const read_all_maintenance_record = async (req, res) => {
  try {
    const getMaintenanceRecord = await MaintenanceRecord.find({}).populate("vehicle", ["type"]);
    res.status(200).send(getMaintenanceRecord);
  } catch (error) {
    console.log("Error in reading all maintenance record : " + error);
    res.status(500).json("Unknown");
  }
};
export const read_single_maintenance_record = async (req, res) => {
  try {
    const id = req.params.id;
    const getMaintenance = await MaintenanceRecord.findById(id).populate("vehicle", ["type"]);
    if (!getMaintenance) return res.status(404).json(`This id = ${id} is not exist`);
    res.status(200).send(getMaintenance);
  } catch (error) {
    console.log("Error in reading  maintenance record : " + error);
    res.status(500).json("Unknown");
  }
};
export const register_maintenance_record = async (req, res) => {
  try {
    const { type, description, cost, vehicle } = req.body;
    const register_maintenance = new MaintenanceRecord({
      type: type.toLowerCase(),
      description: description.toLowerCase(),
      cost: cost.toLowerCase(),
      vehicle: vehicle.toLowerCase(),
    });
    await register_maintenance.save();
    return res.status(201).json("Registration maintenance record successfully");
  } catch (error) {
    console.log("Error in maintenance register : " + error);
    res.status(500).json("Unknown");
  }
};
export const updated_maintenance_record = async (req, res) => {
  try {
    const id = req.params.id;
    const { type, description, cost, vehicle } = req.body;
    const existMaintenancelId = await MaintenanceRecord.findById(id);
    if (!existMaintenancelId)
      return res.status(404).json(`This id = ${id} is not exist`);
    const updated_maintenance = await MaintenanceRecord.findOneAndUpdate(
      { _id: id },
      {
        type: type.toLowerCase(),
        description: description.toLowerCase(),
        cost: cost.toLowerCase(),
        vehicle: vehicle.toLowerCase(),
      },
      { new: true, runValidator: true }
    );
    res.status(201).json("Updated maintenance record successfully");
  } catch (error) {
    console.log("Error in Updated maintenance record : " + error);
    res.status(500).json("Unknown error");
  }
};
export const deleted_maintenance_record = async (req, res) => {
  try {
    const id = req.params.id;
    const existMaintenancelId = await MaintenanceRecord.findById(id);
    if (!existMaintenancelId)
      return res.status(404).json(`This id = ${id} is not exist`);
    const deleted_maintenance_record = await MaintenanceRecord.findOneAndDelete({ _id: id });
    res.status(201).json("Deleted maintenance record successfully");
  } catch (error) {
    console.log("Error in Deleted maintenance record : " + error);
    res.status(500).json("Unknown error");
  }
};