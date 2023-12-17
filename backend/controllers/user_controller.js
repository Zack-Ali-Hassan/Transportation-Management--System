import chalk from "chalk";
import User from "../model/user_model.js";
import bcrypt from "bcrypt";
export const read_all_user = async (req, res) => {
  try {
    let getData = await User.find({});
    res.status(200).json(getData);
  } catch (error) {
    console.log(`${chalk.red.bold("Error in reading All user : ")}` + error);
    res.status(500).json("Unknown error...");
  }
};
export const read_user_count = async (req, res) => {
  try {
    let getData = await User.find({});
    res.status(200).send(getData);
  } catch (error) {
    console.log(`${chalk.red.bold("Error in reading All user : ")}` + error);
    res.status(500).json("Unknown error...");
  }
};
export const read_single_user = async (req, res) => {
  try {
    let id = req.params.id;
    let getData = await User.findById(id);
    if (!getData)
      return res.status(404).json(`This id  : ${id} does not exist`);
    res.status(200).send(getData);
  } catch (error) {
    console.log(`${chalk.red.bold("Error in reading single user : ")}` + error);
    res.status(500).json("Unknown error...");
  }
};
export const register_user = async (req, res) => {
  try {
    const { name, type, mobile, email, password } = req.body;
    const hashed_password = await bcrypt.hash(password, 10);
    let getData = await User.findOne({ $or: [{ mobile }, { email }] });
    if (getData) {
      if (getData.mobile == mobile.toLowerCase())
        return res.status(403).json(`Mobile already exists`);
      if (getData.email == email.toLowerCase())
        return res.status(403).json(`Email already exists`);
    }
    let reg_user = new User({
      name: name.toLowerCase(),
      type: type.toLowerCase(),
      mobile: mobile.toLowerCase(),
      email: email.toLowerCase(),
      password: hashed_password,
    });
    await reg_user.save();
    res.status(201).json("Registeration user successfully");
  } catch (error) {
    console.log(`${chalk.red.bold("Error in register user : ")}` + error);
    res.status(500).json("Unknown error...");
  }
};
export const update_user = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, type, mobile, email, password } = req.body;
    const hashed_password = await bcrypt.hash(password, 10);
    let getId = await User.findById(id);
    if (!getId) return res.status(404).json(`This id : ${id} does not exist`);
    let updated_user = await User.findOneAndUpdate(
      { _id: id },
      {
        name: name.toLowerCase(),
        type: type.toLowerCase(),
        mobile: mobile.toLowerCase(),
        email: email.toLowerCase(),
        password: hashed_password,
      },
      { new: true, runValidator: true }
    );
    res.status(201).json("Updated user successfully");
  } catch (error) {
    console.log(`${chalk.red.bold("Error in register user : ")}` + error);
    res.status(500).json("Unknown error...");
  }
};

export const delete_user = async (req, res) => {
  try {
    const id = req.params.id;
    const existUser = await User.findById(id);
    if (!existUser) return res.status(404).json(`This id : ${id} is not exist`);
    const deleted_user = await User.findOneAndDelete({ _id: id });
    res.status(201).json("Deleted user successfully");
  } catch (error) {
    console.log("Error in Deleted user : " + error);
    res.status(500).json("Unknown error");
  }
};

export const get_user_login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let getData = await User.findOne({ email  : email.toLowerCase()});
    if (!getData) return res.status(404).json("Invalid Email or Password");
    let validPassword = await bcrypt.compare(password, getData.password);
    if (!validPassword) return res.status(404).json("Invalid Email or Password");
    getData.password =undefined;
    return res.status(200).send(getData);
  } catch (error) {
    console.log("Login error : " + error);
    res.status(500).json("Unknown error");
  }
};
export const forget_password = async (req, res) => {
  try {
    const { email, password } = req.body;
    let getData = await User.findOne({ email  : email.toLowerCase()});
    if (!getData) return res.status(404).json("Invalid Email");
    let hashed_password = await bcrypt.hash(password, 10);
    let updated_user = await User.findOneAndUpdate(
      { email: email },
      {
        password: hashed_password,
      },
      { new: true, runValidator: true }
    );
    res.status(201).json("Updated password successfully");
  } catch (error) {
    console.log("Forgetpassword error : " + error);
    res.status(500).json("Unknown error");
  }
};
