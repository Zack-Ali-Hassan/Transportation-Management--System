import Fuel from "../model/fuel_records_model.js";

export const read_all_fuel_record = async (req, res) => {
  try {
    const getFuel = await Fuel.find({}).populate("vehicle", ["type"]);
    res.status(200).send(getFuel);
  } catch (error) {
    console.log("Error in reading all fuel record : " + error);
    res.status(500).json("Unknown");
  }
};
export const read_single_fuel_record = async (req, res) => {
  try {
    const id = req.params.id;
    const getFuel = await Fuel.findById(id).populate("vehicle", ["type"]);
    if (!getFuel) return res.status(404).json(`This id = ${id} is not exist`);
    res.status(200).send(getFuel);
  } catch (error) {
    console.log("Error in reading  fuel record : " + error);
    res.status(500).json("Unknown");
  }
};
export const register_fuel_record = async (req, res) => {
  try {
    const { type, quantity, cost, vehicle } = req.body;
    const register_fuel = new Fuel({
      type: type.toLowerCase(),
      quantity: quantity.toLowerCase(),
      cost: cost.toLowerCase(),
      vehicle: vehicle.toLowerCase(),
    });
    await register_fuel.save();
    return res.status(201).json("Registration fuel record successfully");
  } catch (error) {
    console.log("Error in fuel register : " + error);
    res.status(500).json("Unknown");
  }
};
export const updated_fuel_record = async (req, res) => {
  try {
    const id = req.params.id;
    const { type, quantity, cost, vehicle } = req.body;
    const existFuelId = await Fuel.findById(id);
    if (!existFuelId)
      return res.status(404).json(`This id = ${id} is not exist`);
    const updated_driver = await Fuel.findOneAndUpdate(
      { _id: id },
      {
        type: type.toLowerCase(),
        quantity: quantity.toLowerCase(),
        cost: cost.toLowerCase(),
        vehicle: vehicle.toLowerCase(),
      },
      { new: true, runValidator: true }
    );
    res.status(201).json("Updated fuel record successfully");
  } catch (error) {
    console.log("Error in Updated fuel record : " + error);
    res.status(500).json("Unknown error");
  }
};
export const deleted_fuel_record = async (req, res) => {
  try {
    const id = req.params.id;
    const existFuelId = await Fuel.findById(id);
    if (!existFuelId)
      return res.status(404).json(`This id = ${id} is not exist`);
    const deleted_Fuel_record = await Fuel.findOneAndDelete({ _id: id });
    res.status(201).json("Deleted Fuel record successfully");
  } catch (error) {
    console.log("Error in Deleted fuel record : " + error);
    res.status(500).json("Unknown error");
  }
};
