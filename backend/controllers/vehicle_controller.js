import Vehicle from "../model/vehicles_model.js";

export const read_all_vehicles = async (req, res) => {
    try {
      const getVehicles = await Vehicle.find({});
      res.status(200).send(getVehicles);
    } catch (error) {
      console.log("Error in reading all vehicles : " + error);
      res.status(500).json("Unknown");
    }
  };
export const read_all_vehicles_names = async (req, res) => {
    try {
      const getVehicles = await Vehicle.find({}).select("type");
      res.status(200).send(getVehicles);
    } catch (error) {
      console.log("Error in reading all vehicles names: " + error);
      res.status(500).json("Unknown");
    }
  };

export const read_single_vehicle = async (req, res) => {
    try {
      const id = req.params.id;
      const getVehicle = await Vehicle.findById(id);
      if (!getVehicle)
        return res.status(404).json(`This id = ${id} is not exist`);
      res.status(200).send(getVehicle);
    } catch (error) {
      console.log("Error in reading  Vehicles : " + error);
      res.status(500).json("Unknown");
    }
  };

  export const register_vehicle = async (req, res) => {
    try {
      const { vehicle_number, type, fual_type, capacity, location, status} = req.body;
      const getVehicle = await Vehicle.findOne({ vehicle_number });
      if (getVehicle) return res.status(403).json("Vehicle already registered");
      const register_vehicle = new Vehicle({
        vehicle_number: vehicle_number.toLowerCase(),
        type: type.toLowerCase(),
        fual_type: fual_type.toLowerCase(),
        capacity: capacity.toLowerCase(),
        location: location.toLowerCase(),
        status: status.toLowerCase(),
      });
      await register_vehicle.save();
      res.status(201).json("Registration vehicle successfully");
    } catch (error) {
      console.log("Error in registration vehicle : " + error);
      res.status(500).json("Unknown");
    }
  };
  export const updated_vehicle = async (req, res) => {
    try {
      const id = req.params.id;
      const { vehicle_number, type, fual_type, capacity, location, status} = req.body;
      const existVehicle = await Vehicle.findById(id);
      if (!existVehicle)
        return res.status(404).json(`This id = ${id} is not exist`);
      const updated_vehicle = await Vehicle.findOneAndUpdate(
        { _id: id },
        {
          vehicle_number: vehicle_number.toLowerCase(),
          type: type.toLowerCase(),
          fual_type: fual_type.toLowerCase(),
          capacity: capacity.toLowerCase(),
          location: location.toLowerCase(),
          status: status.toLowerCase(),
        },
        { new: true, runValidator: true }
      );
      res.status(201).json("Updated vehicle successfully");
    } catch (error) {
      console.log("Error in Updated vehicle : " + error);
      res.status(500).json("Unknown error");
    }
  };
  export const deleted_vehicle = async (req, res) => {
    try {
      const id = req.params.id;
      const existVehicle = await Vehicle.findById(id);
      if (!existVehicle)
        return res.status(404).json(`This id = ${id} is not exist`);
      const deleted_vehicle = await Vehicle.findOneAndDelete({ _id: id });
      res.status(201).json("Deleted vehicle successfully");
    } catch (error) {
      console.log("Error in Deleted vehicle : " + error);
      res.status(500).json("Unknown error");
    }
  };