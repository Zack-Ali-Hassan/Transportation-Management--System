import Driver from "../model/driver_model.js";
export const read_all_driver = async (req, res) => {
  try {
    const getDriver = await Driver.find({}).populate("vehicle",[
        "type"
    ]);
    res.status(200).send(getDriver);
  } catch (error) {
    console.log("Error in reading all driver : " + error);
    res.status(500).json("Unknown");
  }
};
export const read_single_driver = async (req, res) => {
  try {
    const id = req.params.id;
    const getDriver = await Driver.findById(id).populate("vehicle",[
        "type"
    ]);
    if (!getDriver) return res.status(404).json(`This id = ${id} is not exist`);
    res.status(200).send(getDriver);
  } catch (error) {
    console.log("Error in reading  driver : " + error);
    res.status(500).json("Unknown");
  }
};
export const register_driver = async (req, res) => {
  try {
    const { name, mobile, email, vehicle } = req.body;
    const getDriverMobile = await Driver.findOne({ mobile });
    const getDriverEmail = await Driver.findOne({ email });
    if (getDriverMobile) return res.status(403).json("Driver  mobile already registered");
    if (getDriverEmail) return res.status(403).json("Driver email already registered");
    const register_driver = new Driver({
      name: name.toLowerCase(),
      mobile: mobile.toLowerCase(),
      email: email.toLowerCase(),
      vehicle: vehicle.toLowerCase(),
    });
    await register_driver.save();
    res.status(201).json("Registration driver successfully");
  } catch (error) {
    console.log("Error in driver register : " + error);
    res.status(500).json("Unknown");
  }
};
export const updated_driver = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, mobile, email, vehicle } = req.body;
    const existVehicle = await Driver.findById(id);
    if (!existVehicle)
      return res.status(404).json(`This id = ${id} is not exist`);
    const updated_driver = await Driver.findOneAndUpdate(
      { _id: id },
      {
        name : name.toLowerCase(),
        mobile : mobile.toLowerCase(),
        email : email.toLowerCase(),
        vehicle : vehicle.toLowerCase(),
      },
      { new: true, runValidator: true }
    );
    res.status(201).json("Updated driver successfully");
  } catch (error) {
    console.log("Error in Updated driver : " + error);
    res.status(500).json("Unknown error");
  }
};
export const deleted_driver = async (req, res) => {
  try {
    const id = req.params.id;
    const existDriver = await Driver.findById(id);
    if (!existDriver)
      return res.status(404).json(`This id = ${id} is not exist`);
    const deleted_driver = await Driver.findOneAndDelete({ _id: id });
    res.status(201).json("Deleted Driver successfully");
  } catch (error) {
    console.log("Error in Deleted driver : " + error);
    res.status(500).json("Unknown error");
  }
};
