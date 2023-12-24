import chalk from "chalk";
import Joi from "joi";
export const vehicle_register_validation = (req, res, next) => {
  try {
    const schema = Joi.object({
      vehicle_number: Joi.string().min(5).max(50).required().trim(),

      type: Joi.string().min(1).max(50).required().trim(),

      fual_type: Joi.string().min(3).max(30).required().trim(),

      capacity: Joi.string().min(2).max(20).required().trim(),
      location: Joi.string().trim(),
      status: Joi.string().required().trim(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      console.log(
        `${chalk.red.bold("Vehicle registration validation : ")}` + error
      );
      return res.status(403).json(error.details[0].message);
    }
    next();
  } catch (error) {}
};
export const vehicle_update_validation = (req, res, next) => {
  try {
    const schema = Joi.object({
      vehicle_number: Joi.string().min(5).max(50).required().trim(),

      type: Joi.string().min(1).max(50).required().trim(),

      fual_type: Joi.string().min(3).max(30).required().trim(),

      capacity: Joi.string().min(1).max(30).required().trim(),
      location: Joi.string().trim(),
      status: Joi.string().required().trim(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      console.log(
        `${chalk.red.bold("Vehicle update validation : ")}` + error
      );
      return res.status(403).json(error.details[0].message);
    }
    next();
  } catch (error) {}
};
