import Customer from "../model/customer_model.js";

export const read_all_customers = async (req, res) => {
  try {
    const getCustomers = await Customer.find({});
    res.status(200).send(getCustomers);
  } catch (error) {
    console.log("Error in reading all customers : " + error);
    res.status(500).json("Unknown");
  }
};
export const read_all_customer_names = async (req, res) => {
  try {
    const getCustomer = await Customer.find({}).select("name");
    res.status(200).send(getCustomer);
  } catch (error) {
    console.log("Error in reading all customer names: " + error);
    res.status(500).json("Unknown");
  }
};
export const read_single_customer = async (req, res) => {
  try {
    const id = req.params.id;
    const getCustomer = await Customer.findById(id);
    if (!getCustomer)
      return res.status(404).json(`This id = ${id} is not exist`);
    res.status(200).send(getCustomer);
  } catch (error) {
    console.log("Error in reading  customers : " + error);
    res.status(500).json("Unknown");
  }
};
export const register_customer = async (req, res) => {
  try {
    const { name, gender, address, mobile } = req.body;
    const getCustomer = await Customer.findOne({ mobile });
    if (getCustomer) return res.status(403).json("Customer already registered");
    const register_customer = new Customer({
      name: name.toLowerCase(),
      gender: gender.toLowerCase(),
      address: address.toLowerCase(),
      mobile: mobile.toLowerCase(),
    });
    await register_customer.save();
    res.status(201).json("Registration customer successfully");
  } catch (error) {
    console.log("Error in registration customers : " + error);
    res.status(500).json("Unknown");
  }
};
export const updated_customer = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, gender, address, mobile } = req.body;
    const existCustomer = await Customer.findById(id);
    if (!existCustomer)
      return res.status(404).json(`This id = ${id} is not exist`);
    const updated_customer = await Customer.findOneAndUpdate(
      { _id: id },
      {
        name: name.toLowerCase(),
        gender: gender.toLowerCase(),
        address: address.toLowerCase(),
        mobile: mobile.toLowerCase(),
      },
      { new: true, runValidator: true }
    );
    res.status(201).json("Updated customer successfully");
  } catch (error) {
    console.log("Error in Updated customers : " + error);
    res.status(500).json("Unknown error");
  }
};
export const deleted_customer = async (req, res) => {
  try {
    const id = req.params.id;
    const existCustomer = await Customer.findById(id);
    if (!existCustomer)
      return res.status(404).json(`This id = ${id} is not exist`);
    const deleted_customer = await Customer.findOneAndDelete({ _id: id });
    res.status(201).json("Deleted customer successfully");
  } catch (error) {
    console.log("Error in Deleted customers : " + error);
    res.status(500).json("Unknown error");
  }
};
