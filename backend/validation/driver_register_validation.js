import chalk from "chalk";
import Joi from "joi";
export const driver_register_validation = (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string().min(3).max(60).required().trim(),
      
      mobile: Joi.string().min(9).max(9).required().trim(),

      email: Joi.string().min(4).max(30).email().trim(),
      vehicle: Joi.string().required().trim(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      console.log(
        `${chalk.red.bold("Driver registration validation : ")}` + error
      );
      return res.status(403).json(error.details[0].message);
    }
    next();
  } catch (error) {}
};
export const driver_update_validation = (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string().min(3).max(60).required().trim(),
      
      mobile: Joi.string().min(9).max(9).required().trim(),

      email: Joi.string().min(4).max(30).email().trim(),
      vehicle: Joi.string().required().trim(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      console.log(
        `${chalk.red.bold("Driver updated validation : ")}` + error
      );
      return res.status(403).json(error.details[0].message);
    }
    next();
  } catch (error) {}
};
