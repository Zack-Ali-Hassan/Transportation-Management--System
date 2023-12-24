import chalk from "chalk";
import Joi from "joi";
export const customer_register_validation = (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string().min(4).max(60).required().trim(),

      gender: Joi.string().min(3).max(7).required().trim(),

      address: Joi.string().trim(),

      mobile: Joi.string().min(9).max(9).required().trim(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      console.log(
        `${chalk.red.bold("Customer registration validation : ")}` + error
      );
      return res.status(403).json(error.details[0].message);
    }
    next();
  } catch (error) {}
};
export const customer_edit_validation = (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string().min(4).max(60).required().trim(),

      gender: Joi.string().min(3).max(7).required().trim(),

      address: Joi.string().trim(),

      mobile: Joi.string().min(9).max(9).required().trim(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      console.log(
        `${chalk.red.bold("Customer edit validation : ")}` + error
      );
      return res.status(403).json(error.details[0].message);
    }
    next();
  } catch (error) {}
};
