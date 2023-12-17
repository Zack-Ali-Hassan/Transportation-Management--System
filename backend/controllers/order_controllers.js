import Order from "../model/orders_model.js";
export const read_all_order = async (req, res) => {
  try {
    const getOrder = await Order.find({}).populate("customer", ["name"]).populate("vehicle", ["type"]);
    res.status(200).send(getOrder);
  } catch (error) {
    console.log("Error in reading all orders : " + error);
    res.status(500).json("Unknown");
  }
};
export const read_single_order = async (req, res) => {
  try {
    const id = req.params.id;
    const getOrder = await Order.findById(id).populate("vehicle", ["type"]);
    if (!getOrder) return res.status(404).json(`This id = ${id} is not exist`);
    res.status(200).send(getOrder);
  } catch (error) {
    console.log("Error in reading  single order : " + error);
    res.status(500).json("Unknown");
  }
};
export const register_order = async (req, res) => {
  try {
    const {pickup_location, delivery_location, weight, status, customer, vehicle } = req.body;
    const register_orders = new Order({
        
        pickup_location: pickup_location.toLowerCase(),
        delivery_location: delivery_location.toLowerCase(),
        weight: weight.toLowerCase(),
        status: status.toLowerCase(),
        customer: customer.toLowerCase(),
        vehicle: vehicle.toLowerCase()
    });
    await register_orders.save();
    return res.status(201).json("Registration order successfully");
  } catch (error) {
    console.log("Error in order register : " + error);
    res.status(500).json("Unknown");
  }
};
export const updated_order = async (req, res) => {
  try {
    const id = req.params.id;
    const { customer, pickup_location, delivery_location, weight, status, vehicle } = req.body;
    const existOrderlId = await Order.findById(id);
    if (!existOrderlId)
      return res.status(404).json(`This id = ${id} is not exist`);
    const updated_order = await Order.findOneAndUpdate(
      { _id: id },
      {
        customer: customer.toLowerCase(),
        pickup_location: pickup_location.toLowerCase(),
        delivery_location: delivery_location.toLowerCase(),
        weight: weight.toLowerCase(),
        status: status.toLowerCase(),
        vehicle: vehicle.toLowerCase()
      },
      { new: true, runValidator: true }
    );
    res.status(201).json("Updated order successfully");
  } catch (error) {
    console.log("Error in Updated order : " + error);
    res.status(500).json("Unknown error");
  }
};
export const deleted_order = async (req, res) => {
  try {
    const id = req.params.id;
    const existOrderlId = await Order.findById(id);
    if (!existOrderlId)
      return res.status(404).json(`This id = ${id} is not exist`);
    const deleted_order = await Order.findOneAndDelete({ _id: id });
    res.status(201).json("Deleted order successfully");
  } catch (error) {
    console.log("Error in Deleted order : " + error);
    res.status(500).json("Unknown error");
  }
};