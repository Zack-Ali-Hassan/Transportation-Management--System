import chalk from "chalk";
import joi from "joi";
export const register_user_validation = (req, res, next) => {
  try {
    const register_user_schema = joi.object({
      name: joi.string().min(3).max(50).required().trim(),
      type: joi.string().min(2).max(6).required().trim(),
      mobile: joi.number(),
      email: joi.string().email().required().trim(),
      password: joi.string().min(5).required().trim(),
    });
    const { error } = register_user_schema.validate(req.body);
    if (error) {
        console.log(
            `${chalk.red.bold("User register validation : ")}` + error
          );
          return res.status(403).json(error.details[0].message);
    }
    next();
  } catch (error) {
    console.log("Register user validation error : " + error);
    res.status(500).json("Unknown error");
  }
};
export const update_user_validation = (req, res, next) => {
  try {
    const register_user_schema = joi.object({
      name: joi.string().min(3).max(50).required().trim(),
      type: joi.string().min(2).max(6).required().trim(),
      mobile: joi.number().min(9).max(9).required(),
      email: joi.string().email().required().trim(),
      password: joi.string().min(5).required().trim(),
    });
    const { error } = register_user_schema.validate(req.body);
    if (error) {
      console.log(
        `${chalk.red.bold("User Updated validation : ")}` + error
      );
      return res.status(403).json(error.details[0].message);
    }
    next();
  } catch (error) {
    console.log("Updated user validation error : " + error);
    res.status(500).json("Unknown error");
  }
};
export const login_user_validation = (req, res, next) => {
  try {
    const register_user_schema = joi.object({
      email: joi.string().email().required().trim(),
      password: joi.string().min(5).required().trim(),
    });
    const { error } = register_user_schema.validate(req.body);
    if (error) {
      console.log(
        `${chalk.red.bold("User login validation : ")}` + error
      );
      return res.status(403).json(error.details[0].message);
    }
    next();
  } catch (error) {
    console.log("Updated user validation error : " + error);
    res.status(500).json("Unknown error");
  }
};
